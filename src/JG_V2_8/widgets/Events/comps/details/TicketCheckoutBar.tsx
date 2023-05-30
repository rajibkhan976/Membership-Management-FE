import { Button } from '@comps/uiComps'
import { useEventTicketListRootContext } from '../../providers/EventTicketListRootProvider'
import { useMessageBoxContext } from '@jg/providers/MessageBoxProvider'
import { useEventTicketListStoreContext } from '../../providers/EventTicketListStoreProvider'
import { useEffect } from 'react'
import useEventStore from '../../store/useEventStore'
import { useRouter } from '@jg/hooks'
import { useWidgetContext } from 'jg-widget'
import { useEventConfig } from '../../EventWidget'
import { useSgininContext } from '@jg/providers/Signin/SigninProvider'

const TicketCheckoutBar = ({ isBooked }: { isBooked: boolean }) => {
  const detailsPath = isBooked ? 'booking-details' : 'details'
  const { basePath } = useWidgetContext()
  const { checkout } = useEventTicketListRootContext()
  const { show: ShowMesseageBox } = useMessageBoxContext((state) => ({ show: state.show }))
  const eventData = useEventStore((state) => state.eventDetails)
  const { navigate } = useRouter()

  const { isPublic } = useEventConfig()
  const { showSigninOrSginupModal } = useSgininContext()
  const { esc } = useRouter()

  const {
    setAsyncStatus,
    bookingProgressStatus,
    bookingSummaryItems,
    setBookingProgressStatus,
    validateStock,
    getInvalidMessage,
    setShowAttendeeConsentModal,
  } = useEventTicketListStoreContext((state) => ({
    bookingProgressStatus: state.bookingProgressStatus,
    setAsyncStatus: state.setAsyncStatus,
    bookingSummaryItems: state.bookingSummaryItems,
    setBookingProgressStatus: state.setBookingProgressStatus,
    clearSummaryItems: state.clearSummaryItems,
    validateStock: state.validateStock,
    getInvalidMessage: state.getInvalidMessage,
    setShowAttendeeConsentModal: state.setShowAttendeeConsentModal,
  }))
  const { tickets, eventDocIdHash } = eventData
  useEffect(() => {
    switch (bookingProgressStatus) {
      case 'validateAndCheckout':
        if (bookingSummaryItems.length) {
          //  console.log('validateAndCheckout')
          const message = getInvalidMessage()
          if (message.length === 0) {
            setAsyncStatus('pending')
            validateStock({
              callback: (res) => {
                setAsyncStatus('success')
                if (res.success) {
                  if (eventData.isPublishAttendee) {
                    setBookingProgressStatus('init')
                    setShowAttendeeConsentModal(true)
                    // setBookingProgressStatus('checkout')
                    if (eventData.eventDocIdHash) {
                      navigate(`${basePath}${detailsPath}/${eventData.eventDocIdHash}/attendee-consent/`)
                    }
                  } else setBookingProgressStatus('checkout')
                } else {
                  setBookingProgressStatus('init')
                  const ticket = tickets.find((e) => e.docId === res.ticketDocId) //alert('Quantity must be more than 0ddddd!' + res.ticketDocId)
                  const mesg = `${ticket?.name}  only has  ${res.stockQty}  spaces(s) left but you have selected  ${res.selectedQty} ticket(s). Please remove the excess quantities and try again.`
                  ShowMesseageBox({ title: 'Alert', message: mesg })
                }
              },
            })
          } else {
            setBookingProgressStatus('init')
            ShowMesseageBox({ title: 'Alert', message: message[0] })
          }
        } else {
          setBookingProgressStatus('init')
          // alert('Quantity must be more than 0!')
          ShowMesseageBox({ title: 'Alert', message: 'Quantity must be more than 0!' })
        }
        break
      case 'checkout':
        checkout()
        setBookingProgressStatus('init')
        break
    }
  }, [bookingProgressStatus])

  return (
    <div className="overflow-hidden">
      {isPublic ? (
        <Button
          className="float-right"
          onClick={() => {
            showSigninOrSginupModal(() => {
              esc(`Workbench/i/r/EventsAndBookings/${detailsPath}/${eventDocIdHash}`)
            })
          }}
          text="Proceed to Checkout"
        />
      ) : (
        <Button
          className="float-right"
          onClick={() => {
            setBookingProgressStatus('validateAndCheckout')
          }}
          text="Proceed to Checkout"
        />
      )}
    </div>
  )
}
export default TicketCheckoutBar
