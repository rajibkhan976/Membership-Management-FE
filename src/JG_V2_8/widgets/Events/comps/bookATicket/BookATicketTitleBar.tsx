import { Currency } from '@jg/utils'
import { useBookATicketStoreContext } from '../../providers/BookATicketProvider'
import LeftAngleIcon from '@comps/uiComps/Icons/SVG/LeftAngleIcon'
import { Close } from '@comps/uiComps/Icons'
import { useEventTicketListStoreContext } from '../../providers/EventTicketListStoreProvider'

const BookATicketTitlebar = () => {
  const { ticketInfo, isBookingFormScreen, setBookingformScreen } = useBookATicketStoreContext((state) => ({
    ticketInfo: state.ticketInfo,
    isBookingFormScreen: state.isBookingFormScreen,
    setBookingformScreen: state.setBookingformScreen,
  }))

  const { setBookingProgressStatus } = useEventTicketListStoreContext((state) => ({
    setBookingProgressStatus: state.setBookingProgressStatus,
  }))

  const currencySymbol = Currency.getSymbol(ticketInfo.priceSettings?.Currency || '')

  if (isBookingFormScreen) {
    return (
      <div onClick={() => setBookingformScreen?.(false)} className="px-4 py-3 items-center cursor-pointer">
        <LeftAngleIcon className="w-6 h-6 rotate-180" />
      </div>
    )
  }
  return (
    <div className="px-4 py-3 flex justify-between items-center bg-jg-grey-100 w-full h-full">
      <div className="space-y-1 flex flex-col max-w-[70%] xs:max-w-[85%] sm:max-w-[90%]">
        <div className="text-globalTextSizeLg text-jg-metal-900 font-semibold md:max-w-[500px]">
          <span className="jg-hidden md:block truncate">{ticketInfo.name}</span>
          {/* Smaller Screen */}
          <span className="md:jg-hidden ">Add Ticket</span>
        </div>
        {ticketInfo.description && (
          <div className="jg-hidden md:block text-globalTextSizeSm text-jg-metal-500 font-normal max-w-[500px] truncate">
            {ticketInfo.description}
          </div>
        )}
      </div>
      <div className="text-jg-green-500 text-globalTextSizeMd font-semibold ml-3 text-right">
        <span className="jg-hidden md:inline">{`${ticketInfo.displayPrice && currencySymbol} ${
          ticketInfo.displayPrice
        }`}</span>
        <span onClick={() => setBookingProgressStatus('canceled')}>
          <Close className="block md:jg-hidden text-jg-metal-500" />
        </span>
      </div>
    </div>
  )
}

export default BookATicketTitlebar
