import { EmailStatus } from '@comps/uiComps/EmailList/status.enum'

export type ArgumentInterface = {
  Method: string
  OwningEntityId: string
  Key?: string
  Status?: EmailStatus
  PageNumber?: number
  NumberOfRows?: number
  Tags?: string[]
  Date?: string[]
}

export type EmailArgumentInterface = {
  Method: string
  OwningEntityId: number | string
  Key: string | null
  Status: EmailStatus | null
  PageNumber?: number
  NumberOfRows?: number
  Tags: string[] | null
  Date: string[] | null
}

export type EmailPaginationProps = {
  count?: number
  setPageNumber?: any
  refresh?: any
  numberOfRows?: number
  pageNumber?: number
}

export type EmailBodyProps = {
  emailBody: string
}

export type EmailListItemProps = {
  title?: string
  status?: number
  icon?: JSX.Element
}

export type EmailListBoxProps = {
  className?: string
  label?: string
  labelposition?: 'top' | 'left'
  labelwidth?: number
  id?: string
  children?: import('react').ReactNode
  as?: string
  items: EmailListItemProps[]
  hideLabel?: boolean
  selected?: any
  handleChange: (data: EmailStatus) => void
}

export type EmailNotFoundProps = {
  icon?: JSX.Element
  title: string
  description?: string
}

export type EmailItemProps = {
  mailList: MailInterface[]
  month: string
  count: number
  sideFilterStatus: number
}

export type MailListResponse = {
  Month: string
  Rows: MailInterface[]
  Count: number
}

export type MailInterface = {
  EmailId: number
  QueuedCount?: number
  OwningEntityId: number
  Subject: string | null
  Body: string | null
  Status: number
  ScheduleTimeZone: string
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
  DroppedCount: number
  LastUpdatedTime: Date
  Tags: string[]
  CreationTimeZone: string
  SendStatus?: number
}

export type ReloadBtnProps = {
  fontSize?: string
  color?: string
  onClick?: (value: any) => void
}

export type EmailReportItemProps = {
  EmailId?: number
  Delivered?: number | any
  DeliveredPercent?: number
  Opened?: number | any
  UniqueOpened?: number | any
  LastOpened?: string
  Clicked?: number | any
  LastClicked?: string
  Bounced?: number | any
  segmentTitle?: string
  UniqueClicked?: number | any
}

export type EmailReportProps = {
  EmailId?: number
  Subject?: string
  SentTime?: string
  SegmentId?: number
  Segment?: string
  Recipients?: number
  items: EmailReportItemProps
}

export type EmailReports = {
  items: EmailReportItemProps
  ChartData?:
    | {
        Date: number
        DeliveryCount?: number
        OpenCount?: number
        ClickCount?: number
        BouncedCount?: number
      }[]
    | null
}

export type ReportItemType = {
  title?: string
  reportItem?: number | string | null
  icon?: JSX.Element
  segmentTitle?: string
  activityType?: number
  emailId?: number
  percentage?: any
  createSegmentSectionOpen?: boolean
  setCreateSegmentSectionOpen?: (state: number) => void
}
