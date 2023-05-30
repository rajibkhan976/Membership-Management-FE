import { ResponseBase } from '../common/ResponseBase'

export interface BookingRows {
  address1: string
  address2: string
  address3: string
  bookingAmount: number
  country: string
  county: string
  docId: string
  emailAddress: string
  entityId: string
  firstName: string
  isFormAvailable: boolean
  lastName: string
  MID: string
  noOfBooking: number
  paymentReceiptDocId: number
  paymentReceiptId: string
  postCode: string
  productDocId: string
  town: string
  memberId: number
  profilePicURL: string
  userId: number
  image: string
}

export interface MyBookingsDetails {
  paymentReceiptDocId: number
  paymentReceiptId: string
  rows: BookingRows[]
  totalAmount: number
  totalTickets: number
}

export type MyBookingsDetailsResponse = ResponseBase & {
  myBookingsDetails: MyBookingsDetails[]
}
