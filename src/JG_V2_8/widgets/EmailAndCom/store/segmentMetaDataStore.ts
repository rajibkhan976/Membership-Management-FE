import call from '@jg/_core/services/data/LegacyDataService'
import create from 'zustand'
import { AllMethods } from '@jg/widgets/EmailAndCom/enum'
import type { SegmentMeta } from './type'
import type { segmentMetaDataResponse } from './type'

const useSegmentMetaData = create<SegmentMeta>((set) => ({
  items: null,
  fetch: (id: number) => {
    call(
      ['GDE/FetchObjects'],
      [
        {
          provider: 'Email',
          args: {
            Method: AllMethods.GET_META_DATA_FOR_SEGMENT,
            OwningEntityId: id,
          },
        },
      ],
      (response: segmentMetaDataResponse) => {
        if (response.StatusCode === 200) {
          // set({ emailDetails: response.Result, isLoading: false })
          // console.log(response.Result)
        }
      }
    )
  },
}))

export { useSegmentMetaData }
