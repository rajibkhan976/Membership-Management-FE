import { EventCategory, EventInfo, GDEResponse, GenericErrorResponse, ClubSummary } from '@jg/common/types'
import { ResponseBase } from '@jg/common/types/common/ResponseBase'
import AppStore from '@jg/store/store'
import call from '@jg/_core/services/data/LegacyDataService'
import populateClubSummary from '../_helpers/populateClubSummary'
import populatetEventInfo from '../_helpers/populatetEventInfo'
import { IsAthenticated } from '@jg/_core/Authorization'

export type SummaryEventsHomeResponse = ResponseBase & {
  categories: EventCategory[]
  featuredEvents: EventInfo[]
  clubEvents: EventInfo[]
  nearbyEvents: EventInfo[]
  ngbEvents: EventInfo[]
  clubSummary: ClubSummary[]
  regionalEvents: EventInfo[]
  subRegionalEvents: EventInfo[]
}
export type GetSummaryEventsHomeRequestParams = {
  userLat?: string
  userLng?: string
  distance?: number
  distanceUnit?: string
  count?: number
  IsShop?: boolean
}
const GetSummaryEventsHomeRequest = (params: GetSummaryEventsHomeRequestParams) => {
  const { userLat, userLng, distance, distanceUnit, count, IsShop } = params
  return new Promise<SummaryEventsHomeResponse>((resolve, reject) => {
    const response: SummaryEventsHomeResponse = {
      categories: [],
      featuredEvents: [],
      clubEvents: [],
      nearbyEvents: [],
      ngbEvents: [],
      clubSummary: [],
      regionalEvents: [],
      subRegionalEvents: [],
    }
    const svcBaseName = IsAthenticated() ? 'GDE/FetchObjects' : 'GDE/FetchObjectsPublic'
    const argFeaturedEvents = {
      Method: 'FeaturedEvents',
      NumberOfRows: count,
      IsShop,
    }
    const argMyClubEvents = {
      Method: 'MyClubEvents',
      NumberOfRows: count,
      IsShop,
    }
    //"Dist":1000, "Unit": "mile"

    const argNearbyEvents = {
      Method: 'FindEvents',
      SortByRegion: { Lat: userLat, Lng: userLng },
      //Dist: distance,
      //Unit: distanceUnit?.toLowerCase(),
      Distance: { Lat: userLat, Lng: userLng, Dist: distance, Unit: distanceUnit?.toLowerCase() },
      ExcludeOnlineEvent: true,
      SortBy: 'distance',
      PageNumber: 1,
      NumberOfRows: count,
      IsShop,
    }
    const argEventsByCategory = {
      Method: 'EventCategorySummary',
      NumberOfRows: count,
      IsShop,
    }
    const argNGBEvents = {
      Method: 'FindEvents',
      Provider: [0],
      SortBy: 'date',
      PageNumber: 1,
      NumberOfRows: count,
      IsShop,
    }
    const argClubSummary = {
      Method: 'MyClubSummary',
      NumberOfRows: count,
      IsShop,
    }
    const argRegionalEvents = {
      Method: 'MyRegionalEvents',
      NumberOfRows: count,
      IsShop,
    }
    const argSubRegionalEvents = {
      Method: 'MySubRegionEvents',
      NumberOfRows: count,
      IsShop,
    }
    call(
      [svcBaseName, svcBaseName, svcBaseName, svcBaseName, svcBaseName, svcBaseName, svcBaseName, svcBaseName],
      [
        { provider: 'Event', args: argFeaturedEvents },
        { provider: 'Event', args: argMyClubEvents },
        { provider: 'Event', args: argNearbyEvents },
        { provider: 'Event', args: argEventsByCategory },
        { provider: 'Event', args: argNGBEvents },
        { provider: 'Event', args: argClubSummary },
        { provider: 'Event', args: argRegionalEvents },
        { provider: 'Event', args: argSubRegionalEvents },
      ],
      (
        resFeatureEvents: GDEResponse,
        resMyClubEvents: GDEResponse,
        resNearbyEvents: GDEResponse,
        resEventsByCategory: GDEResponse,
        resNGBEvents: GDEResponse,
        resClubSummary: GDEResponse,
        resRegionalEvents: GDEResponse,
        resSubRegionalEvents: GDEResponse
      ) => {
        console.log('argsFeatureEvent', argFeaturedEvents)
        console.log(
          '"GDE/FetchObjects"',
          params,
          resFeatureEvents,
          resMyClubEvents,
          resNearbyEvents,
          resEventsByCategory,
          resNGBEvents,
          resClubSummary,
          resRegionalEvents,
          resSubRegionalEvents
        )
        // console.log('club resNGBEvents: ', resNGBEvents)
        // console.log('club resClubSummary: ', resClubSummary)
        //  console.log('club resRegionalEvents: ', resRegionalEvents)
        response.success = true

        if (resFeatureEvents?.StatusCode === 200) {
          const items = resFeatureEvents.Result as any[]
          response.featuredEvents = items.map((item) => populatetEventInfo(item)) as EventInfo[]
        }
        if (resMyClubEvents?.StatusCode === 200) {
          const items = resMyClubEvents.Result as any[]
          response.clubEvents = items.map((item) => populatetEventInfo(item)) as EventInfo[]
        }
        if (resNearbyEvents?.StatusCode === 200) {
          //@ts-ignore
          const items = resNearbyEvents.Result.Data as any[]
          response.nearbyEvents = items.map((item) => populatetEventInfo(item)) as EventInfo[]
        }
        if (resNGBEvents?.StatusCode === 200) {
          //@ts-ignore
          const items = resNGBEvents.Result.Data as any[]
          response.ngbEvents = items.map((item) => populatetEventInfo(item)) as EventInfo[]
        }
        // console.log('response.regionalEvents items', resRegionalEvents)
        if (resRegionalEvents?.StatusCode === 200) {
          const items = resRegionalEvents.Result as any[]
          // console.log('response.regionalEvents items', items)
          try {
            response.regionalEvents = items.map((item) => populatetEventInfo(item)) as EventInfo[]
          } catch (ex) {
            console.log('error on regionalEvents', ex)
          }

          //console.log('RegionalEvents', response.regionalEvents)
        }
        if (resSubRegionalEvents?.StatusCode === 200) {
          const items = resSubRegionalEvents.Result as any[]
          // console.log('response.subregionalEvents items', items)
          try {
            response.subRegionalEvents = items.map((item) => populatetEventInfo(item)) as EventInfo[]
          } catch (ex) {
            console.log('error on sub regionalEvents', ex)
          }

          //  console.log('sub RegionalEvents', response.subRegionalEvents)
        }
        if (resClubSummary?.StatusCode === 200) {
          //@ts-ignore
          const items = resClubSummary.Result as any[]
          // console.log('CLUB SUMMARY ', items)

          try {
            response.clubSummary = items.map((item) => populateClubSummary(item)) as ClubSummary[]
          } catch (ex) {
            console.log('error on clubsummary', ex)
          }
          // console.log('sub clubSummary', response.clubSummary)

          // const BaseAppPath = AppStore.getState().BaseAppPath
          // response.clubSummary = items.map(({ ClubId, ClubImg, ClubName, ClubType, EventsCount }) => {
          //   const clubImg =
          //     ClubImg && ClubImg !== 'Virtual'
          //       ? `${BaseAppPath}Store/downloadPublic?f=${ClubImg}&t=repo&p=${ClubId}&p1=&p2=2`
          //       : ''
          //   return {
          //     clubId: ClubId,
          //     clubImg,
          //     clubName: ClubName,
          //     clubType: ClubType,
          //     eventsCount: EventsCount,
          //   }
          // })
        }
        if (resEventsByCategory?.StatusCode === 200) {
          const BaseAppPath = AppStore.getState().BaseAppPath
          const items = resEventsByCategory.Result as any[]
          response.categories = items.map(({ Category, EventsCount, DisplayName, Image }) => {
            const imgSrc =
              Image && Image !== 'Virtual' ? `${BaseAppPath}Store/downloadPublic?f=${Image}&t=eventcategory` : ''
            return {
              name: Category,
              displayName: DisplayName,
              eventsCount: EventsCount,
              imgSrc,
            }
          })
        }

        resolve(response)
      },
      (err: any) => {
        const error: GenericErrorResponse = {
          message: 'Error occured while fetching event summary!',
        }
        reject(error)
      }
    )
  })
}

export default GetSummaryEventsHomeRequest
