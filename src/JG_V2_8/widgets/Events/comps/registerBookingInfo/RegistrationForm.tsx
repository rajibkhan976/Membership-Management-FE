import EventBookingDataCaptureForm from '@jg/common/entityExtForms/dataCaptureForms/eventBooking/EventBookingDataCaptureForm'
import { useBookATicketStoreContext } from '../../providers/BookATicketProvider'
import RegistrationFormToolbar from './RegistrationFormToolbar'
import { MemberType } from '@jg/common/types'
import MemberAvatar from '../bookATicket/MemberAvatar'
import { useEffect } from 'react'
import { useEntityExtGenericDataCaptureContext } from '@jg/common/entityExtForms/providers/EntityExtGenericDataCaptureProvider'
import { FadeIn } from '@comps/uiComps'

const RegistrationForm = ({
  index,
  mode = 'single',
  member,
  hideCopyAction,

  onAction,
}: {
  index: number
  member: MemberType
  mode: 'single' | 'group'
  hideCopyAction: boolean

  onAction: (action: 'copy' | 'clear') => void
}) => {
  const { ticketInfo } = useBookATicketStoreContext((state) => ({ ticketInfo: state.ticketInfo }))

  return (
    <FadeIn>
      <RegistrationFormToolbar
        onAction={onAction}
        index={index}
        hideCopyAction={hideCopyAction}
        member={member}
        titleComponent={
          mode === 'single' ? (
            <div className="py-1"> Booking Info-{`${index + 1}`}</div>
          ) : (
            <div className="pl-5">
              <MemberAvatar member={member} />
            </div>
          )
        }
      />
      <div className="my-3 mx-5 ">
        <EventBookingDataCaptureForm
          index={index}
          entityId={member.DocId}
          formTitle={ticketInfo.name || 'No title here'}
          fieldItems={ticketInfo.dataCaptureItems || []}
        />
      </div>
    </FadeIn>
  )
}
export default RegistrationForm
