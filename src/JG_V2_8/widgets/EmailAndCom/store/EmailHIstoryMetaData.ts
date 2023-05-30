import call from '@jg/_core/services/data/LegacyDataService'
import create from 'zustand'
import type { EmailHistoryMeta } from './type'
import { StyledInterface } from 'styled-components'

const useEmailHistoryMetaData = create<EmailHistoryMeta>((set) => ({
  items: null,
  isLoading: true,
  error: '',
  fetch: (id: string) => {
    call(
      ['GDE/FetchObjects'],
      [
        {
          provider: 'Email',
          args: {
            Method: 'GetMetadataForEmailHistorySearch',
            OwningEntityId: id,
          },
        },
      ],
      (response: any) => {
        if (response.StatusCode === 200) {
          set({ items: response.Result })
        } else {
          // set({ isLoading: false, error: 'Something went wrong!' })
        }
      }
    )
  }
}))

export { useEmailHistoryMetaData }
