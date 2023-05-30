import { AsyncStatus } from '@jg/common/types'

import {
  BookATicketItem,
  BookingProgressStatus,
  EventBookingForType,
  EventBookingItem,
} from '../Types/EventBookingTypes'
import { createStore } from 'zustand'
import _ from 'lodash'
import { ValidateStock, ValidateStockResponse } from '@jg/common/dataAPIs/eventsAnsSchedules'
import useEventStore from '../store/useEventStore'
import { EntityExtGenericDataCaptureItemValueByEntityIdType } from '@jg/common/entityExtForms/providers/EntityExtGenericDataCaptureProvider'
import { ValidationSummaryByEntity } from '@jg/common/entityExtForms/types'
//import { EntityExtGenericDataCaptureValueType } from '@jg/common/entityExtForms/providers/EntityExtGenericDataCaptureProvider'
type TicketQtyType = { ticketDocId: number; qty: number }
type StockValidationResult = { success: boolean; selectedQty?: number; stockQty: number; ticketDocId: number }
export interface EventTicketListStorage {
  //eventData: EventInfo
  // bookATicketIndex: number
  // setBookATicketIndex: (index: number) => void
  invalidSummary: { ticketDocId: number; summary: ValidationSummaryByEntity[] }[]
  updateInvalidSummary: (ticketDocId: number, summary: ValidationSummaryByEntity[]) => void
  getInvalidMessage: () => string[]
  bookingProgressStatus: BookingProgressStatus
  asyncStatus: AsyncStatus
  setAsyncStatus: (status: AsyncStatus) => void
  setBookingProgressStatus: (bookingProgressStatus: BookingProgressStatus) => void
  bookingSummaryItems: EventBookingItem[]
  getBookingSummaryItems: () => EventBookingItem[]
  updateBookingSummaryByTicket: (
    bookingItems: BookATicketItem[],
    ticketDocId: number,
    dataCaptureValue?: Record<string, EntityExtGenericDataCaptureItemValueByEntityIdType<any>>,
    bookingProgressStatus?: BookingProgressStatus
  ) => void
  getAllBookingForByTicket: (ticketDocId: number) => EventBookingForType[]
  clearSummaryItems: () => void
  validateStock: (args: { leftOvers?: TicketQtyType[]; callback: (res: StockValidationResult) => void }) => void
  dataCaptureValue: Record<number, Record<string, EntityExtGenericDataCaptureItemValueByEntityIdType<any>>>
  getDataCaptureValue: () => Record<number, Record<string, EntityExtGenericDataCaptureItemValueByEntityIdType<any>>>
  updateDataCaptureValue: (
    value: Record<string, EntityExtGenericDataCaptureItemValueByEntityIdType<any>>,
    ticketDocId: number
  ) => void
  showAttendeeConsentModal: boolean
  setShowAttendeeConsentModal: (showAttendeeConsentModal: boolean) => void
  attendeeConsents: { entityId: number; checked: boolean }[]
  updateAttendeeConsents: (entityId: number, checked: boolean) => void
  getAttendeeConsents: () => { entityId: number; checked: boolean }[]
}

