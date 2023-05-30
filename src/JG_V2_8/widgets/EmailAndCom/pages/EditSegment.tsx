import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useGetSegmentByIdStore } from '@comps/uiComps/SegmentList/store/segments'
import CreateSegment from '@comps/uiComps/CreateSegment/CreateSegment'
import { LoaderOverlay } from '@jg/common/comps'

const EditSegment = () => {
  const { segmentId } = useParams()
  const { segment, isLoading, getSegmentDetail } = useGetSegmentByIdStore()

  useEffect(() => {
    segmentId && getSegmentDetail(+segmentId)
  }, [getSegmentDetail, segmentId])

  return (
    <>
      {!isLoading ? (
        segment && segmentId && segment.SegmentId === +segmentId && <CreateSegment segment={segment} />
      ) : (
        <LoaderOverlay />
      )}
    </>
  )
}

export default EditSegment
