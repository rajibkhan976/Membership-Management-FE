import WithModal from '../WithModal'
import { useParams } from 'react-router-dom'

import BookATicketBottombar from './BookATicketBottombar'
import BookATicketTitlebar from './BookATicketTitleBar'
import BookATicketStoreProvider from '../../providers/BookATicketProvider'

import BookATicketGroupBookingBody from './BookATicketGroupBookingBody'
import BookATicketSingleBookingBody from './BookATicketSingleBookingBody'
import { useSessionUserContext } from '@jg/providers/SessionUserProvider'
import { useEffect } from 'react'
import { MemberType } from '@jg/common/types'
import { BookATicketItem } from '../../Types/EventBookingTypes'
import { useEventTicketListStoreContext } from '../../providers/EventTicketListStoreProvider'
import useEventStore from '../../store/useEventStore'
import EntityExtSchemaProvider from '@jg/common/entityExtForms/providers/EntityExtensionSchemaProvider'
//import EntityExtFormAnswersProvider from '@jg/common/entityExtForms/providers/EntityExtFormAnswersProvider'
import EntityExtGenericDataCaptureProvider from '@jg/common/entityExtForms/providers/EntityExtGenericDataCaptureProvider'
import RegisterBookingInfoProvider from '../../providers/RegisterBookingInfoProvider'

const BookATicketModal = () => {
  const { ticketIndex } = useParams()
  const eventData = useEventStore((state) => state.eventDetails)
  const { asyncStatus, setAsyncStatus, bookingSummaryItems, dataCaptureValue } = useEventTicketListStoreContext(
    (state) => ({
      //eventData: state.eventData,
      asyncStatus: state.asyncStatus,
      setAsyncStatus: state.setAsyncStatus,
      bookingSummaryItems: state.bookingSummaryItems,
      dataCaptureValue: state.dataCaptureValue,
    })
  )

  const ticketInfo = eventData.tickets[Number(ticketIndex || '0')]
  const { familyInfo, loadFamilyInfo, administrativeClubs, loadAdministrativeClubs } = useSessionUserContext()

  useEffect(() => {
    loadFamilyInfo()
    loadAdministrativeClubs()
  }, [])
  const getBookingItems = () => {
    const bookingItems: BookATicketItem[] = []
    const bookingSummaryItemsByTicket = bookingSummaryItems.filter((e) => {
      return e.ticketDocId === ticketInfo.docId
    })
    if (bookingSummaryItemsByTicket.length) {
      bookingSummaryItemsByTicket.forEach((e) => {
        bookingItems.push({ bookingFor: e.bookingFor, group: e.group })
      })
    }
    //console.log('bookingItems', bookingItems)
    return bookingItems
  }
  //console.log('bookingSummaryItems', bookingSummaryItems)
  useEffect(() => {
    if (familyInfo != null && administrativeClubs != null) {
      setAsyncStatus('success')
    }
  }, [familyInfo, administrativeClubs])
  // console.log('BookATicketModal')
  if (asyncStatus === 'success') {
    const isGroupBooking = (administrativeClubs || []).length > 0 || (familyInfo?.Members as MemberType[]).length > 0
    // console.log('dataCaptureValue', dataCaptureValue[ticketInfo.docId])
    console.log('BookATicketModal')
    return (
      <EntityExtSchemaProvider clubEntityExtOwnerId={null} extensionArea="Event">
        <EntityExtGenericDataCaptureProvider
          ownerId={eventData.ownerEntity?.id === -1 ? 0 : eventData.ownerEntity?.id || 0}
          ownerType={eventData.ownerEntity?.type || 'Ngb'}
          value={dataCaptureValue[ticketInfo.docId]}
          onChange={(key, value) => {
            //console.log(key, value)
          }}
        >
          <BookATicketStoreProvider
            clubs={administrativeClubs || []}
            familyMembers={familyInfo?.Members as MemberType[]}
            ticketInfo={ticketInfo}
            isGroupBooking={isGroupBooking}
            bookingItems={getBookingItems()}
          >
            <WithModal
              mode={isGroupBooking ? 'group' : 'single'}
              tbar={<BookATicketTitlebar />}
              bbar={<BookATicketBottombar />}
            >
              <RegisterBookingInfoProvider>
                {isGroupBooking && <BookATicketGroupBookingBody />}
                {!isGroupBooking && <BookATicketSingleBookingBody />}
              </RegisterBookingInfoProvider>
            </WithModal>
          </BookATicketStoreProvider>
        </EntityExtGenericDataCaptureProvider>
      </EntityExtSchemaProvider>
    )
  } else return <></>
}
export default BookATicketModal
