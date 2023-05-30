import { CompBaseProps } from '@comps/uiComps'
import { findAddres } from '@jg/_core/services/location/location'
import { LoaderOverlay } from '@jg/common/comps'
import GetStartUpSystemSettingsRequest, {
  GetStartUpSystemSettingsRequestParams,
} from '@jg/common/dataAPIs/systemSettings/GetStartUpSystemSettingsRequest'
import { GenericErrorResponse, StartUpSystemSettingsResponse } from '@jg/common/types'
import { useAsync } from '@jg/hooks'
import useGeoLocation, { GeoLocationType, GeolocationPermissionStatusType } from '@jg/hooks/useGeoLocation'
import useScript from '@jg/hooks/useScript'
import AppStore from '@jg/store/store'
import { createContext, useContext, useEffect, useState } from 'react'

import create from 'zustand'
type LatLng = {
  lat: string
  lng: string
}
type DistanceUnit = 'kilometers' | 'miles'

interface IGeoLocationContext {
  defaultGeoLocation: GeoLocationType
  getDistanceTo: (targetPosition: LatLng) => number
  userPreferredGeoLocation?: GeoLocationType
  setUserPreferredGeoLocation?: (location: GeoLocationType) => void
  getGeolocationPermissionStatus: () => GeolocationPermissionStatusType
}
interface IGeoLocationStorage {
  DistanceUnit: DistanceUnit
  DefaultLocationInfo: GeoLocationType
  UserPreferredGeoLocation?: GeoLocationType
  SetDefaultLocationInfo: (locationInfo: GeoLocationType) => void
  SetUserPreferredLocationInfo: (locationInfo: GeoLocationType) => void
}
const useGeoLocationStore = create<IGeoLocationStorage>()((set) => ({
  DistanceUnit: 'miles',
  DefaultLocationInfo: { lat: '', lng: '', locationName: '' },
  UserPreferredGeoLocation: undefined,
  SetDefaultLocationInfo: (locationInfo) => {
    set({ DefaultLocationInfo: locationInfo })
  },
  SetUserPreferredLocationInfo: (locationInfo) => {
    set({ UserPreferredGeoLocation: locationInfo })
  },
}))

const GeoLocationContext = createContext<IGeoLocationContext>({
  defaultGeoLocation: { lat: '', lng: '', locationName: '' },
  userPreferredGeoLocation: { lat: '', lng: '', locationName: '' },
  getGeolocationPermissionStatus: () => 'prompt',
  getDistanceTo: () => {
    return 0
  },
})
export const useGeoLocationContext = () => {
  return useContext(GeoLocationContext)
}

async function findAddressBySystemDefaultLocation(query: string) {
  try {
    if (query.length > 2) {
      const result = await findAddres({ query: query, typeahead: false, limit: 1 })

      return await result.json()
    } else {
      return ''
    }
  } catch (err) {
    return null
  }
}
const GeoLocationProvider = ({ children }: CompBaseProps) => {
  const BaseAppPath = AppStore((state) => {
    return state.BaseAppPath
  })
  const scriptStatus = useScript(`${BaseAppPath}Widgets/Common/js/atlas.min.js`)
  const [fallbackReady, setFallbackReady] = useState<boolean>(false)
  const SetDefaultLocationInfo = useGeoLocationStore((state) => state.SetDefaultLocationInfo)
  const SetUserPreferredLocationInfo = useGeoLocationStore((state) => state.SetUserPreferredLocationInfo)
  const defaultLocationInfo = useGeoLocationStore((state) => state.DefaultLocationInfo)
  const userPreferredGeoLocation = useGeoLocationStore((state) => state.UserPreferredGeoLocation)
  const DistanceUnit = useGeoLocationStore((state) => state.DistanceUnit)
  const { geoLocation, status, geolocationPermissionStatus } = useGeoLocation()
  const providerValue: IGeoLocationContext = {
    getGeolocationPermissionStatus: () => {
      return geolocationPermissionStatus
    },
    defaultGeoLocation: defaultLocationInfo,
    userPreferredGeoLocation: userPreferredGeoLocation,
    setUserPreferredGeoLocation: (geoLocation) => {
      SetUserPreferredLocationInfo(geoLocation)
    },
    getDistanceTo: (targetLocation: LatLng) => {
      const locationInfo = userPreferredGeoLocation || defaultLocationInfo
      //@ts-ignore
      const result = atlas.math.getDistanceTo(
        [Number(locationInfo.lng), Number(locationInfo.lat)],
        [Number(targetLocation.lng), Number(targetLocation.lat)],
        DistanceUnit
      )
      return result
    },
  }

  const {
    execute,
    status: apiStatus,
    value,
    error,
  } = useAsync<StartUpSystemSettingsResponse, GenericErrorResponse, GetStartUpSystemSettingsRequestParams>(
    GetStartUpSystemSettingsRequest,
    { keys: ['EVENT.DEFAULT_LOCATION'] },
    false
  )
  useEffect(() => {
    if (status === 'success') {
      SetDefaultLocationInfo(geoLocation)
    } else if (status === 'error') {
      execute()
    }
  }, [status])
  useEffect(() => {
    if (apiStatus === 'success') {
      console.log(value?.settings['EVENT.DEFAULT_LOCATION'])
      findAddressBySystemDefaultLocation(value?.settings['EVENT.DEFAULT_LOCATION'] || 'London, United Kingdom').then(
        (data) => {
          if (data.results) {
            SetDefaultLocationInfo({
              lat: data.results[0].position.lat,
              lng: data.results[0].position.lon,
              locationName: data.results[0].address.freeformAddress + '|' + data.results[0].address.country,
            })
            setFallbackReady(true)
          }
          // name: data.results[i].address.freeformAddress + '|' + data.results[i].address.country,
          //value: data.results[i].position.lat + '|' + data.results[i].position.lon,
        }
      )
    }
  }, [apiStatus])

  if (scriptStatus === 'ready' && (status === 'success' || fallbackReady)) {
    return <GeoLocationContext.Provider value={providerValue}>{children}</GeoLocationContext.Provider>
  }
  return <LoaderOverlay />
}
export default GeoLocationProvider
