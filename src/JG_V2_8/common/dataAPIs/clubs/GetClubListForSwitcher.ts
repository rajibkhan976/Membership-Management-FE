import { ClubSwitcherInfo, GDEResponse, GenericErrorResponse } from '@jg/common/types'
import call from '@jg/_core/services/data/LegacyDataService'
import JGFetch from '../JGFetch'
import populateClubSwitcherInfo from '../_helpers/populateClubSwitcherInfo'
import { ClubListResponse } from './GetClubListRequest'

const GetClubListForSwitcher = () => {
  /*return  JGFetch(['GDE/FetchObjects'], [{ provider: 'SwitcherCall', args: getClubListArg }]).then(
        (response: unknown) => response as GDEResponse
      )*/

  const str = window.location.href // mahadi: get url text


  return new Promise<ClubListResponse>((resolve, reject) => {
    const response: ClubListResponse = {
      clubList: [],
    }

    /* const getClubListArg = {
          Method: 'GetClubsForSwitcher',
        }*/
    const getClubListArg = {
      Method: 'GetClubsForSwitcher',
      IsStripeMode: str.includes('PaymentDashboard'),
    }
    call(
      ['GDE/FetchObjects'],
      [{ provider: 'SwitcherCall', args: getClubListArg }],
      (clubListRes: GDEResponse) => {
        // console.log('clubListRes', clubListRes)
        response.success = true

        if (clubListRes.StatusCode === 200) {
          const items = clubListRes.Result as any[]
          response.clubList = items.map((item) => populateClubSwitcherInfo(item)) as ClubSwitcherInfo[]
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

export default GetClubListForSwitcher
