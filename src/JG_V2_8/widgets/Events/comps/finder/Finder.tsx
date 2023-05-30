import { ModalOld as Modal } from '@jg/common/comps'
import Banner from '../banner/Banner'
import FilterResult from './FilterResult'
import { MapIcon } from '@heroicons/react/solid'
import { ReactComponent as ViewIcon } from '@jg/assets/images/ViewIcon.svg'
import { Button } from '@comps/uiComps'
import EventFilterBar from '../leftFilterBar/EventFilterBar'
import SkeletonText from '@jg/common/comps/loader/placeholders/SkeletonText'
import FinderSearchBar from './FinderSearchBar'
import { useEffect, useRef, useState } from 'react'
import useEventStore from '../../store/useEventStore'
import useNavigateWithArgs from '../hooks/useNavigateWithArgs'
import EventMap from './EventMap'
import { getLocationName } from '@jg/_core/services/location/location'
import { useGeoLocationContext } from '@jg/providers/GeoLocationProvider'
import FlexColumns from '../../layouts/FlexContainer/FlexColumns'
import { useFilterDataContext } from '../../providers/FilterDataProvider'
import _ from 'lodash'
import FilterResultMapProvider from '../../providers/FilterResultMapProvider'
import FilterResultByCalendar from './FilterResultByCalendar'
import FancyScroll from '@jg/common/comps/Scrollbar/FancyScroll'
import SummaryAndSortSection from './SummaryAndSortSection'
import { useEventConfig } from '../../EventWidget'
import classNames from 'classnames'
import { useLocation } from 'react-router-dom'
import { IsBlended } from '@jg/_core/Authorization'

