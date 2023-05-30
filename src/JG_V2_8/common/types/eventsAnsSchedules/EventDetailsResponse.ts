import { ResponseBase } from '../common/ResponseBase'
import { EventInfo } from './EventInfo'

export type EventDetailsResponse = ResponseBase & {
  eventDetails?: EventInfo
  nearByEvents: EventInfo[]
  providerEvents: EventInfo[]
}
