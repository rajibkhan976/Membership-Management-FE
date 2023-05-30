import type { EmailArgumentInterface } from '@comps/uiComps/EmailList/Interfaces'
import call from '@jg/_core/services/data/LegacyDataService'
import moment from 'moment'
import create from 'zustand'
import type {
  EmailDeleteStoreType,
  EmailDetails,
  EmailList,
  EmailReport,
  TabStateType,
  dateRangeType,
  RecipientCountActivity,
  activityBasedSegmentCreation,
} from './type'

const useEmailReport = create<EmailReport>((set) => ({
  emailReport: null,
  isLoading: false,
  error: '',
  fetch: (id: string | undefined) => {
    set({ isLoading: true })
    call(
      ['GDE/FetchObjects'],
      [
        {
          provider: 'Email',
          args: {
            Method: 'EmailReport',
            EmailId: id,
          },
        },
      ],
      (response: any) => {
        if (response.StatusCode === 200) {
          set({ emailReport: response.Result, isLoading: false })
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

const useRecepientCountActivity = create<RecipientCountActivity>((set) => ({
  Data: null,
  dateFilterData: [moment().format().split('+')[0], moment().subtract(1, 'days').format().split('+')[0]],
  dateFilterActive: false,
  isError: false,
  isLoading: true,
  showDateFilterOptions: false,
  hello: 0,
  setFetch: (value) => {
    if (value === true) {
      set({ Data: null })
    }
  },
  setHello: (value) => {
    set({ hello: value })
  },
  setHelloTwo: (value) => {
    set({ hello: value })
  },
  setShowDateFilterOptions: (value) => {
    set({ showDateFilterOptions: value })
  },
  getRecipientCountByActivity: (emailId: number, resultType: number, from: string, to: string) => {
    call(
      ['GDE/FetchObjects'],
      [
        {
          provider: 'Email',
          args: {
            Method: 'RecipientActivityCounts',
            EmailId: emailId,
            ResultType: resultType, //0 for Day Based, 1 for Month Based, 2 for Hour Based
            From: from,
            To: to,
          },
        },
      ],
      (response: any) => {
        if (response.StatusCode === 200) {
          set({ isLoading: false })
          set({ Data: response.Result })
        }
        set({ isLoading: false })
      }
    )
  },
  // setResultType: (resultType: number) => {
  //   set({ ResultType: resultType })
  // },
  setDateFilterData: (data: dateRangeType | null) =>
    set(() => ({ dateFilterData: data ? [data.startDate, data.endDate] : null })),
  setDateFilterActive: (status: boolean) => set(() => ({ dateFilterActive: status })),
}))

const useCreateActivityBasedSegment = create<activityBasedSegmentCreation>((set) => ({
  isLoading: true,
  isError: true,
  createActivityBasedSegment: (
    owningEntityId: string,
    title: string,
    description: string,
    emailId: number,
    activityType: number
  ) => {
    call(
      ['GoMembership/SaveSegment'],
      [
        {
          Arguments: {
            SegmentId: 0,
            OwningEntityIdSyncGuid: owningEntityId,
            Title: title,
            Description: description,
            SegmentExpression: [
              {
                FieldId: 0,
                RuleType: 'Email',
                Field: 'EmailId',
                Value: emailId,
                Operator: 'equal',
                Condition: 'and',
              },
              {
                FieldId: 0,
                RuleType: 'Email',
                Field: 'ActivityType',
                Value: activityType,
                Operator: 'equal',
                Condition: '',
              },
            ],
            IsEmailActivityBasedSegment: true,
          },
        },
      ],
      (response: any) => {
        if (response.StatusCode === 200) {
          set({ isLoading: false, isError: false })
        } else {
          set({ isLoading: false, isError: true })
        }
      }
    )
  },
  setIsLoading: (value: boolean) => {
    set({ isLoading: value })
  },
  setIsError: (value: boolean) => {
    set({ isError: value })
  },
}))

export { useEmailReport, useRecepientCountActivity, useCreateActivityBasedSegment }
