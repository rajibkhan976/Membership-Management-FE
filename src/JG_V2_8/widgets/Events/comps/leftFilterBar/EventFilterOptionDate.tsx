import { useState } from 'react'
import Calendar from 'react-calendar'
import useNavigateWithArgs from '../hooks/useNavigateWithArgs'
import './CalendarCustomStyle.css'
import { CalendarMonth } from '@comps/uiComps/Icons'
import IndividaulFilterOption from './FilterIndividualOption'
import { useFilterBarContext } from '@jg/common/comps/filter/FilterBar'

const EventFilterOptionDate = () => {
  // const searchRequestArg = useEventStore((state) => state.searchRequestArg)
  //const setSerachRequestArg = useEventStore((state) => state.setSerachRequestArg)
  //const [currentDate, setCurrentDate] = useState('all')
  const { back } = useFilterBarContext()
  const { currentArgs, setCurrentArgs, getArgsFromUrl } = useNavigateWithArgs()
  const argsValue: string[] = getArgsFromUrl().date || ['all']
  const [active, setActive] = useState(argsValue.length === 2 ? 'date-range' : argsValue[0])

  // const eventDateValuePickerValue = isPickADate ? 'pickADate' : argsValue[0]
  // const optionMultiValue = [
  //   getArgsFromUrl().date ? [0] : getTodayString(),
  //   getArgsFromUrl().date ? [1] : getTodayString(7),
  // ]
  // const getPart = (formOrTo: string): string => {
  //   const date = getArgsFromUrl().date
  //   if (date && date.length == 2) {
  //     if (formOrTo === 'from') return date[0] || '-1'
  //     else return date[1] || '-1'
  //   } else return 'all'
  // }

  return (
    <div className="divide-y divide-jg-metal-50">
      {/* <EventDateValuePicker
        value={eventDateValuePickerValue}
        onChange={(value) => {
          setCurrentArgs({ ...currentArgs, ...{ date: value } })
        }}
        type="button"
      /> */}

      {/* {isPickADate && (
        <>
          <TextField
            className="mt-4"
            label="From"
            initialValue={argsValue[0] || getTodayString()}
            onValueChange={(value) => {
              console.log('value to from: ', value)
              setCurrentArgs({ ...currentArgs, ...{ date: [value.toString(), getPart('to')] } })
            }}
            type="date"
          />
          <TextField
            className="mt-4"
            label="To"
            initialValue={argsValue[1] || getTodayString()}
            onValueChange={(value) => {
              setCurrentArgs({ ...currentArgs, ...{ date: [getPart('from'), value.toString()] } })
            }}
            type="date"
          />
        </>
      )} */}
      <>
        <IndividaulFilterOption
          active={active === 'all'}
          title={'Any Day'}
          onClick={() => {
            setCurrentArgs({ ...currentArgs, date: ['all'] })
            setActive('all')
          }}
        ></IndividaulFilterOption>
        <>
          <IndividaulFilterOption
            active={active === 'date-range'}
            title={
              <>
                <h3 className="text-sm leading-4 font-medium">
                  {argsValue.length !== 2
                    ? 'Date range...'
                    : argsValue.map((v) => simpleFormatToDMMYYYY(v)).join(' - ')}
                </h3>
                <CalendarMonth className="w-4 h-4" />
              </>
            }
            onClick={() => setActive('date-range')}
          ></IndividaulFilterOption>
          {active === 'date-range' && (
            <Calendar
              selectRange
              next2Label={null}
              prev2Label={null}
              className={'w-full'}
              onChange={(value: any) => {
                setCurrentArgs({
                  ...currentArgs,
                  date: value.map((v: any) => v.toLocaleDateString('en-us').replaceAll('/', '-')),
                })
                setTimeout(() => {
                  back()
                }, 500)
              }}
              value={
                argsValue.length === 2 ? (argsValue.map((d) => safeStringToDateParse(d)) as [Date, Date]) : undefined
              }
            />
          )}
        </>
        {generateOtherOptions().map((op) => {
          return (
            <IndividaulFilterOption
              key={op.value}
              active={active === op.value}
              title={op.name}
              onClick={() => {
                setCurrentArgs({ ...currentArgs, date: [op.value] })
                setActive(op.value)
              }}
            >
              <p className="text-xs leading-[14px] text-jg-metal-300">
                {op.fromToday.map((d) => getFutureDate(d)).join(' - ')}
              </p>
            </IndividaulFilterOption>
          )
        })}
      </>
    </div>
  )
}

export default EventFilterOptionDate

const getFutureDate = (dayCount = 0, from: string = new Date().toUTCString()) => {
  const fromDay = new Date(from).getTime()
  const futureDate = simpleFormatToDMMYYYY(fromDay + dayCount * 24 * 60 * 60 * 1000)
  return futureDate
}

const generateOtherOptions = () => {
  const year = new Date().getFullYear()
  const month = new Date().getMonth()
  const dayOfWeek = new Date().getDay()
  const dayOfMonth = new Date().getDate()
  const endOfMonth = new Date(year, month + 1, 0).getDate()
  const monthAfter2 = new Date().setMonth(month + 2)
  const endOfNextMonth = new Date(monthAfter2 - dayOfMonth * 24 * 60 * 60 * 1000).getDate()

  return [
    { name: 'Today', value: 'today', fromToday: [0] },
    { name: 'Tomorrow', value: 'tomorrow', fromToday: [1] },
    { name: 'This Weekend', value: 'weekend', fromToday: [6 - dayOfWeek, 7 - dayOfWeek] },
    { name: 'This Week', value: 'currentWeek', fromToday: [0 - dayOfWeek, 6 - dayOfWeek] },
    { name: 'Next Week', value: 'nextWeek', fromToday: [7 - dayOfWeek, 13 - dayOfWeek] },
    { name: 'This Month', value: 'currentMonth', fromToday: [1 - dayOfMonth, endOfMonth - dayOfMonth] },
    {
      name: 'Next Month',
      value: 'nextMonth',
      fromToday: [endOfMonth - dayOfMonth + 1, endOfMonth - dayOfMonth + endOfNextMonth],
    },
  ]
}

const simpleFormatToDMMYYYY = (dateString: string | number) => {
  let dateObj
  if (typeof dateString === 'string') {
    dateObj = safeStringToDateParse(dateString)
  } else {
    dateObj = new Date(dateString)
  }
  return dateObj
    .toDateString()
    .slice(4)
    .replace(/(\w+)\s(\w+)\s(\w+)/, '$2 $1 $3')
}

const safeStringToDateParse = (date: string) => {
  const [m, d, y] = date.split('-')
  return new Date(+y, +m - 1, +d)
}
