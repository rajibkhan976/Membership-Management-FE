export interface IndividualPayoutRecord {
  Id: number
  MerchantId: number
  PayoutId: string
  Status: 'paid' | 'in_transit'
  Amount: number
  StatementDescriptor?: string
  Description: string
  Destination: string
  Currency: string
  Initiated: string
  ArrivalDate: string
  CreationDate: string
}

export interface IsSessionUserAdminOfClub {
  IsAdmin: boolean
  IsInTrial: any
  Message: string
}
