import useEventStore from '@jg/widgets/Events/store/useEventStore'
import FilterBarLabelItem from '@jg/common/comps/filter/FilterBarLabelItem'
import useNavigateWithArgs from '../../hooks/useNavigateWithArgs'

/*const DateLabel = () => {
  const date = useEventStore((state) => state.searchRequestArg.date)
  return <>{date && date.indexOf('-') > -1 ? date : dateFilterOptions.find((e) => e.value === date)?.name}</>
}
export default DateLabel*/

const DateLabel = () => {
  const { currentArgs, setCurrentArgs } = useNavigateWithArgs()
  const date = useEventStore((state) => state.searchRequestArg.date)
  let dateLabel = ''
  if (date && date.length === 1) {
    dateLabel = dateFilterOptions.find((e) => e.value === date[0])?.name || 'All'
  } else if (date && date.length === 2) {
    dateLabel = `${DD_MMM_YYYY_formating(safeStringToDateParse(date[0]))} - ${DD_MMM_YYYY_formating(
      safeStringToDateParse(date[1])
    )}`
  }

  return (
    <FilterBarLabelItem
      isActive={date?.[0] !== 'all'}
      name="date"
      filterValueDispplayText={dateLabel}
      reset={() => {
        setCurrentArgs({ ...currentArgs, date: ['all'] })
      }}
    />
  )
}
export default DateLabel

const dateFilterOptions = [
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

const safeStringToDateParse = (date: string) => {
  const [m, d, y] = date.split('-')
  return new Date(+y, +m - 1, +d)
}

const DD_MMM_YYYY_formating = (date: Date) => {
  const [_, m, d, y] = date.toDateString().split(' ')
  return `${d} ${m} ${y}`
}
