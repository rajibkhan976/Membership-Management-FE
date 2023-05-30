/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useCallback, useEffect, useState } from "react"

type InputDatePickerRangeProps = {
  label: string
  id: string
  value: string
  name: string
  setFieldValue: any
}
const InputDatePickerRange = ({ label, id, value, setFieldValue, name }: InputDatePickerRangeProps) => {
  const [startData, setStartData] = useState<string>('')
  const [endData, setEndData] = useState<string>('')

  useEffect(() => {
    if (value) {
      const splitValues = value.split(',')
      setStartData(splitValues[0])
      setEndData(splitValues[1])
    }
  }, [value])

  const handleData = useCallback(
    async (date: string, position: number) => {
      if (position === 1) {
        await setStartData(date)
      } else {
        await setEndData(date)
        await setFieldValue(name, startData + ',' + date)
      }
    },
    [name, setFieldValue, startData]
  )

  return (
    <>
      <div className="flex">
        <input
          type={'date'}
          id={id}
          name={name}
          value={startData}
          placeholder={label}
          onChange={(e) => handleData(e.target.value, 1)}
          className="h-[32px] w-[40%] sm:w-[45%] md:w-[168px] p-1 border-[1px] border-jg-metal-100 rounded-[2px] text-[14px] text-jg-metal-700"
        />
        <div className="px-3">-</div>
        <input
          type={'date'}
          id={id}
          name={name}
          value={endData}
          placeholder={label}
          onChange={(e) => handleData(e.target.value, 2)}
          className="h-[32px] w-[40%] sm:w-[45%] md:w-[168px] p-1 border-[1px] border-jg-metal-100 rounded-[2px] text-[14px] text-jg-metal-700"
        />
      </div>
    </>
  )
}

export default InputDatePickerRange
