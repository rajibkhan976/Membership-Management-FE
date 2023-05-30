import { useEffect } from 'react'
import { SimpleSelect } from '@comps/uiComps'
import { MA_FieldProps } from '../../types'
import useEntityExtFormField from '../../hooks/useEntityExtFormField'

type MA_ListFieldProps = MA_FieldProps & {
  data: { name: string; value: string; cap: string }[]
}

export default (config: MA_ListFieldProps) => {
  console.log('config MA_ListFieldProps', config)
  const { isRequired, label, placeholder, tooltip, field, data, defaultValue } = config
  const { setValue, value, onValidate, isValid, readOnly } = useEntityExtFormField(config)
  let df = defaultValue
  if (field?.Type === 0 && !df) {
    df = '0'
  }
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
    <SimpleSelect
      fieldsize="md"
      labelWidth={'auto'}
      label={label}
      value={value || df}
      items={
        field?.Type === 6
          ? field?.AllowedValues.map((e) => {
              return { name: e.Caption, value: e.Value }
            })
          : data.map((e) => {
              return { name: e.cap, value: e.value }
            })
      }
      // disabled={readOnly}
      readOnly={readOnly}
      asterisk={!!isRequired}
      placeholder={placeholder || ' '}
      helpText={tooltip}
      status={isValid || value ? 'normal' : 'error'}
      onSelect={({ value }) => {
        !readOnly && setValue(value)
      }}
      hidePlaceholderOption
    />
  )
}
