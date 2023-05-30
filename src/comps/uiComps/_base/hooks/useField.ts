import { useState } from 'react'

export const useField = () => {
  const [value, setValue] = useState('')
  const onChange = () => {
    // setValue(event.target.value)
  }
  const reset = () => {
    setValue('')
  }

  return {
    // type,
    value,
    onChange,
    reset,
  }
}
