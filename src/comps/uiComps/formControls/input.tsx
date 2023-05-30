/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react'

type InputProps = {
  label: string
  id: string
  value: string
  name: string
  type: string
  handleChange: any
  className?: string
}
const Input: FC<InputProps> = ({ label, id, value, handleChange, name, type, className }) => {
  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      placeholder={label}
      onChange={handleChange}
      className={`border text-[#455A64] text-[13px] leading-[16px] py-2 px-3 border-[#455A64] outline-none w-full ${className}`}
    />
  )
}

export default Input
