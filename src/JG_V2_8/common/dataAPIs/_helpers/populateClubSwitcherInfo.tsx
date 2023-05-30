import { ClubSwitcherInfo } from '@jg/common/types'
import AppStore from '@jg/store/store'

const populateClubSwitcherInfo = (fetchedData: any): ClubSwitcherInfo => {
  const BaseAppPath = AppStore.getState().BaseAppPath
  const orgImgSrc = AppStore.getState().SystemSettings['ORGANISATION.LOGO']
  //${BaseAppPath}Media/Images/club-default.png
  const imgSrc = (docId: number, imgName: string) => {
    if (docId && docId > 0 && !imgName.includes('Virtual')) {
      return `${BaseAppPath}store/download?f=${imgName}&t=repo&p=${docId}&p1=&p2=2`
    } else if (docId && docId > 0 && imgName.includes('Virtual')) {
      return `${BaseAppPath}Media/Images/club-default.png`
    } else {
      return `${BaseAppPath}Store/Download?f=${orgImgSrc}&t=OrganizationLogo`
    }
  }

  return {
    docId: fetchedData.DocId,
    entityType: fetchedData.EntityType,
    name: fetchedData.Name,
    image: imgSrc(fetchedData.DocId, fetchedData.Image),
    merchantGuid: fetchedData.MerchantGuid,
    syncGuid: fetchedData.SyncGuid,
  }
}

export default populateClubSwitcherInfo
