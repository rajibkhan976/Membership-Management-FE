import { CompBaseProps } from '@comps/uiComps'
import { SystemSettigsProvider, createSystemSettigsContext } from '@jg/providers/SystemSettingsProvider'
import { useContext } from 'react'

export const GettingStartedSettingsContext = createSystemSettigsContext()

export const GettingStartedSettingsProvider = ({ children }: CompBaseProps) => {
  return (
    <SystemSettigsProvider context={GettingStartedSettingsContext} keys={['ORGANISATION.TYPE']}>
      {children}
    </SystemSettigsProvider>
  )
}

export const useGettingStartedSettingsContext = () => {
  const { systemSettings } = useContext(GettingStartedSettingsContext)
  const sysPackageLength = systemSettings['ORGANISATION.TYPE']
  return { systemSettings, sysPackageLength }
}
