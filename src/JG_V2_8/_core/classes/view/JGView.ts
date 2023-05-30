import { RouteObject } from 'react-router-dom'
import IRouter from '../../interfaces/IRouter'

class JGView implements IRouter {
  routePath?: string

  config?: object

  createView?: any

  constructor(routePath: string, config: object, createView: (routePath?: string, config?: object) => {}) {
    this.routePath = routePath
    this.config = config
    this.createView = createView
  }

  getRouteTree(): RouteObject {
    return this.createView(this.routePath, this.config).getRouteTree()
  }
}

export default JGView
