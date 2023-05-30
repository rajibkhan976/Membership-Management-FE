import { EventCategory, EventInfo, GDEResponse, GenericErrorResponse } from '@jg/common/types'
import { ResponseBase } from '@jg/common/types/common/ResponseBase'
import { EventDetailsResponse } from '@jg/common/types/eventsAnsSchedules/EventDetailsResponse'
//import { EventDetailsResponse } from '@jg/common/types/eventsAnsSchedules/EventDetailsResponse'
import call from '@jg/_core/services/data/LegacyDataService'
import populatetEventInfo from '../_helpers/populatetEventInfo'
import { FilterOptionDataSchema } from './schemas/FilterOptionDataSchema'
export type SaveAEventForAUserParams = {
  docId: number
  isSaved: boolean
}

export type GetSetupDataForFindEventsResponse = ResponseBase & {
  result: FilterOptionDataSchema
}
const SaveAEventForAUserRequest = ({ docId, isSaved }: SaveAEventForAUserParams) => {
  return new Promise<ResponseBase>(function (resolve, reject) {
    const response: ResponseBase = {}
    console.log({ EventDocId: docId, IsSaved: isSaved })
    call(
      ['GoMembership/SavedEvent'],
      [{ args: { EventDocId: docId, IsSaved: isSaved } }],
      (res: GDEResponse) => {
        response.success = true
        if (res === null) {
          response.messeage = 'OK'
        }
        console.log(res, response)
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

export default SaveAEventForAUserRequest
