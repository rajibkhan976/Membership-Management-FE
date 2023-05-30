import { ResponseBase } from '../common/ResponseBase'
import { EventInfo } from './EventInfo'

export type MultipleEventDetailsResponse = ResponseBase & {
  eventDetails: EventInfo[]
}
