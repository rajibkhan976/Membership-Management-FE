export interface MailListResponse {
  Month: string
  Rows: MailInterface[]
  Count: number
}

export interface MailInterface {
  EmailId: number
  OwningEntityId: number
  Subject: string | null
  Body: string | null
  Status: number
  ScheduledTime: Date
  SentTime: Date
  IsTemplate: boolean
  SegmentId: number
  SegmentName: string
  ClubName: string
  RecipientCount: number
  DeliveryCount: number
  OpenCount: number
  ClickCount: number
  BouncedCount: number
  LastUpdatedTime: Date
}

export type EmailItemProps = {
  mailList: MailInterface[]
  month: string
  count: number
}
