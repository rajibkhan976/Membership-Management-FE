import { ClubInfo } from '@jg/common/types'

const populateClubInfo = (fetchedData: any): ClubInfo => {
  return {
    docId: fetchedData.DocId,
    name: fetchedData.Name,
    image: fetchedData.Image,
  }
}

export default populateClubInfo
