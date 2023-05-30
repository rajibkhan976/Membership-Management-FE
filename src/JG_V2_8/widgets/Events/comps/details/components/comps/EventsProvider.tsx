import ContentCard from '@jg/common/comps/contents/contentCard/ContentCard'
import SkeletonCardHorizontalPlaceholder from '@jg/common/comps/loader/placeholders/SkeletonCardHorizontalPlaceholder'
import EventListing from '../../../eventListing/EventListing'
import SeeMore from '../SeeMore'
import { useWidgetContext } from 'jg-widget'
import useNavigateWithArgs from '../../../hooks/useNavigateWithArgs'
import { useNavigate } from 'react-router-dom'
import { EntityInfo } from '@jg/common/types/common/EntityInfo'
import { AsyncStatus } from '@jg/common/types/responses/AsyncStatus'
import { useEventConfig } from '@jg/widgets/Events/EventWidget'
import { Button } from '@comps/uiComps'

export type EventsProviderProps = {
  ownerEntity?: EntityInfo
  status?: AsyncStatus
}

const EventsProvider = ({ ownerEntity, status }: EventsProviderProps) => {
  const { basePath } = useWidgetContext()
  const navigate = useNavigate()
  const { setCurrentArgs, currentArgs, getSearchPath } = useNavigateWithArgs()
  const smimilarProviderEventsSearchPath = `${basePath}browse/${getSearchPath({
    sortBy: 'date',
    provider: ownerEntity ? ((ownerEntity.id || 0) < 0 ? ['0'] : [(ownerEntity.id || 0).toString()]) : ['0'],
  })}`
  const { isEvent } = useEventConfig()
  return (
    <ContentCard
      heading={isEvent ? 'More Events From This Provider' : 'More Items From This Seller'}
      headingClass="font-semibold mb-2 !text-jg-metal-700  !text-globalTextSizeLg"
      topRightElement={
        <SeeMore
          text="See All"
          onClick={() => {
            navigate(smimilarProviderEventsSearchPath)
          }}
          dir="right"
          className="text-[14px] hidden visible font-medium leading-4 sm:flex "
        />
      }
      className="mb-4 md:mb-0"
    >
      {status === 'success' ? (
        <>
          <EventListing className="sm:divide-y" imageAlign="left" view="providerEvents" />
          {/* <SeeMore
            onClick={() => {
              navigate(smimilarProviderEventsSearchPath)
            }}
            dir="down"
            text="See All"
            className="text-[14px] font-medium leading-4 flex max-w-[320px] w-full mx-auto sm:hidden sm:visible mt-6 mb-4"
          /> */}
          <Button
            onClick={() => {
              navigate(smimilarProviderEventsSearchPath)
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
export default EventsProvider
