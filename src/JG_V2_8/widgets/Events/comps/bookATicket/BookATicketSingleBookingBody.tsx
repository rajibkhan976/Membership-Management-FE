import { useCallback } from 'react'
import BookingEntity from './BookingEntity'
import { useBookATicketStoreContext } from '../../providers/BookATicketProvider'
import { EventBookingGroup } from '../../Types/EventBookingTypes'
import { MemberType } from '@jg/common/types'
import { useSessionUserContext } from '@jg/providers/SessionUserProvider'
import EventBookingDataCaptureForm from '@jg/common/entityExtForms/dataCaptureForms/eventBooking/EventBookingDataCaptureForm'
import RegisterBookingInfo from '../registerBookingInfo/RegisterBookingInfo'
import RegisterBookingInfoProvider from '../../providers/RegisterBookingInfoProvider'
import useWindowSize from '@jg/hooks/useWindowSize'
import SingleBookingFromEntityInfoWrapper from './SingleBookingFromEntityInfoWrapper'

const BookATicketSingleBookingBody = () => {
  const { userInfo } = useSessionUserContext()
  const { height } = { height: window.innerHeight } //useWindowSize()
  //console.log('userInfo', userInfo)
  const member: MemberType = {
    DocId: userInfo?.MemberDocId || -1,
    ProfilePicURL: userInfo?.ProfilePicURL,
    MID: userInfo?.MID || '',
    Gender: userInfo?.Gender || '',
    Town: userInfo?.Town,
    EmailAddress: userInfo?.EmailAddress,
    Country: userInfo?.Country || '',
    FirstName: userInfo?.FirstName,
    LastName: userInfo?.LastName,
    UserId: userInfo?.UserId,
  }
  const { ticketInfo } = useBookATicketStoreContext((state) => ({ ticketInfo: state.ticketInfo }))
  //console.log('dataCaptureItems', ticketInfo.dataCaptureItems)
  const h = (height || 500) - 125
  return (
    <div style={{ height: h }} className=" overflow-y-auto my-2">
      <SingleBookingFromEntityInfoWrapper member={member} ticketInfo={ticketInfo} />
    </div>
  )
}
export default BookATicketSingleBookingBody
