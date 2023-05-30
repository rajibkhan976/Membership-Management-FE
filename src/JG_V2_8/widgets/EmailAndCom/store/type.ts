import type { MailListResponse, EmailArgumentInterface, EmailReportProps } from '@comps/uiComps/EmailList/Interfaces'
import { SendEmailInitialValue, Tags } from '../types'

export type TagsType = {
  tags: { Title: string; Value: string }[]
  isLoading: boolean
  error: string
  fetch: (OwningEntityId: string) => void
  filterTags: (value: string) => void
}

export type EmailAddressMetadata = {
  emailAddress: { UserId: number; Name: string; Image: string; EmailAddress: string; Type: string }[]
  isLoading: boolean
  error: string
  fetch: (OwningEntityId: string) => void
}

export type EmailDetails = {
  emailDetails: SendEmailInitialValue | null
  isLoading: boolean
  error: string
  fetch: (id: number) => void
  setLoadingStatus: (value: boolean) => void
}

export type dateRangeType = {
  startDate: string
  endDate: string
}
export type EmailList = {
  emailList: MailListResponse[] | null
  count: number
  isLoading: boolean
  error: string
  key: string | null
  dateFilterActive: boolean
  dateFilterData: string[] | null
  tagFilterActive: boolean
  tagFilterData: string[]
  sideFilterStatus: number
  Tags?: string[]
  pageNumber: number
  numberOfRows: number
  fetch: (args: EmailArgumentInterface) => void
  setKey: (value: string | null) => void
  setSideFilterStatus: (status: number) => void
  setDateFilterActive: (status: boolean) => void
  setDateFilterData: (data: dateRangeType | null) => void
  setTagFilterActive: (status: boolean) => void
  setTagFilterData: (tag: string) => void
  removeTag: (tag: string) => void
  setLoadingStatus: (value: boolean) => void
  setPageNumber: (num: number) => void
  setValueNull: () => void
}

export type EmailDeleteStoreType = {
  deleteEmail: (id: number) => void
  isError: boolean
  isLoading: boolean
}

export type EmailReport = {
  emailReport: EmailReportProps | null
  isLoading: boolean
  error: string
  fetch: (id: string | undefined) => void
  setLoadingStatus: (value: boolean) => void
}

export type ProductBalance = {
  balance: { AdditionalBundleTotal: number, MonthlyQuota: number, RemainingMonthlyQuota: number } | null
  isLoading: boolean
  error: string
  GetProductBalance: (OwningEntityId: string) => void
}

export type GetProducts = {
  products: { DocId: number, Name: string, Unitprice: number, Size: number, Description: string }[] | null
  isLoading: boolean
  error: string
  GetProducts: () => void
}

export type RecipientCountActivity = {
  Data:
  | {
    Date: number
    DeliveryCount?: number
    OpenCount?: number
    ClickCount?: number
    BouncedCount?: number
  }[]
  | null
  dateFilterData: string[] | null
  dateFilterActive: boolean
  isError: boolean
  isLoading: boolean
  showDateFilterOptions: boolean
  hello: any
  getRecipientCountByActivity: (emailId: number, resultType: number, from: string, to: string) => void
  setDateFilterData: (data: dateRangeType | null) => void
  setDateFilterActive: (status: boolean) => void
  setFetch: (value: boolean) => void
  setShowDateFilterOptions: (value: boolean) => void
  setHello: (value: any) => void
  setHelloTwo: (value: any) => void
}

export type activityBasedSegmentCreation = {
  isLoading: boolean
  isError: boolean
  createActivityBasedSegment: (
    owningEntityId: string,
    title: string,
    description: string,
    emailId: number,
    activityType: number
  ) => void
  setIsLoading: (value: boolean) => void
  setIsError: (value: boolean) => void
}

export type TabStateType = {
  selectedTab: number
  setSelectedTab: (selectedTab: number) => void
}

export type SegmentMeta = {
  items: null
  fetch: (id: number) => void
}

export type EmailHistoryMeta = {
  items: null | ResultResult
  isLoading: boolean
  error: string
  fetch: (id: string) => void
}

export type Optin = {
  optins: OptinResult | null
  fetch: (ownerType: string) => void
}

