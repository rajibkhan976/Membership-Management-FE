/* eslint-disable @typescript-eslint/no-explicit-any */
export interface BusinessProfile {
  mcc: string
  name: string
  product_description?: any
  support_address?: any
  support_email: string
  support_phone?: any
  support_url?: any
  url?: any
}

export interface Capabilities {
  acss_debit_payments?: any
  affirm_payments?: any
  afterpay_clearpay_payments?: any
  au_becs_debit_payments?: any
  bacs_debit_payments?: any
  bancontact_payments?: any
  bank_transfer_payments?: any
  blik_payments?: any
  boleto_payments?: any
  card_issuing?: any
  card_payments: string
  cartes_bancaires_payments?: any
  eps_payments?: any
  fpx_payments?: any
  giropay_payments?: any
  grabpay_payments?: any
  ideal_payments?: any
  jcb_payments?: any
  klarna_payments?: any
  konbini_payments?: any
  legacy_payments?: any
  link_payments?: any
  oxxo_payments?: any
  p24_payments?: any
  paynow_payments?: any
  promptpay_payments?: any
  sepa_debit_payments?: any
  sofort_payments?: any
  tax_reporting_us_1099_k?: any
  tax_reporting_us_1099_misc?: any
  transfers: string
  treasury?: any
  us_bank_account_ach_payments?: any
}

export interface ExternalAccounts {
  object: string
  data: any[]
  has_more: boolean
  url: string
}

export interface FutureRequirements {
  alternatives: any[]
  current_deadline?: any
  currently_due: any[]
  disabled_reason?: any
  errors: any[]
  eventually_due: any[]
  past_due: any[]
  pending_verification: any[]
}

export interface Requirements {
  alternatives: any[]
  current_deadline?: any
  currently_due: string[]
  disabled_reason: string
  errors: any[]
  eventually_due: string[]
  past_due: string[]
  pending_verification: any[]
}

export interface BacsDebitPayments {
  display_name?: any
}

export interface Branding {
  icon?: any
  logo?: any
  primary_color?: any
  secondary_color?: any
}

export interface TosAcceptance {
  date?: any
  ip?: any
  user_agent?: any
}

export interface CardIssuing {
  tos_acceptance: TosAcceptance
}

export interface DeclineOn {
  avs_failure: boolean
  cvc_failure: boolean
}

export interface CardPayments {
  decline_on: DeclineOn
  statement_descriptor_prefix?: any
  statement_descriptor_prefix_kana?: any
  statement_descriptor_prefix_kanji?: any
}

export interface Dashboard {
  display_name?: any
  timezone: string
}

export interface Payments {
  statement_descriptor?: any
  statement_descriptor_kana?: any
  statement_descriptor_kanji?: any
  statement_descriptor_prefix_kana?: any
  statement_descriptor_prefix_kanji?: any
}

export interface Schedule {
  delay_days: number
  interval: string
  monthly_anchor: number
  weekly_anchor: string
}

export interface Payouts {
  debit_negative_balances: boolean
  schedule: Schedule
  statement_descriptor: string
}

export interface SepaDebitPayments {
  creditor_id?: any
}

export interface Settings {
  bacs_debit_payments: BacsDebitPayments
  branding: Branding
  card_issuing: CardIssuing
  card_payments: CardPayments
  dashboard: Dashboard
  payments: Payments
  payouts: Payouts
  sepa_debit_payments: SepaDebitPayments
  treasury?: any
}

export interface TosAcceptance2 {
  date?: any
  ip?: any
  service_agreement?: any
  user_agent?: any
}

export interface PaymentAccountResult {
  id?: string
  object?: string
  business_profile?: BusinessProfile
  business_type?: any
  capabilities?: Capabilities
  charges_enabled?: boolean
  company?: any
  controller?: any
  country?: string
  created?: number
  default_currency?: string
  details_submitted?: boolean
  email?: string
  external_accounts?: ExternalAccounts
  future_requirements?: FutureRequirements
  individual?: any
  metadata?: any
  payouts_enabled?: boolean
  requirements?: Requirements
  settings?: Settings
  tos_acceptance?: TosAcceptance2
  type?: string
}

export interface AdditionalClubSetting {
  ClubJoinDirectLink: string
  EventDirectLink: string
}
