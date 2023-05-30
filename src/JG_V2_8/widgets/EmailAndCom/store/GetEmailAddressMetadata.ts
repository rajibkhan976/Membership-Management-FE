import call from '@jg/_core/services/data/LegacyDataService'
import create from 'zustand'
import type { EmailAddressMetadata } from './type'

const useEmailAddressMetadata = create<EmailAddressMetadata>((set) => ({
  emailAddress: [],
  isLoading: false,
  error: '',
  fetch: (OwningEntityId: string) => {
    set({ isLoading: true })
    call(
      ['GDE/FetchObjects'],
      [
        {
          provider: 'Email',
          args: {
            Method: 'EmailAddressMetadata',
            OwningEntityId,
          },
        },
      ],
      (response: any) => {
        if (response.StatusCode === 200) {
          set({ emailAddress: response.Result, isLoading: false })
        } else {
          set({ isLoading: false, error: 'Something went wrong!' })
        }
      }
    )
  }
}))

export { useEmailAddressMetadata }