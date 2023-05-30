import { SegmentInfo } from '@jg/common/types'

const populateSegmentInfo = (fetchedData: any): SegmentInfo => {
  return {
    segmentId: fetchedData.SegmentId,
    title: fetchedData.Title,
    lastUpdated: fetchedData.LastUpdated,
  }
}

export default populateSegmentInfo
