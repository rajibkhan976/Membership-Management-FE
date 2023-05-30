import { useEffect } from 'react'
import CheckboxGroup from '@comps/uiComps/forms/CheckboxGroup/CheckboxGroup'
import { MA_FieldProps } from '../../types'
import useEntityExtFormField from '../../hooks/useEntityExtFormField'
import CheckboxGroupNew from '@comps/uiComps/forms/CheckboxGroup/CheckboxGroupNew'

type MA_CheckboxGroupProps = MA_FieldProps & {
  type: 'checkbox' | 'radio'
}

export default (config: MA_CheckboxGroupProps) => {
  const { isRequired, label, tooltip, field, type } = config
  const { setValue, value, onValidate, isValid, readOnly } = useEntityExtFormField(config)
  console.log('Ma_chk val', config.label, value)
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
    <CheckboxGroupNew
      fieldsize="md"
      type={type}
      label={label}
      value={value}
      items={field?.AllowedValues.map((e) => {
        return { name: e.Key, value: e.Value, cap: e.Caption }
      })}
      asterisk={!!isRequired}
      helpText={tooltip}
      status={isValid || value ? 'normal' : 'error'}
      onValueChange={(value) => {
        !readOnly && setValue(value as string)
      }}
    />
  )
}
