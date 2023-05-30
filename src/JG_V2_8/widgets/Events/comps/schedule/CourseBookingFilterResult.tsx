import { useState, useEffect } from 'react'
import Calendar from '@jg/common/comps/calendar/Calendar'
import useCourseBookingFinderApi from '../hooks/useCourseBookingFinderApi'
import { GenericErrorResponse } from '@jg/common/types'
import { MultipleEventDetailsResponse } from '@jg/common/types/eventsAnsSchedules/MultipleEventDetailsResponse'
import { GetMultipleEventDetailsParams } from '@jg/common/dataAPIs/eventsAnsSchedules/GetMultipleEventDetailsRequest'
import { useAsync } from '@jg/hooks'
import { useEventsAndScheduleApi } from '@jg/common/dataAPIs'
import { EventInfo } from '@jg/common/types'
import EventPopover from '../EventPopover'
import ShowMoreEventsDrawer from '../ShowMoreEventsDrawer'
import useCourseBookingStore from '../../store/useCourseBookingStore'
import { useEventSettingsContext } from '../../providers/EventSettingsProvider'

const convertTime = (date: Date) => {
  const mnth = ('0' + (date?.getMonth() + 1))?.slice(-2),
    day = ('0' + date?.getDate())?.slice(-2)
  return [date?.getFullYear(), mnth, day]?.join('-')
}

type CourseBookingFilterResultProps = {
  handleOpenFilterBar?: (status: boolean) => void
}

const CourseBookingFilterResult = (props: CourseBookingFilterResultProps) => {
  const { handleOpenFilterBar } = props
  // const data: any[] = []
  const { data, status } = useCourseBookingFinderApi()
  const calendarViewKey = 'mybookingCalendarView'
  const [clickedEventId, setClickedEventId] = useState<number>(-1)
  const [eventDetails, setEventDetails] = useState<EventInfo[]>([])
  const [mouseXPos, setMouseXPos] = useState<number>(0)
  const [mouseYPos, setMouseYPos] = useState<number>(0)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [showMoreEventsIdList, setShowMoreEventsIdList] = useState<number[]>([])
  const [iterableDrawerItems, setIterableDrawerItems] = useState<EventInfo[]>([])
  const setEventCountByCalendarView = useCourseBookingStore((state) => state.setEventCountByCalendarView)
  const eventCountByCalendarView = useCourseBookingStore((state) => state.eventCountByCalendarView)
  const finderStatus = useCourseBookingStore((state) => state.finderStatus)
  const addToBasePath = 'booking-details'
  const showEventInfoCard = true
  const { systemSettings } = useEventSettingsContext()
  const region = systemSettings['ORGANISATION.REGIONAL_ENTITY_IDENTITY'] ?? 'Region'
  const subRegion = systemSettings['ORGANISATION.SUB_REGIONAL_ENTITY_IDENTITY'] ?? 'Sub Region'

  const { GetMultipleEventDetailsRequest } = useEventsAndScheduleApi()
  const {
    execute,
    value,
    status: getEventDetailsRequestStatus,
  } = useAsync<MultipleEventDetailsResponse, GenericErrorResponse, GetMultipleEventDetailsParams>(
    GetMultipleEventDetailsRequest,
    { DocIds: isOpen ? showMoreEventsIdList : [clickedEventId] },
    false
  )

  useEffect(() => {
    if (clickedEventId && clickedEventId > -1) execute()
  }, [clickedEventId])

  useEffect(() => {
    if (Array.isArray(showMoreEventsIdList) && showMoreEventsIdList?.length > 0 && isOpen) execute()
  }, [showMoreEventsIdList, isOpen])

  useEffect(() => {
    if (getEventDetailsRequestStatus === 'success' && value && value?.eventDetails) {
      isOpen ? setIterableDrawerItems(value?.eventDetails) : setEventDetails(value?.eventDetails)
    }
  }, [getEventDetailsRequestStatus, isOpen])

  const handleOnItemClick = (e: any, id: number) => {
    e.stopPropagation()
    setMouseXPos(e?.clientX)
    setMouseYPos(e?.clientY)
    setClickedEventId(id)
  }

  const handleOnItemOutSideClick = (e: any) => {
    e.stopPropagation()
    setMouseXPos(0)
    setMouseYPos(0)
    setClickedEventId(-1)
  }

  const handleOnShowMoreItemsClick = (e: any, items: any[]) => {
    setIsOpen(true)
    const drawerItemsArr: number[] = []
    items?.forEach((event: any) => {
      data?.forEach((item) => {
        if (event?.id === item?.EventDocId && !drawerItemsArr.includes(event?.id)) {
          drawerItemsArr?.push(event?.id)
        }
      })
    })
    setShowMoreEventsIdList(drawerItemsArr)
  }

  const formatEventList = (): any[] | undefined => {
    const eventList = data?.map((e) => {
      let label = ''
      if (e?.ClubType?.toLowerCase() === 'ngb') {
        label = systemSettings['ENTITY.NGB_BRAND_COLOR']
      } else if (e?.ClubType?.toLowerCase() === region?.toLowerCase()) {
        label = systemSettings['ENTITY.REGION_BRAND_COLOR']
      } else if (e?.ClubType?.toLowerCase() === subRegion?.toLowerCase()) {
        label = systemSettings['ENTITY.SUBREGION_BRAND_COLOR']
      } else {
        label = systemSettings['ENTITY.CLUB_BRAND_COLOR']
      }
      const item = {
        id: e?.EventDocId,
        name: `${e?.EventName} - ${e?.CourseName}`,
        time: `${e?.StartTime} ${e?.StartTimeZone}`,
        date: convertTime(e?.StartDate),
        label: label,
      }

      return item
    })
    return eventList
  }

  return (
    <div className="bg-white flex-1 w-full border md:border-none rounded-xl md:rounded-none">
      {finderStatus !== 'pending' && (
        <div className="w-full relative top-2 md:hidden md:visible flex items-center font-medium text-jg-grey-500 pl-4 text-sm bg-white">{`We found ${eventCountByCalendarView} event${
          eventCountByCalendarView > 1 ? 's' : ''
        }`}</div>
      )}
      <Calendar
        className="relative top-4 md:top-0"
        isLoading={status === 'pending'}
        onItemClick={(e, id) => handleOnItemClick(e, id)}
        onItemOutSideClick={(e) => handleOnItemOutSideClick(e)}
        onShowMoreItemsClick={(e, items) => handleOnShowMoreItemsClick(e, items)}
        eventsList={formatEventList()}
        viewMode={localStorage?.getItem(calendarViewKey) ?? 'List'}
        onSelectView={(view) => localStorage?.setItem(calendarViewKey, view)}
        getItemCount={(eventCount) => {
          setEventCountByCalendarView(eventCount)
        }}
        onClickMenuBarIcon={(status) => handleOpenFilterBar && handleOpenFilterBar(status)}
      />
      <div>
        <EventPopover {...{ addToBasePath, clickedEventId, eventDetails, mouseXPos, mouseYPos }} />
      </div>
      <ShowMoreEventsDrawer {...{ addToBasePath, iterableDrawerItems, isOpen, showEventInfoCard, setIsOpen }} />
    </div>
  )
}

export default CourseBookingFilterResult
