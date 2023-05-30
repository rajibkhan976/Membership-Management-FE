import { CompBaseProps } from '@comps/uiComps'
import SaveAnEventForAUserRequest, {
  SaveAEventForAUserParams as SaveAnEventForAUserParams,
} from '@jg/common/dataAPIs/eventsAnsSchedules/SaveAEventForAUserRequest'
import { GenericErrorResponse, ResponseBase } from '@jg/common/types'
import { useAsync } from '@jg/hooks'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import useEventStore from '../store/useEventStore'

interface IEventRoot {
  config: object
}

const EventRootContext = createContext<IEventRoot>({ config: {} })
export const useEventRootContext = () => {
  return useContext(EventRootContext)
}
const EventRootProvider = ({ children }: CompBaseProps) => {
  const root: IEventRoot = { config: {} }

  return <EventRootContext.Provider value={root}>{children}</EventRootContext.Provider>
}
export default EventRootProvider
