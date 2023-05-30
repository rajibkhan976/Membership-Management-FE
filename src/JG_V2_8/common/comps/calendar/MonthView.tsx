import { useState, useEffect, useRef } from 'react'
import moment from 'moment'
import { ViewBaseProps } from './ViewBaseProps'
import classNames from 'classnames'
import CalendarItem from './CalendarItem'

type MonthViewProps = ViewBaseProps & {
  weekdays?: string[]
  calendarDays?: any[]
  selectedMonth?: string
}

const MonthView = (props: MonthViewProps) => {
  const { weekdays, calendarDays, selectedMonth, onItemClick, onItemOutSideClick, onShowMoreItemsClick, getItemCount } =
    props

  const [eventList, setEventList] = useState<any[]>([])
  const containerRef = useRef<HTMLDivElement | null>(null)

  const checkToday = (date: string): boolean => {
    const today = moment().format('YYYY-MM-DD')
    if (date === today) {
      return true
    }
    return false
  }

  useEffect(() => {
    if (calendarDays && calendarDays.length > 0) {
      let eventCount = 0
      calendarDays.forEach((day: any) => {
        if (day?.isCurrentMonth) eventCount += day?.events?.length
        if (checkToday(day.date) && day.events && day.events.length > 0) {
          setEventList(day.events)
        }
      })
      getItemCount && getItemCount(eventCount)
    }
  }, [calendarDays])

  useEffect(() => {
    if (selectedMonth && moment().month() + 1 !== parseInt(moment().month(selectedMonth).format('M'))) {
      setEventList([])
    }
  }, [selectedMonth])

  const onDateClick = (event: any, date: string): void => {
    event.preventDefault()
    event.stopPropagation()
    if (date && calendarDays && calendarDays.length > 0) {
      for (let i = 0; i < calendarDays.length; i++) {
        if (calendarDays[i].date === date && calendarDays[i].events && calendarDays[i].events.length > 0) {
          setEventList(calendarDays[i].events)
          break
        } else {
          setEventList([])
        }
      }
    }
  }

  useEffect(() => {
    if (calendarDays && calendarDays.length > 0) {
      calendarDays.forEach((day: any) => {
        if (day.date === moment().format('YYYY-MM-DD') && day.events && day.events.length > 0) {
          setEventList(day.events)
        }
      })
    }
  }, [])

  return (
    <>
      <div
        className="shadow rounded-sm md:rounded-none ring-0 md:ring-1 md:ring-gray-200 flex flex-col md:flex-grow overflow-y-auto"
        ref={containerRef}
      >
        <div className="grid grid-cols-7 md:gap-px ring-0 md:ring-1 md:ring-gray-200 md:pb-px md:pl-px md:pr-px bg-jg-grey-200 text-center text-xs font-semibold capitalize md:uppercase leading-6">
          {weekdays?.map((element: string, index: number) => (
            <div
              className={classNames(
                'bg-white py-2',
                index === 5 || index === 6 ? 'text-jg-red-400 md:text-jg-grey-800' : 'text-jg-grey-800'
              )}
              key={index}
            >
              {element}
            </div>
          ))}
        </div>
        <div className="flex bg-gray-200 text-xs leading-6 text-gray-900 h-full">
          <div
            className="hidden visible w-full lg:grid lg:grid-cols-7 ring-0 lg:ring-1 lg:ring-gray-200 pl-px gap-px"
            style={{ gridTemplateRows: 'repeat(6, 150px)' }}
          >
            {calendarDays?.map((day: any, calendarIndex: number) => (
              <div
                key={day?.date + calendarIndex}
                className={classNames(
                  day?.isCurrentMonth ? 'bg-white font-extrabold' : 'bg-gray-100 font-normal',
                  // 'flex flex-col max-h-[163px] min-h-[144px] justify-start relative',
                  'flex flex-col justify-start relative'
                )}
              >
                <time
                  dateTime={day.date}
                  className={
                    day?.isToday
                      ? 'mt-1 block w-full text-center text-green-600 font-extrabold'
                      : 'block w-full text-center mt-1'
                  }
                >
                  {day?.date?.split('-')?.pop()}
                </time>
                {day?.events?.length > 0 && (
                  <ol className="mt-1 w-full flex flex-col">
                    {day?.events
                      ?.slice(0, day.events.length > 3 ? 3 : day.events.length)
                      ?.map((event: any, index: number) => {
                        if (day?.isCurrentMonth) {
                          return (
                            <li key={event?.id + index}>
                              <CalendarItem
                                view="month"
                                className={`flex-auto pl-1 mb-1 truncate font-medium text-gray-900 cursor-pointer hover:bg-opacity-75 focus-visible:bg-opacity-75`}
                                event={event}
                                onItemClick={onItemClick}
                                onItemOutSideClick={onItemOutSideClick}
                              />
                            </li>
                          )
                        }
                      })}
                    {day?.events?.length > 3 && day?.isCurrentMonth && (
                      <li
                        className="w-8/12 ml-1 pl-1 rounded text-gray-500 cursor-pointer bg-gray-200"
                        onClick={(e) =>
                          onShowMoreItemsClick && onShowMoreItemsClick(e, day.events.slice(3, day.events.length))
                        }
                      >
                        {day?.events?.length - 3} more...
                      </li>
                    )}
                  </ol>
                )}
              </div>
            ))}
          </div>
          <div
            className="isolate bg-white w-full grid grid-cols-7 gap-px lg:hidden"
            style={{ gridTemplateRows: 'repeat(6, 40px)', height: 'fit-content' }}
          >
            {calendarDays?.map((day: any, dayIndex: number) => (
              <button
                key={dayIndex + day?.date}
                type="button"
                className={classNames(
                  day.isCurrentMonth ? 'bg-white' : 'bg-gray-100',
                  day.isToday && 'font-extrabold text-jg-green-500',
                  day.isCurrentMonth && !day.isToday && !day.isWeekend && 'text-jg-grey-600 font-extrabold',
                  !day.isCurrentMonth && !day.isToday && !day.isWeekend && 'text-jg-grey-600 font-normal',
                  day.isWeekend && !day.isToday && 'text-jg-red-400',
                  !day?.isCurrentMonth && '!bg-white',
                  'h-10 flex flex-col row-span-1 items-center justify-center py-1 md:shadow focus:z-10 focus:bg-jg-green-500 focus:text-white'
                )}
                onClick={(event) => onDateClick(event, day.date)}
              >
                <time
                  dateTime={day?.date}
                  className={classNames(
                    day?.isToday && 'focus:bg-jg-green-500',
                    !day?.isCurrentMonth && 'hidden',
                    'h-6 w-6 mx-auto'
                  )}
                >
                  {day?.date?.split('-')?.pop()}
                </time>
                <span className="sr-only">{day.events.length} events</span>
                {day.events.length > 0 && (
                  <span
                    className={classNames(
                      '-mx-0.5 flex flex-wrap-reverse',
                      day.isToday ? 'pt-1' : undefined,
                      !day?.isCurrentMonth && 'hidden'
                    )}
                  >
                    {day?.events?.slice(0, day?.events?.length > 3 ? 3 : day?.events?.length)?.map((event: any) => (
                      <span
                        key={event.id}
                        className={'mx-0.5 mb-1 h-1.5 w-1.5 rounded-full'}
                        style={{ backgroundColor: `${event?.label || '#4CAF4F'}` }}
                      />
                    ))}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
      {eventList?.length > 0 && (
        <div className="mt-2 visible lg:hidden overflow-y-auto" style={{ height: '30vh' }}>
          {eventList?.map((event: any, index: number) => (
            <div
              key={index + event?.id}
              className={'w-full flex items-center mx-auto pl-2 mb-1.5 truncate text-xs'}
              style={{ backgroundColor: `${event?.label || '#4CAF4F'}`, height: '30px' }}
              onClick={(e) => {
                onItemOutSideClick && onItemOutSideClick(e)
                setTimeout(() => {
                  onItemClick && onItemClick(e, event?.id)
                }, 200)
              }}
            >
              {event?.name}
            </div>
          ))}
        </div>
      )}
      {eventList?.length === 0 && (
        <div className="flex items-start justify-center md:hidden">
          <div className="flex-grow text-center p-2 text-md">No event found in this Date.</div>
        </div>
      )}
    </>
  )
}

export default MonthView
