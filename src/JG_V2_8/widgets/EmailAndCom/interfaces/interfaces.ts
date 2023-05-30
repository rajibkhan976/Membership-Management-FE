import { EmailStatus } from '@comps/uiComps/EmailList/status.enum'
import { ActivityType } from '@jg/widgets/EmailAndCom/enum'
import { SendEmailInitialValue } from '../types'
import { SegmentExpressionType } from '@comps/uiComps/CreateSegment/interfaces/segmentInitialValue.interface'

export type Attachments = {
  EmailAttachmentId?: number
  EmailId?: number
  FileName: string
}

export type Optins = {
  EmailOptInId?: number
  EmailId?: number
  OptInId: number
  IsIncluded: boolean
}

export type Email = {
  SendToFamilyMember: boolean
  Optins: Optins[]
  EmailId?: number
  OwningEntityId: number
  Sender: string
  Subject: string
  Body: string
  BodyInJson: string
  Status: EmailStatus
  ScheduledTime?: any
  SentTime?: any
  IsTemplate: boolean
  SegmentId: number
  SegmentName?: string
  SegmentDefintion: string
  Tags?: string[]
  CreatedBy?: number
  CreatedTime?: any
  UpdatedBy?: number
  UpdatedTime?: any
  OptIns?: Optins[]
  Attachments?: Attachments[]
  TestSend?: boolean
  TestRecipient?: string | null
  ExcludeUnder16?: number
  ScheduleTimeZoneId?: number
  UniqueEmailOnly?: number
}

export type Items = {
  icon: JSX.Element
  title: string
  status: EmailStatus
}

export type EmailLeftBarProps = {
  sideMenuFilter: (data: EmailStatus) => void
  selected: EmailStatus
  items: Items[]
  mainButton?: JSX.Element
  onchange?: any
  value?: any
  refresh?: any
}

export type MetadataWrapperProps = {
  addFrom?: string
  addRecepients?: any
  addSubject?: string
  addOptins?: Optins[]
  emailError?: string
  handleChangeAddFrom?: (value: string) => void
  handleChangeAddRecepient?: (value: object) => void
  handleChangeAddOptins?: (id: number) => void
  handleCheckOptinIsIncluded?: (value: any, id: number) => void
  handleChangeAddSubject?: (value: string) => void
  handleSetAddFrom?: (value: string) => void
  handleSetAddSubject?: (value: string) => void
}

export type ModalTitleProps = {
  title?: string
  subTitle?: string
}

export type ModalBodyContentsProps = {
  values?: any[]
  items?: any[]
  hasCheckBox?: boolean
  hasRadioBtn?: boolean
  radioItems?: any[]
  handleChangeAddRecepient?: (value: object) => void
  handleChangeAddOptins?: (id: number) => void
  handleCheckOptinIsIncluded?: (value: any, id: number) => void
  setOpenModal?: (status: boolean) => void
}

export type ModalBodyProps = {
  headerTitle?: string
  bodyHeaderBtnTxt?: string
  bodyHeaderBtnIcon?: React.ReactNode
  bodyContent?: React.ReactNode
  setOpenModal: Function
}

export type EmailTabPropsType = {
  emailDetails?: SendEmailInitialValue
  Title?: string | undefined
}

export type AddSingleMetadataProps = {
  title?: string
  subTitle?: string
  label?: string
  placeholder?: string
  required?: boolean
  showField?: boolean
  error?: string
  handleSetShowField?: (value: boolean, action: string) => void
  value?: string
  handleOnChange?: (value: any) => void
}

export type AddCollectiveMetadataProps = {
  title?: string
  subTitle?: string
  modalTitle?: string
  modalSubTitle?: string
  modalBodyHeaderTitle?: string
  modalBodyHeaderBtnTxt?: string
  modalBodyHeaderBtnIcon?: React.ReactNode
  modalBodyContent?: React.ReactNode
  required?: boolean
  value?: any
  items?: any[]
  hasCheckBox?: boolean
  hasRadioBtn?: boolean
  radioItems?: any[]
  handleChangeAddRecepient?: (value: object) => void
  handleChangeAddOptins?: (id: number) => void
  handleCheckOptinIsIncluded?: (value: any, id: number) => void
}

export type EmailTemplatePropTypes = {
  onChangeFunction: (body: string) => void
  value: string
  onJsonChangeFunction: (body: string) => void
  jsonValue?: string
}

export type SendTestModalProps = {
  changeTestSendStatus: (value: boolean) => void
  changeTestRecipient: (value: string | null) => void
  handleSubmit: (status: number) => void
}

export type ActivityClickItemProps = {
  activityType: ActivityType
  segmentName: string
  emailId: number
  deliveryCount: number
  icon: JSX.Element
  title: string
  segmentId: number
}

export type ClickItemReportProps = {
  ModalTitle: JSX.Element
  segmentTitle: string
  setPageNumber: () => void
  numberOfRows: number
  pageNumber: number
}

export type SegmentsPreviewModalProps = {
  segmentTitle: string
  result: any
  rows: number
  setPreviewResult: any
  loading: boolean
  segmentExpression: SegmentExpressionType[]
}
