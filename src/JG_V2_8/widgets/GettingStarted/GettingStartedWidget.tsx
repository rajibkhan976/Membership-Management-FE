import { LoaderOverlay } from '@jg/common/comps'
import { createWidget } from 'jg-widget'

import { lazy, Suspense } from 'react'
import MainLayout from './layouts/MainLayout'
const Article = lazy(() => import('./pages/article'))
const Home = lazy(() => import('./pages/home'))
const Category = lazy(() => import('./pages/category'))
const Search = lazy(() => import('./pages/search'))

const GettingStartedWidget = createWidget((context) => {
  const { routePath, getRootRoute, resolveRoutePath } = context
  return {
    path: routePath,
    element: <MainLayout />,
    children: [
      getRootRoute({
        element: (
          <Suspense fallback={<LoaderOverlay />}>
            <Home />
          </Suspense>
        ),
      }),
      {
        path: resolveRoutePath(':category/'),
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Category />
          </Suspense>
        ),
      },
      {
        path: resolveRoutePath('article/:contentId'),
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Article />
          </Suspense>
        ),
      },
      {
        path: resolveRoutePath('search/'),
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Search />
          </Suspense>
        ),
      },
    ],
  }
})
export default GettingStartedWidget
