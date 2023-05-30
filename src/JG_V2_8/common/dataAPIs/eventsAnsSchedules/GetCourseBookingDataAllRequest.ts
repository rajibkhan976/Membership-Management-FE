import { GenericErrorResponse } from '@jg/common/types'
import { ResponseBase } from '@jg/common/types/common/ResponseBase'
import call from '@jg/_core/services/data/LegacyDataService'
import { CourseBookingDataAllSchema } from './schemas/CourseBookingDataAllSchema'

export type GetCourseBookingDataAllResponse = ResponseBase & {
  upcommingGetCourseBookingData: CourseBookingDataAllSchema[]
  pastGetCourseBookingData: CourseBookingDataAllSchema[]
}
export type GetCourseBookingDataAllRequestParams = {
  memberDocId?: number
}
const GetCourseBookingDataAllRequest = (params: GetCourseBookingDataAllRequestParams) => {
  const { memberDocId } = params
  return new Promise<GetCourseBookingDataAllResponse>((resolve, reject) => {
    const response: GetCourseBookingDataAllResponse = {
      upcommingGetCourseBookingData: [],
      pastGetCourseBookingData: [],
    }
    const argUpcomingCourseBookingData = {
      primaryDocId: memberDocId,
      memberRepositoryId: 1,
      courseBookingRepositoryId: 6,
      eventRepositoryId: 5,
      fieldIds: [226, 231, 234, 236, 237, 238],
      widgetMode: true,
      noOfBooking: 5000,
      dataSelection: 'Upcoming',
    }
    const argPastCourseBookingData = {
      primaryDocId: memberDocId,
      memberRepositoryId: 1,
      courseBookingRepositoryId: 6,
      eventRepositoryId: 5,
      fieldIds: [226, 231, 234, 236, 237, 238],
      widgetMode: true,
      noOfBooking: 5000,
      dataSelection: 'Past',
    }

    call(
      ['Repo/GetCourseBookingData', 'Repo/GetCourseBookingData'],
      [argUpcomingCourseBookingData, argPastCourseBookingData],
      (resUpcomingCourseBookingData: any, resPastCourseBookingData: any) => {
        console.log(
          'resUpcomingCourseBookingData resPastCourseBookingData, ',
          params,
          resUpcomingCourseBookingData,
          resPastCourseBookingData
        )
        response.success = true
        if (!resUpcomingCourseBookingData.error) {
          const items = resUpcomingCourseBookingData as any[]
          response.upcommingGetCourseBookingData = items as CourseBookingDataAllSchema[]
        }
        if (!resPastCourseBookingData.error) {
          const items = resPastCourseBookingData as any[]
          response.pastGetCourseBookingData = items as CourseBookingDataAllSchema[]
        }
        console.log('response', response)
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

export default GetCourseBookingDataAllRequest
