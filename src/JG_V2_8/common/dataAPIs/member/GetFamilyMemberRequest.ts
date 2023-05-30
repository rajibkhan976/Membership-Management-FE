import call from '@jg/_core/services/data/LegacyDataService'
import { GenericErrorResponse, MemberType, ResponseBase } from '@jg/common/types'
import { FamilyInfoType } from '@jg/common/types/member/FamilyInfoType'

export type GetFamilyMemberParams = {
  memberDocId: number
}
export type GetFamilyMemberResponse = ResponseBase & {
  family: FamilyInfoType
}
const GetFamilyMemberRequest = ({ memberDocId }: GetFamilyMemberParams) => {
  return new Promise<GetFamilyMemberResponse>(function (resolve, reject) {
    const response: GetFamilyMemberResponse = {
      family: {} as FamilyInfoType,
    }
    call(
      ['GoMembership/GetFamilyByMember'],
      [{ memberDocId: memberDocId }],
      function (family: FamilyInfoType) {
        response.family = family
        const memberDocIds = family.Members
          ? (family.Members as string).replace(new RegExp('.0000', 'g'), '').split(',')
          : []
        if (memberDocIds.length) {
          call(
            ['GoMembership/GetMembersBasicDetails'],
            [{ memberDocIds: memberDocIds }],
            function (members: MemberType[]) {
              response.family.Members = members
              resolve(response)
            }
          )
        } else {
          response.family.Members = []
          resolve(response)
        }
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
export default GetFamilyMemberRequest
