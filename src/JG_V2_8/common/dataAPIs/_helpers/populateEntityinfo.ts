import { entityInfo } from '@jg/common/types'
import AppStore from '@jg/store/store'

export default ({
  Id,
  ImgSrc,
  Name,
  Type,
  Address1,
  Address2,
  Address3,
  Town,
  PostCode,
  County,
  Country,
}: any): entityInfo => {
  const BaseAppPath = AppStore.getState().BaseAppPath
  const populatedAddressString = [Address1, Address2, Address3, Town, PostCode, County, Country]
    .filter(Boolean)
    .join(', ')
  if (Id === '0' || Id === -1 || Id === null) {
    const orgName = AppStore.getState().SystemSettings['ORGANISATION.NAME']
    const orgImgSrc = AppStore.getState().SystemSettings['ORGANISATION.LOGO']

    return {
      id: -1,
      imgSrc: `${BaseAppPath}Store/DownloadPublic?f=${orgImgSrc}&t=OrganizationLogo`,
      name: orgName,
      type: Type,
      addressString: populatedAddressString,
    }
  }

  return {
    id: Id,
    imgSrc: `${BaseAppPath}store/DownloadPublic?f=${ImgSrc}&t=repo&p=${Id}&p1=&p2=2`,
    name: Name,
    type: Type,
    addressString: populatedAddressString,
  }
}
