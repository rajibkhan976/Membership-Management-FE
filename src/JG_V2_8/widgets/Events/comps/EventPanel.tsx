import { CompBaseProps } from '@comps/uiComps'
import { EventInfo } from '@jg/common/types'
import EventInfoCard from '@jg/widgets/Events/comps/eventInfoCard/EventInfoCard'

type CalendarEventDetailsProps = CompBaseProps & {
  eventList?: EventInfo[]
  event?: any
  eventId?: number | null
  alignImage?: any
  onPanelClick?: (event: any, id: string | undefined) => void
}

const EventPanel = (props: CalendarEventDetailsProps) => {
  const { eventList, event, eventId, alignImage = 'top', onPanelClick } = props

  return (
    <>
      {Array.isArray(eventList) &&
        eventList.length > 0 &&
        eventList.map((item: EventInfo, index: number) => {
          if (event && event.id && item.docId && item.docId === event.id) {
            return (
              <div
                className="cursor-pointer"
                key={index}
                onClick={(e) => onPanelClick && onPanelClick(e, item?.eventDocIdHash)}
              >
                <EventInfoCard eventInfo={item} imageAlign={alignImage} />
              </div>
            )
          }
          if (eventId && item.docId && item.docId === eventId) {
            return (
              <div
                className="cursor-pointer"
                key={index}
                onClick={(e) => onPanelClick && onPanelClick(e, item?.eventDocIdHash)}
              >
                <EventInfoCard eventInfo={item} imageAlign={alignImage} />
              </div>
            )
          }
        })}
    </>
  )
}

export default EventPanel
