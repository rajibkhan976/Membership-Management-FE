import call from '@jg/_core/services/data/LegacyDataService'
import create from 'zustand'
import { AllMethods } from '@jg/widgets/EmailAndCom/enum'
import type { Optin, OptinResult } from './type'

const useOptin = create<Optin>((set) => ({
  optins: null,
  fetch: (ownerType = 'NGB') => {
    call(
      ['OptIn/' + AllMethods.SELECT_OPTINE_MASTER_BY_OWNER],
      [{ ownerType, ownerId: 0 }],
      (response: OptinResult) => {
        set({ optins: response })
      }
    )
  },
}))

export { useOptin }
