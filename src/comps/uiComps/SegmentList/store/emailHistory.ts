import create from 'zustand'
import call from '@jg/_core/services/data/LegacyDataService'
import { AllMethods } from '@jg/widgets/EmailAndCom/enum'
import type { EmailDetailsByHistoryStore, EmailHistoryStoreType } from '@comps/uiComps/SegmentList/types'

const useEmailHistory = create<EmailHistoryStoreType>((set) => ({
  history: null,
  advanceData: null,
  rows: 0,
  pageNumber: 1,
  isLoading: false,
  isScrollLoader: false,
  isError: true,
  numberOfRows: 20,
  searchKey: '',
  dateRange: '',
  setEmailHistoryNull: async () => {
    set({ history: null })
  },
  setAdvancedSearchData: async (advanceData) => {
    set({ advanceData: advanceData })
  },
  getHistory: async (segmentExpression: any, pageNo: number, isSearchClick: boolean) => {
    isSearchClick ? set({ isLoading: true }) : set({ isScrollLoader: true })
    await call(
      ['GDE/FetchObjects'],
      [
        {
          provider: 'Email',
          args: {
            Method: AllMethods.EMAIL_HISTORY,
            SegmentId: 0,
            SegmentExpression: segmentExpression,
            PageNo: pageNo,
            Size: 20,
          },
        },
      ],
      (response: any) => {
        if (response.StatusCode === 200) {
          set((state) => ({
            history:
              pageNo === 1 ? response.Result.Data : state.history ? state.history.concat(response.Result.Data) : [],
            rows: response.Result.Rows,
            isLoading: false,
            isScrollLoader: false,
          }))
        }
      }
    )
  },
  setSearchKey: (value: string) => set({ searchKey: value }),
  setDateRange: (value: string) => set({ dateRange: value }),
  setPageNumber: (value: number) => set({ pageNumber: value }),
}))

const useEmailDetailsByHistoryId = create<EmailDetailsByHistoryStore>((set) => ({
  emailDetails: null,
  isError: true,
  isLoading: true,
  getDetailsByHistoryId: (historyId: number, isMailQueueHistory: boolean) => {
    call(
      ['GDE/FetchObjects'],
      [
        {
          provider: 'Email',
          Arguments: {
            Method: AllMethods.GET_EMAIL_BY_HISTORY_ID,
            HistoryId: historyId,
            IsMailQueueHistory: isMailQueueHistory,
          },
        },
      ],
      (response: any) => {
        if (response.StatusCode === 200) {
          set({
            emailDetails: response.Result,
            isLoading: false,
          })
        }
      }
    )
  },
  setLoadingStatus: (value: boolean) => set({ isLoading: value }),
}))

export { useEmailHistory, useEmailDetailsByHistoryId }
