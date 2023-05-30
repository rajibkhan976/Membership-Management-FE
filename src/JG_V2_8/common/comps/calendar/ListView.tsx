import { useMemo, useEffect } from 'react'
import moment from 'moment'
import { ViewBaseProps } from './ViewBaseProps'
import CalendarItemsList from './CalendarItemsList'

type ListViewProps = ViewBaseProps & {
  events?: any[]
}

const ListView = (props: ListViewProps) => {
  const { events, onItemClick, onItemOutSideClick, getItemCount } = props

  const monthsArr = moment.months()
  const yearArr: number[] = []

  events?.forEach((event) => {
    if (!yearArr.includes(moment(event.date).year())) {
      yearArr.push(moment(event.date).year())
    }
  })

  useEffect(() => {
    events && getItemCount && getItemCount(events?.length)
  }, [events, getItemCount])

  const eventList = useMemo(() => {
    const eventListArr: any[] = []
    if (Array.isArray(events) && events.length > 0) {
      for (let i = 0; i < yearArr.length; i++) {
        const year = yearArr[i]
        let month = ''
        let eventsArr: any[] = []
        let eventCount = 0
        for (let c = 0; c < monthsArr.length; c++) {
          month = monthsArr[c]
          eventsArr = []
          eventCount = 0
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
    }
    return eventListArr
  }, [events])

  const emptyListMessage = 'No event found'

  return <CalendarItemsList {...{ eventList, emptyListMessage, onItemClick, onItemOutSideClick }} />
}

export default ListView
