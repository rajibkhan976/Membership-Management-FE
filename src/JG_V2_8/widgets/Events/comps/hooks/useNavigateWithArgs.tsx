import { useRouter } from '@jg/hooks'
import { useWidgetContext } from 'jg-widget'
import _, { join } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SearchRequestArg } from '../../store/useEventStore'
import { useFilterDataContext } from '../../providers/FilterDataProvider'
import { useGeoLocationContext } from '@jg/providers/GeoLocationProvider'
import { useEventConfig } from '../../EventWidget'

const defaultArgs: SearchRequestArg = {
  key: '',
  latlng: '',
  date: ['all'],
  isOnline: false,
  sortBy: 'rel',
  provider: ['all'],
  category: ['all'],
  price: ['all'],
  distance: 'all',
  isFeatured: false,
  isSaved: false,
  installment: false,
}

const useNavigateWithArgs = () => {
  const [searchParams] = useSearchParams()

  const { defaultGeoLocation, userPreferredGeoLocation } = useGeoLocationContext()
  const defaultLatLng = userPreferredGeoLocation
    ? `${userPreferredGeoLocation.lat}|${userPreferredGeoLocation.lng}`
    : `${defaultGeoLocation.lat}|${defaultGeoLocation.lng}`

  const { resultDisplayBy: mode } = useFilterDataContext()
  const { isEvent } = useEventConfig()
  const prepareRequestArgsFromUrl = () => {
    const keys = [
      'key',
      'latlng',
      'date',
      'distance',
      'category',
      'provider',
      'price',
      'isOnline',
      'isFeatured',
      'isSaved',
      'sortBy',
      'orderBy',
      'installment',
    ].filter((key) => isEvent || !['date', 'isOnline', 'distance', 'latlng'].includes(key))
    const args: SearchRequestArg = {}
    // const args: SearchRequestArg = { ...defaultArgs }
    keys.map((item) => {
      const qsItem = searchParams.get(item)
      switch (item) {
        case 'key':
          args['key'] = qsItem || ''
          break
        case 'latlng':
          args.latlng = qsItem || defaultLatLng
          break
        case 'date':
          args.date = qsItem ? qsItem.split('|') : ['all'] //qsItem?.length===10? qsItem  dateFilterOptions.findIndex((option) => option.value === qsItem) > -1 ? qsItem || 'all' : 'all'
          break
        case 'category':
          args.category = qsItem ? qsItem.split('|').map((item) => item.replaceAll('_and', '&')) : ['all'] // ['ctg1$$', 'ctg2']
          break
        case 'provider':
          args.provider = qsItem ? qsItem.split('|') : ['all']
          break
        case 'price':
          args.price = qsItem ? qsItem.split('|') : ['all']
          break
        case 'distance':
          args.distance = qsItem || 'all'
          break
        case 'isOnline':
          args.isOnline = qsItem === 'true'
          break
        case 'isFeatured':
          args.isFeatured = qsItem === 'true'
          break
        case 'installment':
          args.installment = qsItem === 'true'
          break
        case 'isSaved':
          args.isSaved = qsItem === 'true'
          break
        case 'sortBy':
          args.sortBy = qsItem && ['date', 'distance', 'relevant'].includes(qsItem) ? qsItem : 'date'
          break
        case 'orderBy':
          args.orderBy = qsItem ? (qsItem === 'asc' ? 'asc' : 'desc') : 'asc'
          break
      }
    })
    return args
  }

  const [currentArgs, setCurrentArgs] = useState<SearchRequestArg>({})
  const { basePath } = useWidgetContext()
  const { navigate } = useRouter()

  const getSearchPath = (_currentArgs: SearchRequestArg) => {
    const finalArgs = { ...prepareRequestArgsFromUrl(), ..._currentArgs }
    const keys = Object.keys(finalArgs) as (keyof typeof finalArgs)[]
    const url = keys.reduce((result, curKey, i) => {
      if (!finalArgs[curKey]) return result

      let keyValue = ''
      if (Array.isArray(finalArgs[curKey])) {
        keyValue = `${curKey}=${(finalArgs[curKey] as string[])?.map((item) => item.replaceAll('&', '_and')).join('|')}`
      } else {
        keyValue = `${curKey}=${finalArgs[curKey]}`
      }

      return result + keyValue + (i < keys.length - 1 ? '&' : '')
    }, '?')
    return url
    // return `?key=${finalArgs.key}&date=${finalArgs.date?.join('|')}&latlng=${
    //   finalArgs.latlng
    // }&category=${finalArgs.category?.join('|')}&provider=${finalArgs.provider?.join('|')}&price=${finalArgs.price?.join(
    //   '|'
    // )}&distance=${finalArgs.distance}&isOnline=${finalArgs.isOnline}&isFeatured=${finalArgs.isFeatured}&isSaved=${
    //   finalArgs.isSaved
    // }&sortBy=${finalArgs.sortBy}&orderBy=${finalArgs.orderBy}`
  }
  useEffect(() => {
    if (!_.isEmpty(currentArgs)) {
      navigate({
        pathname: `${basePath}${mode}/`,
        search: getSearchPath(currentArgs),
      })
    }
  }, [currentArgs])
  return {
    currentArgs,
    setCurrentArgs,
    getArgsFromUrl: prepareRequestArgsFromUrl,
    defaultArgs,
    getSearchPath,
  }
}

export default useNavigateWithArgs
