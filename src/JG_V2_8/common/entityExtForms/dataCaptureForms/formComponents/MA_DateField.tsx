import { useEffect } from 'react'
import DatePickerField from '@jg/common/comps/JGDatePicker/DatePickerField'
import { MA_FieldProps } from '../../types'
import useEntityExtFormField from '../../hooks/useEntityExtFormField'

export default (config: MA_FieldProps) => {
  const { isRequired, label, placeholder, tooltip } = config
  const { setValue, value, onValidate, isValid, readOnly } = useEntityExtFormField(config)

  useEffect(() => {
    onValidate(config.field?.Id || '-1', (valOnValidate, noNotify) => {
      return {
        key: config.field?.Id || '-1',
        isValid: isRequired ? !!valOnValidate : true,
        message: 'FIELD_REQUIRED',
        noNotify: noNotify,
      }
    })
  }, [])

  return (
    <DatePickerField
      fieldsize="md"
      label={label}
      value={value as Date}
      readOnly={readOnly}
      asterisk={!!isRequired}
      initialDummyString={placeholder || ' '}
      helpText={tooltip}
      status={isValid || value ? 'normal' : 'error'}
      onChange={(value) => {
        !readOnly && setValue(value)
      }}
      format={'en'}
    />
  )
}
