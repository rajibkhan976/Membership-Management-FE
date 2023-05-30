import { TextField } from '@comps/uiComps'
import { MA_FieldProps } from '../../types'
import useEntityExtFormField from '../../hooks/useEntityExtFormField'
import { useCallback, useEffect, useRef } from 'react'

type MA_DecimalFieldProps = MA_FieldProps & {
  decimalPrecision: string
  minValue?: number
  maxValue?: number
}
export default (config: MA_DecimalFieldProps) => {
  const { isRequired, label, placeholder, tooltip, decimalPrecision, minValue, maxValue } = config
  const { setValue, value, onValidate, isValid, readOnly } = useEntityExtFormField(config)
  //const ref = useRef(null)
  //console.log(minValue, maxValue)

  const inputRef = useRef<HTMLInputElement>(null)

  const initInputEvents = useCallback(() => {
    const steps = ['1']
    const decimal = Number(decimalPrecision || '0')
    for (let i = 1; i <= decimal - 1; i++) {
      steps.push('0')
    }
    //console.log('step', steps.length > 1 ? `.${steps.reverse().join('')}` : '1')
    inputRef.current?.setAttribute('step', steps.length > 1 ? `.${steps.reverse().join('')}` : '1')
    inputRef.current?.setAttribute('min', `${minValue}`)
    inputRef.current?.setAttribute('max', `${maxValue}`)
    inputRef.current?.addEventListener('keydown', (e: any) => {
      if (!((e.keyCode > 95 && e.keyCode < 106) || (e.keyCode > 47 && e.keyCode < 58) || e.keyCode == 8)) {
        return false
      }
    })
    inputRef.current?.addEventListener('input', (e: any) => {
      if (e.data != null && e.currentTarget.value.length) {
        if (e.currentTarget.value < 0) {
          e.currentTarget.value = Math.abs(e.currentTarget.value)
        }
        const parts: string[] = e.currentTarget.value.split('.')
        if (parts[1] && parts[1].length > 2) {
          e.currentTarget.value = parseFloat(`${parts[0]}.${parts[1].substring(0, 2)}`).toFixed(decimal)
        }
        const min = minValue || Number.MIN_VALUE
        const max = maxValue || Number.MAX_VALUE
        if (e.currentTarget.value < min) e.currentTarget.value = min
        if (e.currentTarget.value > max) e.currentTarget.value = max
      }
    })
    inputRef.current?.addEventListener('change', (e: any) => {
      if (e.currentTarget.value) e.currentTarget.value = parseFloat(e.currentTarget.value).toFixed(decimal)
      else e.currentTarget.value = (0.0).toFixed(decimal)
    })
  }, [inputRef.current])

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
  useEffect(() => {
    initInputEvents()
  }, [])

  return (
    <TextField
      fieldsize="md"
      ref={inputRef}
      type="number"
      label={label}
      value={value}
      asterisk={!!isRequired}
      placeholder={placeholder}
      helpText={tooltip}
      readOnly={readOnly}
      // min={minValue}
      // max={maxValue}
      onValueChange={(value) => {
        setValue(Number(value))
      }}
    />
  )
}
