// import { CompBaseProps } from '@comps/uiComps'
// import Calendar from '@jg/common/comps/calendar/Calendar'
// import FilterBar from '@jg/common/comps/filter/FilterBar'
// import { FindEventsHomeResponse, GetFindEventsRequestParams } from '@jg/common/dataAPIs/eventsAnsSchedules'
// import GetFindEventsRequest from '@jg/common/dataAPIs/eventsAnsSchedules/GetFindEventsRequest'

// import { GenericErrorResponse } from '@jg/common/types'
// import { useAsync } from '@jg/hooks'
// import { useWidgetComponent, useWidgetContext } from 'jg-widget'
// import { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import Banner from '../banner/Banner'

// const filterItems = [
//   { name: 'Date', sub_category: [], group: 'one' },
//   { name: 'Category', sub_category: [], group: 'one' },
//   { name: 'Provider', sub_category: [], group: 'one' },
//   { name: 'Price', sub_category: [], group: 'two' },
//   { name: 'Region', sub_category: [], group: 'two' },
//   { name: 'Distance', sub_category: [], group: 'two' },
// ]

// const events = [
//   {
//     id: 101,
//     name: 'Show Jumping Championship 2022',
//     time: '08:00 AEDT',
//     date: '2022-06-04',
//     label: 'green',
//   },
//   {
//     id: 102,
//     name: 'Monbulk Pony Club Rally - April 2022',
//     time: '09:00 AEST',
//     date: '2022-06-05',
//     label: 'green',
//   },
//   {
//     id: 103,
//     name: 'Cobram Horse & Pony Club 3 Day Camp',
//     time: '08:10 AEDT',
//     date: '2022-06-05',
//     label: 'blue',
//   },
//   {
//     id: 104,
//     name: 'Doongala April Rally (Members Only)',
//     time: '12:15 AEDT',
//     date: '2022-06-05',
//     label: 'red',
//   },
//   {
//     id: 105,
//     name: 'Design review in UK',
//     time: '09:10 AEDT',
//     date: '2022-06-06',
//     label: 'green',
//   },
//   {
//     id: 106,
//     name: 'Design review in UK',
//     time: '10:30 AEST',
//     date: '2022-06-06',
//     label: 'green',
//   },
//   {
//     id: 107,
//     name: 'Cobram Horse & Pony Club 3 Day Camp',
//     time: '12:30 BST',
//     date: '2022-06-06',
//     label: 'green',
//   },
//   {
//     id: 108,
//     name: 'Show Jumping Championship 2022',
//     time: '14:05 AEST',
//     date: '2022-06-06',
//     label: 'green',
//   },
//   {
//     id: 109,
//     name: 'Sales meeting in Australia',
//     time: '11:30 AEDT',
//     date: '2022-06-06',
//     label: 'green',
//   },
//   {
//     id: 110,
//     name: 'Tall Timbers Pony Club April Rally',
//     time: '08:30 AEDT',
//     date: '2022-06-28',
//     label: 'green',
//   },
//   {
//     id: 111,
//     name: 'Sales meeting in Canada',
//     time: '15:00 IST',
//     date: '2022-06-28',
//     label: 'blue',
//   },
//   {
//     id: 112,
//     name: 'Show Jumping Championship 2022',
//     time: '13:30 AEDT',
//     date: '2022-06-28',
//     label: 'red',
//   },
//   {
//     id: 113,
//     name: 'Sales meeting in China',
//     time: '10:00 AEST',
//     date: '2022-06-28',
//     label: 'green',
//   },
//   {
//     id: 114,
//     name: 'Monbulk Pony Club Rally - April 2022',
//     time: '09:00 AEST',
//     date: '2022-07-06',
//     label: 'green',
//   },
//   {
//     id: 115,
//     name: 'Cobram Horse & Pony Club 3 Day Camp',
//     time: '08:10 AEDT',
//     date: '2022-07-06',
//     label: 'blue',
//   },
//   {
//     id: 116,
//     name: 'Doongala April Rally (Members Only)',
//     time: '12:15 AEDT',
//     date: '2022-07-06',
//     label: 'red',
//   },
//   {
//     id: 117,
//     name: 'Sales meeting in China',
//     time: '10:00 AEST',
//     date: '2023-01-06',
//     label: 'yellow',
//   },
//   {
//     id: 118,
//     name: 'Monbulk Pony Club Rally - April 2022',
//     time: '09:00 AEST',
//     date: '2023-01-06',
//     label: 'purple',
//   },
//   {
//     id: 119,
//     name: 'Cobram Horse & Pony Club 3 Day Camp',
//     time: '08:10 AEDT',
//     date: '2023-02-06',
//     label: 'pink',
//   },
//   {
//     id: 120,
//     name: 'Doongala April Rally (Members Only)',
//     time: '12:15 AEDT',
//     date: '2023-02-06',
//     label: 'gray',
//   },
//   {
//     id: 121,
//     name: 'Design review in UK',
//     time: '09:10 AEDT',
//     date: '2023-02-06',
//     label: 'indigo',
//   },
//   {
//     id: 122,
//     name: 'Monbulk Pony Club Rally - April 2022',
//     time: '09:00 AEST',
//     date: '2021-12-06',
//     label: 'purple',
//   },
//   {
//     id: 123,
//     name: 'Cobram Horse & Pony Club 3 Day Camp',
//     time: '08:10 AEDT',
//     date: '2021-12-06',
//     label: 'pink',
//   },
//   {
//     id: 124,
//     name: 'Doongala April Rally (Members Only)',
//     time: '12:15 AEDT',
//     date: '2021-11-05',
//     label: 'gray',
//   },
//   {
//     id: 125,
//     name: 'Design review in UK',
//     time: '09:10 AEDT',
//     date: '2021-11-05',
//     label: 'indigo',
//   },
// ]

