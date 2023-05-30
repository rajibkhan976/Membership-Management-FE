import IRouter from '@jg/_core/interfaces/IRouter'
import { RouteObject } from 'react-router-dom'

interface IWidget<T = object> extends IRouter {
  config: T
  routePath: string
  children?: RouteObject[]
  getRouteTree(): RouteObject
  getRootRoute(rootRouteObj: RouteObject): RouteObject
}
export default IWidget
