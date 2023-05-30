import React from 'react'
import { useState } from 'react'
import TextField from '../TextField'

const NumberField = React.forwardRef<
  HTMLInputElement,
  Omit<React.ComponentPropsWithRef<typeof TextField>, 'type'> & {
    decimalPrecision?: number
  }
>(({ decimalPrecision = 4, onValueChange, ...rest }, ref) => {
  const [value, setValue] = useState<number | string>(0)
  return (
    <TextField
      type="number"
      value={value}
      step={1 / Math.pow(10, decimalPrecision)}
      onValueChange={(value) => {
        const targetValue = value as string
        const decimalPoint = targetValue.split('.')[1]?.length || 0
        console.log(decimalPoint)
        if (decimalPoint > decimalPrecision) return
        setValue(targetValue)
        onValueChange?.(targetValue)
      }}
      ref={ref}
      {...rest}
    />
  )
})

export default NumberField
