import { FC } from 'react'

type optionTypes = {
  value: string
  caption: string
}

type selectProps = {
  label?: string
  id: string
  options: optionTypes[]
  disabled: boolean
  name: string
  placeholder?: string
  handleChange: (value: string) => void
  value?: string
}

const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
const months = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'oct',
  'november',
  'december',
]

const DayMonthPicker = ({ placeholder, id, options, disabled, handleChange, name, value }: selectProps) => {
  return (
    <>
      <div className="flex">
        <div className="">
          <select
            name={'day'}
            id={id}
            disabled={disabled}
            className="h-[32px] w-[20%] sm:w-[25%] md:w-[120px] p-1 border-[1px] border-jg-metal-100 rounded-[2px] text-[14px] text-jg-metal-700 capitalize mr-4"
          >
            <option value="does not contain">Day</option>

            {days.length > 0 &&
              days.map((option, i: number) => (
                <option key={i} value={option}>
                  {option}
                </option>
              ))}
          </select>
          <select
            name={name}
            id={id}
            disabled={disabled}
            className="h-[32px] w-[20%] sm:w-[25%] md:w-[120px] p-1 border-[1px] border-jg-metal-100 rounded-[2px] text-[14px] text-jg-metal-700 capitalize mr-4"
          >
            <option value="does not contain">Month</option>

            {months.length > 0 &&
              months.map((option, i: number) => (
                <option key={i} value={option}>
                  {option}
                </option>
              ))}
          </select>
        </div>
      </div>
    </>
  )
}

export default DayMonthPicker
