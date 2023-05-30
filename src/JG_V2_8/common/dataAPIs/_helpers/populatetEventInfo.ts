import { addressInfo, EventContact, EventInfo, TicketInfo } from '@jg/common/types'
import {
  EventAdditionalInfo,
  EventAdditionalInfoSection,
  FixturesInfo,
} from '@jg/common/types/eventsAnsSchedules/EventInfo'
import AppStore from '@jg/store/store'
import populateAddress from './populateAddress'
import populateDateTime from './populateDateTime'
import populateEntityinfo from './populateEntityinfo'
import populateEventPriceSettings from './populateEventPriceSettings'
import populateFixturesInfo from './populateFixturesInfo'
import populateLatLng from './populateLatLng'
import populateTickets from './populateTickets'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (rawData: any): EventInfo => {
  const BaseAppPath = AppStore.getState().BaseAppPath
  const location = rawData.Location || rawData.EventImage
  const docId = rawData.DocId
  const eventDocIdHash = rawData.EventDocIdHash
  const imgSrc =
    location && location !== 'Virtual'
      ? `${BaseAppPath}Store/downloadPublic?f=${location}&t=repo&p=${docId}&p1=&p2=5`
      : ''
  return {
    docId,
    eventDocIdHash,
    details: rawData.EventDetail,
    name: rawData.EventName,
    category: rawData.EventCategory,
    isFeatured: rawData.IsFeaturedEvent,
    reference: rawData.EventReference,
    isPrivate: rawData.PrivateEvent,
    locationType: rawData.LocationType,
    eventLocation: rawData.EventLocation,
    status: rawData.Status,
    imgSrc,
    subCategories: rawData.SubCategories,
    address: populateAddress(rawData.Address),
    latlng: populateLatLng(rawData.Latlng),
    ownerEntity: populateEntityinfo(rawData.EntityInfo),
    starts: populateDateTime({
      ...rawData.Starts,
      hideDateTime: rawData.HideEventDate,
      alternateMessageForDate: rawData.AlternateMessageForDate,
    }),
    ends: populateDateTime(rawData.Ends),
    bookingEnds: populateDateTime(rawData.BookingEnds),
    timezoneId: rawData.TimeZoneId,
    hideDateTime: rawData.HideEventDate,
    alternateMessageForDate: rawData.AlternateMessageForDate,
    calendarInviteEnabled: rawData.IncludeCalendarInvite,
    priceSettings: populateEventPriceSettings(rawData.PriceSettings),
    contacts: rawData.Contacts as EventContact[],
    tickets: rawData.TicketInfo ? (rawData.TicketInfo.map((item: any) => populateTickets(item)) as TicketInfo[]) : [],
    attendees: rawData.Attendees,
    isPublishAttendee: rawData.IsPublishAttendee,
    publishAttendeeConfig: rawData.PublishAttendeeConfig,
    noOfBookings: rawData.NoOfBookings,
    additionalInfo: rawData.AdditionalInfo ? JSON.parse(rawData.AdditionalInfo) : [],
    tag: rawData.Tag,
    eventImage: rawData.EventImage,
    notifyMeEnabled: !!rawData.IsNotifyMe,
    waitListEnabled: !!rawData.IsWaitList,
    isBookedByUser: rawData.IsBooked === 1,
    isSavedByUser: rawData.IsSaved === 1,
    isInstallmentEnabled: rawData.IsInstallmentEnabled,
    fixtures: rawData.Fixtures
      ? (rawData.Fixtures.map((item: any) => populateFixturesInfo(item)) as FixturesInfo[])
      : [],
  }
}
/*

docId: number
   name?: string
   reference?:string
   isFeatured?:boolean
   isPrivate?:boolean,
   locationType?:string
   status?:string
   imgSrc?: string
   category:string
   subCategories?:string
   address?:addressInfo
   latlng?:latlngInfo
   ownerEntity?:entityInfo
   starts?: dateTimeInfo
   ends?:dateTimeInfo
   bookingEnds?:dateTimeInfo
   timezoneId?: number,
   hideDateTime?: boolean
   calendarInviteEnabled?:boolean
   priceSettings?:EventPriceSettings,
   tickets:TicketInfo[]
*/
