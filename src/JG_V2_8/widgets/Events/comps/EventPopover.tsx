import JGPopover from '@jg/common/comps/popover/JGPopover'
import EventPanel from './EventPanel'
import { EventInfo } from '@jg/common/types'
import { useWidgetContext } from 'jg-widget'
import { useNavigate } from 'react-router-dom'

type EventPopoverProps = {
  addToBasePath: string
  clickedEventId: number
  eventDetails: EventInfo[]
  mouseXPos: number
  mouseYPos: number
}

const EventPopover = (props: EventPopoverProps) => {
  const { addToBasePath, clickedEventId, eventDetails, mouseXPos, mouseYPos } = props
  const navigate = useNavigate()
  const { basePath } = useWidgetContext()
  console.log(eventDetails)
  return (
    <div>
      <JGPopover
        show={clickedEventId > -1 && eventDetails?.length > 0}
        mainContainerWidth={window.innerWidth}
        mainContainerHeight={window.innerHeight}
        mouseXPos={mouseXPos}
        mouseYPos={mouseYPos}
        btnChildComp={null}
        panelChildComp={
          <EventPanel
            eventList={eventDetails}
            eventId={clickedEventId}
            alignImage={'top'}
            onPanelClick={(e, id) => {
              navigate(`${basePath}${addToBasePath}/${id}/`)
            }}
          />
        }
        minHeight={458}
      />
    </div>
  )
}

export default EventPopover
