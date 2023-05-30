/* eslint-disable @typescript-eslint/no-explicit-any */
export interface AccountDetailsInterface {
  License: string
  PaymentDate: null | string
  RecurringCustomerId: null | string
  SubscriptionAmount: null | string
  PaymentMethod?: 'GoCardless' | 'Stripe'
  CustomerId: string | null
  EmailAddress: string | null
  FirstName: string | null
  LastName: string | null
  ProductId: string | null
  UserId: string | null
  MemberDocId: number | null
  RecurringPlanId: number | null
}

export interface Address {
  city?: string
  country: string
  line1?: string
  line2?: string
  postal_code: string
  state?: string
}

export interface CardBillingDetails {
  address: Address
  email?: any
  name: string
  phone?: any
}

export interface Checks {
  address_line1_check?: any
  address_postal_code_check: string
  cvc_check: string
}

export interface Networks {
  available: string[]
  preferred?: any
}

export interface ThreeDSecureUsage {
  supported: boolean
}

export interface Card {
  brand: string
  checks: Checks
  country: string
  description?: any
  exp_month: number
  exp_year: number
  fingerprint: string
  funding: string
  iin?: any
  issuer?: any
  last4: string
  networks: Networks
  three_d_secure_usage: ThreeDSecureUsage
  wallet?: any
}

export type Metadata = Record<string, any>

export interface CardDetails {
  id: string
  object: string
  acss_debit?: any
  affirm?: any
  afterpay_clearpay?: any
  alipay?: any
  au_becs_debit?: any
  bacs_debit?: any
  bancontact?: any
  billing_details: CardBillingDetails
  blik?: any
  boleto?: any
  card: Card
  card_present?: any
  created: number
  customer: string
  customer_balance?: any
  eps?: any
  fpx?: any
  giropay?: any
  grabpay?: any
  ideal?: any
  interac_present?: any
  klarna?: any
  konbini?: any
  link?: any
  livemode: boolean
  metadata: Metadata
  oxxo?: any
  p24?: any
  paynow?: any
  pix?: any
  promptpay?: any
  radar_options?: any
  sepa_debit?: any
  sofort?: any
  type: string
  us_bank_account?: any
  wechat_pay?: any
}

export interface Links {
  customer: string
}

export interface BankDetails {
  id: string
  created_at: string
  account_number_ending: string
  account_holder_name: string
  account_type?: any
  bank_name: string
  currency: string
  country_code: string
  metadata: Metadata
  enabled: boolean
  links: Links
}

export interface PaymentDetails {
  [id: number]: CardDetails | BankDetails
}

export interface PaymentDetailsRoot {
  PaymentDetails: PaymentDetails
}

export interface BillingDetails {
  UserId: number
  FirstName: string
  LastName: string
  EmailAddress: string
  ClubDocId: number
  Address1: string
  Address1Id: number
  Address2: string
  Address2Id: number
  Town_City: string
  Town_CityId: number
  County_State: string
  County_StateId: number
  PostCode: string
  PostCodeId: number
  Country: string
  CountryId: number
  VatTaxRegistrationNo: string
  VatTaxRegistrationId: number
}

export interface LegacyQueryResponse {
  Data: string
  IsSucess: boolean // The field name is wrong
  Message: string
}

export interface PlanCancelQueue {
  ContactId: number
  EntityId: number
  Executed: boolean
  Id: number
  PlanId: number
  RequestBy: string
  RequestDate: any
}