export type TagsStore = {
  tags: Tags[] | null
  searchedTags: Tags[] | null
  getTagsList: (id: string) => void
  searchTags: (value: string) => void
}

export type TimeZoneStore = {
  timeZoneList: TimeZone[] | null
  isLoading: boolean
  getTimeZone: () => void
}

export type TimeZone = {
  ZoneId: number
  ZoneName: string
  ABBR: string
  Offset: number
  DST: boolean
}

export type segmentMetaDataResponse = {
  Command: Command
  IsSuccess: boolean
  Result: Result
  ErrorMessage: null
  InternalError: null
  StatusCode: number
}

export type Command = {
  Id: number
  Service: string
  Method: string
  Arguments: Array<ArgumentClass | string>
}

export type ArgumentClass = {
  Method: string
  OwningEntityId: number
}

export type Result = {
  Success: boolean
  Message: string
  ValidationErrors: null
  Result: ResultResult
  StatusCode: number
}

export type ResultResult = {
  Fields: Field[]
  TypeOperators: TypeOperator[]
}

export type Field = {
  Id: number
  RuleType: RuleType
  Caption: string
  TargetField: string
  Types: Types
  AllowedValues: FieldAllowedValue[]
}

export type FieldAllowedValue = {
  Value: number | string
  Caption: string
  Image?: string
}

export enum RuleType {
  Club = 'Club',
  Credential = 'Credential',
  CredentialAdditionalFields = 'Credential Additional Fields',
  Event = 'Event',
  Membership = 'Membership',
  Profile = 'Profile',
  ProfileAdditionalFields = 'Profile Additional Fields',
}

export enum Types {
  AggMultiselect = 'agg_multiselect',
  Currency = 'currency',
  Date = 'date',
  Decimal = 'decimal',
  Int = 'int',
  LargeText = 'largeText',
  MembershipPaymentSelect = 'membership payment select',
  MembershipRenewal = 'membership renewal',
  Multiselect = 'multiselect',
  Select = 'select',
  SmallText = 'smallText',
  Text = 'text',
}

export type TypeOperator = {
  DataType: Types
  AllowedOperators: AllowedOperator[]
}

export type AllowedOperator = {
  Caption: string
  Value: string
  AllowedValues: AllowedOperatorAllowedValue[]
}

export type AllowedOperatorAllowedValue = {
  Value: ValueEnum | number
  Caption: string
}

export enum ValueEnum {
  AdminPay = 'admin pay',
  Empty = '',
  Invoice = 'invoice',
  Online = 'online',
}

// OPTINS SECTION
export type OptinResult = {
  Id: number
  OwnerType: string
  OwnerId: number
  TargetEntity: string
  Title: string
  Description: string
  Status: number
  Version: number
  CreatedDate: string
  LastModifiedDate: string
  LastModifiedTime: string
  LastModifiedUser: number
  IsDirty: boolean
  Groups: GroupOptin[]
  ChangeHistorys: null
  SyncGuid: string
}

export type GroupOptin = {
  Id: number
  OptInMasterId: number
  Name: string
  Description: string
  Sequence: number
  OptIns: OptIn[]
  SyncGuid: string
}

export interface OptIn {
  Id: number
  OptInGroupId: number
  Caption: string
  Name: string
  Description: string
  ShowInSignup: boolean
  PreTicked: boolean
  IsDirty: boolean
  Status: number
  Sequence: number
  Version: number
  CreatedDate: string
  LastModifiedDate: string
  LastModifiedUser: number
  SyncGuid: string
}

export interface IBasicResponse<R = Record<string, unknown>> {
  Success: boolean
  Message: string
  ValidationErrors: unknown
  Result: R
  StatusCode: number
}

export type CategoryInfo = {
  CategoryId: number
  OwningEntityIdSyncGuid: string
  Name: string
  Description: string
}
export type EmailTemplateInfo = {
  TemplateId: number
  Name: string
  // OwningEntityIdSyncGuid: string
  CategoryId: number
  Description: string
  BodyInHtml: string
  BodyInJson: string
  TemplateImage: string
  IsPremium: number
}

export type EmailTemplateArgs = Partial<EmailTemplateInfo> & { OwningEntityIdSyncGuid: string }
