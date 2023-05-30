import { ResponseBase } from '../common/ResponseBase'

type SystemSettingType = {
  [key: string]: string
}
export type StartUpSystemSettingsResponse = ResponseBase & {
  settings: SystemSettingType
}
