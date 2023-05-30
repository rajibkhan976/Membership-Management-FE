import { lazy, Suspense, useEffect, useState } from 'react'
import { RouteObject, useRoutes } from 'react-router-dom'
import JGView from '@jg/_core/classes/view/JGView'

export type ViewProps = { path: string; name: string; config?: object }

const importLayout = (area: string) => lazy(() => import(`../../views/${area}/Layout`))
const importViews = (appStartPath: string, area: string, views: ViewProps[], callback: any) => {
  // const appStartPath=  useAppStore.getState().AppStartPath;
  console.log('importViews')
  const routeChildren: RouteObject[] = []
  import(`../../views/${area}`).then((viewsByArea) => {
    for (let i = 0; i < views.length; i++) {
      const view = views[i]
      const createViewFn = viewsByArea[view.name]
      routeChildren.push(new JGView(appStartPath + view?.path || '', view?.config || {}, createViewFn).getRouteTree())
    }
    callback(routeChildren)
  })
}
type JGRouteProps = { appStartPath?: string; area: string; views: ViewProps[] }

function JGRoutes(props: JGRouteProps) {
  const { appStartPath = '', area = 'Public', views = [] } = props

  const routeIntial: RouteObject = {}
  const [route, setRoute] = useState(routeIntial)
  useEffect(() => {
    async function loadLayout() {
      const Layout = await importLayout(area)
      importViews(appStartPath, area, views, (routeRes: RouteObject[]) => {
        setRoute({ children: routeRes, element: <Layout /> })
      })
    }
    loadLayout()
  }, [])
  console.log('[route ready]', area, route, views)

  return <Suspense fallback={<div>Loading{area} ...</div>}>{useRoutes([route])}</Suspense>
}

export default JGRoutes
