import { RouteObject } from 'react-router-dom'
import IWidget from '../interfaces/IWidget'

export type WidgetSetupContextArgs<T> = {
  routePath: string
  config: T
  children?: RouteObject[]
  getRootRoute: (rootRouteObj: RouteObject) => RouteObject
  resolveRoutePath: (path?: string) => string
}
