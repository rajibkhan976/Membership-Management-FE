import { GenericErrorResponse } from '@jg/common/types'
import { ResponseBase } from '@jg/common/types/common/ResponseBase'
import call from '@jg/_core/services/data/LegacyDataService'
import { PublishableAttendeesSchema } from './schemas/PublishableAttendeesSchema'
export type GetPublishableAttendeesParams = {
  exId: number
  docId: number
}

export type GetPublishableAttendeesResponse = ResponseBase & {
  result: PublishableAttendeesSchema
}
const GetPublishableAttendeesRequest = (params: GetPublishableAttendeesParams) => {
  return new Promise<GetPublishableAttendeesResponse>(function (resolve, reject) {
    const response: GetPublishableAttendeesResponse = {
      result: {} as PublishableAttendeesSchema,
    }
    const args = {
      Method: 'GetPublishableAttendees',
      exId: 4,
      docId: 87571,
    }
    call(
      ['GoMembership/GetPublishableAttendees'],
      [args],
      (res: any) => {
        response.success = true
        if (!res.error) {
          response.result = res
          console.log('GoMembership/GetPublishableAttendees response', response.result)
        }
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

export default GetPublishableAttendeesRequest
