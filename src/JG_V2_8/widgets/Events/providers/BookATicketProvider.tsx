import { CompBaseProps } from '@comps/uiComps'

import { AsyncStatus, ClubInfo, ClubInfoType, EventInfo, MemberType, TicketInfo } from '@jg/common/types'
import { createContext, useContext, useEffect, useState } from 'react'

import { StoreApi, createStore, useStore } from 'zustand'
import { BookATicketItem, EventBookingGroup, EventBookingItem } from '../Types/EventBookingTypes'
import { string } from 'yup'
import _ from 'lodash'
import shallow from 'zustand/shallow'
import { EvaluateTicketForEntity } from '@jg/common/dataAPIs/eventsAnsSchedules'
import { GetMembersByClub } from '@jg/common/dataAPIs/clubs'

interface BookATicketStorage {
  isGroupBooking: boolean
  dirty: boolean
  setDirty: (dirty: boolean) => void
  asyncStatusForClubMembers: AsyncStatus

  ticketInfo: TicketInfo
  hideBookingEntityWhenQtyIsZero: boolean
  setHideBookingEntityWhenQtyIsZero: (hide: boolean) => void
  familyMembers: MemberType[]
  clubs: ClubInfoType[]
  selectedClub: ClubInfoType | null
  setSelectedClub: (inndex: number) => void
  clubMembers: MemberType[]
  bookingItemsOriginal: BookATicketItem[]
  bookingItems: BookATicketItem[]
  getBookingItems: () => BookATicketItem[]
  updateBooking: (
    member: MemberType,
    qty: number,
    updateType: 'increase' | 'decrease' | 'replace',
    groupType: EventBookingGroup,
    parentEntityId: number,
    installmentSelected?: boolean
  ) => void
  evaluateTicketByEntity: (
    ticketDocId: number,
    memberDocId: number,
    entityType: 'Member' | 'Team',
    callback: (purchasable: boolean) => void
  ) => void
  waitlistItems: BookATicketItem[]
  getWaitlistItems: () => BookATicketItem[]
  updateWaitlist: (member: MemberType, groupType: EventBookingGroup, selected: boolean, parentEntityId: number) => void
  isBookingFormScreen?: boolean
  setBookingformScreen?: (b: boolean) => void
}

const getBookATicketStorage = (
  ticketInfo: TicketInfo,
  familyMembers: MemberType[],
  clubs: ClubInfoType[],
  bookingItems: BookATicketItem[],

  isGroupBooking: boolean
) => {
  const BookATicketStore = createStore<BookATicketStorage>((set, get) => ({
    dirty: bookingItems.length > 0,
    setDirty: (dirty) => {
      set({ dirty: dirty })
    },
    hideBookingEntityWhenQtyIsZero: false,
    setHideBookingEntityWhenQtyIsZero: (hide) => {
      set({ hideBookingEntityWhenQtyIsZero: hide })
    },
    isGroupBooking: isGroupBooking,
    asyncStatusForClubMembers: 'idle',
    ticketInfo: ticketInfo,
    setSelectedClub: (index) => {
      if (clubs.length) {
        set({ selectedClub: get().clubs[index] })
        set({ asyncStatusForClubMembers: 'pending' })
        GetMembersByClub({ clubDocId: get().clubs[index].DocId }).then((res) => {
          set({ clubMembers: res.members })
          set({ asyncStatusForClubMembers: 'success' })
        })
      }
    },
    familyMembers: familyMembers,
    clubs: clubs,
    selectedClub: null,
    clubMembers: [],
    bookingItemsOriginal: [...bookingItems],
    bookingItems: [...bookingItems],
    getBookingItems: () => {
      return get().bookingItems
    },
    updateBooking: (member, qty, updateType, group, parentEntityId, installmentSelected) => {
      if (get().bookingItems.length === 0) {
        set({
          bookingItems: [
            {
              group: group,
              bookingFor: [{ member: member, qty: qty, parentEntityId, isSelectedForInstallment: false }],
            },
          ],
        })
      } else {
        const toBeUpdated = [...get().bookingItems]
        const indexByGroup = toBeUpdated.findIndex((e) => e.group === group)
        if (indexByGroup > -1) {
          const booking = toBeUpdated[indexByGroup]
          const index = toBeUpdated[indexByGroup].bookingFor.findIndex((e) => e.member.DocId === member.DocId)
          if (index > -1) {
            switch (updateType) {
              case 'increase':
                booking.bookingFor[index].qty += qty
                break
              case 'decrease':
                booking.bookingFor[index].qty -= qty
                break
              case 'replace':
                booking.bookingFor[index].qty = qty
                break
            }
            if (!_.isUndefined(installmentSelected))
              booking.bookingFor[index].isSelectedForInstallment = installmentSelected

            if (booking.bookingFor[index].qty === 0) {
              booking.bookingFor.splice(index, 1)
            }
          } else {
            booking.bookingFor.push({
              member: member,
              qty: qty,
              parentEntityId,
              isSelectedForInstallment: !_.isUndefined(installmentSelected) ? installmentSelected : false,
            })
          }
          if (booking.bookingFor.length === 0) {
            toBeUpdated.splice(indexByGroup, 1)
          }
        } else {
          toBeUpdated.push({
            group: group,
            bookingFor: [
              {
                member: member,
                qty: qty,
                parentEntityId,
                isSelectedForInstallment: !_.isUndefined(installmentSelected) ? installmentSelected : false,
              },
            ],
          })
        }
        set({ bookingItems: toBeUpdated })
        // console.log('get().bookingItems', get().bookingItems)
      }
      if (get().bookingItemsOriginal.length === 0) {
        set({ dirty: get().bookingItems.length > 0 })
      }
    },
    evaluateTicketByEntity: (ticketDocId, memberDocId, entityType, callback) => {
      EvaluateTicketForEntity({
        ticketDocId: ticketDocId,
        purchasingEntityType: entityType,
        purchasingEntityIds: [memberDocId],
      }).then((res) => {
        callback(res.EvaluatedEntities[0].Purchasable)
      })
    },
    waitlistItems: [],
    getWaitlistItems: () => {
      return get().waitlistItems
    },
    updateWaitlist: (member, group, selected, parentEntityId) => {
      if (get().waitlistItems.length === 0) {
        set({
          waitlistItems: [
            { group: group, bookingFor: [{ member: member, isSelectedForWaitlist: selected, parentEntityId, qty: 0 }] },
          ],
        })
      } else {
        const toBeUpdated = [...get().waitlistItems]
        const indexByGroup = toBeUpdated.findIndex((e) => e.group === group)
        if (indexByGroup > -1) {
          const booking = toBeUpdated[indexByGroup]
          const index = toBeUpdated[indexByGroup].bookingFor.findIndex((e) => e.member.DocId === member.DocId)
          if (index > -1) {
            if (selected) booking.bookingFor[index].isSelectedForWaitlist = selected
            else {
              booking.bookingFor.splice(index, 1)
            }
          } else {
            booking.bookingFor.push({ member: member, qty: 0, parentEntityId, isSelectedForWaitlist: selected })
          }
          if (booking.bookingFor.length === 0) {
            toBeUpdated.splice(indexByGroup, 1)
          }
        } else {
          toBeUpdated.push({
            group: group,
            bookingFor: [{ member: member, qty: 0, parentEntityId, isSelectedForWaitlist: selected }],
          })
        }
        set({ waitlistItems: toBeUpdated })
      }

      set({ dirty: get().waitlistItems.length > 0 })
    },
    isBookingFormScreen: false,
    setBookingformScreen: (b: boolean) => {
      set({ isBookingFormScreen: b })
    },
  }))
  return BookATicketStore
}

