import { Outlet } from 'react-router-dom'
import EventRootNotificationPropvider from '../providers/EventRootNotificationPropvider'
import GeoLocationProvider from '@jg/providers/GeoLocationProvider'

import { EventSettingsProvider } from '../providers/EventSettingsProvider'

const MainLayout = () => {
  return (
    <EventRootNotificationPropvider>
      <GeoLocationProvider>
        <EventSettingsProvider>
          <Outlet />
        </EventSettingsProvider>
      </GeoLocationProvider>
    </EventRootNotificationPropvider>
  )
}

export default MainLayout
