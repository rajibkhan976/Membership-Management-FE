import call from '@jg/_core/services/data/LegacyDataService'
import create from 'zustand'
import { AllMethods } from '@jg/widgets/EmailAndCom/enum'
import type { TimeZoneStore } from './type'

const useTimeZone = create<TimeZoneStore>((set) => ({
  timeZoneList: null,
  isLoading: false,
  getTimeZone: () => {
    set({ isLoading: true })
    call(['Repo/' + AllMethods.SELECT_TIME_ZONES], [{}], (response: any) => {
      set({ timeZoneList: response })
      set({ isLoading: false })
    })
  },
}))

export { useTimeZone }
