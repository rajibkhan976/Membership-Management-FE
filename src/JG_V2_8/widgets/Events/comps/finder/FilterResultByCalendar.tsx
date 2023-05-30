import { useState, useMemo } from 'react'
import Calendar from '@jg/common/comps/calendar/Calendar'
import useEventStore from '../../store/useEventStore'
import useFinderApi from '../hooks/useFinderApi'
import EventPopover from '../EventPopover'
import ShowMoreEventsDrawer from '../ShowMoreEventsDrawer'
import { EventInfo } from '@jg/common/types'
import { useEventSettingsContext } from '../../providers/EventSettingsProvider'

type FilterResultByCalendarProps = {
  handleOpenFilterBar?: (status: boolean) => void
}

const FilterResultByCalendar = (props: FilterResultByCalendarProps) => {
  const { handleOpenFilterBar } = props
  const searchResultsByPage = useEventStore((state) => state.searchResultsByPage)
  const setEventCountByCalendarView = useEventStore((state) => state.setEventCountByCalendarView)
  const eventDetails = searchResultsByPage as EventInfo[]
  const { status } = useFinderApi()
  const [clickedEventId, setClickedEventId] = useState<number>(-1)
  const [mouseXPos, setMouseXPos] = useState<number>(0)
  const [mouseYPos, setMouseYPos] = useState<number>(0)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [showMoreEventsList, setShowMoreEventsList] = useState<any[]>([])
  const calendarViewKey = 'eventCalendarView'
  const addToBasePath = 'details'
  const showEventInfoCard = true
  const { systemSettings } = useEventSettingsContext()
  const region = systemSettings['ORGANISATION.REGIONAL_ENTITY_IDENTITY'] ?? 'Region'
  const subRegion = systemSettings['ORGANISATION.SUB_REGIONAL_ENTITY_IDENTITY'] ?? 'Sub Region'

  const iterableDrawerItems = useMemo(() => {
    const drawerItemsArr: any[] = []
    showMoreEventsList?.forEach((event) => {
      searchResultsByPage?.forEach((item) => {
        if (event?.id === item?.docId) {
          drawerItemsArr?.push(item)
        }
      })
    })
    return drawerItemsArr
  }, [showMoreEventsList, searchResultsByPage])

  const handleOnItemClick = (e: any, id: number) => {
    e.stopPropagation()
    setMouseXPos(e?.clientX)
    setMouseYPos(e?.clientY)
    setClickedEventId(id)
  }

  const handleOnItemOutSideClick = (e: any) => {
    e.stopPropagation()
    setClickedEventId(-1)
    setMouseXPos(0)
    setMouseYPos(0)
  }

  const handleOnShowMoreItemsClick = (e: any, items: any[]) => {
    setIsOpen(true)
    setShowMoreEventsList(items)
  }

  const formatEventList = (): any[] | undefined => {
    const eventList = searchResultsByPage?.map((e) => {
      let time = ''
      const t = e?.starts?.time?.split(':')
      if (t) {
        time = `${t[0]}:${t[1]} ${e?.starts?.timezone}`
      }
      let label = ''
      if (e?.ownerEntity?.type?.toLowerCase() === 'ngb') {
        label = systemSettings['ENTITY.NGB_BRAND_COLOR']
      } else if (e?.ownerEntity?.type?.toLowerCase() === region?.toLowerCase()) {
        label = systemSettings['ENTITY.REGION_BRAND_COLOR']
      } else if (e?.ownerEntity?.type?.toLowerCase() === subRegion?.toLowerCase()) {
        label = systemSettings['ENTITY.SUBREGION_BRAND_COLOR']
      } else {
        label = systemSettings['ENTITY.CLUB_BRAND_COLOR']
      }
      return {
        id: e?.docId,
        name: e?.name,
        time: time,
        date: e?.starts?.date,
        label: label,
      }
    })
    return eventList
  }

  return (
    <div className="w-full md:w-9/12 xl:w-full h-full flex-1">
      <Calendar
        isLoading={status === 'pending'}
        onItemClick={(e, id) => handleOnItemClick(e, id)}
        onItemOutSideClick={(e) => handleOnItemOutSideClick(e)}
        onShowMoreItemsClick={(e, items) => handleOnShowMoreItemsClick(e, items)}
        eventsList={formatEventList()}
        viewMode={localStorage?.getItem(calendarViewKey) ?? 'Week'}
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

export default FilterResultByCalendar
