import { ResponseBase } from '../common/ResponseBase'
import { BookedMembersInfo } from './BookedMembersInfo'

export type BookedMembersResponse = ResponseBase & {
  bookedMembersList: BookedMembersInfo[]
}
