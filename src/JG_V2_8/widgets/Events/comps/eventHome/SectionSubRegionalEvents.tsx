import { ContentSection } from '@jg/common/comps'
import classNames from 'classnames'
import { GridContainer } from '../../layouts/EventsGridContainer'
import { useEventSettingsContext } from '../../providers/EventSettingsProvider'
import useEventStore from '../../store/useEventStore'
import EventInforCardPlaceholder from '../EventInforCardPlaceholder'
import EventListing from '../eventListing/EventListing'
import SectionButton from './SectionButton'
import SearchButton from '../SearchButton'
import useWindowSize from '@jg/hooks/useWindowSize'
import { JGCarousel } from '@comps/uiComps'

function SectionSubRegionalEvents() {
  const { labelSettings: labels } = useEventSettingsContext()
  const summaryStatus = useEventStore((state) => {
    return state.summaryStatus
  })
  const subRegionalEvents = useEventStore((state) => {
    return state.subRegionalEvents
  })

  const { width } = useWindowSize()

  const As = width && width > 768 ? GridContainer : JGCarousel

  if ((summaryStatus === 'error' || summaryStatus === 'success') && subRegionalEvents.length === 0) return <></>

  return (
    <ContentSection
      heading={labels?.labelSettings?.mySubRegionEventTitle || ''}
      caption={labels?.labelSettings?.mySubRegionEventCaption || ''}
      className={classNames(
        (summaryStatus === 'error' || summaryStatus === 'success') && subRegionalEvents.length === 0 ? 'hidden' : ''
      )}
    >
      <div className="overflow-hidden">
        {(summaryStatus === 'success' || summaryStatus === 'idle') && (
          <>
            <EventListing as={As} view="subRegionalEvents" />

            <div className="text-center sm:pt-12">
              <SearchButton text={'See All'} searchRequestArg={{ provider: ['sub-region'] }} />
            </div>
          </>
        )}
        {summaryStatus === 'pending' && <EventInforCardPlaceholder />}
      </div>
      {summaryStatus == 'pending' && <EventInforCardPlaceholder />}
    </ContentSection>
  )
}

export default SectionSubRegionalEvents
