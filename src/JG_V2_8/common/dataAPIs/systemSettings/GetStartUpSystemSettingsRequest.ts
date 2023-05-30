import { GenericErrorResponse, StartUpSystemSettingsResponse } from '@jg/common/types'
//import { StartUpSystemSettingsResponse } from '@jg/common/types/systemSettings/StartUpSystemSettingsResponse'
import call from '@jg/_core/services/data/LegacyDataService'
import { Argument } from 'classnames'
import { map } from 'lodash'
import SettingCollection from './SettingCollection'

export type GetStartUpSystemSettingsRequestParams = {
  keys?: string[]
}
const GetStartUpSystemSettingsRequest = (params: GetStartUpSystemSettingsRequestParams) => {
  const { keys = SettingCollection } = params
  return new Promise<StartUpSystemSettingsResponse>((resolve, reject) => {
    const response: StartUpSystemSettingsResponse = {
      settings: {},
    }
    const services: string[] = []
    const args: { entity: string; entityid: number; key: string }[] = []
    keys.map((e) => {
      services.push('Sys/GetSetting')
      args.push({
        entity: 'GoMembership',
        entityid: -1,
        key: e,
      })
    })

    call(
      services,
      args,
      (...res: string[]) => {
        res.map((e, index) => {
          response.settings[(keys || [])[index]] = e
        })
        // console.log('Sys/GetSetting', response)
        resolve(response)
      },
      (err: any) => {
        const error: GenericErrorResponse = {
          message: 'Error occured while fetching system settings',
        }
        reject(error)
      }
    )
  })
}

export default GetStartUpSystemSettingsRequest
