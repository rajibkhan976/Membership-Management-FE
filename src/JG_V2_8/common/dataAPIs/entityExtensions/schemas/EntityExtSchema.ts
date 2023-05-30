export interface AllowedValue {
  Caption: string
  Description: string
  FieldId: number
  Key: string
  Lang: string
  Sequence: number
  Value: string
}
export interface Field {
  AllowedValues: AllowedValue[]
  Caption: string
  Description: string
  ExId: number
  FieldSetId: number
  Id: number
  IsInUse: boolean
  IsMultiValue: boolean
  MetaData: null
  Name: string
  SyncGuid: string
  Type: number
}
export interface FieldSet {
  Caption: string
  Description: string
  ExId: number
  Fields: Field[]
  Id: number
  IsInUse: boolean
  MetaData: null
  Name: string
  SyncGuid: string
}
export type UiCompClassType =
  | 'MA_TextField'
  | 'MA_NumberField'
  | 'MA_ListField'
  | 'MA_DateField'
  | 'MA_TextArea'
  | 'MA_Heading'
  | 'MA_Checkbox'
  | 'MA_CheckboxGroup'
  | 'MA_ContentBlock'
  | 'MA_Attachment'
  | 'MA_DecimalField'
export interface UiComp {
  Class: UiCompClassType
  Config: string
  ExId: number
  FieldId: number
  ItemId: number
  Name: string | null
  ParentId: number
  Sequence: number
  SyncGuid: string
}
export interface EntityExtSchema {
  ExId: number
  ExtensionArea: string
  ExtensionEntityId: number
  FieldSets: FieldSet[]
  Fields: []
  IsInUse: boolean
  OwnerId: number
  OwnerType: string
  SaveSchema: boolean
  SyncGuid: string
  UiComps: UiComp[]
}
