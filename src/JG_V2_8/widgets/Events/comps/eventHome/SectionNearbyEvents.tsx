import { ContentSection } from '@jg/common/comps'
import classNames from 'classnames'
import { GridContainer } from '../../layouts/EventsGridContainer'
import useEventStore from '../../store/useEventStore'
import EventInforCardPlaceholder from '../EventInforCardPlaceholder'
import EventListing from '../eventListing/EventListing'
import SearchButton from '../SearchButton'
import { useEventSettingsContext } from '../../providers/EventSettingsProvider'
import useWindowSize from '@jg/hooks/useWindowSize'
import { JGCarousel } from '@comps/uiComps'

function SectionNearbyEvents() {
  const { systemSettings, sysDistanceUnit, labelSettings: labels } = useEventSettingsContext()
  const defaultDistance = systemSettings['EVENT.DEFAULT_RADIUS_LENGTH'] || '100'
  const summaryStatus = useEventStore((state) => {
    return state.summaryStatus
  })
  const nearbyEvents = useEventStore((state) => {
    return state.nearbyEvents
  })

  const { width } = useWindowSize()

  const As = width && width > 768 ? GridContainer : JGCarousel

  if ((summaryStatus === 'error' || summaryStatus === 'success') && nearbyEvents.length === 0) return <></>

  return (
    <ContentSection
      heading={`${labels?.labelSettings?.nearbyClubEventTitle}` || ''}
      caption={`${labels?.labelSettings?.nearbyClubEventCaption} ${defaultDistance} ${
        sysDistanceUnit?.toLowerCase() === 'kilometer' ? 'km' : 'mi'
      }`}
      className={classNames(
        (summaryStatus === 'error' || summaryStatus === 'success') && nearbyEvents.length === 0 ? 'hidden' : ''
      )}
    >
      {(summaryStatus == 'success' || summaryStatus == 'idle') && (
        <div className="overflow-hidden">
          <EventListing as={As} view="nearby" />

          <div className="text-center sm:pt-12">
            <SearchButton
              text={'See All'}
              searchRequestArg={{ sortBy: 'distance', distance: defaultDistance }}
              className=""
            />
          </div>
        </div>
      )}
      {summaryStatus == 'pending' && <EventInforCardPlaceholder />}
    </ContentSection>
  )
}

export default SectionNearbyEvents
