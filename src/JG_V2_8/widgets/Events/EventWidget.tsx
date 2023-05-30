import { LoaderOverlay } from '@jg/common/comps'
import { createWidget, useWidgetContext } from 'jg-widget'

import { lazy, Suspense } from 'react'
import MainLayout from './layouts/MainLayout'
import FinderLayout from './layouts/FinderLayout'
import FilterDataProvider from './providers/FilterDataProvider'
import AttendeeConsentModal from './comps/attendeeConsentModal/AttendeeConsentModal'
//import TicketBooking from './comps/details/bookings/TicketBooking'

/* const Home = lazy(() => {
  return Promise.all([
    import("./comps/eventHome/EventHome"),
    new Promise(resolve => setTimeout(resolve, 0))
  ])
  .then(([moduleExports]) => moduleExports);
}); */
const EventDetails = lazy(() => import('./comps/details/Details'))
const EventHome = lazy(() => import('./comps/eventHome/EventHome'))
const EventFinder = lazy(() => import('./comps/finder/Finder'))
const Schedule = lazy(() => import('./comps/schedule/Schedule'))
const BookATicketModal = lazy(() => import('./comps/bookATicket/BookATicketModal'))
const SaveWaitlistModal = lazy(() => import('./comps/bookATicket/SaveWaitlistModal'))

// const MainLayout = lazy(() => import('./layouts/MainLayout'));

export type EventWidgetConfigType = {
  isPublic?: boolean
  mode: 'shops' | 'events'
}

export const useEventConfig = () => {
  const { config } = useWidgetContext()

  const { mode, isPublic } = config as EventWidgetConfigType
  return { isEvent: mode === 'events', isPublic: Boolean(isPublic) }
}

const EventWidget = createWidget((context) => {
  const { config, routePath, getRootRoute, resolveRoutePath } = context
  const widgetConfig = config as EventWidgetConfigType
  const { isPublic, mode } = widgetConfig

  return {
    path: routePath,
    element: <MainLayout />,
    children: [
      getRootRoute({
        element: (
          <Suspense fallback={<LoaderOverlay />}>
            <EventHome />
          </Suspense>
        ),
      }),
      {
        path: resolveRoutePath('layout/'),
        element: <FinderLayout />,
      },
      {
        path: resolveRoutePath('browse/'),
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <FilterDataProvider resultDisplayBy="browse">
              <EventFinder />
            </FilterDataProvider>
          </Suspense>
        ),
      },

      {
        path: resolveRoutePath('my-bookings/'),
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Schedule />
          </Suspense>
        ),
      },
      {
        path: resolveRoutePath('calendar/'),
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <FilterDataProvider resultDisplayBy="calendar">
              <EventFinder />
            </FilterDataProvider>
          </Suspense>
        ),
      },

      {
        path: resolveRoutePath('details/:docId'),
        element: <EventDetails mode="current-event" />,
        children: [
          {
            path: 'book/:ticketIndex',
            element: <BookATicketModal />,
          },
          {
            path: 'save-waitlist/:ticketIndex',
            element: <SaveWaitlistModal />,
          },
          {
            path: 'attendee-consent',
            element: <AttendeeConsentModal isBooking={false} />,
          },
        ],
      },
      {
        path: resolveRoutePath('booking-details/:docId'),
        element: <EventDetails mode="booked-event" />,
        children: [
          {
            path: 'book/:ticketIndex',
            element: <BookATicketModal />,
          },
          {
            path: 'save-waitlist/:ticketIndex',
            element: <SaveWaitlistModal />,
          },
          {
            path: 'attendee-consent',
            element: <AttendeeConsentModal isBooking={true} />,
          },
        ],
        /*children: [
          {
            path: 'book/:ticketIndex',
            element: <BookATicketModal />,
          },
        ],*/
      },
    ],
  }
})
export default EventWidget
