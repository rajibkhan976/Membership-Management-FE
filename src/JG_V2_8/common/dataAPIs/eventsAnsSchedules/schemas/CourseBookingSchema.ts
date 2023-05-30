export interface CourseBookingSchema {
  BookingDate: Date
  BookingEntityId: number
  BookingState: 3
  ClubBookingExists: number | null
  ClubType: string
  CourseBookingId: string
  CourseDate: Date
  CourseDocId: number
  CourseId: string
  CourseName: string
  DocId: number
  EntityType: string
  EventDocId: number
  EventDocIdHash: string
  EventName: string
  EventState: number
  IsLocked: boolean
  NGBBookingExists: number | null
  StartDate: Date
  StartTime: string
  StartTimeZone: string
}
