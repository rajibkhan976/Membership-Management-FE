interface BalanceInfo {
  amount?: number
  currency?: string
}

export interface StripeAccountBalance {
  available?: BalanceInfo[]
  in_transit?: BalanceInfo[]
  pending?: BalanceInfo[]
  total?: BalanceInfo[]
}
