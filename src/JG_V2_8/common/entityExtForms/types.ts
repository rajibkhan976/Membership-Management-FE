import { Field } from '../dataAPIs/entityExtensions/schemas/EntityExtSchema'

export type EntityExtDataCaptureItemType =
  | 'dataField'
  | 'form'
  | 'sectionHeader'
  | 'declaration'
  | 'product'
  | 'optins'
  | 'emergencyContact'
  | 'qualification'
  | 'credentials'
  | 'photo'
export type EntityExtDataCaptureItemDefinationType = {
  Config: string
  Sequence: number
  Type: EntityExtDataCaptureItemType
}
//export type EntityExtFormItemCompClassType = 'MA_TextField' | 'MA_NumberField' | 'MA_ListField'

export type EntityExtFormItemProps = {
  field?: Field
}
export type EntityExtFormDataValueType = string | number | boolean | Date | null | undefined // value
export type MA_FieldProps = EntityExtFormItemProps & {
  label?: string
  tooltip?: string
  placeholder?: string
  isRequired?: string
  defaultValue?: EntityExtFormDataValueType
  disabled?: boolean
  decimalPrecision?: number
  minValue?: number
  maxValue?: number
  numberOfAttachment?: string
  attachmentType?: string
}

export type EntityExtFormDataType = Record<string | number, EntityExtFormDataValueType>
//form data by schema id
//export type EntityExtFormDataCollectionType = EntityExtFormDataType[] // data for each form

//export type EntityExtFormAnswersCollectionType = Record<number, EntityExtFormAnswersType>
//type ExIdType = number
export type EntityExtFormAnswersCollectionBySchemaType = Record<number, EntityExtFormDataType>

export type ValidationStatus = 'initial' | 'valid' | 'inValid'
export type ValidationSummaryByEntity = {
  index: number
  entityId: number
  summary: string[]
}