// type ScheduleProps = CompBaseProps & {
//   events?: any[]
// }
// const Schedule = (props: ScheduleProps) => {
//   const navidate = useNavigate()
//   const { basePath } = useWidgetContext()

//   const [scheduledEvents, setScheduledEvents] = useState<any[]>([])
//   const { execute, status, value, error } = useAsync<
//     FindEventsHomeResponse,
//     GenericErrorResponse,
//     GetFindEventsRequestParams
//   >(GetFindEventsRequest, { key: '', isOnline: false, sortBy: 'date', pageNumber: 1, numberOfRows: 100 }, false)
//   const { onRenderFirst } = useWidgetComponent(Schedule)
//   onRenderFirst(() => {
//     execute()
//   })
//   useEffect(() => {
//     if (status == 'success' && value?.success) {
//       const result = value.events.map((e) => {
//         const t = e.starts?.time?.split(':')
//         let time = ''
//         if (t) {
//           time = `${t[0]}:${t[1]} ${e.starts?.timezone}`
//         }

//         return {
//           id: e.docId,
//           name: e.name,
//           time: time,
//           date: e.starts?.date,
//           label: 'indigo',
//         }
//       })

//       setScheduledEvents(result)
//     } else if (status != 'idle') {
//       console.log(status)
//     }
//   }, [status])
//   return (
//     <div className="flex flex-col shadow-none md:shadow w-full">
//       <Banner className="h-[216px]" heading="We found total 1,618 events">
//         <div className="text-white text-center mx-auto">Suggested events near Sydney, AU</div>
//       </Banner>
//       <div className="mt-[-80px] border-0 md:border flex flex-col md:flex-row  w-full md:jg-container h-5/6 mx-0 md:mx-auto rounded">
//         <div className="flex w-full md:w-3/12 h-3/6">
//           <FilterBar filterItems={filterItems} />
//         </div>
//         <div className="flex w-full md:w-9/12 h-full">
//           <Calendar
//             onEventClick={(id) => {
//               navidate(`${basePath}details/${id}/`)
//             }}
//             viewItems={['Week', 'Month', 'List', 'Map']}
//             events={scheduledEvents}
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Schedule

export {}
