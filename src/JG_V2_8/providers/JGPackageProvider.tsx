import { CompBaseProps } from '@comps/uiComps'
import call from '@jg/_core/services/data/LegacyDataService'

import CommonPlaceholder from '@jg/common/comps/loader/placeholders/CommonPlaceholder'
import { AsyncStatus } from '@jg/common/types'
import { useClubSwitcherContext } from '@jg/widgets/ClubSwitcher/ClubSwitcherProvider'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useGlobalNotification } from './GlobalNotificationProvider'
import { useLocation, useSearchParams } from 'react-router-dom'

type JGPackageType = 'lite' | 'essential' | 'pro'

interface JGPackageProvider {
  jgPackage: JGPackageType
}
type JGPackageFeatures = {
  FeatureName: string
  Availability: string
  AlternateValue: string
}
type JGPackageResult = {
  name: string
  features: JGPackageFeatures[]
}

const JGPackageContext = createContext<JGPackageProvider>({ jgPackage: 'essential' })

export const useJGPackageContext = () => {
  return useContext(JGPackageContext)
}

const JGPackageProvider = ({ children }: CompBaseProps) => {
  const { notifyLoading, dismiss, notifyError } = useGlobalNotification()
  const { selectedClubDocIdInt } = useClubSwitcherContext()
  const [asyncStatus, setAsyncStatus] = useState<AsyncStatus>('idle')
  const packageRef = useRef<JGPackageResult | null>()
  const location = useLocation()
  console.log(location)
  useEffect(() => {
    if (selectedClubDocIdInt > -1) {
      setAsyncStatus('pending')
      notifyLoading('Loading...', { id: 'loading' })
      call(
        ['GoMembership/GetClubPlusPackageInfo'],
        [{ clubDocId: selectedClubDocIdInt }],
        function (result: any) {
          dismiss('loading')
          dismiss('error')
          if (result.error) {
            setAsyncStatus('error')
            notifyError('Package info not resolved! due to db access.', { id: 'error' })
          } else {
            packageRef.current = {
              name: result.PackageFeatures[0].PackageName,
              features: JSON.parse(result.PackageFeatures[0].Features),
            } as JGPackageResult //console.log(result)
            setAsyncStatus('success')
          }

          // console.log(result)
        },
        () => {
          dismiss('loading')
          dismiss('error')
          setAsyncStatus('error')
          notifyError('Package info not resolved!', { id: 'error' })
        }
      )
    }
  }, [selectedClubDocIdInt])
  if (asyncStatus === 'success') {
    let jgPackage: JGPackageType = 'essential'

    switch (packageRef.current?.name) {
      case 'JustGo Lite':
        jgPackage = 'lite'
        break
      case 'JustGo Essential':
        jgPackage = 'essential'
        break
      case 'JustGo Pro':
        jgPackage = 'pro'
        break
    }
    return <JGPackageContext.Provider value={{ jgPackage: jgPackage }}>{children}</JGPackageContext.Provider>
  } else if (asyncStatus === 'error') {
    return <JGPackageContext.Provider value={{ jgPackage: 'lite' }}>{children}</JGPackageContext.Provider>
  } else return <></>
}

export default JGPackageProvider
