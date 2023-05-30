import createView from 'jg-view'
import { EventWidget } from '@jg/widgets'

export default createView(({ initWidget, routePath, config }) => {
  return initWidget(EventWidget, routePath, config)
})
