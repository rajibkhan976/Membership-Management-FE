import { GenericErrorResponse } from '@jg/common/types'
import { ResponseBase } from '@jg/common/types/common/ResponseBase'
import call from '@jg/_core/services/data/LegacyDataService'
export type SelectEntityExtDataParams = {
  schemaIds: { exId: number; docId: number }[]
}
export type SelectEntityExtDataResponse = ResponseBase & {
  result: { [key: string]: string | number | null } | null
}
const SelectEntityExtDataRequest = ({ schemaIds }: SelectEntityExtDataParams) => {
  return new Promise<SelectEntityExtDataResponse>(function (resolve, reject) {
    const response: SelectEntityExtDataResponse = {
      result: {},
    }
    const services: string[] = []
    const args: object[] = []

    schemaIds.forEach((e) => {
      services.push('EntityExtension/SelectData')
      args.push({ exId: e.exId, docId: e.docId })
    })
    call(
      [services],
      [args],
      (res: any) => {
        if (!res.error) {
          response.result = res
          response.success = true
        } else response.success = false
        resolve(response)
      },
      (_err: any) => {
        const error: GenericErrorResponse = {
          message: 'Error occured while SelectEntityExtDataRequest!',
        }
        reject(error)
      }
    )
  })
}

export default SelectEntityExtDataRequest
