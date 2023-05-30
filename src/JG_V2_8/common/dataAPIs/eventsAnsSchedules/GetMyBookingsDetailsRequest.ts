import call from '@jg/_core/services/data/LegacyDataService'
import { GDEResponse, GenericErrorResponse } from '@jg/common/types'
import {
  MyBookingsDetailsResponse,
  MyBookingsDetails,
} from '@jg/common/types/eventsAnsSchedules/MyBookingsDetailsResponse'
import { populateMyBookingsInfo } from '../_helpers/populateMyBookingsInfo'

export type GetMyBookingsDetailsParams = {
  ProductDocId: number
}

type ResultType = {
  myBookingsDetails: MyBookingsDetails[]
}

const GetMyBookingsDetailsRequest = (params: GetMyBookingsDetailsParams) => {
  const { ProductDocId } = params

  return new Promise<MyBookingsDetailsResponse>((resolve, reject) => {
    const response: MyBookingsDetailsResponse = {
      myBookingsDetails: [],
    }
    const getBookingDetailsArg = {
      Method: 'GetBookingDetails',
      ProductDocId: ProductDocId,
    }
    const bookingDetailsArg = { provider: 'Event', args: getBookingDetailsArg }

    call(
      ['GDE/FetchObjects'],
      [bookingDetailsArg],
      (res: GDEResponse) => {
        response.success = true
        if (res.StatusCode === 200) {
          try {
            const result = res?.Result as ResultType[]
            response.myBookingsDetails = result?.map((item) => populateMyBookingsInfo(item)) as MyBookingsDetails[]
          } catch (error) {
            console.error(error)
          }
        }
        resolve(response)
      },
      (error: any) => {
        const errorObj: GenericErrorResponse = {
          message: 'Error occured while fetching booking details!',
        }
        reject(errorObj)
      }
    )
  })
}

export default GetMyBookingsDetailsRequest
