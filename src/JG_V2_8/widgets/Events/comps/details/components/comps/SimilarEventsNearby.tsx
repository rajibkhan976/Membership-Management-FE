import ContentCard from '@jg/common/comps/contents/contentCard/ContentCard'
import SkeletonCardHorizontalPlaceholder from '@jg/common/comps/loader/placeholders/SkeletonCardHorizontalPlaceholder'
import EventListing from '../../../eventListing/EventListing'
import SeeMore from '../SeeMore'
import { useWidgetContext } from 'jg-widget'
import useNavigateWithArgs from '../../../hooks/useNavigateWithArgs'
import { useNavigate } from 'react-router-dom'
import { LatLngInfo } from '@jg/common/types/common/LatLngInfo'
import { AsyncStatus } from '@jg/common/types'
import { Button } from '@comps/uiComps'
export type SimilarEventsNearbyProps = {
  latlng?: LatLngInfo
  status?: AsyncStatus
}

const SimilarEventsNearby = ({ latlng, status }: SimilarEventsNearbyProps) => {
  const { basePath } = useWidgetContext()
  const navigate = useNavigate()
  const { setCurrentArgs, currentArgs, getSearchPath } = useNavigateWithArgs()
  const nearbyEventsSearchPath = `${basePath}browse/${getSearchPath({
    sortBy: 'distance',
    latlng: latlng ? `${latlng?.lat}|${latlng?.lng}` : '',
  })}`
  return (
    <ContentCard
      heading="Similar Events Nearby"
      headingClass="font-semibold mb-2 !text-jg-metal-700  !text-globalTextSizeLg"
      topRightElement={
        <SeeMore
          onClick={() => {
            navigate(nearbyEventsSearchPath)
          }}
          dir="right"
          text="See All"
          className="text-[14px] hidden visible font-medium leading-4 sm:flex "
        />
      }
      className="mb-4 md:mb-0 mt-4 md:mt-0"
    >
      {status === 'success' ? (
        <>
          <EventListing className="sm:divide-y" imageAlign="left" view="nearbyRelavant" />

          {/* <SeeMore
            onClick={() => {
              navigate(nearbyEventsSearchPath)
            }}
            dir="right"
            text="See All"
            className="text-[14px] font-medium leading-4 flex max-w-[320px] w-full mx-auto sm:hidden sm:visible mt-6 mb-4"
          /> */}
          <Button
            onClick={() => {
              navigate(nearbyEventsSearchPath)
            }}
            text="See All"
            btnColor="primary"
            fillType="solid"
            className="sm:hidden sm:visible text-globalTextSizeMd font-medium mt-4"
          />
        </>
      ) : (
        <div className="sm:divide-y sm:space-y-4">
          <SkeletonCardHorizontalPlaceholder />
        </div>
      )}
    </ContentCard>
  )
}
export default SimilarEventsNearby
