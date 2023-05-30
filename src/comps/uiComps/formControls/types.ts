import CurrencyRange from "@comps/uiComps/formControls/CurrencyRange"

type optionTypes = {
  Value: string
  Caption: string
}
export type selectProps = {
  label?: string
  id: string
  value?: string
  options: optionTypes[]
  disabled: boolean
  name: string
  placeholder?: string
  multiselect?: boolean
  onChange: (value: string) => void
  setFieldValue?: (name: string, value: string) => void
}

export type controlProps = {
  control: string
  id: string
  label?: string
  placeholder?: string
  name: string
  options?: any[]
  value?: string
  handleChange?: any
  setFieldValue?: any
  className?: string
}

export type CurrencyRangeProps = {
  id: string
  label?: string
  placeholder?: string
  name: string
  value?: string
  setFieldValue: any
}