interface IBookATicketStoreContext {
  store: StoreApi<BookATicketStorage>
}
const BookATicketStoreContext = createContext<IBookATicketStoreContext>({
  store: getBookATicketStorage(
    { docId: -1, maxPurchase: 0, minPurchase: 0, quantity: 0, productType: 0, availableQuantity: 0 },
    [],
    [],
    [],
    true
  ),
})

export const useBookATicketStoreContext = (
  selector: (state: BookATicketStorage) => Partial<BookATicketStorage>
): BookATicketStorage => {
  const { store } = useContext(BookATicketStoreContext)
  const deafultStore: BookATicketStorage = {
    isGroupBooking: false,
    asyncStatusForClubMembers: 'idle',
    ticketInfo: {
      quantity: 0,
      minPurchase: 0,
      maxPurchase: 0,
      productType: 0,
      docId: 0,
      availableQuantity: 0,
    },
    familyMembers: [],
    clubs: [],
    selectedClub: null,
    setSelectedClub: function (inndex: number): void {
      throw new Error('Function not implemented.')
    },
    clubMembers: [],
    bookingItems: [],
    updateBooking: function (
      member: MemberType,
      qty: number,
      updateType: 'increase' | 'decrease' | 'replace',
      groupType: EventBookingGroup,
      parentEntityId: number
    ): void {
      throw new Error('Function not implemented.')
    },
    getBookingItems: function (): BookATicketItem[] {
      throw new Error('Function not implemented.')
    },
    dirty: false,
    setDirty: function (dirty: boolean): void {
      throw new Error('Function not implemented.')
    },
    bookingItemsOriginal: [],
    evaluateTicketByEntity: function (
      ticketDocId: number,
      memberDocId: number,
      entityType: 'Member' | 'Team',
      callback: (purchasable: boolean) => void
    ): void {
      throw new Error('Function not implemented.')
    },
    hideBookingEntityWhenQtyIsZero: false,
    setHideBookingEntityWhenQtyIsZero: function (hide: boolean): void {
      throw new Error('Function not implemented.')
    },
    waitlistItems: [],
    updateWaitlist: function (
      member: MemberType,
      groupType: EventBookingGroup,
      selected: boolean,
      parentEntityId: number
    ): void {
      throw new Error('Function not implemented.')
    },
    getWaitlistItems: function (): BookATicketItem[] {
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

type BookATicketStoreProviderProps = CompBaseProps & {
  ticketInfo: TicketInfo
  clubs: ClubInfoType[]
  familyMembers: MemberType[]
  isGroupBooking: boolean
  bookingItems: BookATicketItem[]
}
const BookATicketStoreProvider = ({
  children,
  ticketInfo,
  clubs = [],
  familyMembers = [],
  isGroupBooking = true,
  bookingItems = [],
}: BookATicketStoreProviderProps) => {
  return (
    <BookATicketStoreContext.Provider
      value={{ store: getBookATicketStorage(ticketInfo, familyMembers, clubs, bookingItems, isGroupBooking) }}
    >
      <>{children}</>
    </BookATicketStoreContext.Provider>
  )
}
export default BookATicketStoreProvider
