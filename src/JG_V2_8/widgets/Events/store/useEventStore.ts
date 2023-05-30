// import { getEventCategorySummary } from "@jg/common/dataAPIs/eventsAnsSchedules/GetSummaryEventsHomeRequest";
import { FilterOptionDataSchema } from '@jg/common/dataAPIs/eventsAnsSchedules/schemas/FilterOptionDataSchema'
import { AsyncStatus, ClubSummary, EventCategory, EventInfo } from '@jg/common/types'
import create from 'zustand'
import { getEventInfos, getEventCategories } from './DemoData'
import SaveAEventForAUserRequest from '@jg/common/dataAPIs/eventsAnsSchedules/SaveAEventForAUserRequest'
import { WaitlistSourceType } from '@jg/common/types/eventsAnsSchedules/WaitlistSource'
import { MyBookingsDetails } from '@jg/common/types/eventsAnsSchedules/MyBookingsDetailsResponse'

export type EventListingType =
  | 'featured'
  | 'ownedByClubs'
  | 'nearby'
  | 'ownedByProvider'
  | 'searchResults'
  | 'nearbyRelavant'
  | 'providerEvents'
  | 'ngbEvents'
  | 'regionalEvents'
  | 'subRegionalEvents'

type EventSummaryType = {
  featuredEvents: EventInfo[]
  clubEvents: EventInfo[]
  nearbyEvents: EventInfo[]
  categories?: EventCategory[]
  ngbEvents?: EventInfo[]
  clubSummary?: ClubSummary[]
  regionalEvents?: EventInfo[]
  subRegionalEvents?: EventInfo[]
}

export type SearchRequestArg = {
  key?: string
  date?: string[]
  latlng?: string
  category?: string[]
  provider?: string[]
  price?: string[]
  distance?: string
  isOnline?: boolean
  sortBy?: string
  orderBy?: 'asc' | 'desc'
  isFeatured?: boolean
  installment?: boolean
  isSaved?: boolean
}

export type LocalFilterArgs = {
  isSavedByUser?: boolean
}

export type locationData = {
  lat: string
  lng: string
  locationName: string
}
interface EventStorage {
  prevNavOfDetailsPage: string | null
  setPrevNavOfDetailsPage: (path: string) => void
  eventDetails: EventInfo
  localFilterArgs: LocalFilterArgs
  setLocalFilterArgs: (localFilterArgs: LocalFilterArgs) => void
  featuredEvents: EventInfo[]
  nearbyEvents: EventInfo[]
  clubEvents: EventInfo[]
  ownedByProviderEvents: EventInfo[]
  ngbEvents: EventInfo[]
  clubSummary: ClubSummary[]
  regionalEvents: EventInfo[]
  subRegionalEvents: EventInfo[]
  categories?: EventCategory[]
  setSummary: (summaryInfo: { summary?: EventSummaryType; status?: AsyncStatus }) => void
  summaryStatus: AsyncStatus
  finderStatus: AsyncStatus
  setFinderStatus: (status?: AsyncStatus) => void
  searchResultsByPage?: EventInfo[]
  searchResultsByPageCached?: EventInfo[]
  searchCount: number
  MaxPrice?: number
  MinPrice?: number
  setSearchResults: (setSearchResults: EventInfo[], count: number, MaxPrice?: number, MinPrice?: number) => void
  searchRequestArg: SearchRequestArg
  setSerachRequestArg: (arg: SearchRequestArg) => void
  nearbyRelavantEvents: EventInfo[]
  providerEvents: EventInfo[]
  setEventDetails: (eventDetils: EventInfo, nearbyRelavantEvents: EventInfo[], providerEvents: EventInfo[]) => void
  filterBarData?: FilterOptionDataSchema | null
  setFilterBarData: (filterBarData?: FilterOptionDataSchema) => void
  locationData: locationData
  setFinderLatLng: (locationData: locationData) => void
  filterBarReadyStatus: AsyncStatus
  setFilterbarReadyStatus: (isFilterBarReady: AsyncStatus) => void
  saveEventForUser: (eventDocId: number, isSaved: boolean) => void
  showMap?: boolean
  toggleShowMap?: () => void
  immuteIsSaved: (
    eventDocId: number,
    isSaved: boolean,
    list: EventInfo[]
  ) => { tobeUpdated: boolean; list: EventInfo[] }
  saveWaitlist: (ticketDocId: number, entityIds: number[], source: WaitlistSourceType) => void
  eventCountByCalendarView: number
  setEventCountByCalendarView: (count: number) => void
  myBookingsDetails: MyBookingsDetails[]
  setMyBookingsDetails: (myBookingsDetails: MyBookingsDetails[]) => void
}

