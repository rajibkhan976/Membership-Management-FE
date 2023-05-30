import create from 'zustand'
import call from '@jg/_core/services/data/LegacyDataService'
import { ActivityType, AllMethods } from '@jg/widgets/EmailAndCom/enum'
import type { EmailRecipientByActivityStoreType } from '@comps/uiComps/SegmentList/types'

const useEmailRecipientByActivityType = create<EmailRecipientByActivityStoreType>((set) => ({
  GetEmailRecipientByActivityType: null,
  segmentTitle: '',
  Rows: 0,
  pageNumber: 1,
  isLoading: true,
  // numberOfRows: 30,
  getRecipientsByActivityType: async (
    EmailId,
    ActivityType,
    PageNumber,
    NumberOfRows
  ) => {
    await call(
      ['GDE/FetchObjects'],
      [
        {
          provider: 'Email',
          args: {
            Method: AllMethods.EMAIL_RECIPIENT_BY_ACTIVITY_TYPE,
            EmailId,
            ActivityType,
            PageNumber,
            NumberOfRows,
          },
        },
      ],
      (response: any) => {
      if(response.StatusCode === 200) {

          set((state) => ({
            GetEmailRecipientByActivityType:
              state.pageNumber === 1
                ? response.Result.Data
                : state.GetEmailRecipientByActivityType
                ? state.GetEmailRecipientByActivityType.concat(response.Result.Data)
                : [],
            Rows: response.Result.Rows,
            isLoading: false,
          }))

      }

      }
    )
  },
  setLoadingStatus: (value: boolean) => {
    set({ isLoading: value })
  },
  setPageNumber: (pageNumber: number) =>
    set({
      pageNumber: pageNumber,
    }),
  // setLoding: (status: boolean) =>
  //   set({
  //     isLoading: status,
  //   }),
}))


export default useEmailRecipientByActivityType