function EventFinder() {
  const { resultDisplayBy } = useFilterDataContext()
  const { getArgsFromUrl } = useNavigateWithArgs()

  const [isFilterBarDataLoaded, setIsFilterBarDataLoaded] = useState<boolean>(false)
  const [open, setOpen] = useState(false)
  const setSerachRequestArg = useEventStore((state) => state.setSerachRequestArg)
  const filterBarReadyStatus = useEventStore((state) => state.filterBarReadyStatus)
  const setFilterbarReadyStatus = useEventStore((state) => state.setFilterbarReadyStatus)
  const filterBarData = useEventStore((state) => state.filterBarData)
  const setLocalFilterArgs = useEventStore((state) => state.setLocalFilterArgs)
  const eventCountByCalendarView = useEventStore((state) => state.eventCountByCalendarView)
  const localFilterArgs = useEventStore((state) => state.localFilterArgs)
  const { userPreferredGeoLocation, setUserPreferredGeoLocation } = useGeoLocationContext()
  const userPreferredLatLng = userPreferredGeoLocation
    ? `${userPreferredGeoLocation.lat}|${userPreferredGeoLocation.lng}`
    : ''
  const showMap = useEventStore((state) => state.showMap)

  const { isSaved, latlng, ...rest } = getArgsFromUrl()
  const restArgsRef = useRef({})

  const { isEvent } = useEventConfig()

  const buildMode = IsBlended()
  const location = useLocation()

  useEffect(() => {
    // setPrevNavOfDetailsPage(location.pathname + location.search)
    localStorage.setItem('prevNavOfDetailsPage', location.pathname + location.search)
  }, [location.search])

  useEffect(() => {
    if (isFilterBarDataLoaded) {
      //console.log('arg.latlng ', arg.latlng, 'userPreferredLatLng', userPreferredLatLng)
      if (latlng && !userPreferredLatLng) {
        // console.log('setUserPreferredGeoLocation 1')
        getLocationName(latlng.split('|').join(','), function (res: any) {
          const parts = latlng ? latlng.split('|') : ['', '']
          setUserPreferredGeoLocation?.({ lat: parts[0], lng: parts[1], locationName: res })
        })
      } else if (userPreferredLatLng.length > 1 && filterBarReadyStatus !== 'success') {
        setFilterbarReadyStatus('success')
      } else {
        const { sortBy, provider } = { ...rest }

        if (provider?.[0] === 'club') {
          provider?.pop()
          filterBarData?.Clubs.forEach((e) => {
            if (e.ClubType === 'Club' && e.DocId && e.IsMyOrganization === 1) provider.push(e.DocId.toString())
          })
        }
        if (provider?.[0] === 'region') {
          provider?.pop()
          filterBarData?.Clubs.forEach((e) => {
            if (e.ClubType === 'Region' && e.IsMyOrganization === 1 && e.DocId) provider.push(e.DocId.toString())
          })
        }
        if (provider?.[0] === 'sub-region') {
          provider?.pop()
          filterBarData?.Clubs.forEach((e) => {
            if (e.ClubType === 'Sub Region' && e.IsMyOrganization === 1 && e.DocId) provider.push(e.DocId.toString())
          })
        }

        if (provider?.[0] === 'my-provider') {
          provider?.pop()
          provider.push('0') // for ngb
          filterBarData?.Clubs.forEach((e) => {
            if ('[Club][Region][Sub Region]'.indexOf(`[${e.ClubType}]`) > -1 && e.IsMyOrganization === 1 && e.DocId)
              provider.push(e.DocId.toString())
          })
        }
        if (provider?.[0] === '!my-provider') {
          provider?.pop()
          filterBarData?.Clubs.forEach((e) => {
            if ('[Club][Region][Sub Region]'.indexOf(`[${e.ClubType}]`) > -1 && e.IsMyOrganization === 0 && e.DocId)
              provider.push(e.DocId.toString())
          })
        }

        if (sortBy === 'distance' || !_.isEqual({ ...rest }, restArgsRef.current)) {
          setSerachRequestArg({ latlng, ...rest })
          restArgsRef.current = { ...rest }
        }
      }
    }
  }, [rest])

  useEffect(() => {
    if (localFilterArgs.isSavedByUser !== isSaved) setLocalFilterArgs({ isSavedByUser: isSaved })
  }, [isSaved])

  return (
    <div className="w-full">
      <Banner className="md:h-[216px] h-[50vh]">
        {/* <SearchResultSummary /> */}
        {resultDisplayBy === 'calendar' && filterBarReadyStatus && (
          <div className="w-full hidden visible md:flex justify-center font-bold text-white text-xl">{`We found ${eventCountByCalendarView} event${
            eventCountByCalendarView > 1 ? 's' : ''
          }`}</div>
        )}
      </Banner>

      <div
        className={classNames(
          'jg-container fixed bottom-0 inset-x-0',
          buildMode && isEvent && 'top-[102px] md:top-[142px]',
          !buildMode && isEvent && 'top-[156px] md:top-[142px]',
          buildMode && !isEvent && 'top-[54px]',
          !buildMode && !isEvent && 'top-[108px]'
        )}
      >
        <FlexColumns className="h-full flex-col md:flex-row border-0 md:border rounded-xl overflow-hidden">
          {resultDisplayBy === 'calendar' && filterBarReadyStatus && (
            <div className="w-full md:hidden md:visible flex items-center font-medium text-jg-grey-500 pl-4 py-1.5 text-sm bg-white">{`We found ${eventCountByCalendarView} event${
              eventCountByCalendarView > 1 ? 's' : ''
            }`}</div>
          )}
          <EventFilterBar
            className="flex-none hidden visible md:block md:w-[270px] overflow-auto bg-white"
            onReady={() => {
              setIsFilterBarDataLoaded(true)
            }}
          />
          {resultDisplayBy === 'browse' && (
            <FilterResultMapProvider>
              <FlexColumns className="flex-1 bg-white min-w-0 h-full">
                <div className={`flex-1 w-full h-full lg:flex-none ${showMap && isEvent && 'lg:w-[600px]'}`}>
                  <div className=" w-full h-full flex flex-col min-w-0 justify-between  border-l border-r bg-white z-[1]">
                    <div className="flex justify-between items-center bg-white border-b p-1 ">
                      <FinderSearchBar />
                      {/* For Mobile */}
                      <FilterFloatingButton
                        open={open}
                        handleVisibility={setOpen}
                        ModalBody={
                          <EventFilterBar
                            className="w-full h-full md:block overflow-auto bg-white"
                            onReady={() => setIsFilterBarDataLoaded(true)}
                          />
                        }
                      />
                    </div>
                    <SummaryAndSortSection />

                    <FancyScroll className="w-full h-full">
                      {filterBarReadyStatus ? (
                        <FilterResult />
                      ) : (
                        <div className="p-4">
                          <SkeletonText />
                        </div>
                      )}
                    </FancyScroll>
                  </div>
                </div>
                {showMap && isEvent && <EventMap className={`flex-1 h-full jg-hidden lg:block`} />}
              </FlexColumns>
            </FilterResultMapProvider>
          )}
          {resultDisplayBy === 'calendar' &&
            (filterBarReadyStatus ? (
              <>
                <FilterResultByCalendar handleOpenFilterBar={(status) => setOpen(status)} />
                <Modal
                  open={open}
                  setOpen={() => setOpen(true)}
                  hideCloseAction
                  bodySection={() => (
                    <EventFilterBar
                      className="w-full h-full md:block overflow-auto bg-white"
                      onReady={() => setIsFilterBarDataLoaded(true)}
                    />
                  )}
                  actionButtons={() => {
                    return (
                      <div className="flex justify-end items-center w-full">
                        <Button
                          btnColor="secondary"
                          fillType="outline"
                          text="Close"
                          onClick={() => setOpen(false)}
                        ></Button>
                      </div>
                    )
                  }}
                  customSecionClassName={{ titleClass: 'flex items-center jg-hidden', bodyClass: '!top-0' }}
                ></Modal>
              </>
            ) : (
              <div className="p-4 flex gap-3">
                <SkeletonText />
                <SkeletonText />
                <SkeletonText />
              </div>
            ))}
        </FlexColumns>

        {isEvent && <MapFloatingButton />}
      </div>
    </div>
  )
}

export default EventFinder

const MapFloatingButton = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 hidden visible z-10">
        <Button text=" Map" onClick={() => setOpen(true)} icon={<MapIcon />} />
      </div>
      <Modal
        open={open}
        setOpen={setOpen}
        titleSection={() => (
          <div className="p-3 text-globalTextSizeLg font-semibold text-jg-metal-900  jg-hidd">{'Map'}</div>
        )}
        bodySection={() => <EventMap className={`h-full w-full`} />}
        customSecionClassName={{ titleClass: 'flex items-center' }}
      ></Modal>
    </>
  )
}

const FilterFloatingButton = ({
  ModalBody,
  open,
  handleVisibility,
}: {
  ModalBody: JSX.Element
  open: boolean
  handleVisibility: (status: boolean) => void
}) => {
  return (
    <>
      <div className="md:jg-hidden inline-block px-2" onClick={() => handleVisibility(true)}>
        <ViewIcon className="w-4 h-4 text-jg-grey-600 bg-white" />
      </div>
      <Modal
        open={open}
        setOpen={() => handleVisibility(true)}
        hideCloseAction
        bodySection={() => ModalBody}
        actionButtons={() => {
          return (
            <div className="flex justify-end items-center w-full">
              <Button
                btnColor="secondary"
                fillType="outline"
                text="Close"
                onClick={() => handleVisibility(false)}
              ></Button>
            </div>
          )
        }}
        customSecionClassName={{ titleClass: 'flex items-center jg-hidden', bodyClass: '!top-0' }}
      ></Modal>
    </>
  )
}
