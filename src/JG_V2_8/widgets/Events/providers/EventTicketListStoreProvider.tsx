import { StoreApi, useStore } from 'zustand'
import { EventTicketListStorage, getEventTicketListStore } from './EventTicketListStore'
import { Suspense, createContext, useContext, useRef } from 'react'
import { AsyncStatus, EventInfo } from '@jg/common/types'
import {
  BookATicketItem,
  BookingProgressStatus,
  EventBookingForType,
  EventBookingItem,
} from '../Types/EventBookingTypes'
import { CompBaseProps } from '@comps/uiComps'
import shallow from 'zustand/shallow'
import _ from 'lodash'
import { Outlet } from 'react-router-dom'
import EventTicketListRootProvider from './EventTicketListRootProvider'
import ContentBlocker from '../comps/ContentBlocker'
import { ValidationSummaryByEntity } from '@jg/common/entityExtForms/types'

const defaultEvent = { docId: -1, tickets: [], category: '' }
interface IEvenTicketListStore {
  store: StoreApi<EventTicketListStorage>
}
const EventTicketListStoreContext = createContext<IEvenTicketListStore>({
  store: getEventTicketListStore(),
})

export const useEventTicketListStoreContext = (
  selector: (state: EventTicketListStorage) => Partial<EventTicketListStorage>
): EventTicketListStorage => {
  const { store } = useContext(EventTicketListStoreContext)
  const deafultStore: EventTicketListStorage = {
    // eventData: defaultEvent,
    bookingProgressStatus: 'init',
    asyncStatus: 'idle',
    setAsyncStatus: function (status: AsyncStatus): void {
      throw new Error('Function not implemented.')
    },
    setBookingProgressStatus: function (bookingProgressStatus: BookingProgressStatus): void {
      throw new Error('Function not implemented.')
    },
    bookingSummaryItems: [],
    updateBookingSummaryByTicket: function (bookingItems: BookATicketItem[], ticketDocId: number): void {
      throw new Error('Function not implemented.')
    },
    getAllBookingForByTicket: function (ticketDocId: number): EventBookingForType[] {
      throw new Error('Function not implemented.')
    },
    clearSummaryItems: function (): void {
      throw new Error('Function not implemented.')
    },
    getBookingSummaryItems: function (): EventBookingItem[] {
      throw new Error('Function not implemented.')
    },
    validateStock: function (args: {
      leftOvers?: { ticketDocId: number; qty: number }[] | undefined
      callback: (res: { success: boolean; stockQty: number; ticketDocId: number }) => void
    }): void {
      throw new Error('Function not implemented.')
    },
    dataCaptureValue: {},
    updateDataCaptureValue: function (value: any, ticketDocId: number): void {
      throw new Error('Function not implemented.')
    },
    getDataCaptureValue: function (): Record<number, Record<string, any>> {
      throw new Error('Function not implemented.')
    },
    invalidSummary: [],
    updateInvalidSummary: function (ticketDocId: number, summary: ValidationSummaryByEntity[]): void {
      throw new Error('Function not implemented.')
    },
    getInvalidMessage: function (): string[] {
      throw new Error('Function not implemented.')
    },
    showAttendeeConsentModal: false,
    setShowAttendeeConsentModal: function (showAttendeeConsentModal: boolean): void {
      throw new Error('Function not implemented.')
    },
    attendeeConsents: [],
    updateAttendeeConsents: function (entityId: number, checked: boolean): void {
      throw new Error('Function not implemented.')
    },
    getAttendeeConsents: function (): { entityId: number; checked: boolean }[] {
      throw new Error('Function not implemented.')
    },
  }
  return _.merge(
    deafultStore,
    useStore(
      store,
      (state) => {
        return selector(state)
      },
      shallow
    )
  )
}

type EventTicketListStoreProviderProps = CompBaseProps & {
  eventData?: EventInfo
}

const EventTicketListProvider = ({ eventData = defaultEvent, children }: EventTicketListStoreProviderProps) => {
  // console.log('EventTicketListProvider', eventData)
  const currentStore = useRef<StoreApi<EventTicketListStorage>>(getEventTicketListStore())
  // console.log('EventTicketListProvider', currentStore.current.getState().eventData, eventData)
  return (
    <EventTicketListStoreContext.Provider value={{ store: currentStore.current }}>
      <EventTicketListRootProvider>
        {children}
        <Suspense fallback={<ContentBlocker />}>
          <Outlet />
        </Suspense>
      </EventTicketListRootProvider>
    </EventTicketListStoreContext.Provider>
  )
}
export default EventTicketListProvider
