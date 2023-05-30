import { Outlet } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import EventRootNotificationPropvider from '../providers/HelpsRootNotificationPropvider'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const MainLayout = () => {
  return (
    <EventRootNotificationPropvider>
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </EventRootNotificationPropvider>
  )
}

export default MainLayout
