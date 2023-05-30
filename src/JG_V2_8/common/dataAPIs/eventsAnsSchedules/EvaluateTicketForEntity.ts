import call from '@jg/_core/services/data/LegacyDataService'
import { GenericErrorResponse, ResponseBase } from '@jg/common/types'

export type EvaluateTicketForEntityResponse = ResponseBase & {
  EvaluatedEntities: { DocId: number; Purchasable: boolean }[]
}
export type EvaluateTicketForEntityParams = {
  ticketDocId: number
  purchasingEntityType: 'Member' | 'Team'
  purchasingEntityIds: number[]
}
const EvaluateTicketForEntity = ({
  ticketDocId,
  purchasingEntityType,
  purchasingEntityIds,
}: EvaluateTicketForEntityParams) => {
  return new Promise<EvaluateTicketForEntityResponse>(function (resolve, reject) {
    const response: EvaluateTicketForEntityResponse = {
      EvaluatedEntities: [],
    }
    call(
      ['Payment/EvaluateProductsForUser'],
      [
        {
          productId: ticketDocId,
          purchasingEntityType: purchasingEntityType,
          purchasingEntityIds: purchasingEntityIds,
        },
      ],
      function (res: any) {
        for (let i = 0; i < purchasingEntityIds.length; i++) {
          // callback(itemIndexes[i], res[i].Purchasable)
          response.EvaluatedEntities.push({ DocId: res[i].ProductId, Purchasable: res[i].Purchasable })
        }
        resolve(response)
      },
      (_err: any) => {
        const error: GenericErrorResponse = {
          message: 'Error occured while fetching request!',
        }
        reject(error)
      }
    )
  })
}

export { EvaluateTicketForEntity as default }
