import { Button, FadeIn } from '@comps/uiComps'
import { Refresh } from '@comps/uiComps/Icons'
import { ChevronLeftIcon } from '@heroicons/react/solid'
import _ from 'lodash'
import { Fragment, createContext, useContext, useState } from 'react'
import 'react-calendar/dist/Calendar.css'
import { withTooltip } from '@jg/utils/withTooltip'
import useNavigateWithArgs from '@jg/widgets/Events/comps/hooks/useNavigateWithArgs'
import FancyScroll from '../Scrollbar/FancyScroll'

interface IFilterBar {
  back: () => void
  setFilterActive: (filterName: string) => void
  items: FilterBarItem[]
}

const FilterBarContext = createContext<IFilterBar>({
  back: () => {},
  items: [],
  setFilterActive: () => {},
})
export const useFilterBarContext = () => {
  return useContext(FilterBarContext)
}

const groupByGroupName = (items: any) => {
  return _(items)
    .groupBy('group')
    .map(function (items, bdate) {
      return {
        group: bdate,
        items: _.map(items),
      }
    })
    .value()
}
export type FilterBarItem = {
  name: string
  title: string
  hasDefaultValueSet?: () => boolean
  filterOptionComp: import('react').ReactNode
  formatedOptionValueComp?: import('react').ReactNode
  group: string
}
type FilterBarProps = {
  filterItems?: any[]
  items?: FilterBarItem[]
  onReset?: () => void
}

function FilterBar(props: FilterBarProps) {
  const { items, onReset } = props
  const itemsByGroup = groupByGroupName(items)
  const [filterOptionSelected, setHasSubItems] = useState<boolean>(false)
  const [subItemHeader, setSubItemHeader] = useState<string>('')
  const [filterOptionCompName, setFilterOptionCompName] = useState<string>()

  const renderFilterOptionComponent = (item: FilterBarItem): void => {
    setSubItemHeader(item.title)
    setFilterOptionCompName(item.name)
    setHasSubItems(true)
  }
  const removeSubItems = (): void => {
    setHasSubItems(false)
  }

  return (
    <FilterBarContext.Provider
      value={{
        items: items || [],
        setFilterActive: (filterName) => {
          const item = items?.find((item) => item.name === filterName)
          if (item) renderFilterOptionComponent(item)
        },
        back: removeSubItems,
      }}
    >
      <div className="flex-grow w-full flex flex-col justify-between h-full">
        <div className={'flex-grow flex flex-col w-full bg-white  h-full'}>
          {!filterOptionSelected && (
            <div className="w-full flex px-2 py-[29px] border-b border-jg-grey-300">
              <div className="w-6/12 text-gray-900 font-extrabold text px-2 py-1">Filters</div>
              <div className="w-6/12 inline-flex justify-end text-jg-green-700 font-normal text-sm cursor-pointer">
                <Button
                  className="px-2 "
                  icon={<Refresh className="w-3 " />}
                  btnSize="md"
                  fillType="plain"
                  text="Reset"
                  onClick={() => {
                    onReset?.()
                  }}
                />
              </div>
            </div>
          )}
          {filterOptionSelected && (
            <div className="flex flex-col h-full justify-between">
              <SelectedScreenHead selectedFilter={subItemHeader} />

              <div className="flex flex-col h-full justify-between overflow-y-auto">
                {items?.filter((item) => item.name === filterOptionCompName)[0].filterOptionComp}
                {/* {items?.map((item, index) => {
                console.log('Item', item)
                return <Fragment key={index}>{item.name === filterOptionCompName && item.filterOptionComp}</Fragment>
              })} */}
              </div>
            </div>
          )}

          {!filterOptionSelected && (
            <FancyScroll>
              <FadeIn className="divide-y divide-jg-metal-50 h-full">
                {itemsByGroup &&
                  itemsByGroup.map((group, indexGroup) => {
                    return (
                      <div key={indexGroup} className="bg-jg-grey-50">
                        {group.items.map((item, index) => {
                          return (
                            <Fragment key={index}>
                              {item.formatedOptionValueComp ? (
                                <>{item.formatedOptionValueComp}</>
                              ) : (
                                <div key={index} className="w-full flex flex-col px-3.5 py-2">
                                  {item.filterOptionComp}
                                </div>
                              )}
                            </Fragment>
                          )
                        })}
                      </div>
                    )
                  })}
              </FadeIn>
            </FancyScroll>
          )}
        </div>
      </div>
    </FilterBarContext.Provider>
  )
}

export default FilterBar

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
const OrderIconWithTooltip = withTooltip(OrderIcon)

const SelectedScreenHead = ({ selectedFilter }: { selectedFilter: string }) => {
  const { getArgsFromUrl, setCurrentArgs, currentArgs } = useNavigateWithArgs()

  const { back } = useFilterBarContext()
  return (
    <div className="w-full flex items-center justify-between pl-2 pr-3 py-5 border-b border-jg-metal-50">
      <div className="">
        <Button
          onClick={back}
          className="px-1 py-1"
          text={<span className="text-jg-metal-300 font-medium text-[13px] leading-4">Filters</span>}
          icon={<ChevronLeftIcon className="text-jg-metal-300" />}
          btnColor="secondary"
          fillType="plain"
          btnSize="xl"
        />
        <h3 className="pl-2.5 font-semibold text-base leading-5 text-jg-metal-900">{selectedFilter}</h3>
      </div>
      {selectedFilter.toLowerCase().includes('sort') && (
        <OrderIconWithTooltip
          content={'Order By'}
          className={`text-jg-green-500 cursor-pointer ${getArgsFromUrl().orderBy === 'asc' ? '' : '-rotate-180'}`}
          onClick={() =>
            setCurrentArgs({ ...currentArgs, orderBy: getArgsFromUrl().orderBy === 'asc' ? 'desc' : 'asc' })
          }
        />
      )}
    </div>
  )
}
