import { ClubSummary } from '@jg/common/types'
import AppStore from '@jg/store/store'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (rawData: any): ClubSummary => {
  const BaseAppPath = AppStore.getState().BaseAppPath
  const location = rawData.ClubImg
  const clubId = rawData.ClubId
  const clubImg =
    location && location !== 'Virtual'
      ? `${BaseAppPath}Store/downloadPublic?f=${location}&t=repo&p=${clubId}&p1=&p2=2`
      : ''
  return {
    clubId,
    clubImg,
    clubName: rawData.ClubName,
    clubType: rawData.ClubType,
    eventCount: rawData.EventCount,
  }
}
