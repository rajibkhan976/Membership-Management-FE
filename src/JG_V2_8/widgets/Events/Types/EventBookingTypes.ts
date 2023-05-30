import { MemberType } from '@jg/common/types'

export type EventBookingForType = {
  member: MemberType
  qty: number
  parentEntityId: number
  purchasable?: boolean
  evaluated?: boolean
  isSelectedForWaitlist?: boolean
  isSelectedForInstallment?: boolean
}
export type EventBookingGroup = 'single' | 'family' | 'club'
export type EventBookingItem = {
  ticketDocId: number
  bookingFor: EventBookingForType[]
  group: EventBookingGroup
}

export type BookATicketItem = {
  id?: number
  bookingFor: EventBookingForType[]
  group: EventBookingGroup
}
export type BookingProgressStatus =
  | 'init'
  | 'validateAndCheckout'
  | 'checkout'
  | 'addAndContinue'
  | 'canceled'
  | 'addAndCheckout'
  | 'updating'
  | 'redirectToCart'
  | 'saveWaitlistInitiated'
  | 'saveWaitlistCompleted'
