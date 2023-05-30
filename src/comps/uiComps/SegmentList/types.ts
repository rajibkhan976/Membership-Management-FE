import { ActivityType } from '@jg/widgets/EmailAndCom/enum'
import { dateRangeType } from '@jg/widgets/EmailAndCom/store/type'
import { Tags } from '@jg/widgets/EmailAndCom/types'

export type ListItemProps = {
  item: Segment
  classes?: string
  setOpen: (isOpen: boolean) => void
}
export type SegmentStoreType = {
  RecipientsBySegment: ResultElement[] | null | undefined
  getRecipientsBySegmentId: (id: number, Title: string, OwningEntityId: string, pageNo: number, Size: number) => void
  segmentTitle: string
  Rows: number
  pageNumber: number
  numberOfRows: number
  Active: number
  Dropped: number
  isLoading: boolean
  setPageNumber: (pageNumber: number) => void
  setIsLoading: (isLoading: boolean) => void
  setValueNull: () => void
}

export type EmailRecipientByActivityStoreType = {
  GetEmailRecipientByActivityType: ResultElement[] | null | undefined
  segmentTitle: string
  Rows: number
  pageNumber: number
  isLoading: boolean
  getRecipientsByActivityType: (
    EmailId: number,
    ActivityType: ActivityType,
    PageNumber: number,
    NumberOfRows: number
  ) => void

  // numberOfRows: number
  setPageNumber: (pageNumber: number) => void
  setLoadingStatus: (value: boolean) => void
  // setLoding: (status: boolean) => void
}

export type EmailHistory = {
  Id: number
  Subject: string
  Sender: string
  Tags: Tags[] | null
  RecipientName: string
  RecieverEmailAddress: string
  SentTime: string | null
  LastEventTime: string | null
  Opens: number
  Clicks: number
  RecipientStatus: string
  StatusRemarks: string
  Category: string
  MessageType: string
  Type: string
}

export type EmailHistoryStoreType = {
  history: EmailHistory[] | null
  advanceData?: any
  rows: number
  pageNumber: number
  isLoading: boolean
  isScrollLoader: boolean
  isError: boolean
  numberOfRows: number
  searchKey: string
  dateRange: string
  getHistory: (expresion: any, pageNo: number, isSearchClick: boolean) => void
  setSearchKey: (value: string) => void
  setDateRange: (value: string) => void
  setPageNumber: (pageNo: number) => void
  setEmailHistoryNull?: () => void
  setAdvancedSearchData?: (advanceData: any) => void
}

export type EmailDetailsByHistory = {
  From: string
  To: string
  Subject: string
  BodyInHtml: string
  BodyInJson: string
  AttachmentsPath: string
  Attachments: string[]
}

export type EmailDetailsByHistoryStore = {
  emailDetails: EmailDetailsByHistory | null
  isLoading: boolean
  isError: boolean
  getDetailsByHistoryId: (historyId: number, isMailQueueHistory: boolean) => void
  setLoadingStatus: (value: boolean) => void
}

export type activity = {
  EmailRecipientActivityId: number
  ActivityType: string
  ActivityTime: string
  TimeZoneId: number
  TimeZone: string
  StatusRemarks: string
}

export type ActivityLogStoreType = {
  user: { UserId: number; EmailAddress: string; ProfilePicURL: string | null } | null
  activities: activity[] | null
  pageNumber: number
  numberOfRows: number
  isLoading: boolean
  rows: number
  getActivityLog: (historyId: number, marketingMail: number, pageNo: number, size: number) => void
  setLoadingStatus: (value: boolean) => void
}

export type SegmentsStoreType = {
  segments: Segment[] | null
  getSegments: (ClubId: string, PageNo: number, pageSize: number) => void
  Rows: number
  Key: string
  isArchive: number | null
  isError: boolean
  isLoading: boolean
  setKey: (value: string) => void
  setIsArchive: (value: number | null) => void
  setValueNull: () => void
}

export type SegmentDetailStoreType = {
  segment: Segment | null
  getSegmentDetail: (id: number) => void
  isError: boolean
  isLoading: boolean
}

export type SegmentDeleteStoreType = {
  deleteSegment: (id: number) => void
  isError: boolean
  isLoading: boolean
}

export type SegmentPaginationStoreType = {
  pageNumber: number
  setPageNumber: (pageNo: number) => void
  numberOfRows: number
}

export type SegmentInitialValueResult = {
  Success: boolean
  Message: string
  ValidationErrors: null
  Result: ResultElement[] | null
  StatusCode: number
}

export type SegmentsInitialValueResult = {
  Success: boolean
  Message: string
  ValidationErrors: null
  Result: SegmentResult
  StatusCode: number
}

export type SegmentDetailInitialValueResult = {
  Success: boolean
  Message: string
  ValidationErrors: null
  Result: Segment
  StatusCode: number
}

export type ResultElement = {
  DocId: number
  MID: string
  FirstName: string
  LastName: string
  UserId: number
  ImageSrc: null | string
  EmailAddress: null | string
  Mobile: null | string
  Address: Address
  Status: string
  StatusRemarks?: string
  Town?: string
}

export type Address = {
  Address1: null | string
  Address2: null | string
  Address3: null | string
  Town: null | string
  County: null | string
  PostCode: null | string
  Country: string | null
}

export type SegmentResult = {
  Segments: Segment[]
  Rows: number
}

export type Segment = {
  SegmentId: number
  Title: string
  Description: string
  FirstName: string
  LastName: string
  IsUsed: boolean
  IsEmailActivityBasedSegment: number
  SegmentExpression: SegmentExpression[]
  SegmentStatus: number
  LastUpdated: Date
  OwningEntityId: number
}

export type SegmentExpression = {
  RuleType: string
  FieldId: number
  Field: string
  Value: string
  Operator: string
  Condition?: string | 'and' | 'or' | ''
}
