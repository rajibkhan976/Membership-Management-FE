import call from '@jg/_core/services/data/LegacyDataService'
import { ResponseBase } from '@jg/common/types/common/ResponseBase'
import { ClubInfo, ClubSwitcherInfo, GDEResponse, GenericErrorResponse } from '@jg/common/types'
import populateClubInfo from '../_helpers/populateClubInfo'

export type ClubListResponse = ResponseBase & {
  clubList: ClubSwitcherInfo[]
}

const GetClubListRequest = () => {
  return new Promise<ClubListResponse>((resolve, reject) => {
    const response: ClubListResponse = {
      clubList: [],
    }

    const getClubListArg = {
      Method: 'GetClubsForSwitcher',
    }

    call(
      ['GDE/FetchObjects'],
      [{ provider: 'Email', args: getClubListArg }],
      (clubListRes: GDEResponse) => {
        // console.log('clubListRes', clubListRes)
        response.success = true

        if (clubListRes.StatusCode === 200) {
          const items = clubListRes.Result as any[]
          response.clubList = items.map((item) => populateClubInfo(item)) as ClubSwitcherInfo[]
        }
        resolve(response)
      },
      () => {
        const error: GenericErrorResponse = {
          message: 'Failed to fetch club list due to unknown error!',
        }
        reject(error)
      }
    )
  })
}

export default GetClubListRequest
