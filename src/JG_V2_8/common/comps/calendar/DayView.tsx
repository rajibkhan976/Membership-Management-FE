import { useRef, useState, useEffect } from 'react'
import { ViewBaseProps } from './ViewBaseProps'
import classNames from 'classnames'

type DayViewProps = ViewBaseProps & {
  day?: string
  events?: any[]
}

const DayView = (props: DayViewProps) => {
  const { day, events, onItemClick, onItemOutSideClick, onShowMoreItemsClick, getItemCount } = props
  const getTimeZone: any = new Date().getTimezoneOffset() / 60
  const dailyHours = [+getTimeZone.toFixed(1), 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  const eventContainerRef = useRef<HTMLDivElement | null>(null)
  const [eventContainerWidth, setEventContainerWidth] = useState<number>(0)
  let dailyEventsArr: any[] = []
  const itemNodeWidth = 200
  const showMoreBtnWidth = 100
  const timeNodeWidth = 64

  const isStartTime = (eventStartTime: string, timeOfDay: number, timeIndex: number): boolean => {
    if (eventStartTime && parseInt(eventStartTime) === 0 && timeIndex === 0) {
      return true
    }
    if (eventStartTime && parseInt(eventStartTime) < 13 && parseInt(eventStartTime) === timeOfDay && timeIndex <= 12) {
      return true
    }
    if (
      eventStartTime &&
      parseInt(eventStartTime) > 12 &&
      parseInt(eventStartTime) - 12 === timeOfDay &&
      timeIndex > 12
    ) {
      return true
    }
    return false
  }

  useEffect(() => {
    if (eventContainerRef && eventContainerRef.current) {
      setEventContainerWidth(eventContainerRef.current?.offsetWidth)
    }
  }, [eventContainerRef])

  const renderCalendarItems = (timeValue: number, timeIndex: number, eventContainerWidth: number): any => {
    const eventsNode: any[] = []
    dailyEventsArr = []
    events?.forEach((event: any, eventIndex: number) => {
      if (event?.date === day) {
        dailyEventsArr.push(event)
      }
      if (
        event?.date === day &&
        isStartTime(event?.time, timeValue, timeIndex) &&
        eventsNode.length * itemNodeWidth * 1.5 < eventContainerWidth - showMoreBtnWidth - timeNodeWidth
      ) {
        eventsNode.push(
          <div key={eventIndex}>
            <div
              className={classNames(`flex items-center px-1 h-full cursor-pointer`, eventsNode.length > 0 && 'ml-2')}
              onClick={(e) => {
                onItemOutSideClick && onItemOutSideClick(e)
                setTimeout(() => {
                  onItemClick && onItemClick(e, event?.id)
                }, 200)
              }}
              style={{ width: `${itemNodeWidth}px` }}
            >
              <span
                className={'inline-block w-4 h-4 px-2.5 py-2.5 rounded'}
                style={{ backgroundColor: `${event?.label || '#4CAF4F'}` }}
              />
              <span className="inline-block ml-2.5 align-top text-sm md:text-md font-semibold text-gray-600 truncate">
                {event?.name}
              </span>
            </div>
          </div>
        )
      }
    })
    return eventsNode
  }

  useEffect(() => {
    const handleSetEventContainerWidth = () => {
      if (eventContainerRef && eventContainerRef.current) {
        setEventContainerWidth(eventContainerRef.current?.offsetWidth)
      }
    }
    window.addEventListener('resize', handleSetEventContainerWidth)
    return () => window.removeEventListener('resize', handleSetEventContainerWidth)
  }, [eventContainerRef])

  useEffect(() => {
    let eventCount = 0
    events?.forEach((event: any) => {
      if (day && event?.date === day) {
        eventCount++
      }
    })
    getItemCount && getItemCount(eventCount)
  }, [day, events, getItemCount])

  return (
    <div className="flex flex-wrap bg-gray-200 text-xs text-gray-900 lg:flex-auto h-5/6 overflow-y-auto px-px">
      <div className="w-full grid grid-cols-1 grid-rows-25">
        {dailyHours?.map((timeValue, timeIndex) => (
          <div className="w-full ring-1 ring-gray-200 flex bg-jg-grey-50 py-4" key={timeIndex} ref={eventContainerRef}>
            <div
              className="pl-2 flex justify-center items-center text-jg-grey-600 font-medium"
              style={{ flex: `0 0 ${timeNodeWidth}px` }}
            >
              {`${
                timeIndex === 0 && timeValue < 0
                  ? `GMT +${-timeValue}`
                  : timeIndex === 0 && timeValue > 0
                  ? `GMT -${timeValue}`
                  : `${timeValue}`
              } ${timeIndex === 0 ? '' : timeIndex > 0 && timeIndex < 12 ? 'AM' : 'PM'}`}
            </div>
            {renderCalendarItems(timeValue, timeIndex, eventContainerWidth)}
            {renderCalendarItems(timeValue, timeIndex, eventContainerWidth)?.length > 0 &&
              renderCalendarItems(timeValue, timeIndex, eventContainerWidth)?.length < dailyEventsArr?.length && (
                <div
                  className={`flex rounded-sm justify-center items-center font-semibold bg-jg-grey-200 text-jg-grey-500 px-1 cursor-pointer`}
                  onClick={(e) =>
                    onShowMoreItemsClick &&
                    onShowMoreItemsClick(
                      e,
                      dailyEventsArr?.slice(
                        renderCalendarItems(timeValue, timeIndex, eventContainerWidth)?.length - 1,
                        dailyEventsArr?.length
                      )
                    )
                  }
                  style={{ width: `${showMoreBtnWidth}px` }}
                >
                  {`${
                    dailyEventsArr?.length - renderCalendarItems(timeValue, timeIndex, eventContainerWidth)?.length
                  } more...`}
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default DayView
