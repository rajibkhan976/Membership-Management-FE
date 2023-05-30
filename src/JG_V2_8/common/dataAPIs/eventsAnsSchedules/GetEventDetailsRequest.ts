import { EventCategory, EventInfo, GDEResponse, GenericErrorResponse } from '@jg/common/types'
import { EventDetailsResponse } from '@jg/common/types/eventsAnsSchedules/EventDetailsResponse'
//import { EventDetailsResponse } from '@jg/common/types/eventsAnsSchedules/EventDetailsResponse'
import call from '@jg/_core/services/data/LegacyDataService'
import populatetEventInfo from '../_helpers/populatetEventInfo'
import { IsAthenticated } from '@jg/_core/Authorization'
export type GetEventDetailsParams = {
  EventDocIdHash?: string
  // DocId: number
  IsShop?: boolean
}
type ResultType = {
  EventInfo: any[]
  NearByEvents: any[]
  ProviderEvents: any[]
}
const GetEventDetailsRequest = (params: GetEventDetailsParams) => {
  const { IsShop, EventDocIdHash } = params
  return new Promise<EventDetailsResponse>(function (resolve, reject) {
    const response: EventDetailsResponse = {
      eventDetails: undefined,
      nearByEvents: [],
      providerEvents: [],
    }
    const getEventDetailsArg = {
      Method: 'GetEventDetails',
      // DocId: DocId,
      IsShop,
      EventDocIdHash: EventDocIdHash,
    }
    const argGetEventDetails = { provider: 'Event', args: getEventDetailsArg }
    const svcBaseName = IsAthenticated() ? 'GDE/FetchObjects' : 'GDE/FetchObjectsPublic'
    call(
      [svcBaseName],
      [argGetEventDetails],
      (res: GDEResponse) => {
        console.log('"GDE/FetchObjects Event Details: "', res)
        response.success = true
        if (res.StatusCode === 200) {
          try {
            const result = res.Result as ResultType
            response.eventDetails = populatetEventInfo(result.EventInfo)
            response.nearByEvents = result.NearByEvents.map((item) => populatetEventInfo(item)) as EventInfo[]
            response.providerEvents = result.ProviderEvents.map((item) => populatetEventInfo(item)) as EventInfo[]
          } catch (ex) {
            console.log(ex)
          }
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

export default GetEventDetailsRequest
