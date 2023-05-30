import WidgetBase from './classes/widget/WidgetBase'
import WidgetContext, { useWidgetContext } from './classes/widget/WidgetContext'
import WithWidgetContext from './classes/widget/WithWidgetContext'
import useWidgetComponent from './hooks/useWidgetComponent'

import { WdgetSetupFn } from './types/WidgetSetupFn'

const createWidget = <T extends object = object>(setupFn: WdgetSetupFn<T>) => {
  class FinalWidget extends WidgetBase<T> {
    initRouteTree() {
      this.wrapperRoute = setupFn({
        routePath: this.routePath,
        config: this.config,
        children: this.children,
        getRootRoute: (rootRouteObj) => this.getRootRoute(rootRouteObj),
        resolveRoutePath: (path) => this.resolveRoutePath(path),
      })
      if (this.wrapperRoute) {
        this.wrapperRoute.element = WithWidgetContext({
          children: this.wrapperRoute.element,
          basePath: this.routePath,
          config: this.config,
        })
      }
    }
  }
  return FinalWidget
}
export { createWidget, WidgetContext, useWidgetContext, useWidgetComponent }
