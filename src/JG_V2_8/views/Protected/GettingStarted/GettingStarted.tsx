import { GettingStartedWidget } from '@jg/widgets'
import createView from 'jg-view'

export default createView(({ routePath, config, initWidget }) => initWidget(GettingStartedWidget, routePath, config))
