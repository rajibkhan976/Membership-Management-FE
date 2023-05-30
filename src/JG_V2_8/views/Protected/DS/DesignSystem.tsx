import createView from 'jg-view'
import { createWidget } from 'jg-widget'
import DesignSystemTabs from '../DS/DesignSystemTabs'

const DSWidget = createWidget((context) => {
  // routeObject
  const { routePath, config } = context
  return {
    path: routePath,
    element: <DesignSystemTabs />,
    children: [],
  }
})

export default createView(({ routePath, config, initWidget }) => initWidget(DSWidget, routePath, config))
