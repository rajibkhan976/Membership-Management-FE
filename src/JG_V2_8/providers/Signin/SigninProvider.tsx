import { createContext, useContext, useState } from 'react'
import { SystemSettigsProvider, createSystemSettigsContext } from '../SystemSettingsProvider'
import { CompBaseProps } from '@comps/uiComps'
import { signinServices } from './signinServices'
import React from 'react'
import Drawer from '@jg/common/comps/drawer/Drawer'
import SigninOrSginup from './SigninOrSginup'

interface ISigninContext {
  // isSingleSingOn: boolean
  // onFire: () => void
  onSignin: () => void
  fire: (view: 'login' | 'signup') => void
  showSigninOrSginupModal: (onSignin: () => void) => void
}
const SigninContext = createContext<ISigninContext>({
  // isSingleSingOn: false,
  // onFire: () => {},
  onSignin: () => {},
  showSigninOrSginupModal: () => {},
  fire: (view: 'login' | 'signup') => {},
})

const SigninSettingsContext = createSystemSettigsContext()

const SigninSettingsProvider = ({ children }: CompBaseProps) => {
  return (
    <SystemSettigsProvider context={SigninSettingsContext} keys={['SYSTEM.ENABLEEXTRANALAUTHENTICATION']}>
      {children}
    </SystemSettigsProvider>
  )
}
export const useSgininContext = () => {
  return useContext(SigninContext)
}
const WithChildren = ({ children }: CompBaseProps) => {
  return <>{children}</>
}
const FastChildren = React.memo(WithChildren)
const handler: (() => void)[] = []
const SigninProvider = ({ children }: CompBaseProps) => {
  const { systemSettings } = useContext(SigninSettingsContext)
  const externalAuthEnabled = systemSettings['SYSTEM.ENABLEEXTRANALAUTHENTICATION"'] === 'true'
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <SigninSettingsProvider>
      <SigninContext.Provider
        value={{
          onSignin: () => {},
          showSigninOrSginupModal: (onSignin) => {
            handler.push(onSignin)
            setIsOpen(true)
          },
          fire: (view) => {
            signinServices(view, externalAuthEnabled, () => {
              const fn = handler.pop()
              fn?.()
            }).fire()
            setIsOpen(false)
          },
        }}
      >
        <FastChildren>{children}</FastChildren>
        <Drawer
          isOpen={isOpen}
          openDrawer={() => setIsOpen(true)}
          closeDrawer={() => setIsOpen(false)}
          title="To continue login or signup"
          shouldCloseOnBodyClick
          showCrossButton
          drawerContent={<SigninOrSginup />}
          showFrom="Right"
        />
      </SigninContext.Provider>
    </SigninSettingsProvider>
  )
}
export default SigninProvider
