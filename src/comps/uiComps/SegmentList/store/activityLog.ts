import create from 'zustand'
import call from '@jg/_core/services/data/LegacyDataService'
import { AllMethods } from '@jg/widgets/EmailAndCom/enum'
import type { ActivityLogStoreType } from '@comps/uiComps/SegmentList/types'

const useActivityLog = create<ActivityLogStoreType>((set) => ({
  user: null,
  activities: null,
  pageNumber: 1,
  numberOfRows: 20,
  isLoading: true,
  rows: 0,
  getActivityLog: async (historyId: number, marketingMail: number, pageNo: number, size: number) => {
    await call(
      ['GDE/FetchObjects'],
      [
        {
          provider: 'Email',
          Arguments: {
            Method: AllMethods.GET_RECIPIENT_ACTIVITY_LOG,
            Id: historyId,
            MarketingMail: marketingMail, //1 for merketing
            PageNo: 1,
            Size: 1,
          },
        },
      ],
      (response: any) => {
        console.log('response', response)
        if (response.StatusCode === 200) {
          set({
            user: response.Result.User,
            activities: response.Result.Activities,
            isLoading: false,
            rows: response.Result.Rows,
          })
        }
      }
    )
  },
  setPageNumber: (pageNumber: number) =>
    set({
      pageNumber: pageNumber,
    }),
  setLoadingStatus: (value: boolean) => {
    set({ isLoading: value })
  },
}))

export { useActivityLog }
