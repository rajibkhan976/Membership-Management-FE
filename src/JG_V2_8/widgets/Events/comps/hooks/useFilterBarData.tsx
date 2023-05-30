import {
  GetSetupDataForFindEventsParams,
  GetSetupDataForFindEventsResponse,
} from '@jg/common/dataAPIs/eventsAnsSchedules'
import { AsyncStatus, GenericErrorResponse } from '@jg/common/types'
import { useAsync, useRouter } from '@jg/hooks'
import useEventStore from '../../store/useEventStore'
import { useWidgetComponent } from 'jg-widget'
import GetSetupDataForFindEventsRequest from '@jg/common/dataAPIs/eventsAnsSchedules/GetSetupDataForFindEventsRequest'
import { useEffect, useState } from 'react'
import { useEventConfig } from '../../EventWidget'

const useFilterBarData = () => {
  const { onRenderFirst } = useWidgetComponent('FilterBar')
  const setFilterBarData = useEventStore((state) => state.setFilterBarData)
  const filterBarData = useEventStore((state) => state.filterBarData)

  const { isEvent } = useEventConfig()
  // const setFilterbarReady = useEventStore((state) => state.setFilterbarReadyStatus)
  //const filterBarData = useEventStore((state) => state.filterBarData)
  //const [readyStatus, setReadyStatus] = useState<AsyncStatus>('idle')
  // const { getSearchPath, defaultArgs } = useNavigateWithArgs()
  //const { basePath } = useWidgetContext()
  //const { navigate } = useRouter()
  const { execute, status, value, error } = useAsync<
    GetSetupDataForFindEventsResponse,
    GenericErrorResponse,
    GetSetupDataForFindEventsParams
  >(GetSetupDataForFindEventsRequest, { IsShop: !isEvent }, false)
  onRenderFirst(() => {
    execute()
  })

  useEffect(() => {
    if (status === 'success') {
      setFilterBarData(value?.result)
    }
  }, [status])

  return { filterBarData }
}

export default useFilterBarData
