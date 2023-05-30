import type { EmailArgumentInterface } from '@comps/uiComps/EmailList/Interfaces'
import call from '@jg/_core/services/data/LegacyDataService'
import create from 'zustand'
import type { EmailDeleteStoreType, EmailDetails, EmailList, TabStateType, dateRangeType } from './type'

const useEmailDetails = create<EmailDetails>((set) => ({
  emailDetails: null,
  isLoading: false,
  error: '',
  fetch: (id: number) => {
    set({ isLoading: true })
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

const useEmailList = create<EmailList>((set) => ({
  emailList: null,
  count: 0,
  isLoading: false,
  error: '',
  key: null,
  sideFilterStatus: 100,
  dateFilterActive: false,
  dateFilterData: null,
  tagFilterActive: false,
  tagFilterData: [],
  pageNumber: 1,
  numberOfRows: 15,
  fetch: async (args: EmailArgumentInterface) => {
    set({ isLoading: true })
    const argByProvider = { provider: 'Email', args: args }
    await call(['GDE/FetchObjects'], [argByProvider], (res: any) => {
      if (res.StatusCode === 200) {
        set((state) => ({
          emailList:
            state.pageNumber === 1 ? res.Result.Items : state.emailList ? state.emailList.concat(res.Result.Items) : [],
          count: res.Result.Count,
          isLoading: false,
        }))
        // set({ emailList: res.Result.Items, count: res.Result.Count, isLoading: false })
      } else {
        set({ isLoading: false, error: 'Something went wrong!' })
      }
    })
  },
  setKey: (value: string | null) => set(() => ({ key: value })),
  setSideFilterStatus: (status: number) => set(() => ({ sideFilterStatus: status })),
  setDateFilterActive: (status: boolean) => set(() => ({ dateFilterActive: status })),
  setDateFilterData: (data: dateRangeType | null) =>
    set(() => ({ dateFilterData: data ? [data.startDate, data.endDate] : null })),

  setTagFilterActive: (status: boolean) => set(() => ({ tagFilterActive: status })),
  setTagFilterData: (tag: string) => set((state) => ({ tagFilterData: tag ? [...state.tagFilterData, tag] : [] })),

  removeTag: (newTag: string) =>
    set((state) => ({
      tagFilterData: state.tagFilterData.filter((tag) => {
        return tag != newTag
      }),
    })),
  setLoadingStatus: (value: boolean) => {
    set({ isLoading: value })
  },
  setPageNumber: (pageNumber: number) => set(() => ({ pageNumber: pageNumber })),
  setValueNull: () => set(() => ({ emailList: null })),
}))

const useEmailDeleteStore = create<EmailDeleteStoreType>((set) => ({
  isError: false,
  isLoading: true,
  deleteEmail: (emailId: number) => {
    const args = { EmailId: +emailId }
    call(['GoMembership/DeleteEmail'], [{ args }], (response: any) => {
      if (response.StatusCode !== 200) {
        set({ isError: true })
      }
      set({ isLoading: false })
    })
  },
}))

const useTabState = create<TabStateType>((set) => ({
  selectedTab: 0,
  setSelectedTab: (selectedTab: number) => set(() => ({ selectedTab })),
}))

export { useEmailDetails, useEmailList, useEmailDeleteStore, useTabState }
