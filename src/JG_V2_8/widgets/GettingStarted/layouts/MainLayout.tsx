import { Outlet } from 'react-router-dom'
import { GettingStartedSettingsProvider } from '../providers/GettingStartedSettingsProvider'

const MainLayout = () => {
  return (
    <GettingStartedSettingsProvider>
      <Outlet />
    </GettingStartedSettingsProvider>
  )
}

export default MainLayout
