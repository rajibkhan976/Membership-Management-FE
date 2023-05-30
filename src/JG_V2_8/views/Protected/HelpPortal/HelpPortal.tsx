import Lorem from '@jg/utils/Lorem'
import createView from 'jg-view'
import HelpPortalWidget from './HelpPortalWidget'

export default createView(({ routePath, config, initWidget }) => initWidget(HelpPortalWidget, routePath, config))
