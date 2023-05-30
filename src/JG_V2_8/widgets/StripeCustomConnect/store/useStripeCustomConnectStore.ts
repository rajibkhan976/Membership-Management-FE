import create from 'zustand'
import { StripeAccountBalance } from '../interfaces/StripeAccountBalanceInterface'
import { PaymentAccountResult } from '../components/payout-profile/type'
import { IsSessionUserAdminOfClub } from '../components/balance-overview/type'

export interface StripeCustomConnectStore {
  isLoading: boolean
  setIsLoading: (status: boolean) => void
  hasStripeAccount: boolean
  setHasStripeAccount: (status: boolean) => void
  isSessionUserAdminOfClub: IsSessionUserAdminOfClub | null
  setIsSessionUserAdminOfClub: (response: IsSessionUserAdminOfClub) => void
  balance: StripeAccountBalance
  setStripeAccountBalance: (balance: StripeAccountBalance) => void
  stripeDashboardUrl: string
  setStripeDashboardUrl: (url: string) => void
  stripeAccountInfo: PaymentAccountResult | Record<string, any>
  setStripeAccountInfo: (accountInfo: PaymentAccountResult) => void
}

const useStripeCustomConnectStore = create<StripeCustomConnectStore>((set) => ({
  isLoading: false,
  setIsLoading: (status) => set({ isLoading: status }),
  hasStripeAccount: false,
  isSessionUserAdminOfClub: null,
  setIsSessionUserAdminOfClub: (response) => set({ isSessionUserAdminOfClub: response }),
  setHasStripeAccount: (status) => set({ hasStripeAccount: status }),
  balance: {},
  setStripeAccountBalance: (balance) => set({ balance: balance }),
  stripeDashboardUrl: '',
  setStripeDashboardUrl: (url) => set({ stripeDashboardUrl: url }),
  stripeAccountInfo: {},
  setStripeAccountInfo: (accountInfo) => set({ stripeAccountInfo: accountInfo }),
}))

export default useStripeCustomConnectStore
