import { GenericErrorResponse } from '@jg/common/types'
import { useAsync } from '@jg/hooks'
import { useWidgetComponent, useWidgetContext } from 'jg-widget'
import { useContext, useEffect, useState } from 'react'
import useEventStore, { locationData } from '../../store/useEventStore'
import SearchBar from './SearchBar'

import SectionCategories from './SectionCategories'
import SectionClubEvents from './SectionClubEvents'
import SectionFeaturedEvents from './SectionFeaturedEvents'
import SectionNearbyEvents from './SectionNearbyEvents'
import BannerHome from './BannerHome'

import useEventsAndScheduleApi, {
  GetSummaryEventsHomeRequestParams,
  SummaryEventsHomeResponse,
} from '@jg/common/dataAPIs/eventsAnsSchedules'
import { findAddres } from '@jg/_core/services/location/location'
import SectionNGBEvents from './SectionNGBEvents'
import SectionClubSummary from './SectionClubSummary'
import SectionRegionalEvents from './SectionRegionalEvents'
import SectionSubRegionalEvents from './SectionSubRegionalEvents'
import { useGeoLocationContext } from '@jg/providers/GeoLocationProvider'
import { EventSettingsContext } from '../../providers/EventSettingsProvider'
import useWindowSize from '@jg/hooks/useWindowSize'
import { useEventConfig } from '../../EventWidget'
import { useLocation } from 'react-router-dom'

async function findAddressByUserPostcode(query: string) {
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
type LatLngType = {
  lat: string
  lng: string
}
const getTragetCount = (sizeWidth?: number) => {
  const _sizeWidth = sizeWidth || 4
  if (_sizeWidth >= 700 && _sizeWidth < 1130) return 4
  if (_sizeWidth >= 1130 && _sizeWidth < 1600) return 6
  if (_sizeWidth >= 1600 && _sizeWidth < 1980) return 8

  if (_sizeWidth >= 1980 && _sizeWidth < 2500) return 12
  if (_sizeWidth >= 2500) return 14
}
// lat: '51.507608', lng: '-0.128236'
const EventHome = () => {
  const { systemSettings } = useContext(EventSettingsContext)
  const defaultDistanceUnit = systemSettings['CLUB.CLUBFINDERDEFAULTDISTANCEUNIT'] || 'Mile'
  const defaultDistance = systemSettings['EVENT.DEFAULT_RADIUS_LENGTH'] || '100'
  const width = window.innerWidth // useWindowSize() can not be used
  const { isEvent, isPublic } = useEventConfig()
  // const { defaultGeoLocation, userPreferredGeoLocation } = useGeoLocationContext()
  //const nsEventRoot = useEventRootNotification()
  const { GetSummaryEventsHomeRequest } = useEventsAndScheduleApi()
  //const [userLatLng, setUserLatLng] = useState<LatLngType>()
  const location = useLocation()
  const locationData = useEventStore((state) => state.locationData)
  const setPrevNavOfDetailsPage = useEventStore((state) => state.setPrevNavOfDetailsPage)
  const { defaultGeoLocation } = useGeoLocationContext()
  const { execute, status, value, error } = useAsync<
    SummaryEventsHomeResponse,
    GenericErrorResponse,
    GetSummaryEventsHomeRequestParams
  >(
    GetSummaryEventsHomeRequest,
    {
      userLat: defaultGeoLocation.lat, // locationData.lat,
      userLng: defaultGeoLocation.lng, // locationData.lng,
      distance: Number(defaultDistance),
      distanceUnit: defaultDistanceUnit,
      count: getTragetCount(width),
      IsShop: !isEvent,
    },
    false
  )
  const setSummary = useEventStore((state) => state.setSummary)
  const { onRenderFirst } = useWidgetComponent(isEvent ? 'EventHome' : 'ShopHome')
  // console.log('geo.status', defaultGeoLocation)
  onRenderFirst(() => {
    //getDeviceLocation((deviceLocData: locationData) => {
    // setUserLatLng({ lat: deviceLoc.lat, lng: deviceLoc.lng })
    // console.log('setFinderLatLng', deviceLocData)

    //setFinderLatLng(deviceLocData)
    //})
    execute()
  })
  useEffect(() => {
    // setPrevNavOfDetailsPage(location.pathname)
    localStorage.setItem('prevNavOfDetailsPage', location.pathname)
  }, [])
  //useEffect(() => {
  //if (locationData.lat && locationData.lng && summaryStatus != 'success') execute()
  //}, [locationData])
  useEffect(() => {
    if (status === 'success' && value?.success) {
      setSummary({ summary: value, status: 'success' })
    } else if (status !== 'idle') {
      setSummary({ status: status })
    }
  }, [status])

  return (
    <>
      <BannerHome />
      <div className={`${isEvent ? 'mt-[-200px]' : 'mt-[-100px]'} lg:mt-[-80px]`}>
        <SearchBar />
        <div className="child-bg-even-gray">
          <SectionFeaturedEvents />
          <SectionClubEvents />
          {isEvent && <SectionNearbyEvents />}

          <SectionNGBEvents />
          <SectionRegionalEvents />
          <SectionSubRegionalEvents />
          {isEvent && <SectionClubSummary />}
          <SectionCategories />
        </div>
      </div>
    </>
  )
}
export default EventHome
