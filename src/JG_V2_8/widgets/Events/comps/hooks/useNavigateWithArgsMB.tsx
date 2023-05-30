import { useRouter } from '@jg/hooks'
import { useWidgetContext } from 'jg-widget'
import _, { join } from 'lodash'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useFilterDataContext } from '../../providers/FilterDataProvider'

export interface MyBookingParams {
  familyMembers: string[]
  clubMembers: any[]
  category: string[]
  isOnlyOnline: boolean
  allowPastBooking: boolean
}

const defaultArgs: MyBookingParams = {
  familyMembers: ['all'],
  clubMembers: [],
  category: ['all'],
  isOnlyOnline: false,
  allowPastBooking: false,
}

const useNavigateWithArgsMB = () => {
  const [searchParams] = useSearchParams()

  // const { defaultGeoLocation, userPreferredGeoLocation } = useGeoLocationContext()
  // const defaultLatLng = userPreferredGeoLocation
  //   ? `${userPreferredGeoLocation.lat}|${userPreferredGeoLocation.lng}`
  //   : `${defaultGeoLocation.lat}|${defaultGeoLocation.lng}`

  const { resultDisplayBy: mode } = useFilterDataContext()
  const prepareRequestArgsFromUrl = () => {
    const keys = ['familyMembers', 'clubMembers', 'category', 'isOnlyOnline', 'allowPastBooking']
    const args: MyBookingParams = { ...defaultArgs }
    keys.map((item) => {
      const qsItem = searchParams.get(item)
      // args[keys[index]] = qsItem || ''
      switch (item) {
        case 'familyMembers':
          args.familyMembers = qsItem ? qsItem.split('|') : ['all']
          break
        case 'clubMembers':
          args.clubMembers = qsItem ? qsItem.split('|') : []
          break
        case 'category':
          args.category = qsItem ? qsItem.split('|').map((item) => item.replaceAll('_and', '&')) : ['all']
          break
        case 'isOnlyOnline':
          args.isOnlyOnline = qsItem === 'true'
          break
        case 'allowPastBooking':
          args.allowPastBooking = qsItem === 'true'
          break
      }
    })
    return args
  }

  const [currentArgs, setCurrentArgs] = useState<Partial<MyBookingParams>>({})
  const { basePath } = useWidgetContext()
  const { navigate } = useRouter()

  const getSearchPath = (_currentArgs: Partial<MyBookingParams>) => {
    const finalArgs = { ...prepareRequestArgsFromUrl(), ..._currentArgs }
    return `?familyMembers=${finalArgs.familyMembers?.join('|')}&clubMembers=${finalArgs.clubMembers?.join(
      '|'
    )}&category=${finalArgs.category?.map((item) => item.replaceAll('&', '_and')).join('|')}&isOnlyOnline=${
      finalArgs.isOnlyOnline
    }&allowPastBooking=${finalArgs.allowPastBooking}`
  }

  useEffect(() => {
    if (!_.isEmpty(currentArgs)) {
      navigate({
        pathname: `${basePath}${'my-bookings'}/`,
        search: getSearchPath(currentArgs),
      })
    }
  }, [currentArgs])

  return { currentArgs, setCurrentArgs, getArgsFromUrl: prepareRequestArgsFromUrl, defaultArgs, getSearchPath }
}

export default useNavigateWithArgsMB
