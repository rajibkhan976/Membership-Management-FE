import { CompBaseProps, JGListbox } from '@comps/uiComps'
import JGListboxItem from '@comps/uiComps/JGListbox/JGListboxItem'

export const dateFilterOptions = [
  { name: 'All Dates', value: 'all' },
  { name: 'Today', value: 'today' },
  { name: 'Tomorrow', value: 'tomorrow' },
  { name: 'This Weekend', value: 'weekend' },
  { name: 'This Week', value: 'currentWeek' },
  { name: 'Next Week', value: 'nextWeek' },
  { name: 'This Month', value: 'currentMonth' },
  { name: 'Next Month', value: 'nextMonth' },
  { name: 'Pick a date range...', value: 'pickADate' },
]

type EventDateValuePickerProps = CompBaseProps & {
  type: 'input' | 'button'
  value?: string
  onChange: (value: string[]) => void
}

export const getTodayString = (span?: number) => {
  const today = new Date()
  const result = today.setDate(today.getDate() + (span || 0))
  return new Date(result).toISOString().slice(0, 10)
}
const EventDateValuePicker = ({ type, value, onChange }: EventDateValuePickerProps) => {
  return (
    <JGListbox
      onChange={(option) => {
        if (option.value.toString() !== value) {
          if (option.value === 'pickADate') {
            onChange([getTodayString(), getTodayString(7)])
          } else onChange([option.value.toString()])
        }
      }}
      size="md"
      type={type}
      selectedValue={value || 'all'}
    >
      {dateFilterOptions.map(({ name, value }, index) => {
        return <JGListboxItem key={index} name={name} value={value} />
      })}
    </JGListbox>
  )
}
export default EventDateValuePicker
