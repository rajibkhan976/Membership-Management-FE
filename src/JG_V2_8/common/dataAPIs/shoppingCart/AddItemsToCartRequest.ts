import { GenericErrorResponse, PurchaseItem } from '@jg/common/types'
import { ResponseBase } from '@jg/common/types/common/ResponseBase'
import call from '@jg/_core/services/data/LegacyDataService'
import { GetCurrentUser } from '../authentications'
import GetCartIdByUserIdRequest from './GetCartIdByUserIdRequest'

export type AddItemsToCartRequestParams = {
  items: PurchaseItem[]
  isPublic?: boolean
}

const AddItemsToCartRequest = ({ items, isPublic }: AddItemsToCartRequestParams) => {
  const srv = isPublic ? 'Payment/AddItemsToPublicCart' : 'Payment/AddItemsToCart'
  //  const arg = isPublic? { items: items } :
  if (isPublic) {
    return new Promise<ResponseBase>((resolve, reject) => {
      const response: ResponseBase = {}
      call(
        ['Payment/AddItemsToPublicCart'],
        [{ items: items }],
        () => {
          response.success = true
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
  } else {
    return new Promise<ResponseBase>((resolve, reject) => {
      const response: ResponseBase = {}
      GetCartIdByUserIdRequest({ userId: GetCurrentUser()?.UserId || -1 }).then((response) => {
        call(
          ['Payment/AddItemsToCart'],
          [{ items: items, cartId: response.cartId }],
          () => {
            response.success = true
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
    })
  }
}
export default AddItemsToCartRequest

///az.Service.call(['Payment/AddItemsToCart'], [{ items: items, cartId: cartId }], callback);
