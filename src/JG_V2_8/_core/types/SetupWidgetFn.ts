import { InitWidgetFn } from './InitWidgetFn'

type SetupWidgetArgs = {
  initWidget: InitWidgetFn
  routePath: string
  config: object
}
export type SetupWidgetFn = (args: SetupWidgetArgs) => any
