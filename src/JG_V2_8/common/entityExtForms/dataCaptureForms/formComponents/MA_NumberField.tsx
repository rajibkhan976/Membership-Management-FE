import { useEffect } from 'react'
import { MA_FieldProps } from '../../types'
import useEntityExtFormField from '../../hooks/useEntityExtFormField'
import NumberField from '@comps/uiComps/forms/NumberField/NumberField'

export default (config: MA_FieldProps) => {
  const { isRequired, label, placeholder, tooltip, decimalPrecision, minValue, maxValue } = config
  const { setValue, value, onValidate, isValid, readOnly } = useEntityExtFormField(config)

  useEffect(() => {
    onValidate(config.field?.Id || '-1', (valOnValidate, noNotify) => {
      return {
        key: config.field?.Id || '-1',
        isValid: isRequired ? !!valOnValidate : true,
        message: 'FIELD_REQUIRED',
        noNotify,
      }
    })
  }, [])

  return (
    <NumberField
      id="someid"
      fieldsize="md"
      labelPosition="top"
      decimalPrecision={decimalPrecision}
      labelWidth={'auto'}
      label={label}
      value={value}
      min={minValue}
      max={maxValue}
      readOnly={readOnly}
      asterisk={!!isRequired}
      placeholder={placeholder || ' '}
      helpText={tooltip}
      status={isValid || value ? 'normal' : 'error'}
      onValueChange={(value) => {
        setValue(Number(value) || 0)
      }}
    />
  )
}
