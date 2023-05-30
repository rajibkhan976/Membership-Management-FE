import { useEventsAndScheduleApi } from '@jg/common/dataAPIs'
import { useEffect, useRef } from 'react'
import useEventStore from '../../store/useEventStore'
import { useAsync } from '@jg/hooks'
import { FindEventsHomeResponse, GetFindEventsRequestParams } from '@jg/common/dataAPIs/eventsAnsSchedules'
import { GenericErrorResponse } from '@jg/common/types'
import _ from 'lodash'
import { useEventSettingsContext } from '../../providers/EventSettingsProvider'
import { useEventConfig } from '../../EventWidget'

function getProviderParam(providerParam?: string[]) {
  if (providerParam) {
    if (providerParam.length === 1) {
      if (providerParam[0] === 'all') return []
      else if (providerParam[0] === 'ngb') {
        return [0]
      } else return providerParam.map((e) => Number(e))
    } else return providerParam.map((e) => Number(e))
  } else return []
}
//[key: string]: string[]
function getCategoryParam(categoryQs?: string[]) {
  if (categoryQs) {
    if (categoryQs[0] === 'all') return {}
    const paramObj: any = {}
    for (let i = 0; i < categoryQs.length; i++) {
      const qsCtg = categoryQs[i]
      const parts = qsCtg.split('$sub$')
      if (parts.length === 2) paramObj[parts[0]] = parts[1].split('$$')
      else paramObj[parts[0]] = []
    }
    return paramObj
  } else return {}
}

function getPriceParam(PriceQs?: string[]) {
  let priceParam: number[] = []
  if (PriceQs) {
    if (PriceQs.length == 1) {
      switch (PriceQs[0]) {
        case 'all':
          priceParam = []
          break
        case 'free':
          priceParam = [0, 0] // // free 0, 0, paid 0, -1,
          break
        case 'paid':
          priceParam = [0.001, -1]
          break
        default:
          priceParam = [Number(PriceQs[0]), Number(PriceQs[0])]
          break
      }
    } else {
      priceParam = [Number(PriceQs[0]), Number(PriceQs[1])]
    }
    return priceParam
  } else return []
}

const useFinderApi = () => {
  const { systemSettings } = useEventSettingsContext()
  //const defaultDistance = systemSettings['EVENT.DEFAULT_RADIUS_LENGTH'] || '100'
  const defaultDistanceUnit = systemSettings['CLUB.CLUBFINDERDEFAULTDISTANCEUNIT'] || 'Mile'
  const { GetFindEventsRequest } = useEventsAndScheduleApi()
  const searchRef = useRef(0)
  const searchRequestArg = useEventStore((state) => state.searchRequestArg)
  const setSearchResults = useEventStore((state) => state.setSearchResults)
  const setFinderStatus = useEventStore((state) => state.setFinderStatus)
  const { isEvent } = useEventConfig()
  const { execute, status, value, error } = useAsync<
    FindEventsHomeResponse,
    GenericErrorResponse,
    GetFindEventsRequestParams
  >(
    GetFindEventsRequest,
    {
      key: searchRequestArg.key,
      date: searchRequestArg.date,
      latlng: searchRequestArg.latlng,
      isOnline: !!searchRequestArg.isOnline,
      isSaved: !!searchRequestArg.isSaved,
      isFeatured: searchRequestArg.isFeatured ? searchRequestArg.isFeatured === true : false,
      sortBy: searchRequestArg.sortBy ? searchRequestArg.sortBy : 'date',
      orderBy: searchRequestArg.orderBy ? searchRequestArg.orderBy : 'asc',
      categories: getCategoryParam(searchRequestArg.category),
      provider: getProviderParam(searchRequestArg.provider),
      price: getPriceParam(searchRequestArg.price),
      distance: searchRequestArg.distance,
      distanceUnit: defaultDistanceUnit,
      InstallmentAvailable: !!searchRequestArg.installment,
      pageNumber: 1,
      numberOfRows: 1000,
      IsShop: !isEvent,
    },
    false
  )
  useEffect(() => {
    searchRef.current = searchRef.current + 1
    const { key, ...rest } = searchRequestArg
    if (status !== 'pending' && !_.isEmpty({ ...rest }) && searchRef.current > 1) {
      execute()
    }
  }, [searchRequestArg])

  useEffect(() => {
    setFinderStatus(status)
    if (status === 'success' && value?.success) {
      setSearchResults(value.events, value.count, value.MaxPrice, value.MinPrice)
    } //else setSearchResults([], 0)
  }, [status])
  return { status, data: value }
}

export default useFinderApi
