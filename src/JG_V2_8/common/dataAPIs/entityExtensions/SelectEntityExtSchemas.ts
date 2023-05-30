import { GenericErrorResponse } from '@jg/common/types'
import { ResponseBase } from '@jg/common/types/common/ResponseBase'
import call from '@jg/_core/services/data/LegacyDataService'
import { EntityExtSchema } from './schemas/EntityExtSchema'
import { EntityExtAreaType } from '@jg/common/types/entityExt/EntityExtAreaType'
export type EntityExtOwnerInfos = {
  ownerType: 'Ngb' | 'Club'
  ownerId: number
  extensionArea: EntityExtAreaType
  extensionEntityId: number
}
export type SelectEntityExtSchemasParams = {
  entityExtOwnerInfos: EntityExtOwnerInfos[]
}
export type SelectEntityExtSchemasResponse = ResponseBase & {
  result: EntityExtSchema[]
}
const SelectEntityExtSchemasRequest = ({ entityExtOwnerInfos }: SelectEntityExtSchemasParams) => {
  return new Promise<SelectEntityExtSchemasResponse>(function (resolve, reject) {
    const response: SelectEntityExtSchemasResponse = {
      result: [] as EntityExtSchema[],
    }
    const services: string[] = []
    const args: object[] = []

    entityExtOwnerInfos.forEach((e) => {
      services.push('EntityExtension/SelectSchema')
      args.push({
        ownerType: e.ownerType,
        ownerId: e.ownerId,
        extensionArea: e.extensionArea,
        extensionEntityId: e.extensionEntityId,
      })
    })
    call(
      services,
      args,
      (...result: any) => {
        response.success = true
        const list = Array.prototype.slice.call(result)

        console.log('EntityExtension/SelectSchema response', list)
        response.result = list as EntityExtSchema[]
        // console.log('EntityExtension/SelectSchema response', response.result)

        resolve(response)
      },
      (_err: any) => {
        const error: GenericErrorResponse = {
          message: 'Error occured while EntityExtension/SelectSchema',
        }
        reject(error)
      }
    )
  })
}

export default SelectEntityExtSchemasRequest
