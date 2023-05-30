import { addressInfo, dateTimeInfo, latlngInfo, entityInfo } from '@jg/common/types'

import { EventPriceSettings } from './EventPriceSettings'
import { TicketInfo } from './TicketInfo'

export interface EventContact {
  // DocId: number
  Emailaddress: string
  Firstname: string
  Image: string
  Lastname: string
  MemberId: string
  Phonenumber: string
  Role: string
  UserId?: number
}

export interface Attendees {
  FirstName: string
  LastName: string
  Town: string
  TicketName: string
  PurchaseDate: string
}

export interface EventAdditionalInfoSection {
  // DocId: number
  sections: EventAdditionalInfo[]
}
export interface EventAdditionalInfo {
  caption: string
  contentComp: string
  contentData: string
  icon: string
  title: string
}
export type FixturesInfo = {
  docId: number
  fixtureCategory: string
  fixtureName: string
  description: string
  fixtureId: string
  fixtureDate: dateTimeInfo
}
export type EventInfo = {
  docId: number
  name?: string
  details?: string
  reference?: string
  isFeatured?: boolean
  isPrivate?: boolean
  locationType?: string
  status?: string
  imgSrc?: string
  category: string
  subCategories?: string
  address?: addressInfo
  latlng?: latlngInfo
  ownerEntity?: entityInfo
  starts?: dateTimeInfo
  ends?: dateTimeInfo
  bookingEnds?: dateTimeInfo
  timezoneId?: number
  hideDateTime?: boolean
  alternateMessageForDate?: string
  calendarInviteEnabled?: boolean
  priceSettings?: EventPriceSettings
  tickets: TicketInfo[]
  contacts?: EventContact[]
  eventLocation?: string
  attendees?: Attendees[]
  isPublishAttendee?: boolean
  publishAttendeeConfig?: string
  noOfBookings?: number
  additionalInfo?: EventAdditionalInfoSection
  tag?: string
  eventImage?: string
  waitListEnabled?: boolean
  notifyMeEnabled?: boolean
  isBookedByUser?: boolean
  isSavedByUser?: boolean
  isInstallmentEnabled?: boolean
  fixtures?: FixturesInfo[]
  eventDocIdHash?: string
}
