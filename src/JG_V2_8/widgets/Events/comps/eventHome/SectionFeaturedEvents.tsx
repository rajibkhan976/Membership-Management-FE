import { JGCarousel } from '@comps/uiComps'
import { ContentSection, SkeletonCard } from '@jg/common/comps'
import useWindowSize from '@jg/hooks/useWindowSize'
import classNames from 'classnames'
import { GridContainer } from '../../layouts/EventsGridContainer'
import useEventStore from '../../store/useEventStore'
import EventInforCardPlaceholder from '../EventInforCardPlaceholder'
import EventListing from '../eventListing/EventListing'
import SearchButton from '../SearchButton'
import { useEventSettingsContext } from '../../providers/EventSettingsProvider'

function SectionFeaturedEvents() {
  // const { summaryStatus, featuredEvents } = useEventStoreReadOnly()
  // const eventsCount = featuredEvents.length
  const { labelSettings: labels } = useEventSettingsContext()
  const summaryStatus = useEventStore((state) => {
    return state.summaryStatus
  })
  const featuredEvents = useEventStore((state) => {
    return state.featuredEvents
  })

  const { width } = useWindowSize()

  const As = width && width > 768 ? GridContainer : JGCarousel

  if ((summaryStatus === 'error' || summaryStatus === 'success') && featuredEvents.length === 0) return <></>

  return (
    <ContentSection
      className={classNames(
        (summaryStatus === 'error' || summaryStatus === 'success') && featuredEvents.length === 0 ? 'hidden' : ''
      )}
      heading={labels?.labelSettings?.featureEventTitle || ''}
      caption={labels?.labelSettings?.featureEventCaption || ''}
    >
      <div className="overflow-hidden">
        {(summaryStatus === 'success' || summaryStatus === 'idle') && (
          <>
            <EventListing as={As} view="featured" />
            <div className="text-center sm:pt-12">
              <SearchButton text={'See All'} searchRequestArg={{ isFeatured: true }} />
            </div>
          </>
        )}
        {summaryStatus === 'pending' && <EventInforCardPlaceholder />}
      </div>
    </ContentSection>
  )
}
export default SectionFeaturedEvents
