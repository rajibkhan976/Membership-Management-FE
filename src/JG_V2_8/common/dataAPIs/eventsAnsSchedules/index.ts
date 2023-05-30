import GetSummaryEventsHomeRequest, {
  GetSummaryEventsHomeRequestParams,
  SummaryEventsHomeResponse,
} from './GetSummaryEventsHomeRequest'
import GetFindEventsRequest, { FindEventsHomeResponse, GetFindEventsRequestParams } from './GetFindEventsRequest'
import GetEventDetailsRequest from './GetEventDetailsRequest'
import GetSetupDataForFindEventsRequest from './GetSetupDataForFindEventsRequest'
import { GetSetupDataForFindEventsResponse, GetSetupDataForFindEventsParams } from './GetSetupDataForFindEventsRequest'
import SaveAEventForAUserRequest, { SaveAEventForAUserParams } from './SaveAEventForAUserRequest'
import EvaluateTicketForEntity, {
  EvaluateTicketForEntityParams,
  EvaluateTicketForEntityResponse,
} from './EvaluateTicketForEntity'
import ValidateStock, { ValidateStockParams, ValidateStockResponse } from './ValidateStock'
import GetCourseBookingDataRequest, {
  GetCourseBookingDataParams,
  GetCourseBookingDataResponse,
} from './GetCourseBookingDataRequest'
import SaveWaitlist, { SaveWaitlistParams, SaveWaitlistResponse } from './SaveWaitlist'
import GetMyBookingsDetailsRequest, { GetMyBookingsDetailsParams } from './GetMyBookingsDetailsRequest'
import GetMultipleEventDetailsRequest, { GetMultipleEventDetailsParams } from './GetMultipleEventDetailsRequest'
import GetBookedMembersRequest from './GetBookedMembersRequest'
//export type { GetSummaryEventsHomeRequestParams } from './eventsAnsSchedules/GetSummaryEventsHomeRequest'

const useEventsAndScheduleApi = () => ({
  GetSetupDataForFindEventsRequest,
  GetSummaryEventsHomeRequest,
  GetFindEventsRequest,
  GetEventDetailsRequest,
  GetCourseBookingDataRequest,
  GetMyBookingsDetailsRequest,
  GetMultipleEventDetailsRequest,
  GetBookedMembersRequest,
})

export default useEventsAndScheduleApi

export { ValidateStock, EvaluateTicketForEntity, SaveAEventForAUserRequest, SaveWaitlist }

export type {
  GetSummaryEventsHomeRequestParams,
  SummaryEventsHomeResponse,
  GetSetupDataForFindEventsResponse,
  GetSetupDataForFindEventsParams,
  FindEventsHomeResponse,
  GetFindEventsRequestParams,
  SaveAEventForAUserParams,
  EvaluateTicketForEntityParams,
  EvaluateTicketForEntityResponse,
  ValidateStockParams,
  ValidateStockResponse,
  GetCourseBookingDataParams,
  GetCourseBookingDataResponse,
  SaveWaitlistParams,
  SaveWaitlistResponse,
  GetMyBookingsDetailsParams,
  GetMultipleEventDetailsParams,
}
