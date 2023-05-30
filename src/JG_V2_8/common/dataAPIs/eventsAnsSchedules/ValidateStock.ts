import call from '@jg/_core/services/data/LegacyDataService'
import { GenericErrorResponse, ResponseBase } from '@jg/common/types'

export type ValidateStockResponse = ResponseBase & {
  isAvailbable: boolean
  stockQty: number
}
export type ValidateStockParams = {
  itemQuantities: { ticketDocId: number; qty: number }[] // key: product.docId, value: product.qty }
}
const ValidateStock = ({ itemQuantities }: ValidateStockParams) => {
  return new Promise<ValidateStockResponse>(function (resolve, reject) {
    const response: ValidateStockResponse = {
      isAvailbable: false,
      stockQty: 0,
    }
    call(
      ['Payment/ValidateStock'],
      [{ itemQuantities: itemQuantities.map((i) => ({ key: i.ticketDocId, value: i.qty })) }],
      function (res: any) {
        //Item1: 127911, Item2: 4, Item3: 1, Item4: true
        response.isAvailbable = res[0].Item4
        response.stockQty = res[0].Item2
        //console.log('ValidateStock', res, { itemQuantities: itemQuantities })
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

export { ValidateStock as default }
