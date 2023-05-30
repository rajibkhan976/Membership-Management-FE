import { useEffect } from 'react'
import useEntityExtFormField from '../../hooks/useEntityExtFormField'
import { MA_FieldProps } from '../../types'
import { Checkbox } from '@comps/uiComps/forms'

export default (config: MA_FieldProps) => {
  const { isRequired, label, tooltip } = config
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
    <Checkbox
      label={label}
      value={value}
      asterisk={!!isRequired}
      helpText={tooltip}
      status={isValid || value ? 'normal' : 'error'}
      onValueChange={(value) => {
        !readOnly && setValue((value as boolean) ? 1 : 0)
      }}
    />
  )
}
