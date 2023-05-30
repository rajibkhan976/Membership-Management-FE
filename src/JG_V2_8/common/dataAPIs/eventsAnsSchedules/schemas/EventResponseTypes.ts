interface BookingEnds {
  Date: Date
  Time: string
  TimeZoneId: number
  TimeZone: string
}

interface Address {
  Address1: string
  Address2: string
  Address3?: string
  Town: string
  County: string
  Postcode: string
  Country: string
}

interface Latlng {
  Lat: string
  Lng: string
}

interface EntityInfo {
  Id: string
  Name?: string
  Type?: string
  ImgSrc?: string
}

interface Starts {
  Date: Date
  Time: string
  TimeZoneId: number
  TimeZone: string
}

interface Ends {
  Date: Date
  Time: string
  TimeZoneId: number
  TimeZone: string
}

interface PriceSettings {
  Max: number
  Min: number
  DisplayPrice?: number
  Currency: string
}

export default interface SingleEventInfoResponse {
  DocId: number
  EventDocIdHash: string
  SyncGuid: string
  EventName: string
  EventReference: string
  IsFeaturedEvent: boolean
  PrivateEvent: boolean
  Location: string
  LocationType: string
  Status: number
  Directlink: string
  EventCategory: string
  SubCategories: string
  BookingEnds: BookingEnds
  BookingDeadlineAbbreviation: string
  Address: Address
  Latlng: Latlng
  EntityInfo: EntityInfo
  OwningEntityType: string
  Starts: Starts
  StartAbbreviation: string
  Ends: Ends
  EndAbbreviation: string
  Timezone: number
  HideEventDate: boolean
  IncludeCalendarInvite: boolean
  Pricesource: string
  PriceSettings: PriceSettings
  Manualpriceoption: string
  TimeZoneId: number
  CountryCode: string
  TimeZone: string
  Tickets: any[]
  Contacts: any[]
}
