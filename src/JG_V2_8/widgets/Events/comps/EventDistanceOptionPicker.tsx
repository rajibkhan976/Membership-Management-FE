import { CompBaseProps } from '@comps/uiComps'
import { useEventSettingsContext } from '../providers/EventSettingsProvider'

export const distanceFilterOptions = [
  { name: 'Any Distance', value: 'all' },
  { name: 'Within 2 miles', value: '2' },
  { name: 'Within 5 miles', value: '5' },
  { name: 'Within 10 miles', value: '10' },
  { name: 'Within 15 miles', value: '15' },
  { name: 'Within 20 miles', value: '20' },
  { name: 'Within 30 miles', value: '30' },
  { name: 'Within 50 miles', value: '50' },
  { name: 'Within 100 miles', value: '100' },
  { name: 'Within 200 miles', value: '200' },
  { name: 'Within 500 miles', value: '500' },
  { name: 'Within 1000 miles', value: '1000' },
]

type EventDistanceOptionPickerProps = CompBaseProps & {
  value?: string
  onChange: (value: string) => void
}

const EventDistanceOptionPicker = ({ value, onChange }: EventDistanceOptionPickerProps) => {
  const { sysDistanceUnit } = useEventSettingsContext()
  return (
    <>
      {Array.isArray(distanceFilterOptions) &&
        distanceFilterOptions.map((option, index) => (
          <div
            key={index}
            className="w-full text-jg-grey-600 font-medium p-3 text-sm cursor-pointer border-b border-0"
            onClick={() => onChange(option?.value)}
          >
            {sysDistanceUnit && index !== 0
              ? `Within ${option?.value} ${sysDistanceUnit.toLowerCase()}s`
              : option?.name}
          </div>
        ))}
    </>
  )
}

export default EventDistanceOptionPicker
