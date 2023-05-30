import classNames from 'classnames'
import moment from 'moment'
import { ViewBaseProps } from './ViewBaseProps'
import CalendarItem from './CalendarItem'

type CalendarItemsListProps = ViewBaseProps & {
  emptyListMessage: string
  eventList: any[]
}

const CalendarItemsList = (props: CalendarItemsListProps) => {
  const { emptyListMessage, eventList, onItemClick, onItemOutSideClick } = props

  const formatEventDate = (date: string): string[] => {
    let eventDate: string[] = []
    if (date) {
      eventDate = [moment(date).format('ddd').toUpperCase(), moment(date).format('DD')]
    }
    return eventDate
  }

  const hasMultipleEventsOnSameDate = (itemIndex: number, eventDate: string, monthlyEventsArr: any[]): number => {
    const dailyEventsIdArr: number[] = []
    if (Array.isArray(monthlyEventsArr) && monthlyEventsArr.length > 0 && eventDate) {
      monthlyEventsArr.forEach((event, eventIndex) => {
        if (event?.date === eventDate) {
          dailyEventsIdArr.push(eventIndex)
        }
      })
    }
    return dailyEventsIdArr.indexOf(itemIndex)
  }

  return (
    <div className="border bg-white h-full overflow-y-auto">
      <ul role="list" className={classNames('w-full flex flex-col', eventList?.length > 0 ? 'visible' : 'invisible')}>
        {eventList?.map((event: any, index: number) => (
          <li className={classNames('w-full border-b')} key={index}>
            <div className="w-full">
              <div className="w-full px-6 py-2 text-sm text-jg-grey-700 font-bold border-b bg-jg-grey-50">
                {`${event?.month}, ${event?.year} (${event?.count})`}
              </div>
              {event?.eventsArr?.map((item: any, itemIndex: number) => (
                <div className="w-full h-full px-4 py-4 sm:px-6 hover:bg-jg-grey-50" key={itemIndex}>
                  <div className="flex flex-row flex-wrap w-full h-full">
                    {hasMultipleEventsOnSameDate(itemIndex, item?.date, event.eventsArr) === 0 ? (
                      <p className="flex flex-col w-2/12 md:w-3/12 h-full mb-1.5 md:mb-0 text-xs font-semibold text-gray-400 truncate">
                        <span className="inline-block text-jg-grey-600 md:text-sm">
                          {formatEventDate(item.date)[0]}
                        </span>
                        <span className="inline-block text-jg-grey-800 text-lg">{`${
                          formatEventDate(item.date)[1]
                        }`}</span>
                      </p>
                    ) : (
                      <p className="inline-block w-2/12 md:w-3/12 mb-1.5 md:mb-0 text-xs font-medium text-gray-400 truncate">
                        &nbsp;
                      </p>
                    )}
                    <div className="flex flex-col md:flex-row w-10/12 md:w-9/12 h-full">
                      <div className="flex items-start md:items-center mt-0 md:mt-1 md:w-3/12 mb-0.5 md:mb-0 truncate">
                        <span
                          className={'inline-block px-2.5 py-2.5 rounded'}
                          style={{ backgroundColor: `${item?.label}` }}
                        />
                        <span className="inline-block ml-2.5 align-top text-sm md:text-md leading-5 font-semibold text-gray-600">
                          {item.time}
                        </span>
                      </div>
                      <div className="flex items-start md:items-center w-full md:w-6/12 truncate">
                        <CalendarItem
                          view="list"
                          className={`w-full pl-0 md:pl-5 mt-1 text-left text-sm md:text-md font-medium text-gray-600 truncate cursor-pointer`}
                          event={item}
                          onItemClick={onItemClick}
                          onItemOutSideClick={onItemOutSideClick}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
      {eventList?.length === 0 && (
        <div className="flex align-center justify-center">
          <div className="flex-grow text-center p-1.5 text-md">{emptyListMessage}</div>
        </div>
      )}
    </div>
  )
}

export default CalendarItemsList
