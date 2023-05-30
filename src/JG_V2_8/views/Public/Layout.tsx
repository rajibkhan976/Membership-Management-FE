import LoadSystemSettings from '@jg/LoadSystemSettings'
import { LoaderOverlay } from '@jg/common/comps'
import SigninProvider from '@jg/providers/Signin/SigninProvider'
import AppStore from '@jg/store/store'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
const Layout = () => {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    LoadSystemSettings(() => {
      setLoaded(true)
    })
  }, [])
  if (loaded)
    return (
      <SigninProvider>
        <Outlet />
      </SigninProvider>
    )
  else return <LoaderOverlay />
}
export default Layout
