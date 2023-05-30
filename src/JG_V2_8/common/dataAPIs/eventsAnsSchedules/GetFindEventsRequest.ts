import { EventInfo, GDEResponse, GenericErrorResponse } from '@jg/common/types'
import { ResponseBase } from '@jg/common/types/common/ResponseBase'
import call from '@jg/_core/services/data/LegacyDataService'
import populatetEventInfo from '../_helpers/populatetEventInfo'
import { IsAthenticated } from '@jg/_core/Authorization'

export type GetFindEventsRequestParams = {
  key?: string
  date?: string[]
  categories?: { [key: string]: string[] }
  price?: number[]
  isOnline: boolean
  isSaved: boolean
  isFeatured: boolean
  provider?: number[]
  sortBy: string
  orderBy: string
  latlng?: string
  distance?: string
  InstallmentAvailable?: boolean
  distanceUnit?: string
  pageNumber: number
  numberOfRows: number
  IsShop?: boolean
}

export type FindEventsHomeResponse = ResponseBase & {
  events: EventInfo[]
  count: number
  MaxPrice?: number
  MinPrice?: number
}

type ResultType = {
  Data: any[]
  Count: number
  MaxPrice: number
  MinPrice: number
}

const GetFindEventsRequest = (params: GetFindEventsRequestParams) => {
  const {
    key,
    date,
    provider,
    categories,
    price,
    latlng,
    distance,
    distanceUnit,
    isOnline,
    isSaved,
    isFeatured,
    sortBy,
    orderBy,
    pageNumber,
    numberOfRows,
    IsShop,
    InstallmentAvailable,
  } = params
  return new Promise<FindEventsHomeResponse>(function (resolve, reject) {
    const response: FindEventsHomeResponse = {
      events: [],
      count: 0,
    }
    const findEventArg: any = {
      Method: 'FindEvents',
      key: key, // works
      // Date: date,// works
      Categories: categories, // works
      //Price: price,
      Provider: provider, // works
      OrderBy: orderBy,
      // IsOnline: isOnline, // works
      // IsFeatured: isFeatured,
      SortBy: sortBy, // works
      PageNumber: pageNumber, // todo
      NumberOfRows: numberOfRows, // todo
      //Distance: { Lat: 53.429108, Lng: -2.500953, Dist: 1, Unit: 'mile' },
      IsShop,
      InstallmentAvailable,
    }

    //date
    if (date && date.length) {
      if (date[0] !== 'all') findEventArg['Date'] = date
    }
    // price
    if (price && price.length) {
      findEventArg['Price'] = price
    }
    //online
    if (isOnline) {
      findEventArg['IsOnline'] = isOnline
    }
    //featured
    if (isFeatured) {
      findEventArg['IsFeatured'] = isFeatured
    }

    if (distance === 'all' && sortBy === 'distance') {
      const parts = (latlng || '0|0').split('|')
      findEventArg['SortByRegion'] = { Lat: parts[0], Lng: parts[1] }
    } else if (distance && distance != 'all') {
      const parts = (latlng || '0|0').split('|')
      findEventArg['Distance'] = {
        Lat: parts[0],
        Lng: parts[1],
        Dist: Number(distance),
        Unit: distanceUnit?.toLocaleLowerCase(),
      }
    }

    const argFindEvents = { provider: 'Event', args: findEventArg }
    const svcBaseName = IsAthenticated() ? 'GDE/FetchObjects' : 'GDE/FetchObjectsPublic'
    console.log('argFindEvents', argFindEvents, categories, price)
    call(
      [svcBaseName],
      [argFindEvents],
      (res: GDEResponse) => {
        console.log('"GDE/FetchObjects"', res)
        response.success = true
        if (res.StatusCode === 200) {
          const result = res.Result as ResultType
          response.count = result.Count
          response.events = result.Data.map((item) => populatetEventInfo(item)) as EventInfo[]
          response.MaxPrice = result.MaxPrice
          response.MinPrice = result.MinPrice
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

export default GetFindEventsRequest
