import { CompBaseProps } from '@comps/uiComps'
import { LoaderOverlay } from '@jg/common/comps'
import GetStartUpSystemSettingsRequest, {
  GetStartUpSystemSettingsRequestParams,
} from '@jg/common/dataAPIs/systemSettings/GetStartUpSystemSettingsRequest'
import { GenericErrorResponse, StartUpSystemSettingsResponse } from '@jg/common/types'
import { useAsync } from '@jg/hooks'
import { createContext, useContext, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
interface ISystemSettigsContext {
  systemSettings: { [key: string]: string }
}
const createSystemSettigsContext = () => {
  return createContext<ISystemSettigsContext>({ systemSettings: {} })
}
type SystemSettigsProviderProps = CompBaseProps & {
  keys: string[]
  context: React.Context<ISystemSettigsContext>
}
const SystemSettigsProvider = ({ context, keys, children }: SystemSettigsProviderProps) => {
  const Provider = context.Provider
  const { execute, status, value, error } = useAsync<
    StartUpSystemSettingsResponse,
    GenericErrorResponse,
    GetStartUpSystemSettingsRequestParams
  >(GetStartUpSystemSettingsRequest, { keys }, false)
  useEffect(() => {
    execute()
  }, [])
  if (status === 'success' && value?.settings) {
    return <Provider value={{ systemSettings: value?.settings }}>{children}</Provider>
  } else return <LoaderOverlay />
}

export { createSystemSettigsContext, SystemSettigsProvider }
