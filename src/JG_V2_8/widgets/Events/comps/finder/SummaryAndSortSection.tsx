import { withTooltip } from '@jg/utils/withTooltip'
import React from 'react'
import { useEventConfig } from '../../EventWidget'
import useEventStore from '../../store/useEventStore'
import useNavigateWithArgs from '../hooks/useNavigateWithArgs'

const SummaryAndSortSection = () => {
  const { searchCount, finderStatus, showMap, toggleShowMap } = useEventStore((state) => ({
    searchCount: state.searchCount,
    finderStatus: state.finderStatus,
    showMap: state.showMap,
    toggleShowMap: state.toggleShowMap,
  }))
  const { getArgsFromUrl, setCurrentArgs } = useNavigateWithArgs()
  const orderBy = getArgsFromUrl()?.orderBy || 'asc'
  const sortBy = getArgsFromUrl()?.sortBy || 'distance'
  const { isEvent } = useEventConfig()
  const summaryHeading = `We found ${searchCount} matching result${searchCount === 1 ? '' : 's'}`
  const tooltipContent = orderBy === 'asc' ? 'Ascending Order' : 'Descending Order'

  return (
    <div className="flex flex-col-reverse md:flex-row divide-x divide-jg-metal-50 border-b border-jg-metal-50 font-medium text-[13px] leading-4">
      <div className={'flex-grow border-t md:border-t-0'}>
        {finderStatus !== 'pending' && <h1 className="px-4 py-2 text-jg-metal-300">{summaryHeading}</h1>}
      </div>
      <div className="flex items-center divide-x-0 md:divide-x">
        {isEvent && (
          <>
            <div className="jg-hidden md:block p-2 cursor-pointer" onClick={showMap ? toggleShowMap : () => {}}>
              <ListviewIconWithTooltip
                content={showMap ? 'Show Listview' : ''}
                className={`w-3.5 h-3.5 ${showMap ? 'text-jg-metal-300' : 'text-jg-metal-900'}`}
              />
            </div>
            <div className="jg-hidden md:block p-2 cursor-pointer" onClick={!showMap ? toggleShowMap : () => {}}>
              <MapviewIconWithTooltip
                content={!showMap ? 'Show Mapview' : ''}
                className={`w-3.5 h-3.5 ${showMap ? 'text-jg-metal-900' : 'text-jg-metal-300'}`}
              />
            </div>
          </>
        )}
        <div
          className="pl-4 md:pl-2 p-2 cursor-pointer"
          onClick={() => setCurrentArgs((args) => ({ ...args, orderBy: orderBy === 'asc' ? 'desc' : 'asc' }))}
        >
          <OrderIconWithTooltip
            content={tooltipContent}
            className={`w-4 h-4 text-jg-green-500 ${orderBy === 'desc' ? 'rotate-180' : ''}`}
          />
        </div>
        <div className="p-2 pl-0 md:pl-2 flex-grow inline-flex items-center">
          <label htmlFor="filter-sort">Sort:</label>
          <select
            onChange={(e) => {
              setCurrentArgs((args) => ({ ...args, sortBy: e.target.value }))
            }}
            defaultValue={sortBy}
            className={'w-full'}
            id="filter-sort"
          >
            {sortByOptions
              .filter((op) => isEvent || op.value !== 'distance')
              .map((op) => (
                <option key={op.value} value={op.value}>
                  {op.name}
                </option>
              ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default SummaryAndSortSection
const sortByOptions = [
  {
    name: 'Date',
    value: 'date',
  },
  {
    name: 'Distance',
    value: 'distance',
  },
  {
    name: 'Name',
    value: 'relevant',
  },
]

const OrderIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg width="14" height="12" viewBox="0 0 14 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M11.6666 9.33333H13.6666L10.9999 12L8.33325 9.33333H10.3333V0H11.6666M0.333252 9.33333H6.99992V10.6667H0.333252M2.99992 1.33333V2.66667H0.333252V1.33333M0.333252 5.33333H4.99992V6.66667H0.333252V5.33333Z"
        fill="currentColor"
      />
    </svg>
  )
}
const ListviewIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg width="14" height="12" viewBox="0 0 14 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M0.333008 7.33366H4.33301V11.3337H0.333008M9.66634 3.33366H5.66634V4.66699H9.66634M0.333008 4.66699H4.33301V0.666992H0.333008M5.66634 0.666992V2.00033H13.6663V0.666992M5.66634 11.3337H9.66634V10.0003H5.66634M5.66634 8.66699H13.6663V7.33366H5.66634"
        fill="currentColor"
      />
    </svg>
  )
}
const MapviewIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg width="14" height="12" viewBox="0 0 14 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M8 12L4 10.6L0.9 11.8C0.677778 11.8889 0.472222 11.8638 0.283333 11.7247C0.0944444 11.586 0 11.4 0 11.1667V1.83333C0 1.68889 0.0417778 1.56111 0.125333 1.45C0.208444 1.33889 0.322222 1.25556 0.466667 1.2L4 0L8 1.4L11.1 0.2C11.3222 0.111111 11.5278 0.136 11.7167 0.274667C11.9056 0.413778 12 0.6 12 0.833333V10.1667C12 10.3111 11.9582 10.4389 11.8747 10.55C11.7916 10.6611 11.6778 10.7444 11.5333 10.8L8 12ZM7.33333 10.3667V2.56667L4.66667 1.63333V9.43333L7.33333 10.3667Z"
        fill="currentColor"
      />
    </svg>
  )
}
const OrderIconWithTooltip = withTooltip(OrderIcon)
const ListviewIconWithTooltip = withTooltip(ListviewIcon)
const MapviewIconWithTooltip = withTooltip(MapviewIcon)
