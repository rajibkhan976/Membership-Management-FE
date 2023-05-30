import createView from 'jg-view'
import DemoCompTesingWidget from '../DemoCompTesingWidget'
import RoutableTabsTesting from './RoutableTabsTesting'

const items = [{ name: 'RoutableTabsTesting', element: <RoutableTabsTesting /> }]
export default createView(({ routePath, config, initWidget }) => initWidget(DemoCompTesingWidget, routePath, { items }))
