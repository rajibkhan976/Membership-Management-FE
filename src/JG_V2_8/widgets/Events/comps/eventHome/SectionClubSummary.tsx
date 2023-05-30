import { ContentSection } from '@jg/common/comps'
import { GridContainer } from '../../layouts/EventsGridContainer'
import { useEventSettingsContext } from '../../providers/EventSettingsProvider'
// import { getEventCategorySummary } from "@jg/common/dataAPIs/eventsAnsSchedules/GetSummaryEventsHomeRequest";
import useEventStore from '../../store/useEventStore'
import ClubListing from '../clubSummaryListing/ClubListing'
import EventInforCardPlaceholder from '../EventInforCardPlaceholder'

function SectionClubSummary() {
  const { labelSettings: labels } = useEventSettingsContext()
  const message = 'My Club Summary are not found. Please reload.'

  const summaryStatus = useEventStore((state) => {
    return state.summaryStatus
  })
  const clubSummary = useEventStore((state) => {
    return state.clubSummary
  })
  return (
    <>
      {summaryStatus == 'success' && clubSummary?.length > 0 ? (
        <ContentSection
          heading={labels?.labelSettings?.eventsByMyClubTitle || ''}
          caption={labels?.labelSettings?.eventsByMyClubCaption || ''}
          className=""
        >
          <div className="flex flex-wrap justify-center gap-[30px]">
            <ClubListing />
          </div>
          {/* {summaryStatus === 'success' && clubSummary?.length == 0 && <>{message}</>} */}
        </ContentSection>
      ) : summaryStatus === 'pending' ? (
        <div className="jg-container">
          <EventInforCardPlaceholder />
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export default SectionClubSummary
