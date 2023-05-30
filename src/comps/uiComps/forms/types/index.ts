import { FieldBaseProps } from '@comps/uiComps/_base/types/CompBaseProps'
import { ListBoxProps } from '../ListBox/ListBox'

type CheckBoxItem = { name: string | number; value: string; cap?: React.ReactNode }

export type TextFieldProps = Omit<FieldBaseProps, 'children'> & {
  initialValue?: string | number
  helpText?: string | JSX.Element
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'date'
  placeholder?: string
  leftIcon?: JSX.Element
  rightIcon?: JSX.Element
  labelClassName?: string
  inputClassName?: string
  hideBorder?: boolean
  status?: 'normal' | 'success' | 'error'
  asterisk?: boolean
}

export type TextAreaProps = Omit<FieldBaseProps, 'as' | 'children'> & {
  initialValue?: string
  placeholder?: string
  rows?: number
  disabled?: boolean
  isReadOnly?: boolean
  labelClass?: string
  textAreaClass?: string
  containerClass?: string
  status?: 'normal' | 'success' | 'error'
  asterisk?: boolean
}

export type CheckboxGroupProps = Omit<
  FieldBaseProps,
  'as' | 'children' | 'hideLabel' | 'id' | 'labelPosition' | 'labelWidth' | 'disabled'
> & {
  type?: 'checkbox' | 'radio'
  orientation?: 'vertical' | 'horizontal'
  items?: CheckBoxItem[]
  inputClass?: string
  itemContainerClass?: string
  labelClass?: string
  status?: 'normal' | 'success' | 'error'
  asterisk?: boolean
}

export type CheckboxProps = Omit<
  FieldBaseProps & React.ComponentProps<'input'>,
  'as' | 'children' | 'labelPosition' | 'labelWidth' | 'type'
> & {
  indeterminate?: boolean
  labelClass?: string
  asterisk?: boolean
  status?: 'normal' | 'success' | 'error'
}

export enum FIELD_TYPE {
  TextField = 'TextField',
  TextArea = 'TextArea',
  Checkbox = 'Checkbox',
  CheckboxGroup = 'CheckboxGroup',
  DateField = 'DateField',
  ListBox = 'ListBox',
}

type TextFieldType = {
  type: FIELD_TYPE.TextField
  props: TextFieldProps
}
type TextAreaType = {
  type: FIELD_TYPE.TextArea
  props: TextAreaProps
}
type CheckboxType = {
  type: FIELD_TYPE.Checkbox
  props: CheckboxProps
}
type DateFieldType = {
  type: FIELD_TYPE.DateField
  props: TextFieldProps
}
type CheckboxGroupType = {
  type: FIELD_TYPE.CheckboxGroup
  props: CheckboxGroupProps
}
type ListBoxType = {
  type: FIELD_TYPE.ListBox
  props: ListBoxProps
}

export type GenericFieldType =
  | TextFieldType
  | TextAreaType
  | CheckboxType
  | CheckboxGroupType
  | DateFieldType
  | ListBoxType
