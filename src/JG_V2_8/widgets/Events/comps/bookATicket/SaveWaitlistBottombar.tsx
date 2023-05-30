import { Button } from '@comps/uiComps'

import { useBookATicketStoreContext } from '../../providers/BookATicketProvider'
import { useEventTicketListStoreContext } from '../../providers/EventTicketListStoreProvider'

const SaveWaitlistBottombar = () => {
  const { setBookingProgressStatus } = useEventTicketListStoreContext((state) => ({
    setBookingProgressStatus: state.setBookingProgressStatus,
  }))
  const { dirty, waitlistItems } = useBookATicketStoreContext((state) => ({
    dirty: state.dirty,
    waitlistItems: state.waitlistItems,
  }))
  // console.log('getWaitlistItems', waitlistItems)
  return (
    <div className="flex justify-end w-full gap-3">
      <Button
        btnColor="secondary"
        fillType="outline"
        text="Cancel"
        onClick={() => {
          setBookingProgressStatus('canceled')
        }}
      />

      <Button
        disabled={!dirty}
        btnColor="primary"
        fillType="solid"
        text="Add to Waitlist"
        onClick={() => {
          setBookingProgressStatus('saveWaitlistInitiated')
        }}
      />
    </div>
  )
}

export default SaveWaitlistBottombar
