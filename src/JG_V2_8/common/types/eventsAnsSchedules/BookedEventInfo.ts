export interface PaymentMethods {
  AppleURL: string
  GoogleURL: string
}

export interface BookedEventMembersInfo {
  Address1: string
  Address2: string
  Address3: string
  BookingIds: string
  Country: string
  County: string
  EmailAddress: string
  EventQueueIds: number[]
  FirstName: string
  LastName: string
  MID: string
  MemberId: number
  NoOfTickets: number
  PaymentMethods: PaymentMethods[]
  PostCode: string
  ProfilePicURL: string
  Town: string
  UserId: number
}

export interface BookedEventInfo {
  ProductDocId: string
  ProductName: string
  Rows: BookedEventMembersInfo[]
  TotalAmount: number
  TotalTickets: number
}

export interface FailedReceiverInfo {
  ProductDocId: string
  MemberId: string
  EventQueueId: string
}
