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

function SectionClubEvents() {
  const { labelSettings: labels } = useEventSettingsContext()
  const summaryStatus = useEventStore((state) => {
    return state.summaryStatus
  })
  const clubEvents = useEventStore((state) => {
    return state.clubEvents
  })

  const { width } = useWindowSize()

  const As = width && width > 768 ? GridContainer : JGCarousel

  if ((summaryStatus === 'error' || summaryStatus === 'success') && clubEvents.length === 0) return <></>

  return (
    <ContentSection
      heading={labels?.labelSettings?.myClubEventTitle || ''}
      caption={labels?.labelSettings?.myClubEventCaption || ''}
      className={classNames(
        (summaryStatus === 'error' || summaryStatus === 'success') && clubEvents.length === 0 ? 'hidden' : ''
      )}
    >
      {(summaryStatus == 'success' || summaryStatus == 'idle') && (
        <div className="overflow-hidden">
          <EventListing as={As} view="ownedByClubs" />
          <div className="text-center sm:pt-12">
            <SearchButton text={'See All'} searchRequestArg={{ provider: ['club'] }} />
          </div>
        </div>
      )}
      {summaryStatus == 'pending' && <EventInforCardPlaceholder />}
    </ContentSection>
  )
}

export default SectionClubEvents
