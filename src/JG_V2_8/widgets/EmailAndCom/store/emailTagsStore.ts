import call from '@jg/_core/services/data/LegacyDataService'
import create from 'zustand'
import type { TagsType } from './type'

const useTags = create<TagsType>((set, get) => ({
  tags: [],
  isLoading: true,
  error: '',
  fetch: (OwningEntityId: string) => {
    call(
      ['GDE/FetchObjects'],
      [
        {
          provider: 'Email',
          args: {
            Method: 'EmailTagsMetadata',
            OwningEntityId,
          },
        },
      ],
      (response: any) => {
        if (response.StatusCode === 200) {
          set({ tags: response.Result, isLoading: false })
        } else {
          set({ isLoading: false, error: 'Something went wrong!' })
        }
      }
    )
  },
  filterTags: (value: string) => {
    const { tags } = get()
    const newArray = tags.filter((tag) => tag.Title.toLowerCase().includes(value.toLowerCase()))
    set({ tags: newArray })
  },
}))

export { useTags }
