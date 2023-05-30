import createView from 'jg-view'
import DemoCompTesingWidget from '../DemoCompTesingWidget'
import EventHomeTesting from './EventHomeTesting'
import EventFinderTesting from './EventFinderTesting'
import EventDetailsTesting from './EventDetailsTesting'
import EventScheduleTesting from './EventScheduleTesting'
// import EventCalenderTesting from './EventCalenderTesting';

const items = [
  { name: 'EventHomeTesting', element: <EventHomeTesting /> },
  { name: 'EventFinderTesting', element: <EventFinderTesting /> },
  { name: 'EventDetailsTesting', element: <EventDetailsTesting /> },
  { name: 'EventScheduleTesting', element: <EventScheduleTesting /> },
  // { name: 'EventCalenderTesting', element: <EventCalenderTesting /> }
]

export default createView(({ routePath, config, initWidget }) => initWidget(DemoCompTesingWidget, routePath, { items }))
