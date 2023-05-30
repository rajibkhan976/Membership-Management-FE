import { useEffect, useMemo } from 'react'
import moment from 'moment'
import { ViewBaseProps } from './ViewBaseProps'
import CalendarItemsList from './CalendarItemsList'

type YearViewProps = ViewBaseProps & {
  events?: any[]
  year?: number
}

const YearView = (props: YearViewProps) => {
  const { events, year, onItemClick, onItemOutSideClick, getItemCount } = props

  const monthsArr = moment.months()

  const eventList = useMemo(() => {
    const eventListArr: any[] = []
    if (Array.isArray(events) && events.length > 0) {
      for (let c = 0; c < monthsArr.length; c++) {
        const month = monthsArr[c]
        const eventsArr: any[] = []
        let eventCount = 0
        events.forEach((event: any) => {
          if (moment(event?.date).format('MMMM') === month && moment(event?.date).year() === year) {
            eventCount++
            eventsArr.push(event)
          }
        })
        if (eventCount && eventsArr.length > 0) {
          eventListArr.push({
            month: month,
            year: year,
            count: eventCount,
            eventsArr: eventsArr,
          })
        }
      }
    }
    return eventListArr
  }, [events, year])

  useEffect(() => {
    let eventCount = 0
    eventList?.forEach((item) => {
      eventCount += item?.count
    })
    getItemCount && getItemCount(eventCount)
  }, [eventList, getItemCount])

  const emptyListMessage = 'No event found in this year'

  return <CalendarItemsList {...{ eventList, emptyListMessage, onItemClick, onItemOutSideClick }} />
}

export default YearView
