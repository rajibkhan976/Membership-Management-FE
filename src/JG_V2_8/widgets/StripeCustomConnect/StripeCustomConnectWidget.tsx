import { createWidget } from 'jg-widget'
import { lazy, Suspense } from 'react'
import ClubSwitcherWidget from '../ClubSwitcher/ClubSwitcherWidget'
import { QueryClient, QueryClientProvider } from 'react-query'
import ErrorBoundary from './components/helper/ErrorBoundary'
import { LoaderOverlay } from '@jg/common/comps'
import WidgetTitle from './components/WidgetTitle'
import UpdatePaymentProfile from './components/UpdatePaymentProfile'

const FinanceTab = lazy(() => import('./components/FinanceTab'))
const queryClient = new QueryClient()

const StripeCustomConnectWidget = createWidget((context) => {
  const { config, routePath, getRootRoute, resolveRoutePath } = context

  return new ClubSwitcherWidget(
    routePath,
    {
      titleComponent: <WidgetTitle />,
      captionComponent: <UpdatePaymentProfile />,
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

export default StripeCustomConnectWidget
