import { useCallback, useEffect, useState } from 'react'
import type { CurrencyRangeProps } from '@comps/uiComps/formControls/types'

const CurrencyRange = ({ name, setFieldValue, value }: CurrencyRangeProps) => {
  const [startData, setStartData] = useState<string>('')
  const [endData, setEndData] = useState<string>('')

  useEffect(() => {
    if (value){
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
      <div className="flex h-[32px]">
        <div className="flex items-center">
          <input
            className={'border p-1 rounded'}
            type={'number'}
            value={startData}
            placeholder={'12'}
            onChange={(e) => handleData(e.target.value, 1)}
          />
        </div>
        <div className="flex items-center pl-2">
          <input
            className={'border p-1 rounded'}
            type={'number'}
            value={endData}
            placeholder={'12'}
            onChange={(e) => handleData(e.target.value, 2)}
          />
        </div>
      </div>
    </>
  )
}
export default CurrencyRange
