import { getDeviceLocation } from '@jg/_core/services/location/location'
import { AsyncStatus } from '@jg/common/types'
import { useEffect, useState } from 'react'
export type GeoLocationType = {
  lat: string
  lng: string
  locationName: string
}
export type GeolocationPermissionStatusType = 'prompt' | 'denied' | 'granted' | ''
const useGeoLocation = () => {
  const [geolocationPermissionStatus, setGeolocationPermissionStatus] =
    useState<GeolocationPermissionStatusType>('prompt')
  const [status, setStatus] = useState<AsyncStatus>('idle')
  const [geoLocation, setGeoLocation] = useState<GeoLocationType>({
    lat: '',
    lng: '',
    locationName: '',
  })
  useEffect(() => {
    setStatus('pending')
    navigator.permissions.query({ name: 'geolocation' }).then((res) => {
      setGeolocationPermissionStatus(res.state)
      if (res.state === 'granted') {
        getDeviceLocation(({ lat, lng, locationName }: any) => {
          setGeoLocation({
            lat: lat,
            lng: lng,
            locationName: locationName,
          })
          setStatus('success')
        })
      } else {
        setStatus('error')
      }
    })
  }, [])
  return { geoLocation, status, geolocationPermissionStatus }
}
export default useGeoLocation
