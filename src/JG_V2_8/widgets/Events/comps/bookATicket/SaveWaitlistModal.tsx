import WithModal from '../WithModal'
import { useParams } from 'react-router-dom'
import { useSessionUserContext } from '@jg/providers/SessionUserProvider'
import { useEffect } from 'react'
import { MemberType } from '@jg/common/types'
import { BookATicketItem } from '../../Types/EventBookingTypes'
import { useEventTicketListStoreContext } from '../../providers/EventTicketListStoreProvider'
import BookATicketStoreProvider, { useBookATicketStoreContext } from '../../providers/BookATicketProvider'
import BookATicketTitlebar from './BookATicketTitleBar'
import BookATicketGroupBookingBody from './BookATicketGroupBookingBody'
import SaveWaitlistBottombar from './SaveWaitlistBottombar'
import useEventStore from '../../store/useEventStore'
import { SaveWaitlist } from '@jg/common/dataAPIs/eventsAnsSchedules'
import { CompBaseProps } from '@comps/uiComps'
const SaveWaitlistModalInner = ({ children }: CompBaseProps) => {
  const { ticketIndex } = useParams()
  const eventData = useEventStore((state) => state.eventDetails)
  const { bookingProgressStatus, setBookingProgressStatus } = useEventTicketListStoreContext((state) => ({
    bookingProgressStatus: state.bookingProgressStatus,
    setBookingProgressStatus: state.setBookingProgressStatus,
    asyncStatus: state.asyncStatus,
    setAsyncStatus: state.setAsyncStatus,
    // bookingSummaryItems: state.bookingSummaryItems,
  }))

  const { getWaitlistItems } = useBookATicketStoreContext((state) => ({
    getWaitlistItems: state.getWaitlistItems,
    waitlistItems: state.waitlistItems,
  }))
  const ticketInfo = eventData.tickets[Number(ticketIndex || '0')]
  useEffect(() => {
    if (bookingProgressStatus === 'saveWaitlistInitiated') {
      const entityIds: number[] = []
      getWaitlistItems().forEach((item) => {
        item.bookingFor.forEach((bf) => {
          entityIds.push(bf.member.DocId)
        })
      })
      // console.log('saveWaitlist', entityIds)
      //setAsyncStatus('pending')
      SaveWaitlist({
        ticketDocId: ticketInfo.docId,
        entityIds: entityIds,
        source: 'Waitlist',
      }).then(() => {
        setBookingProgressStatus('saveWaitlistCompleted')
      })
    }
  }, [bookingProgressStatus])

  return <>{children}</>
}
const SaveWaitlistModal = () => {
  const { ticketIndex } = useParams()
  const eventData = useEventStore((state) => state.eventDetails)
  const { asyncStatus, setAsyncStatus } = useEventTicketListStoreContext((state) => ({
    asyncStatus: state.asyncStatus,
    setAsyncStatus: state.setAsyncStatus,
    // bookingSummaryItems: state.bookingSummaryItems,
  }))

  const ticketInfo = eventData.tickets[Number(ticketIndex || '0')]
  const { familyInfo, loadFamilyInfo, administrativeClubs, loadAdministrativeClubs } = useSessionUserContext()

  useEffect(() => {
    loadFamilyInfo()
    loadAdministrativeClubs()
  }, [])

  useEffect(() => {
    if (familyInfo != null && administrativeClubs != null) {
      setAsyncStatus('success')
    }
  }, [familyInfo, administrativeClubs])

  if (asyncStatus === 'success') {
    return (
      <BookATicketStoreProvider
        clubs={administrativeClubs || []}
        familyMembers={familyInfo?.Members as MemberType[]}
        ticketInfo={ticketInfo}
        isGroupBooking={true}
        bookingItems={[]}
      >
        <WithModal mode={'group'} tbar={<BookATicketTitlebar />} bbar={<SaveWaitlistBottombar />}>
          <SaveWaitlistModalInner>
            <BookATicketGroupBookingBody isWaitlist={true} />
          </SaveWaitlistModalInner>
        </WithModal>
      </BookATicketStoreProvider>
    )
  } else return <></>
}
export default SaveWaitlistModal
