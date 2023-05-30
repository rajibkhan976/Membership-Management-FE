import { EventInfo, GDEResponse, GenericErrorResponse } from '@jg/common/types'
import { MultipleEventDetailsResponse } from '@jg/common/types/eventsAnsSchedules/MultipleEventDetailsResponse'
import call from '@jg/_core/services/data/LegacyDataService'
import populatetEventInfo from '../_helpers/populatetEventInfo'

export type GetMultipleEventDetailsParams = {
  DocIds: number[]
}

type ResultType = {
  eventDetails: EventInfo[]
}

const GetMultipleEventDetailsRequest = (params: GetMultipleEventDetailsParams) => {
  const { DocIds } = params
  return new Promise<MultipleEventDetailsResponse>(function (resolve, reject) {
    const response: MultipleEventDetailsResponse = {
      eventDetails: [],
    }
    const getMultipleEventDetailsArg = {
      Method: 'GetMultipleEventDetails',
      DocIds: DocIds,
    }
    const multipleEventDetailsArg = { provider: 'Event', args: getMultipleEventDetailsArg }

    call(
      ['GDE/FetchObjects'],
      [multipleEventDetailsArg],
      (res: GDEResponse) => {
        response.success = true
        if (res.StatusCode === 200) {
          try {
            const result = res?.Result as ResultType[]
            response.eventDetails = result?.map((item) => populatetEventInfo(item)) as EventInfo[]
          } catch (ex) {
            console.log(ex)
          }
        }
        resolve(response)
      },
      (error: any) => {
        const errorObj: GenericErrorResponse = {
          message: 'Error occured while fetching event summary!',
        }
        reject(errorObj)
      }
    )
  })
}

export default GetMultipleEventDetailsRequest
