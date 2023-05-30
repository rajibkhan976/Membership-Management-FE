import { CourseBookingSchema } from '@jg/common/dataAPIs/eventsAnsSchedules/schemas/CourseBookingSchema'
import { AsyncStatus } from '@jg/common/types'
import create from 'zustand'

export type CourseBookingSearchRequestArg = {
  docIds: number[]
  selection: 'Upcoming' | 'Past'
  isOnline: boolean
  category?: string[]
}

interface CourseBookingStorage {
  filterBarReadyStatus: AsyncStatus
  setFilterbarReadyStatus: (isFilterBarReady: AsyncStatus) => void
  searchRequestArg: CourseBookingSearchRequestArg
  setSerachRequestArg: (arg: CourseBookingSearchRequestArg) => void
  searchResultsByPage?: CourseBookingSchema[]
  searchResultCount: number
  setSearchResults?: (res: CourseBookingSchema[]) => void
  finderStatus: AsyncStatus
  setFinderStatus: (status?: AsyncStatus) => void
  eventCountByCalendarView: number
  setEventCountByCalendarView: (count: number) => void
}

const useCourseBookingStore = create<CourseBookingStorage>((set, get) => ({
  filterBarReadyStatus: 'idle',
  setFilterbarReadyStatus: (filterBarReadyStatus) => {
    set({ filterBarReadyStatus: filterBarReadyStatus })
  },
  searchRequestArg: { docIds: [], selection: 'Past', isOnline: false },
  setSerachRequestArg: (args: CourseBookingSearchRequestArg) => {
    set({ searchRequestArg: args })
  },
  searchResultsByPage: [],
  searchResultCount: 0,
  finderStatus: 'idle',
  setSearchResults: (res) => {
    set({ searchResultsByPage: res })
    set({ searchResultCount: res.length })
  },
  setFinderStatus: (status) => {
    set({ finderStatus: status })
  },
  eventCountByCalendarView: 0,
  setEventCountByCalendarView: (count) => set({ eventCountByCalendarView: count }),
}))
export default useCourseBookingStore
