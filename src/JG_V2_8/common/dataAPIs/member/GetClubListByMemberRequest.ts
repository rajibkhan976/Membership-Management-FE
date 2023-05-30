import call from '@jg/_core/services/data/LegacyDataService'
import { ClubInfoType, GenericErrorResponse, MemberType, ResponseBase } from '@jg/common/types'

export type GetClubListByMemberParams = {
  switchType?: 'clubteam' | 'club'
  allowedType?: string | null
  clubDocId?: number
  clubPlusOnly?: boolean
}
export type GetClubListByMemberRequestResponse = ResponseBase & {
  clubs: ClubInfoType[]
}
const GetClubListByMemberRequest = ({
  switchType = 'clubteam',
  clubDocId = 0,
  allowedType = null,
  clubPlusOnly = false,
}: GetClubListByMemberParams) => {
  return new Promise<GetClubListByMemberRequestResponse>(function (resolve, reject) {
    const response: GetClubListByMemberRequestResponse = {
      clubs: [] as ClubInfoType[],
    }
    call(
      ['Repo/GetSwitchOptions'],
      [{ switchType, allowedType, clubDocId, clubPlusOnly }], // switchType: 'clubteam', allowedType: null, clubDocId: 0, clubPlusOnly: false
      function (clubs: ClubInfoType[]) {
        response.clubs = clubs
        resolve(response)
      },
      (_err: any) => {
        const error: GenericErrorResponse = {
          message: 'Error occured while fetching event summary!',
        }
        reject(error)
      }
    )
  })
}
export default GetClubListByMemberRequest
