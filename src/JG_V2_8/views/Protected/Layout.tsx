import { Outlet } from 'react-router-dom'
import SidebarLayout from '@jg/common/layouts/SidebarLayout'
import AppStore, { User } from '@jg/store/store'
import { useEffect } from 'react'
import logout from '@jg/common/dataAPIs/authentications/Logout'
import { IsAthenticated, IsAthenticatedByParent } from '@jg/_core/Authorization'
import { LoadSystemSettings } from '@jg/index'
import { useAppStore } from '@jg/hooks'
import shallow from 'zustand/shallow'
import { LoaderOverlay } from '@jg/common/comps'
import SessionUserProvider from '@jg/providers/SessionUserProvider'

const Layout = (): React.ReactElement => {
  const AppStartPath = AppStore((state) => {
    return state.AppStartPath
  })
  const SetCurrentUser = AppStore((state) => {
    return state.SetCurrentUser
  })
  const CurrentUser = AppStore((state) => {
    return state.CurrentUser
  })

  useEffect(() => {
    if (IsAthenticated()) {
      LoadSystemSettings(() => {
        if (IsAthenticatedByParent()) {
          const _user = (window.parent as any).px.sessionUser as User
          const mem = (window.parent as any).px.sessionMember as { MID: string }
          _user.MID = mem.MID
          SetCurrentUser(_user)
        } else {
          const user = localStorage.getItem('user')
          if (user !== null) {
            const _user = JSON.parse(user) as User

            SetCurrentUser(_user)
          } else {
            logout(() => {
              location.reload()
            })
          }
        }
      })
    }
  }, [])
  if (CurrentUser != null)
    return (
      <SessionUserProvider userInfo={CurrentUser}>
        {AppStartPath !== '' ? <Outlet /> : <SidebarLayout />}
      </SessionUserProvider>
    )
  else return <LoaderOverlay />
}

export default Layout
