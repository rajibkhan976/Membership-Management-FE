import { InitWidgetFn } from './types/InitWidgetFn'
import { SetupWidgetFn } from './types/SetupWidgetFn'

const initWidget: InitWidgetFn = (WidgetDfn, routePath, config) => {
  return new WidgetDfn(routePath, config)
}
const createView = (setupFn: SetupWidgetFn) => (routePath: string, config: object) =>
  setupFn({ initWidget, routePath, config })
export default createView
