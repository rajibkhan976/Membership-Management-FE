import { TextField } from '@comps/uiComps'
import { TextFieldProps } from '@comps/uiComps/forms/types'
import { useCallback, useEffect, useRef } from 'react'

const DecimalField = (props: TextFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const initInputEvents = useCallback(() => {
    inputRef.current?.setAttribute('step', '.01')
    inputRef.current?.setAttribute('min', '0')
    inputRef.current?.setAttribute('step', '.01')
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
          e.currentTarget.value = parseFloat(`${parts[0]}.${parts[1].substring(0, 2)}`).toFixed(2)
        }
      }
    })
    inputRef.current?.addEventListener('change', (e: any) => {
      if (e.currentTarget.value) e.currentTarget.value = parseFloat(e.currentTarget.value).toFixed(2)
      else e.currentTarget.value = (0.0).toFixed(2)
    })
  }, [inputRef.current])
  useEffect(() => {
    initInputEvents()
  }, [])
  return <TextField ref={inputRef} {...props} />
}
export default DecimalField
