import { createWidget } from 'jg-widget'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import GenericReactPageDemo from './Content/GenericReactPageDemo'
import IFrematES from './Content/IframeText'

const GenericReactWidget = createWidget((context) => {
  const { routePath, config, resolveRoutePath, getRootRoute } = context
  const { title } = config as { title: string }
  return {
    path: routePath,
    element: (
      <>
        {/*parent element should not have any html for now , but only outlet*/}
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </>
    ),
    children: [
      getRootRoute({
        element: <>This is just a page, index page, never visible</>,
      }),
      {
        path: resolveRoutePath('ClubDiscountPromotion/'),
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <GenericReactPageDemo />
          </Suspense>
        ),
      },
      {
        path: resolveRoutePath('1/'),
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <GenericReactPageDemo />
          </Suspense>
        ),
      },
      {
        path: resolveRoutePath('iframe/'),
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <IFrematES />
          </Suspense>
        ),
      },
    ],
  }
})

export default GenericReactWidget
