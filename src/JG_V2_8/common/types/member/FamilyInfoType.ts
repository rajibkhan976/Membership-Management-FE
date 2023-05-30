import { MemberType } from './memberType'

export type FamilyInfoType = {
  DocId: number
  Familyname: string
  Members: string | MemberType[]

  Reference: string
}
