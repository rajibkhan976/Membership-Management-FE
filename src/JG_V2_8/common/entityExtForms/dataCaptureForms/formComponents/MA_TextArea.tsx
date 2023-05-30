import { useEffect } from 'react'
import useEntityExtFormField from '../../hooks/useEntityExtFormField'
import { MA_FieldProps } from '../../types'
import TextArea from '@comps/uiComps/forms/TextArea/TextArea'

export default (config: MA_FieldProps) => {
  const { isRequired, label, placeholder, tooltip } = config
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
    <TextArea
      labelWidth="auto"
      fieldsize="md"
      label={label}
      value={value}
      isReadOnly={readOnly}
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
