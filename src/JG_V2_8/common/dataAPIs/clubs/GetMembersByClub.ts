import call from '@jg/_core/services/data/LegacyDataService'
import { GenericErrorResponse, MemberType, ResponseBase } from '@jg/common/types'

export type GetMembersByClubParams = {
  clubDocId: number
}
export type GetMembersByClubResponse = ResponseBase & {
  members: MemberType[]
}
const GetMembersByClub = ({ clubDocId }: GetMembersByClubParams) => {
  return new Promise<GetMembersByClubResponse>(function (resolve, reject) {
    const response: GetMembersByClubResponse = {
      members: [] as MemberType[],
    }
    call(
      ['Repo/GetAllClubMembers'],
      [{ clubDocId: clubDocId }],
      function (members: MemberType[]) {
        response.members = members
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
export default GetMembersByClub
