import { MemberType } from '@jg/common/types'
import { useEventTicketListStoreContext } from '../../providers/EventTicketListStoreProvider'
import MemberAvatar from '../bookATicket/MemberAvatar'
import { Checkbox } from '@comps/uiComps/forms'
import AttendeeConsentCheckbox from './AttendeeConsentCheckbox'

const AttendeeConsentList = () => {
  const { bookingSummaryItems } = useEventTicketListStoreContext((state) => ({
    bookingSummaryItems: state.bookingSummaryItems,
  }))
  const members: MemberType[] = []
  bookingSummaryItems.forEach((item) => {
    item.bookingFor.forEach((bookFor) => {
      if (members.findIndex((e) => e.DocId === bookFor.member.DocId) === -1) members.push(bookFor.member)
    })
  })
  console.log('AttendeeConsentList', members)
  return (
    <>
      {members.map((item, i) => {
        return (
          <div key={i} className={`relative  py-2 px-4 border-b border-jg-metal-50`}>
            {/* <div className="flex flex-row items-center w-full justify-between inline-grid grid-cols-3 gap-4"> */}
            <div className="w-full inline-grid grid-cols-3 gap-4">
              <div className="max-w-[216px]">
                <MemberAvatar member={item} />
              </div>
              <div className="flex ml-4 flex-grow  space-y-1">
                <div className="">
                  <div className="text-inputSizeSm text-jg-green-300 break-all">{item.EmailAddress}</div>
                  <div className="text-jg-metal-500 text-globalTextSizeSm capitalize break-all">
                    {item.Town ? item.Town : <></>}
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center max-w-[156px] gap-3 ml-auto">
                <span className="text-globalTextSizeSm text-jg-metal-500">Publish</span>{' '}
                <AttendeeConsentCheckbox entityId={item.DocId} />
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}
export default AttendeeConsentList
