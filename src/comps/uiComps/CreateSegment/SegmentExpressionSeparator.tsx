import { useEffect } from 'react'
import type { SegmentExpressionSeparatorProps } from './types/SegmentExpressionSeparatorProps'

const SegmentExpressionSeparator = ({ value, setFieldValue, name }: SegmentExpressionSeparatorProps) => {
  useEffect(() => {
    setFieldValue(name, value)
  }, [name, setFieldValue, value])
  return (
    <>
      <div className="flex w-full items-center space-x-5 mb-3">
        <div className="uppercase text-sm text-slate-100 font-bold opacity-80">{value}</div>
        <div className="border-t-[1px] border-dashed w-full h-[1px]"></div>
      </div>
    </>
  )
}

export default SegmentExpressionSeparator
