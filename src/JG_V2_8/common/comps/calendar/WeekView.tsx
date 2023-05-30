import { useState, useEffect } from 'react'
import { ViewBaseProps } from './ViewBaseProps'
import classNames from 'classnames'
import moment from 'moment'

type WeekViewProps = ViewBaseProps & {
  weekdays: string[]
  weekDates: any[]
}

const WeekView = (props: WeekViewProps) => {
  const { weekdays, weekDates, onItemClick, onItemOutSideClick, onShowMoreItemsClick, getItemCount } = props

  const [weeksInfoList, setWeeksInfoList] = useState<any[]>([])
  const [eventContainerRef, setEventContainerRef] = useState<HTMLDivElement | null>(null)
  const [weekDay, setWeekDay] = useState<string>(moment().format('YYYY-MM-DD'))

  useEffect(() => {
    if (weekdays && weekDates && weekdays.length > 0 && weekDates.length > 0) {
      const weeksInfoListArr: any[] = []
      let eventCount = 0
      for (let i = 0; i < weekdays.length && weekDates.length; i++) {
        weeksInfoListArr.push({
          name: weekdays[i],
          date: weekDates[i].date,
          isToday: weekDates[i].isToday,
          isCurrentMonth: weekDates[i].isCurrentMonth,
          events: weekDates[i].events,
        })
        eventCount += weekDates[i].events.length
      }
      setWeeksInfoList(weeksInfoListArr)
      getItemCount && getItemCount(eventCount)
    }
  }, [weekdays, weekDates])

  const renderCalendarItems = (events: any[]) => {
    const eventsNode: any[] = []
    const copiedEvenstNode: any[] = []
    events?.forEach((event: any, eventIndex: number) => {
      if (eventContainerRef && eventsNode.length * 38 < eventContainerRef.offsetHeight - 34) {
        eventsNode.push(
          <div key={eventIndex + event?.id}>
            <div
              className={'flex-auto items-center mb-1.5 px-1 h-[28px] cursor-pointer w-full truncate'}
              onClick={(e) => {
                onItemOutSideClick && onItemOutSideClick(e)
                setTimeout(() => {
                  onItemClick && onItemClick(e, event?.id)
                }, 200)
              }}
              style={{ backgroundColor: `${event?.label || '#4CAF4F'}` }}
            >
              {event?.name}
            </div>
          </div>
        )
      }
    })
    if (
      events &&
      events.length > 0 &&
      eventsNode.length > 0 &&
      eventContainerRef &&
      eventsNode.length < events.length
    ) {
      eventsNode.push(
        <div
          className="flex h-[28px] rounded-sm justify-center items-center font-semibold bg-jg-grey-200 text-jg-grey-500 w-9/12 ml-1 px-1 cursor-pointer"
          onClick={(e) =>
            onShowMoreItemsClick && onShowMoreItemsClick(e, events?.slice(copiedEvenstNode?.length - 1, events?.length))
          }
        >
          {`${eventsNode?.length - copiedEvenstNode?.length} more...`}
        </div>
      )
    }
    return eventsNode
  }

  const renderDailyItems = (events: any[], date: string) => {
    const eventsNode: any[] = []
    events?.forEach((event: any, eventIndex: number) => {
      if (weekDay === date) {
        eventsNode.push(
          <div key={event?.id + eventIndex}>
            <div
              className={'flex-auto items-center mb-1.5 px-1 h-[28px] cursor-pointer w-full truncate'}
              onClick={(e) => {
                onItemOutSideClick && onItemOutSideClick(e)
                setTimeout(() => {
                  onItemClick && onItemClick(e, event?.id)
                }, 200)
              }}
              style={{ backgroundColor: `${event?.label || '#4CAF4F'}` }}
            >
              {event?.name}
            </div>
          </div>
        )
      }
    })
    return eventsNode
  }

  return (
    <>
      <div className="hidden visible ring-1 ring-gray-200 md:flex md:flex-wrap md:flex-row md:items-start md:justify-start h-full px-px">
        {weeksInfoList?.map((day: any, index: number) => (
          <div
            key={index}
            className="hidden visible h-full ring-1 ring-gray-200 w-full md:w-[14.28%] md:flex md:flex-col items-center justify-start bg-white rounded-sm md:rounded-none"
          >
            <div className="flex flex-col w-full items-center justify-start border-b-none md:border-b border-gray-300 bg-white py-2">
              <div className="flex w-full justify-start md:justify-center ml-3 md:ml-0 text-sm font-normal text-gray-400">
                {day?.name?.substring(0, 2)}
                <span className="sr-only sm:not-sr-only">{day?.name?.substring(2, day.name.length)}</span>
              </div>
              <div
                className={
                  day?.isToday
                    ? 'flex w-full text-lg md:justify-center ml-3 md:ml-0 font-extrabold text-green-600'
                    : 'flex w-full text-lg md:justify-center ml-3 md:ml-0 font-extrabold text-gray-600'
                }
              >
                {day?.date?.split('-')?.pop()}
              </div>
            </div>
            <div className="hidden visible md:flex flex-col w-full h-full" ref={setEventContainerRef}>
              {renderCalendarItems(day?.events)}
            </div>
          </div>
        ))}
      </div>
      <div className="flex w-full md:hidden" style={{ height: '55vh', overflow: 'hidden' }}>
        <div
          className={classNames('flex flex-col pl-px pb-px pt-px bg-white text-jg-grey-800')}
          style={{ flex: '0 0 96px' }}
        >
          {weeksInfoList?.map((day: any, index: number) => (
            <button
              className={classNames(
                day?.isToday && 'text-jg-green-500',
                'flex flex-col flex-grow justify-center items-center w-full ring-1 ring-gray-200 focus:bg-jg-green-500 focus:text-white'
              )}
              key={index + day?.date}
              onClick={() => setWeekDay(day?.date)}
            >
              <div className={classNames('flex w-1/12 justify-center text-sm font-semibold')}>
                {day?.name?.substring(0, 3)?.toUpperCase()}
                <span className="sr-only sm:not-sr-only">{day?.name?.substring(2, day.name.length)}</span>
              </div>
              <div className={classNames('flex w-0 justify-start ml-1 font-extrabold text-sm pr-6')}>
                {day?.date?.split('-')?.pop()}
              </div>
            </button>
          ))}
        </div>
        <div
          className={classNames('flex flex-col flex-grow bg-white border border-jg-grey-300 h-full overflow-y-auto')}
        >
          {weeksInfoList?.map((day: any) => {
            return renderDailyItems(day?.events, day?.date)
          })}
        </div>
      </div>
    </>
  )
}

export default WeekView
