import { Button } from '@comps/uiComps'
import { useBookATicketStoreContext } from '../../providers/BookATicketProvider'
import { useEventTicketListStoreContext } from '../../providers/EventTicketListStoreProvider'

const AttendeeConsentModalBottombar = () => {
  const { setBookingProgressStatus, setShowAttendeeConsentModal } = useEventTicketListStoreContext((state) => ({
    setBookingProgressStatus: state.setBookingProgressStatus,
    setShowAttendeeConsentModal: state.setShowAttendeeConsentModal,
  }))
  //const { dirty } = useBookATicketStoreContext((state) => ({ dirty: state.dirty }))
  return (
    <div className="flex justify-between w-full ">
      <Button
        btnColor="secondary"
        fillType="outline"
        text="Cancel"
        onClick={() => {
          setShowAttendeeConsentModal(false)
        }}
      />
      <Button
        btnColor="primary"
        fillType="outline"
        text="Proceed to checkout"
        onClick={() => {
          setBookingProgressStatus('checkout')
          setShowAttendeeConsentModal(false)
        }}
      />
    </div>
  )
}

export default AttendeeConsentModalBottombar
