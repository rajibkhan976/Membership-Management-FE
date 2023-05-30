import { BookingRows, MyBookingsDetails } from '@jg/common/types/eventsAnsSchedules/MyBookingsDetailsResponse'
import AppStore from '@jg/store/store'

const populateBookingRows = (rawData: any): BookingRows => {
  const BaseAppPath = AppStore.getState().BaseAppPath

  const imgSrc = (userId: number, imgName: string) => {
    return imgName ? `${BaseAppPath}store/download?f=${imgName}&t=user&p=${userId}&p1=&p2=2` : ''
  }

  return {
    address1: rawData.Address1,
    address2: rawData.Address2,
    address3: rawData.Address3,
    bookingAmount: rawData.BookingAmount,
    country: rawData.Country,
    county: rawData.County,
    docId: rawData.DocId,
    emailAddress: rawData.EmailAddress,
    entityId: rawData.EntityId,
    firstName: rawData.FirstName,
    isFormAvailable: rawData.IsFormAvailable,
    lastName: rawData.LastName,
    MID: rawData.MID,
    noOfBooking: rawData.NoOfBooking,
    paymentReceiptDocId: rawData.PaymentReceiptDocId,
    paymentReceiptId: rawData.PaymentReceiptId,
    postCode: rawData.PostCode,
    productDocId: rawData.ProductDocId,
    town: rawData.Town,
    memberId: rawData.MemberId,
    profilePicURL: rawData.ProfilePicURL,
    userId: rawData.UserId,
    image: imgSrc(rawData.UserId, rawData.ProfilePicURL),
  }
}

export const populateMyBookingsInfo = (rawData: any): MyBookingsDetails => {
  return {
    paymentReceiptDocId: rawData.PaymentReceiptDocId,
    paymentReceiptId: rawData.PaymentReceiptId,
    rows: rawData.Rows?.map((item: BookingRows) => populateBookingRows(item)) as BookingRows[],
    totalAmount: rawData.TotalAmount,
    totalTickets: rawData.TotalTickets,
  }
}
