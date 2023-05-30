import { Currency } from '@jg/utils'
import { useBookATicketStoreContext } from '../../providers/BookATicketProvider'

const AttendeeConsentModalTitlebar = () => {
  return (
    <div className="px-4 py-3 flex justify-between items-center bg-jg-grey-100 w-full">
      <div className="space-y-1 flex flex-col max-w-[70%] xs:max-w-[85%] sm:max-w-[90%]">
        <div className="text-globalTextSizeMd text-jg-metal-900 font-medium py-3">Event Registration</div>
      </div>
    </div>
  )
}

export default AttendeeConsentModalTitlebar
