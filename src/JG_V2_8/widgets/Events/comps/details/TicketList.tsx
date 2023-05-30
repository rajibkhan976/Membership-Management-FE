import TicketItem from './TicketItem'
import { useEventTicketListStoreContext } from '../../providers/EventTicketListStoreProvider'
import TicketCheckoutBar from './TicketCheckoutBar'
import ContentBlocker from '../ContentBlocker'
import useEventStore from '../../store/useEventStore'
import React from 'react'
import SeeMore from './components/SeeMore'

const MIN_TICKET = 4

const TicketList = ({ isBooked }: { isBooked: boolean }) => {
  //const { addItem, gotoCart } = useShoppingCartContext()
  // const { userInfo } = useSessionUserContext()
  const eventData = useEventStore((state) => state.eventDetails)
  const { asyncStatus } = useEventTicketListStoreContext((state) => ({
    asyncStatus: state.asyncStatus,
    //eventData: state.eventData,
  }))
  const { tickets } = eventData
  // console.log('TicketList', eventData)

  const [showDetails, setShowDetails] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  const toggleShowMore = () => {
    if (showDetails && ref.current) {
      ref.current.scrollTo(0, 0)
    }
    setShowDetails(!showDetails)
  }
  const isShowMoreActive = tickets.length > MIN_TICKET
  const SeeMoreButton = isShowMoreActive ? (
    <SeeMore
      text={showDetails ? 'Show Less' : 'Show More'}
      dir={showDetails ? 'up' : 'down'}
      onClick={toggleShowMore}
      className={
        showDetails
          ? 'text-globalTextSizeSm gap-1 text-success-default'
          : 'pt-2 text-globalTextSizeSm gap-1 text-success-default'
      }
    />
  ) : undefined

  const showProcceedButton = tickets.some((ticket) => ticket.availableQuantity > 0 && ticket.availability)

  return (
    <div className="relative">
      <div>
        {tickets.length > 0 && (
          <>
            <div
              className={`divide-y space-y-3 transition-all ease-in-out h-full scrollbar-hide 
               ${
                 showDetails
                   ? 'duration-500 border-b border-jg-metal-50 pb-4'
                   : 'border-none duration-500 transition-all ease-in-out'
               }
              `}
            >
              {tickets.slice(0, isShowMoreActive && !showDetails ? MIN_TICKET : tickets.length).map((ticket, index) => {
                return (
                  <div className="pr-0.5" key={ticket?.docId}>
                    <TicketItem isBooked={isBooked} key={index} eventData={eventData} index={index} />
                  </div>
                )
              })}
            </div>

            {showProcceedButton && (
              <div className={`flex flex-row justify-between ${showDetails ? ' mt-4 ' : 'pt-4'}`}>
                <div className="w-1/2">{SeeMoreButton}</div>
                <div className="justify-end w-1/2">
                  <TicketCheckoutBar isBooked={isBooked} />
                </div>
              </div>
            )}
          </>
        )}
        {tickets.length === 0 && (
          <span className="text-globalTextSizeSm text-jg-blue-500 font-normal">
            There are no tickets available for you to purchase at this time.
          </span>
        )}
      </div>
      {/*START: For disabling tickets section with overlay and loding spinner */}
      {asyncStatus === 'pending' && <ContentBlocker />}

      {/* END: For disabling tickets section with overlay and loding spinner */}
    </div>
  )
}
export default TicketList
