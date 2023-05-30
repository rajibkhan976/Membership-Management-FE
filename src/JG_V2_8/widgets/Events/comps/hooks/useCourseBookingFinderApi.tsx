import { useEventsAndScheduleApi } from '@jg/common/dataAPIs'
import { useEffect, useRef } from 'react'
import { useAsync } from '@jg/hooks'
import { GetCourseBookingDataParams, GetCourseBookingDataResponse } from '@jg/common/dataAPIs/eventsAnsSchedules'
import { GenericErrorResponse } from '@jg/common/types'
import _ from 'lodash'
import useCourseBookingStore from '../../store/useCourseBookingStore'

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

const useCourseBookingFinderApi = () => {
  const searchRequestArg = useCourseBookingStore((state) => state.searchRequestArg)
  const setFinderStatus = useCourseBookingStore((state) => state.setFinderStatus)
  const setSearchResults = useCourseBookingStore((state) => state.setSearchResults)
  const searchResultsByPage = useCourseBookingStore((state) => state.searchResultsByPage)
  const { GetCourseBookingDataRequest } = useEventsAndScheduleApi()
  const searchRef = useRef(0)

  const { category, ...rest } = searchRequestArg

  const preparedArgs: GetCourseBookingDataParams = {
    Categories: getCategoryParam(category),
    ...rest,
  }

  //  const setFinderStatus = useEventStore((state) => state.setFinderStatus)
  const { execute, status, value, error } = useAsync<
    GetCourseBookingDataResponse,
    GenericErrorResponse,
    GetCourseBookingDataParams
  >(GetCourseBookingDataRequest, preparedArgs, false)
  useEffect(() => {
    searchRef.current = searchRef.current + 1
    // const { key, ...rest } = searchRequestArg
    // console.log('searchRequestArg', preparedArgs)
    if (status !== 'pending' && !_.isEmpty(searchRequestArg) && searchRef.current > 1) {
      execute()
    }
  }, [searchRequestArg])

  useEffect(() => {
    setFinderStatus(status)
    if (status === 'success' && value?.success) {
      setSearchResults?.(value.courseBookingByMember)
    } //else setSearchResults([], 0)
  }, [status])
  return { status, data: searchResultsByPage }
}
export default useCourseBookingFinderApi
