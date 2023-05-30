import { RouteObject } from 'react-router-dom'
import IWidget from '../../interfaces/IWidget'

class WidgetBase<T> implements IWidget<T> {
  routePath: string
  config!: T
  children?: RouteObject[]
  wrapperRoute: RouteObject | undefined

  constructor(routePath?: string, config?: T, children?: RouteObject[]) {
    if (config) this.config = config

    this.routePath = routePath || ''
    this.children = children
  }

  initRouteTree(): void {
    throw new Error('Method not implemented.')
  }

  getRootRoute(rootRouteObj: RouteObject): RouteObject {
    if (!this.routePath.length) {
      rootRouteObj.index = true
    } else rootRouteObj.path = this.routePath
    return rootRouteObj
  }

  getRouteTree(): RouteObject {
    this.initRouteTree()
    return this.wrapperRoute || {}
  }

  resolveRoutePath(path?: string): string {
    const _path = `${this.routePath}/${path}`.replaceAll('//', '/')
    return _path
  }
}
export default WidgetBase
