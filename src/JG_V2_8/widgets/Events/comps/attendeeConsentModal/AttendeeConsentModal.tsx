import Drawer from '@jg/common/comps/drawer/Drawer'
import AttendeeConsentList from './AttendeeConsentList'
import { useEventTicketListStoreContext } from '../../providers/EventTicketListStoreProvider'
import { useEffect } from 'react'
import AttendeeConsentModalTitlebar from './AttendeeConsentModalTitleBar'
import AttendeeConsentModalBottombar from './AttendeeConsentModalBottombar'
import { useRouter } from '@jg/hooks'
import useEventStore from '../../store/useEventStore'
import { useWidgetContext } from 'jg-widget'
import { useParams } from 'react-router-dom'
import AttendeeConsentBody from './AttendeeConsentBody'

const AttendeeConsentModal = ({ isBooking: isBooked }: { isBooking: boolean }) => {
  const { basePath } = useWidgetContext()
  const { showAttendeeConsentModal, setShowAttendeeConsentModal } = useEventTicketListStoreContext((state) => ({
    showAttendeeConsentModal: state.showAttendeeConsentModal,
    setShowAttendeeConsentModal: state.setShowAttendeeConsentModal,
  }))
  const detailsPath = isBooked ? 'booking-details' : 'details'
  const { navigate } = useRouter()
  const params = useParams()
  useEffect(() => {
    if (!showAttendeeConsentModal) {
      navigate(`${basePath}${detailsPath}/${params['docId']}/`, { replace: true })
    }
  }, [showAttendeeConsentModal])
  return (
    <Drawer
      size="md"
      isOpen={showAttendeeConsentModal}
      drawerAction={<AttendeeConsentModalBottombar />}
      title={<AttendeeConsentModalTitlebar />}
      drawerContent={<AttendeeConsentBody />}
      showFrom="Right"
      openDrawer={function (): void {
        // throw new Error('Function not implemented.')
      }}
      closeDrawer={function (): void {
        //  setOpen(false)
        setShowAttendeeConsentModal(false)
      }}
    />
  )
}
export default AttendeeConsentModal
