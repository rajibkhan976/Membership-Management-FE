import { EventCategory, EventInfo, GDEResponse, GenericErrorResponse } from '@jg/common/types'
import { ResponseBase } from '@jg/common/types/common/ResponseBase'
import { EventDetailsResponse } from '@jg/common/types/eventsAnsSchedules/EventDetailsResponse'
//import { EventDetailsResponse } from '@jg/common/types/eventsAnsSchedules/EventDetailsResponse'
import call from '@jg/_core/services/data/LegacyDataService'
import populatetEventInfo from '../_helpers/populatetEventInfo'
import { FilterOptionDataSchema } from './schemas/FilterOptionDataSchema'
import { IsAthenticated } from '@jg/_core/Authorization'
export type GetSetupDataForFindEventsParams = {
  IsShop?: boolean
}

export type GetSetupDataForFindEventsResponse = ResponseBase & {
  result: FilterOptionDataSchema
}
const GetSetupDataForFindEventsRequest = (params: GetSetupDataForFindEventsParams) => {
  return new Promise<GetSetupDataForFindEventsResponse>(function (resolve, reject) {
    const response: GetSetupDataForFindEventsResponse = {
      result: {} as FilterOptionDataSchema,
    }

    const { IsShop } = params
    const args = {
      Method: 'SetupDataForFindEvents',
      IsShop,
    }
    const argByProvider = { provider: 'Event', args: args }
    const svcBaseName = IsAthenticated() ? 'GDE/FetchObjects' : 'GDE/FetchObjectsPublic'
    call(
      [svcBaseName],
      [argByProvider],
      (res: GDEResponse) => {
        response.success = true
        if (res.StatusCode == 200) {
          response.result = res.Result as FilterOptionDataSchema
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

export default GetSetupDataForFindEventsRequest
