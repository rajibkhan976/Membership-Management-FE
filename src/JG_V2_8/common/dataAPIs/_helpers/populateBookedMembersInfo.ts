import { BookedMembersInfo } from '@jg/common/types'

const populateBookedMembersInfo = (rawData: any): BookedMembersInfo => {
  return {
    clubDocIds: rawData.ClubDocIds,
    firstName: rawData.FirstName,
    lastName: rawData.LastName,
    mId: rawData.MID,
    memberDocId: rawData.MemberDocId,
  }
}

export default populateBookedMembersInfo