export const getEventTicketListStore = () => {
  const store = createStore<EventTicketListStorage>((set, get) => ({
    //  eventData: useEventStore.getState().eventDetails,
    invalidSummary: [],
    updateInvalidSummary: (ticketDocId, summary) => {
      const tobeUpdated = [...get().invalidSummary]
      const index = tobeUpdated.findIndex((e) => e.ticketDocId === ticketDocId)
      if (index > -1) {
        tobeUpdated[index].summary = summary
      } else {
        tobeUpdated.push({ ticketDocId, summary })
      }
      set({ invalidSummary: tobeUpdated })
    },
    getInvalidMessage: () => {
      const item = get().invalidSummary.find((e) => !!e.summary.find((f) => f.summary[0].length > 0))

      if (item) {
        // ;[item.summary[0].summary[0]]
        const invalids: string[] = []
        const msg = item.summary[0].summary[0]
        if (msg) {
          switch (msg) {
            case 'FIELD_REQUIRED':
              invalids.push('Required fields are not completed. Please update the required fields.')
              break
            case 'DECLARAION_REQUIRED':
              invalids.push('Required fields are not completed. Please update the required fields.')
          }
        }
        return invalids
      } else return []
    },
    asyncStatus: 'idle',
    setAsyncStatus: (status: AsyncStatus) => {
      set({ asyncStatus: status })
    },
    bookingProgressStatus: 'init',
    setBookingProgressStatus: (bookingProgressStatus) => {
      set({ bookingProgressStatus: bookingProgressStatus })
    },
    getBookingSummaryItems: () => {
      return [...get().bookingSummaryItems]
    },
    bookingSummaryItems: [],
    clearSummaryItems: () => {
      set({ bookingSummaryItems: [] })
    },
    getAllBookingForByTicket: (ticketDocId: number) => {
      const items = get().bookingSummaryItems.filter((e) => e.ticketDocId === ticketDocId)
      const bf: EventBookingForType[] = []
      if (items.length) {
        items.forEach((e) => {
          e.bookingFor.forEach((i) => {
            if (i.qty > 0) {
              bf.push(i)
            }
          })
        })
        return bf
      } else return []
    },
    updateBookingSummaryByTicket: (bookingItems, ticketDocId, dataCaptureValue, status) => {
      const tobeUpdated = [...get().bookingSummaryItems]
      _.remove(tobeUpdated, (item) => item.ticketDocId === ticketDocId)

      const items = bookingItems.map((e) => {
        return { ticketDocId: ticketDocId, group: e.group, bookingFor: e.bookingFor } as EventBookingItem
      })
      set({ bookingSummaryItems: [...tobeUpdated, ...items] })
      if (dataCaptureValue) {
        const _dataCaptureValue = get().dataCaptureValue
        _dataCaptureValue[ticketDocId] = dataCaptureValue
        set({ dataCaptureValue: _dataCaptureValue })
        // console.log(get().dataCaptureValue)
      }
      if (status) set({ bookingProgressStatus: status })
    },

    validateStock: ({ leftOvers, callback }) => {
      const itemQuantities: { ticketDocId: number; qty: number }[] = []

      if (!leftOvers) {
        ;[...get().bookingSummaryItems].forEach((item) => {
          const index = itemQuantities.findIndex((e) => e.ticketDocId === item.ticketDocId)
          if (index > -1) {
            item.bookingFor.forEach((bf) => {
              itemQuantities[index].qty += bf.qty
            })
          } else {
            const tobeAdded = { ticketDocId: item.ticketDocId, qty: 0 }
            item.bookingFor.forEach((bf) => {
              tobeAdded.qty += bf.qty
            })
            itemQuantities.push(tobeAdded)
          }
        })
      }
      const finalItems = leftOvers || itemQuantities
      const next = finalItems.shift()
      if (next) {
        ValidateStock({ itemQuantities: [next] }).then((result) => {
          if (result.isAvailbable) {
            // const nextItem = finalItems.shift()
            if (finalItems.length) {
              get().validateStock({ leftOvers: finalItems, callback })
            } else callback({ stockQty: -1, success: true, ticketDocId: next.ticketDocId })
          } else {
            callback({
              stockQty: result.stockQty,
              success: false,
              selectedQty: next.qty,
              ticketDocId: next.ticketDocId,
            })
          }
        })
      }
    },
    dataCaptureValue: {},
    getDataCaptureValue: () => {
      return get().dataCaptureValue
    },
    updateDataCaptureValue: (value, ticketDocId) => {
      const data = get().dataCaptureValue
      data[ticketDocId] = value
      set({ dataCaptureValue: data })
      //console.log(get().dataCaptureValue)
    },
    showAttendeeConsentModal: false,
    setShowAttendeeConsentModal: (showAttendeeConsentModal: boolean) => {
      set({ showAttendeeConsentModal: showAttendeeConsentModal })
    },
    attendeeConsents: [],
    updateAttendeeConsents: (entityId, checked) => {
      const toBeUpdated = [...get().attendeeConsents]
      const index = toBeUpdated.findIndex((e) => e.entityId === entityId)
      if (index === -1) toBeUpdated.push({ entityId, checked })
      else {
        toBeUpdated.forEach((e) => {
          if (e.entityId === entityId) e.checked = checked
        })
      }
      set({ attendeeConsents: toBeUpdated })
      console.log('get().attendeeConsents', get().attendeeConsents)
    },
    getAttendeeConsents: () => {
      return get().attendeeConsents
    },
  }))
  return store
}
