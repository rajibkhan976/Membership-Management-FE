import createView from 'jg-view'
import GenericReactWidget from './GenericWidget'

export default createView(({ routePath, config, initWidget }) => initWidget(GenericReactWidget, routePath, config))
