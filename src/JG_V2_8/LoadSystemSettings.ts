import { IsBlended } from './_core/Authorization'
import { useSystemSettingsApi } from './common/dataAPIs'
import AppStore from './store/store'
const SetSystemSettings = AppStore.getState().SetSystemSettings
export default (callback: () => void): void => {
  if (IsBlended()) {
    const jgSettings = (parent.window as any).px.systemSettings as { Key: string; Value: string }[]
    const settings = {} as { [key: string]: string }
    jgSettings.map((e: { Key: string; Value: string }) => {
      settings[e.Key] = e.Value
    })
    SetSystemSettings(settings)
    callback()
  } else {
    const { GetStartUpSystemSettingsRequest } = useSystemSettingsApi()
    GetStartUpSystemSettingsRequest({})
      .then((res) => {
        SetSystemSettings(res.settings)
        callback()
      })
      .catch(() => {
        SetSystemSettings({})
        callback()
      })
  }
}
