import call from '@jg/_core/services/data/LegacyDataService'
import create from 'zustand'
import type { TagsStore } from './type'

const useTags = create<TagsStore>((set, get) => ({
  tags: null,
  searchedTags: null,
  count: 0,
  getTagsList: (ownerId: string) => {
    call(
      ['GDE/FetchObjects'],
      [{ provider: 'Email', args: { Method: 'SavedTagsList', OwningEntityId: ownerId } }],
      (response: any) => {
        set({ tags: response.Result, searchedTags: response.Result })
      }
    )
  },
  searchTags: (value: string) => {
    const tagsArray = get().tags
    const newArray = tagsArray?.filter((tag) => tag.TagName.toLowerCase().includes(value.toLowerCase()))
    set({ searchedTags: newArray })
  },
}))

export { useTags }
