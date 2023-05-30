
import call from '@jg/_core/services/data/LegacyDataService'
import create from 'zustand'
import type { EmailDetails } from './type'

const useSegmentList = create<EmailDetails>((set) => ({
  emailDetails: null,
  isLoading: true,
  error: '',
  fetch: (id: number) => {
    call(
      ['GDE/FetchObjects'],
      [
        {
          provider: 'Email',
          args: {
            Method: 'GetEmail',
            EmailId: id,
          },
        },
      ],
      (response: any) => {
        if (response.StatusCode === 200) {
          set({ emailDetails: response.Result, isLoading: false })
        } else {
          set({ isLoading: false, error: 'Something went wrong!' })
        }
      }
    )
  },
  setLoadingStatus: (value: boolean) => {
    set({ isLoading: value })
  },
}))

export { useSegmentList }