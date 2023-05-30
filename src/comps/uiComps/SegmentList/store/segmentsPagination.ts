import create from 'zustand'
import type { SegmentPaginationStoreType } from '@comps/uiComps/SegmentList/types'

export const useSegmentPaginationStore = create<SegmentPaginationStoreType>((set) => ({
  pageNumber: 1,
  numberOfRows: 20,
  setPageNumber: (pageNo: number) => {
    set({ pageNumber: pageNo })
  },
}))
