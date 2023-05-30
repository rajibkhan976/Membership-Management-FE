import create from 'zustand'
import type {
  SegmentDeleteStoreType,
  SegmentsInitialValueResult,
  SegmentsStoreType,
} from '@comps/uiComps/SegmentList/types'
import call from '@jg/_core/services/data/LegacyDataService'
import { AllMethods } from '@jg/widgets/EmailAndCom/enum'
import { SegmentDetailInitialValueResult, SegmentDetailStoreType } from '@comps/uiComps/SegmentList/types'

export const useSegmentsStore = create<SegmentsStoreType>((set, get) => ({
  segments: null,
  Rows: 0,
  Key: '',
  isArchive: 0,
  isError: false,
  isLoading: true,
  getSegments: (ClubId: string, PageNo: number, pageSize: number) => {
    const { Key, isArchive } = get()
    call(
      ['GDE/FetchObjects'],
      [
        {
          provider: 'Email',
          arguments: {
            Method: AllMethods.SEGMENTS_BY_CLUB_ID,
            ClubId,
            PageNo,
            Size: pageSize,
            SegmentStatus: isArchive,
            Key: Key,
          },
        },
      ],
      (response: SegmentsInitialValueResult) => {
        if (response.StatusCode !== 200) {
          set({ isError: true })
        } else {
          set((state) => ({
            segments: PageNo == 1 ? response.Result.Segments : state.segments?.concat(response.Result.Segments),
          }))
          set({ Rows: response.Result.Rows })
        }
        set({ isLoading: false })
      }
    )
  },
  setKey: (value: string) => set({ Key: value }),
  setIsArchive: (value: number | null) => set({ isArchive: value }),
  setValueNull: () => set({ segments: null }),
}))

export const useGetSegmentByIdStore = create<SegmentDetailStoreType>((set) => ({
  segment: null,
  isError: false,
  isLoading: true,
  getSegmentDetail: (id: number) => {
    call(
      ['GDE/FetchObjects'],
      [
        {
          provider: 'Email',
          args: {
            Method: AllMethods.GET_SEGMENT_BY_ID,
            Id: id,
          },
        },
      ],
      (response: SegmentDetailInitialValueResult) => {
        if (response.StatusCode !== 200) {
          set({ isError: true })
        } else {
          set({ segment: response.Result })
        }
        set({ isLoading: false })
      }
    )
  },
}))

export const useSegmentDeleteStore = create<SegmentDeleteStoreType>((set) => ({
  isError: false,
  isLoading: true,
  deleteSegment: (id: number) => {
    call(
      ['GoMembership/SaveSegment'],
      [
        {
          Segment: {
            SegmentId: id,
            DeleteSegment: 1,
          },
        },
      ],
      (response: any) => {
        if (response.StatusCode !== 200) {
          set({ isError: true })
        }
        set({ isLoading: false })
      }
    )
  },
}))
