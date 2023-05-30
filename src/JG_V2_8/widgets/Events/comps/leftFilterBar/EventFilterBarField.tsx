import { CompBaseProps } from '@comps/uiComps'

type EventFilterBarFieldProps = CompBaseProps & {
  label?: string
}
const EventFilterBarField = ({ children, label }: EventFilterBarFieldProps) => {
  return (
    <div className="flex flex-column justify-between text-jg-metal-300">
      <div className="text-[13px] leading-4 font-semibold flex items-stretch">
        <span className="inline-block self-center">{label}</span>
      </div>
      {children}
    </div>
  )
}
export default EventFilterBarField
