import { ViewProps } from 'jg-routes'
import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'
import AppStore from './store/store'
import ViewRegister from './ViewRegister'
import JGView from './_core/classes/view/JGView'

ViewRegister.run()
const importLayout = (area: string) => lazy(() => import(`./views/${area}/Layout`))
const importViews = (appStartPath: string, area: string, views: ViewProps[]) =>
  new Promise<RouteObject[]>((resolve, reject) => {
    const routeChildren: RouteObject[] = []
    import(`./views/${area}`).then((viewsByArea) => {
      for (let i = 0; i < views.length; i++) {
        const view = views[i]
        const createViewFn = viewsByArea[view.name]
        routeChildren.push(new JGView(appStartPath + view?.path || '', view?.config || {}, createViewFn).getRouteTree())
      }
      console.log('[import views]', routeChildren)
      resolve(routeChildren)
    })
  })
const { AppStartPath, Views } = AppStore.getState()

const InitRoutes = (areaName: string, allowedViews?: string[]) =>
  new Promise<RouteObject>((success, error) => {
    const Layout = importLayout(areaName)
    importViews(AppStartPath, areaName, Views[areaName]).then((routes) => {
      success({ children: routes, element: <Layout /> })
    })
  })
export default InitRoutes
