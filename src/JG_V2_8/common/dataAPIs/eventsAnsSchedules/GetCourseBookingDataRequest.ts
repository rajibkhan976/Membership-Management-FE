import { GDEResponse, GenericErrorResponse } from '@jg/common/types'
import { ResponseBase } from '@jg/common/types/common/ResponseBase'
//import { EventDetailsResponse } from '@jg/common/types/eventsAnsSchedules/EventDetailsResponse'
import call from '@jg/_core/services/data/LegacyDataService'
import { CourseBookingSchema } from './schemas/CourseBookingSchema'

export type GetCourseBookingDataParams = {
  docIds: number[]
  selection: 'Upcoming' | 'Past'
  isOnline: boolean
  Categories?: string[]
}

export type GetCourseBookingDataResponse = ResponseBase & {
  courseBookingByMember: CourseBookingSchema[]
}

const GetCourseBookingDataRequest = ({ docIds, selection, isOnline, Categories }: GetCourseBookingDataParams) => {
  return new Promise<GetCourseBookingDataResponse>(function (resolve, reject) {
    const response: GetCourseBookingDataResponse = {
      courseBookingByMember: [],
    }

    const service: string[] = ['GDE/FetchObjects']
    const args: object[] = []

    const findBookingArg: any = {
      Method: 'GetCourseBookingData',
      MemberDocIds: docIds?.join(',') ?? '',
      NoOfBooking: 5000,
      DataSelection: selection,
      Categories,
    }

    if (isOnline) {
      findBookingArg.IsOnline = isOnline
    }

    args.push({
      provider: 'Event',
      args: findBookingArg,
    })

    console.log(args)

    call(
      service,
      args,
      function (...result: any) {
        // console.log(result)
        const list = Array.prototype.slice.call(result)
        list.forEach((e: GDEResponse) => {
          response.courseBookingByMember = [...response.courseBookingByMember, ...(e.Result as CourseBookingSchema[])]
        })
        //console.log(response)
        response.success = true
        resolve(response)
      },
      (_err: any) => {
        const error: GenericErrorResponse = {
          message: 'Error occured while fetching event summary!',
        }
        reject(error)
      }
    )
  })
}

export default GetCourseBookingDataRequest
