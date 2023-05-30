import create from 'zustand'
import call from '@jg/_core/services/data/LegacyDataService'
import { AllMethods } from '@jg/widgets/EmailAndCom/enum'
import type { SegmentStoreType } from '@comps/uiComps/SegmentList/types'

const useRecipientsStore = create<SegmentStoreType>((set) => ({
  RecipientsBySegment: null,
  segmentTitle: '',
  Rows: 0,
  pageNumber: 1,
  numberOfRows: 30,
  isLoading: false,
  Active: 0,
  Dropped: 0,
  setIsLoading: async (isLoading: boolean) => {
    set({ isLoading })
  },
  setValueNull: async () => {
    set({ RecipientsBySegment: null, pageNumber: 1 })
  },
  getRecipientsBySegmentId: async (
    id: number,
    segmentTitle: string,
    OwningEntityId: string,
    PageNo: number,
    Size: number
  ) => {
    await call(
      ['GDE/FetchObjects'],
      [
        {
          provider: 'Email',
          args: {
            Method: AllMethods.RECIPIENTS_BY_SEGMENT,
            SegmentId: id,
            // SegmentExpression: null,
            IncludeOptins: [],
            ExcludeOptins: [],
            OwningEntityId: OwningEntityId,
            PageNo,
            Size,
          },
        },
      ],
      (response: any) => {
        set((state) => ({
          RecipientsBySegment:
            state.pageNumber === 1
              ? response.Result.Recipients
              : state.RecipientsBySegment
              ? state.RecipientsBySegment.concat(response.Result.Recipients)
              : [],
          Rows: response.Result.Rows,
          Active: response.Result.Rows,
          Dropped: response.Result.Rows,
          segmentTitle: segmentTitle,
          isLoading: false,
        }))
      }
    )
  },
  setPageNumber: (pageNumber: number) => set(() => ({ pageNumber: pageNumber })),
}))

export default useRecipientsStore
