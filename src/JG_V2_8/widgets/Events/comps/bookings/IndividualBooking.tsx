import { Button } from '@comps/uiComps'
import { useNavigate } from 'react-router-dom'
import { BookingSteps } from './BookingSteps'
import BookingModal from '../WithModal'
const BookingStepItems = [
  { text: 'Clubs and Member', name: 'club' },
  { text: 'Registration', name: 'reg' },
  { text: 'Overview', name: 'overview' },
  { text: 'Checkout', name: 'checkout' },
]
const IndividualBooking = ({ onClose }: { onClose?: () => void }) => {
  return (
    <BookingModal
      tbar={<BookingSteps showProgressTo="checkout" items={BookingStepItems} />}
      bbar={<Button text="Next" />}
    >
      <div className="p-4">this the modal body</div>
    </BookingModal>
  )
}
export default IndividualBooking
