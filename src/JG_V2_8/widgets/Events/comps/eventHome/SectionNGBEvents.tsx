import { ContentSection } from '@jg/common/comps'
import classNames from 'classnames'
import { GridContainer } from '../../layouts/EventsGridContainer'
import useEventStore from '../../store/useEventStore'
import EventInforCardPlaceholder from '../EventInforCardPlaceholder'
import EventListing from '../eventListing/EventListing'
import SectionButton from './SectionButton'
import SearchButton from '../SearchButton'
import { useEventSettingsContext } from '../../providers/EventSettingsProvider'
import useWindowSize from '@jg/hooks/useWindowSize'
import { JGCarousel } from '@comps/uiComps'

function SectionNGBEvents() {
  const { labelSettings: labels } = useEventSettingsContext()
  const summaryStatus = useEventStore((state) => {
    return state.summaryStatus
  })
  const ngbEvents = useEventStore((state) => {
    return state.ngbEvents
  })

  const { width } = useWindowSize()

  const As = width && width > 768 ? GridContainer : JGCarousel

  if ((summaryStatus === 'error' || summaryStatus === 'success') && ngbEvents.length === 0) return <></>

  return (
    <ContentSection
      heading={labels?.labelSettings?.ngbEventTitle || ''}
      caption={labels?.labelSettings?.ngbEventCaption || ''}
      className={classNames(
        (summaryStatus === 'error' || summaryStatus === 'success') && ngbEvents.length === 0 ? 'hidden' : ''
      )}
    >
      <div className="overflow-hidden">
        {(summaryStatus === 'success' || summaryStatus === 'idle') && (
          <>
            <EventListing as={As} view="ngbEvents" />

            <div className="text-center sm:pt-12">
              <SearchButton text={'See All'} searchRequestArg={{ provider: ['0'] }} />
            </div>
          </>
        )}
        {summaryStatus === 'pending' && <EventInforCardPlaceholder />}
      </div>
      {summaryStatus == 'pending' && <EventInforCardPlaceholder />}
    </ContentSection>
  )
}

export default SectionNGBEvents