const useEventStore = create<EventStorage>((set, get) => ({
  prevNavOfDetailsPage: null,
  setPrevNavOfDetailsPage: (path) => {
    set({ prevNavOfDetailsPage: path })
  },
  eventDetails: { docId: -1, tickets: [], category: '' },
  localFilterArgs: { isSavedByUser: false },
  setLocalFilterArgs: (localFilterArgs) => {
    set({ localFilterArgs })
    if (localFilterArgs.isSavedByUser) {
      const resIsSaved = [...(get().searchResultsByPageCached || [])]?.filter((e) => e.isSavedByUser === true)
      set({
        searchResultsByPage: resIsSaved,
        searchCount: resIsSaved?.length,
      })
    } else
      set({
        searchResultsByPage: [...(get().searchResultsByPageCached || [])],
        searchCount: get().searchResultsByPageCached?.length,
      })
  },
  nearbyEvents: getEventInfos(0),
  nearbyRelavantEvents: getEventInfos(0),
  providerEvents: getEventInfos(0),
  featuredEvents: [],
  ngbEvents: [],
  clubSummary: [],
  regionalEvents: [],
  subRegionalEvents: [],
  clubEvents: getEventInfos(0),
  ownedByProviderEvents: getEventInfos(0),
  categories: getEventCategories(0),
  summaryStatus: 'idle',
  setSummary: ({ summary, status }) => {
    if (summary) set(summary)
    if (status) set({ summaryStatus: status })
  },
  setEventDetails: (eventDetails, nearbyRelavantEvents, providerEvents) => {
    set({ eventDetails: eventDetails, nearbyRelavantEvents, providerEvents })
  },
  searchResultsByPage: [],
  searchResultsByPageCashed: [],
  searchCount: 0,
  MaxPrice: 10000,
  MinPrice: 0,
  setSearchResults: (searchResults, count, MaxPrice, MinPrice) => {
    const cloned = [...searchResults]
    if (get().localFilterArgs.isSavedByUser) {
      const resIsSaved = searchResults.filter((e) => e.isSavedByUser === true)
      set({ searchResultsByPage: resIsSaved, searchResultsByPageCached: cloned, searchCount: resIsSaved.length })
    } else
      set({
        searchResultsByPage: searchResults,
        searchResultsByPageCached: cloned,
        searchCount: count,
        MaxPrice,
        MinPrice,
      })
  },
  searchRequestArg: { key: '' },
  setSerachRequestArg: (arg) => {
    const searchRequestArg = get().searchRequestArg
    // const updated = _.merge(args, arg)
    set({ searchRequestArg: { ...searchRequestArg, ...arg } })
    // set({ searchRequestArg: { key: updated.key, timeSpan: updated.timeSpan, latLng: updated.timeSpan } })
  },
  filterBarData: null,
  setFilterBarData: (filterBarData) => {
    set({ filterBarData: filterBarData })
  },
  locationData: { lat: '', lng: '', locationName: '' },
  setFinderLatLng: (locationData) => {
    set({ locationData })
  },
  finderStatus: 'idle',
  setFinderStatus: (status) => {
    set({ finderStatus: status })
  },
  filterBarReadyStatus: 'idle',
  setFilterbarReadyStatus: (filterBarReady) => {
    set({ filterBarReadyStatus: filterBarReady })
  },
  immuteIsSaved: (eventDocId: number, isSaved: boolean, list: EventInfo[]) => {
    const res = [...list]
    let tobeUpdated = false
    for (let i = 0; i < res.length; i++) {
      if (res[i].docId === eventDocId) {
        res[i].isSavedByUser = isSaved
        tobeUpdated = true
        break
      }
    }
    return { tobeUpdated, list: res }
  },
  saveEventForUser: (eventDocId, isSaved) => {
    return SaveAEventForAUserRequest({ docId: eventDocId, isSaved: isSaved }).then((res) => {
      const items = [
        'featured',
        'ownedByClubs',
        'nearby',
        'ownedByProvider',
        'searchResults',
        'nearbyRelavant',
        'providerEvents',
        'ngbEvents',
        'regionalEvents',
        'subRegionalEvents',
      ]
      // const totalEvents: EventInfo[] = []
      items.forEach((item) => {
        switch (item) {
          case 'featured':
            {
              const { list, tobeUpdated } = get().immuteIsSaved(eventDocId, isSaved, get().featuredEvents)
              if (tobeUpdated) set({ featuredEvents: list })
            }
            break
          case 'nearby':
            {
              const { list, tobeUpdated } = get().immuteIsSaved(eventDocId, isSaved, get().nearbyEvents)
              if (tobeUpdated) set({ nearbyEvents: list })
            }

            break
          case 'ownedByClubs':
            {
              const { list, tobeUpdated } = get().immuteIsSaved(eventDocId, isSaved, get().clubEvents)
              if (tobeUpdated) set({ clubEvents: list })
            }
            // res.push(...get().clubEvents)
            break
          case 'ownedByProvider':
            {
              const { list, tobeUpdated } = get().immuteIsSaved(eventDocId, isSaved, get().ownedByProviderEvents)
              if (tobeUpdated) set({ ownedByProviderEvents: list })
            }
            // res.push(...get().ownedByProviderEvents)
            break
          case 'searchResults':
            {
              const { list, tobeUpdated } = get().immuteIsSaved(
                eventDocId,
                isSaved,
                get().searchResultsByPageCached || []
              )
              if (tobeUpdated) {
                if (get().localFilterArgs.isSavedByUser) {
                  const resIsSaved = list.filter((e) => e.isSavedByUser === true)
                  set({ searchResultsByPage: resIsSaved, searchCount: resIsSaved.length })
                } else set({ searchResultsByPage: list, searchCount: list.length })
              }
              set({ ownedByProviderEvents: list })
            }
            // res.push(...(get().searchResultsByPageCached || []))
            break
          case 'nearbyRelavant':
            {
              const { list, tobeUpdated } = get().immuteIsSaved(eventDocId, isSaved, get().nearbyRelavantEvents)
              if (tobeUpdated) set({ nearbyRelavantEvents: list })
            }
            //  res.push(...get().nearbyRelavantEvents)
            break
          case 'providerEvents':
            {
              const { list, tobeUpdated } = get().immuteIsSaved(eventDocId, isSaved, get().providerEvents)
              if (tobeUpdated) set({ providerEvents: list })
            }
            //res.push(...get().providerEvents)
            break
          case 'ngbEvents':
            {
              const { list, tobeUpdated } = get().immuteIsSaved(eventDocId, isSaved, get().ngbEvents)
              if (tobeUpdated) set({ ngbEvents: list })
            }
            //  res.push(...get().ngbEvents)
            break
          case 'regionalEvents':
            {
              const { list, tobeUpdated } = get().immuteIsSaved(eventDocId, isSaved, get().regionalEvents)
              if (tobeUpdated) set({ regionalEvents: list })
            }
            //res.push(...get().regionalEvents)
            break
          case 'subRegionalEvents':
            {
              const { list, tobeUpdated } = get().immuteIsSaved(eventDocId, isSaved, get().subRegionalEvents)
              if (tobeUpdated) set({ subRegionalEvents: list })
            }
            // res.push(...get().subRegionalEvents)
            break
        }
      })

      return res
    })
  },
  showMap: true,
  toggleShowMap: () => set((state) => ({ showMap: !state.showMap })),
  saveWaitlist: (ticketDocId, entityIds, source) => {},
  eventCountByCalendarView: 0,
  setEventCountByCalendarView: (count) => set({ eventCountByCalendarView: count }),
  myBookingsDetails: [],
  setMyBookingsDetails: (myBookingsDetails) => {
    const prevMyBookingsDetails = get()?.myBookingsDetails
    const paymentReceiptDocIdList: number[] = []
    const filteredMyBookingsDetails: MyBookingsDetails[] = []
    prevMyBookingsDetails?.length > 0 &&
      prevMyBookingsDetails?.forEach((e) => {
        if (!paymentReceiptDocIdList.includes(e?.paymentReceiptDocId)) {
          paymentReceiptDocIdList.push(e?.paymentReceiptDocId)
          filteredMyBookingsDetails.push(e)
        }
      })
    myBookingsDetails?.length > 0 &&
      myBookingsDetails?.forEach((e) => {
        if (!paymentReceiptDocIdList.includes(e?.paymentReceiptDocId)) {
          paymentReceiptDocIdList.push(e?.paymentReceiptDocId)
          filteredMyBookingsDetails.push(e)
        }
      })
    set({ myBookingsDetails: filteredMyBookingsDetails })
  },
}))

export default useEventStore
