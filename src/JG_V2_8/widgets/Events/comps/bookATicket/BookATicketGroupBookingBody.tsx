import { useBookATicketStoreContext } from '../../providers/BookATicketProvider'
import classNames from 'classnames'
import GroupRegistrationPanel from '../registerBookingInfo/GroupRegistration'
import GroupBookingEntityListClubMembers from './GroupBookingEntityListClubMembers'
import GroupBookingEntityListFamilyMembers from './GroupBookingEntityListFamilyMembers'
import { Currency } from '@jg/utils'
import ToggleButton from '@jg/common/comps/filter/ToggleButton'

const BookATicketGroupBookingBody = ({ isWaitlist = false }: { isWaitlist?: boolean }) => {
  const { ticketInfo, isBookingFormScreen } = useBookATicketStoreContext((state) => ({
    ticketInfo: state.ticketInfo,
    isBookingFormScreen: state.isBookingFormScreen,
  }))

  const hasRegistrationForm = ticketInfo.dataCaptureItems && ticketInfo.dataCaptureItems.length > 0
  const handleCollapsed = (elPanel: HTMLDivElement | null, elBtn: HTMLButtonElement | null) => {
    if (elPanel?.classList.contains('hidden')) {
      elPanel?.classList.remove('hidden')
      elBtn?.children[0].classList.add('rotate-180')
    } else {
      elBtn?.children[0].classList.remove('rotate-180')
      elPanel?.classList.add('hidden')
    }
  }
  return (
    <div className="w-full flex flex-row h-full overflow-hidden divide-x">
      <div className={classNames('bg-white overflow-y-scroll', hasRegistrationForm ? 'w-full md:w-[50%] ' : 'w-full')}>
        <MobileViewTicketInfo /> {/* Only For Mobile or smaller screen */}
        <GroupBookingEntityListFamilyMembers isWaitlist={isWaitlist} onCollapseAction={handleCollapsed} />
        <GroupBookingEntityListClubMembers isWaitlist={isWaitlist} onCollapseAction={handleCollapsed} />
      </div>
      {hasRegistrationForm && (
        <div
          className={`bg-white overflow-y-scroll absolute w-full md:w-[50%] transition-all ease-in ${
            isBookingFormScreen ? 'translate-x-0 h-full' : 'translate-x-full h-0 md:h-full'
          }`}
        >
          <GroupRegistrationPanel mode="group" />
        </div>
      )}
    </div>
  )
}
export default BookATicketGroupBookingBody
/*
const bookingSort = (items: any[], fieldName: string) => {
  //@ts-ignore
  // if (!items[fieldName]) {
  //   return items
  // }
  return [...items].sort((a, b) => {
    if (typeof a === 'number' && typeof b === 'number') {
      return a - b
    }

    const item1 = a[fieldName].toUpperCase() // ignore upper and lowercase
    const item2 = b[fieldName].toUpperCase() // ignore upper and lowercase

    if (item1 < item2) {
      return -1
    }
    if (item1 > item2) {
      return 1
    }

    // names must be equal
    return 0
  })
}
*/

const MobileViewTicketInfo = () => {
  const { ticketInfo, setHideBookingEntityWhenQtyIsZero, hideBookingEntityWhenQtyIsZero } = useBookATicketStoreContext(
    (state) => ({
      ticketInfo: state.ticketInfo,
      setHideBookingEntityWhenQtyIsZero: state.setHideBookingEntityWhenQtyIsZero,
      hideBookingEntityWhenQtyIsZero: state.hideBookingEntityWhenQtyIsZero,
    })
  )

  const currencySymbol = Currency.getSymbol(ticketInfo.priceSettings?.Currency || '')

  return (
    <div className="p-4 w-full md:jg-hidden">
      <div className="text-sm font-medium leading-4 text-jg-metal-900 mb-1">{ticketInfo.name}</div>

      <div className="text-[13px] leading-4 text-jg-metal-500">{ticketInfo.description}</div>

      <div className="flex justify-between items-center mt-3">
        {ticketInfo.displayPrice && (
          <div className="text-sm font-medium leading-4 text-jg-green-500">{`${currencySymbol} ${ticketInfo.displayPrice}`}</div>
        )}
        <div className="max-w-[250px] flex justify-end items-center">
          <span className="text-globalTextSizeSm font-medium text-jg-metal-500 mr-4">Show Selected Member</span>
          <ToggleButton
            enabled={hideBookingEntityWhenQtyIsZero}
            handleChange={() => {
              setHideBookingEntityWhenQtyIsZero(!hideBookingEntityWhenQtyIsZero)
            }}
          />
        </div>
      </div>
    </div>
  )
}
