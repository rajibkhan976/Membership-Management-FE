export type SendEmailInitialValue = {
  EmailId: number
  OwningEntityIdSyncGuid: string
  Sender: string
  Subject: string
  Body: string
  Tags: string[]
  BodyInJson: string
  ScheduleTimeZoneId: number
  ScheduledTime: string | null
  IsTemplate: boolean
  SegmentId: number
  Status: number
  ExcludeUnder16: number
  UniqueEmailOnly: number
  TestSend: boolean
  TestRecipient: string
  SegmentName?: string
  OptIns:
  | [
    {
      EmailOptInId: number
      OptInId: number
      IsIncluded: boolean
    }
  ]
  | []
  Attachments:
  | {
    EmailAttachmentId: number
    EmailId: number
    FileName: string
    FileSize: number
  }[]
  | []
}

export type Tags = {
  EmailTagId: number
  OwningEntityId: number
  TagName: string
}
