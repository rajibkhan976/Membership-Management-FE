/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react'

type InputDatePickerRangeProps = {
  label: string
  id: string
  value: string
  name: string
  handleChange: any
  required?: boolean
  placeholder: string
}
const InputDatePicker: FC<InputDatePickerRangeProps> = ({
  label,
  placeholder,
  required,
  id,
  value,
  handleChange,
  name,
}) => {
  return (
    <>
      <div className="">
        <label className="inline-block mb-8">
          <span
            className={`${
              required && " after:content-['*']"
            } after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700`}
          >
            {label}
          </span>
          <span className="relative">
            <input
              type={'date'}
              id={id}
              value={value}
              name={name}
              placeholder={placeholder}
              onChange={handleChange}
              className="mt-1 px-3 py-2 bg-white font-normal border-slate-300 placeholder-slate-400 focus:outline-none hover:border-green-500 focus:border-green-300 focus:shadow-sm block sm:text-sm  w-[40%] sm:w-[45%] md:w-[168px] p-1 border-[1px] border-jg-metal-100 rounded-[2px] text-[14px] text-jg-metal-700  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
          invalid:border-red-500 invalid:text-red-600
          focus:invalid:border-red-500  disabled:hover:border-jg-metal-100 peer focus:invalid:shadow-green-500/50 shadow-cyan-500/50"
            />
            <p className="absolute -bottom-5 left-0 mt-2 invisible peer-invalid:visible peer-invalid:text-red-600 text-[11px] text-green-800">
              Helper text
            </p>
          </span>
        </label>
      </div>
    </>
  )
}

export default InputDatePicker
