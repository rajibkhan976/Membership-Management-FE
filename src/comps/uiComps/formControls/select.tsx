import { ChangeEvent } from 'react'
import type { selectProps } from './types'

const Select = ({ id, options, disabled, onChange, name, setFieldValue, value }: selectProps) => {
  return (
    <>
      <select
        name={name}
        id={id}
        disabled={disabled}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
          onChange(e.target.value)
          setFieldValue && setFieldValue(name, e.target.value)
        }}
        className="h-[32px] w-[40%] sm:w-[45%] md:w-[168px] p-1 border-[1px] border-jg-metal-100 rounded-[2px] text-[14px] text-jg-metal-700"
      >
        <option value="">Select</option>
        {options.length > 0 &&
          options.map((option, i: number) => (
            <option key={i} value={option.Value} selected={option.Value.toString() === value}>
              {option.Caption}
            </option>
          ))}
      </select>
    </>
  )
}
export default Select
