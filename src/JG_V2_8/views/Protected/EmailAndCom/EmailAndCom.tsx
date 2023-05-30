import createView from 'jg-view'
import { EmailManagementWidget } from '@jg/widgets'

export default createView(({ initWidget, routePath, config }) => initWidget(EmailManagementWidget, routePath, config))
