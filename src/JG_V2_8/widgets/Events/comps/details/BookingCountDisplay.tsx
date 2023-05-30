import { StackedAvatars } from '@comps/uiComps'
import { useEventTicketListStoreContext } from '../../providers/EventTicketListStoreProvider'
import Avatars from '@comps/uiComps/Avatars'
import AppStore from '@jg/store/store'

const BookingCountDisplay = ({ ticketCount, ticketDocId }: { ticketCount: number; ticketDocId: number }) => {
  const BaseAppPath = AppStore((state) => state.BaseAppPath)
  const { bookingSummaryItems, getAllBookingForByTicket } = useEventTicketListStoreContext((state) => ({
    bookingSummaryItems: state.bookingSummaryItems,
    getAllBookingForByTicket: state.getAllBookingForByTicket,
  }))
  const bookingSummaryByTicket = getAllBookingForByTicket(ticketDocId)
  if (bookingSummaryByTicket.length > 0)
    return (
      <div className="flex gap-x-2 items-center justify-start md:justify-end">
        <StackedAvatars size="xs" negativeSpace={2} numOfAvatar={5}>
          {bookingSummaryByTicket?.map((item, index) =>
            item.member.Image || item.member.ProfilePicURL ? (
              <Avatars
                key={index}
                src={`${BaseAppPath}store/download?f=${
                  item.member.Image
                    ? item.member.Image
                    : item.member.ProfilePicURL
                    ? item.member.ProfilePicURL
                    : <></> || ''
                }&t=user&p=${item.member.UserId || ''}`}
                size={'xs'}
                bordered={false}
              />
            ) : (
              <Avatars shape="circular" size="md" />
            )
          )}
        </StackedAvatars>
        {bookingSummaryByTicket.length > 5 ? (
          <div className="bg-jg-grey-50 border-jg-metal-100 text-jg-metal-500 border rounded-[100px] px-2 py-1 text-globalTextSizeSm font-medium">
            {bookingSummaryByTicket.length - 5}+ More
          </div>
        ) : (
          <></>
        )}
        {ticketCount > 1 ? (
          <div className="text-globalTextSizeSm font-medium text-jg-metal-900">{ticketCount} Tickets Selected</div>
        ) : ticketCount === 1 ? (
          <div className="text-globalTextSizeSm font-medium text-jg-metal-900">{ticketCount} Ticket Selected</div>
        ) : (
          <></>
        )}
      </div>
    )
  else return <></>
}
export default BookingCountDisplay
