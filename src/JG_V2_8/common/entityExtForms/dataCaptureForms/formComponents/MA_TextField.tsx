import { TextField } from '@comps/uiComps'
import { MA_FieldProps } from '../../types'
import useEntityExtFormField from '../../hooks/useEntityExtFormField'
import { useEffect } from 'react'

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
    <TextField
      fieldsize="md"
      label={label}
      value={value}
      readOnly={readOnly}
      asterisk={!!isRequired}
      placeholder={placeholder || ' '}
      helpText={tooltip}
      status={isValid || value ? 'normal' : 'error'}
      onValueChange={(value) => {
        setValue((value || '').toString())
      }}
    />
  )
}
