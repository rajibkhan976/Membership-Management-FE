import call from '@jg/_core/services/data/LegacyDataService'
import { GenericErrorResponse, ResponseBase } from '@jg/common/types'
import { WaitlistSourceType } from '@jg/common/types/eventsAnsSchedules/WaitlistSource'

export type SaveWaitlistResponse = ResponseBase & {}
export type SaveWaitlistParams = {
  ticketDocId: number
  entityIds: number[]
  source: WaitlistSourceType
}
const SaveWaitlist = ({ ticketDocId, entityIds, source }: SaveWaitlistParams) => {
  return new Promise<SaveWaitlistResponse>(function (resolve, reject) {
    const response: SaveWaitlistResponse = {}

    call(
      entityIds.map((id) => 'GoMembership/SaveWaitlist'),
      entityIds.map((id) => ({ productId: ticketDocId, entityId: id, source: source })),

      function (...result: any) {
        response.success = true
        resolve(response)
      },
      (_err: any) => {
        const error: GenericErrorResponse = {
          message: 'Error occured while fetching GoMembership/SaveWaitlist!',
        }
        reject(error)
      }
    )
  })
}

export default SaveWaitlist
