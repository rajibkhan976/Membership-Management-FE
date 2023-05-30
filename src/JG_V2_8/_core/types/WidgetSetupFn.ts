import { RouteObject } from 'react-router-dom'
import { WidgetSetupContextArgs } from './WidgetSetupContextArgs'

export type WdgetSetupFn<T> = (widgetContext: WidgetSetupContextArgs<T>) => RouteObject
export type WidgetHookSetupContextArgs = {
  routePath: string
}
export type WdgetHookSetupFn = (widgetContext: WidgetHookSetupContextArgs) => {
  baseUrl: string
}
