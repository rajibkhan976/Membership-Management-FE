import { GenericErrorResponse } from '@jg/common/types'
import { ResponseBase } from '@jg/common/types/common/ResponseBase'
import call from '@jg/_core/services/data/LegacyDataService'

export type GetCartIdByUserIdRequestParams = {
  userId: number
}
export type GetCartIdByUserIdRequestResponse = ResponseBase & {
  cartId: number
}
const GetCartIdByUserIdRequest = ({ userId }: GetCartIdByUserIdRequestParams) => {
  return new Promise<GetCartIdByUserIdRequestResponse>((resolve, reject) => {
    const response: GetCartIdByUserIdRequestResponse = {
      cartId: -1,
    }
    call(
      ['Payment/GetCartIdByUserId'],
      [{ userId: userId }],
      (res: number) => {
        response.success = true
        response.cartId = res
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
export default GetCartIdByUserIdRequest
