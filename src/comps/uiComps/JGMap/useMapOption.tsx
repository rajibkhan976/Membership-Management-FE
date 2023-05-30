import { useMemo } from 'react'
import { data, AuthenticationType } from 'azure-maps-control'
import { IAzureMapOptions } from 'react-azure-maps'

const KEY = 'vSb1xPs21ido5CDnsfs3khbm7JbXu54wvFJnhmMCPgE'

const useMapOption = (center: data.Position, zoom: number) => {
  const option: IAzureMapOptions = useMemo(
    () => ({
      authOptions: {
        authType: AuthenticationType.subscriptionKey,
        subscriptionKey: KEY,
      },
      center,
      zoom,
      view: 'Auto',
    }),
    [center, zoom]
  )
  return option
}

export default useMapOption
