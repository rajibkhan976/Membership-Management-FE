import { Suspense, useEffect, useRef, useState } from 'react'
import {
  BrowserRouter,
  Route,
  RouteObject,
  Routes,
  useLocation,
  useMatch,
  useResolvedPath,
  useRoutes,
} from 'react-router-dom'
import { Four04Page, LoaderOverlay } from './common/comps'
import HelperButton from './common/comps/float-helper-button/HelperButton'
import FooterWrapper from './_app/footer/FooterWrapper'
import { useAppStore } from './hooks'
import InitRoutes from './InitRoutes'
import GlobalNotificationProvider from './providers/GlobalNotificationProvider'
import { IsAthenticated } from './_core/Authorization'
import BottomBar from './_app/BottomBar'
import AppStore from './store/store'
import MessageBoxProvider from './providers/MessageBoxProvider'
const AppRoutes = ({
  route,
  onRouteChange = () => {},
}: {
  route: RouteObject
  onRouteChange: (path: string) => void
}) => {
  const location = useLocation()
  const AppStartPath = AppStore((state) => state.AppStartPath)
  const Views = AppStore((state) => state.Views)

  useEffect(() => {
    onRouteChange(location.pathname + location.search)
  }, [location.pathname + location.search])

  return useRoutes([route])
}
type JG_APPProps = {
  baseAppPath: string
  onRouteChange: (path: string) => void
  allowedViews?: string[]
}
type LoadingStatusType = 'pending' | 'ready'
function JG_APP({ onRouteChange, baseAppPath }: JG_APPProps) {
  const loadingRoute = { index: true, element: <LoaderOverlay /> }
  const [route, setRoute] = useState<RouteObject>(loadingRoute)
  const [status, setStatus] = useState<LoadingStatusType>('pending')
  const { SetBaseAppPath } = useAppStore()
  const SetCurrentView = AppStore((state) => state.SetCurrentView)
  const AppStartPath = AppStore((state) => state.AppStartPath)
  //const BaseAppPath = AppStore((state) => state.BaseAppPath)

  useEffect(() => {
    SetBaseAppPath(baseAppPath)
    InitRoutes(IsAthenticated() ? 'Protected' : 'Public').then((result) => {
      const redirectRoute = { path: '/*', element: <Four04Page /> }
      result.children?.push(redirectRoute)
      setRoute(result)
      setStatus('ready')
    })
  }, [])
  const _baseAppPath = baseAppPath.indexOf('http') > -1 ? '/' : baseAppPath
  return (
    <div className="flex flex-col h-screen justify-between">
      <BrowserRouter>
        <GlobalNotificationProvider>
          <Suspense fallback={<LoaderOverlay />}>
            <MessageBoxProvider>
              <AppRoutes
                onRouteChange={(path) => {
                  const viewPath =
                    path
                      .substring(AppStartPath.length + _baseAppPath.length)
                      .split('/')
                      .shift() || ''
                  onRouteChange(path)
                  SetCurrentView(viewPath, IsAthenticated() ? 'Protected' : 'Public')
                }}
                route={route}
              />
            </MessageBoxProvider>
          </Suspense>
        </GlobalNotificationProvider>
      </BrowserRouter>

      <BottomBar />

      {/*
      <div className="fixed right-0 bottom-0 mb-4">
        <HelperButton />
      </div>
      {status === 'ready' && (
        <div className="mt-12">
          <FooterWrapper />
        </div>
      )}
      
      */}
    </div>
  )
}
export { JG_APP as default }
