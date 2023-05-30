import AddItemsToCartRequest from './AddItemsToCartRequest'
import GetCartIdByUserIdRequest from './GetCartIdByUserIdRequest'
import GetShoppingCartItemsRequest from './GetShoppingCartItemsRequest'

import { AddItemsToCartRequestParams } from './AddItemsToCartRequest'
import { GetCartIdByUserIdRequestParams, GetCartIdByUserIdRequestResponse } from './GetCartIdByUserIdRequest'
import { ResponseBase } from '@jg/common/types'
export interface ShoppingCartAppi {
  AddItemsToCartRequest(params: AddItemsToCartRequestParams): Promise<ResponseBase>
  GetCartIdByUserIdRequest(params: GetCartIdByUserIdRequestParams): Promise<GetCartIdByUserIdRequestResponse>
}
const useShoppingCartAppi = (): ShoppingCartAppi => {
  return { AddItemsToCartRequest, GetCartIdByUserIdRequest }
}

export default useShoppingCartAppi
export type { AddItemsToCartRequestParams, GetCartIdByUserIdRequestParams, GetCartIdByUserIdRequestResponse }
