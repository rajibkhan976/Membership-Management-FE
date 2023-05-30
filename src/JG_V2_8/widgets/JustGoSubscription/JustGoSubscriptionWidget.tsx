import { createWidget } from 'jg-widget'
import { lazy, Suspense } from 'react'
import ClubSwitcherWidget from '../ClubSwitcher/ClubSwitcherWidget'
import { QueryClient, QueryClientProvider } from 'react-query'
import ErrorBoundary from './components/helper/ErrorBoundary'
import { LoaderOverlay } from '@jg/common/comps'

const FinanceTab = lazy(() => import('./components/FinanceTab'))
const queryClient = new QueryClient()

const JustGoSubscriptionWidget = createWidget((context) => {
  const { config, routePath, getRootRoute, resolveRoutePath } = context

  return new ClubSwitcherWidget(
    routePath,
    {
      titleComponent: <>&nbsp;</>,
      captionComponent: <>&nbsp;</>,
    },
    [
      {
        index: true,
        element: (
          <ErrorBoundary>
            <Suspense fallback={<LoaderOverlay />}>
              <QueryClientProvider client={queryClient}>
                <FinanceTab {...config} />
              </QueryClientProvider>
            </Suspense>
          </ErrorBoundary>
        ),
      },
    ]
  ).getRouteTree()
})

export default JustGoSubscriptionWidget
