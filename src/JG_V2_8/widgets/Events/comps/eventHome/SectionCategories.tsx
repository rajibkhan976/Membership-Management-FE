import { ContentSection, PlaceholderImage } from '@jg/common/comps'
import { GridContainer } from '../../layouts/EventsGridContainer'
import { useEventSettingsContext } from '../../providers/EventSettingsProvider'
// import { getEventCategorySummary } from "@jg/common/dataAPIs/eventsAnsSchedules/GetSummaryEventsHomeRequest";
import useEventStore from '../../store/useEventStore'
import CategoryListing from '../categoryListing/CategoryListing'
import ListPlaceholderImage from '@jg/common/comps/loader/placeholders/ListPlaceholderImage'

function SectionCategories() {
  const { labelSettings: labels } = useEventSettingsContext()

  const summaryStatus = useEventStore((state) => {
    return state.summaryStatus
  })
  const categories = useEventStore((state) => {
    return state.categories
  })

  if (summaryStatus === 'success' && categories?.length === 0) return <></>

  return (
    <ContentSection
      heading={labels?.labelSettings?.eventsByCategoryTitle || ''}
      caption={labels?.labelSettings?.eventsByCategoryCaption || ''}
      className=""
    >
      {(summaryStatus === 'success' || summaryStatus === 'idle') && (
        // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-6">
        //   <CategoryListing />
        // </div>
        // <div className="flex flex-row flex-wrap justify-around jglg:justify-between gap-[30px] my-6">
        // <div className="mx-[15%] md:mx-0 grid grid-cols-1 md:grid-cols-3 jglg:grid-cols-4 jgxl:grid-cols-5 jgxl2:grid-cols-6 jgxl3:grid-cols-7 gap-4">
        <GridContainer>
          <CategoryListing />
        </GridContainer>
      )}
      {summaryStatus === 'pending' && <ListPlaceholderImage />}
      {/* {summaryStatus === 'pending' && <PlaceholderImage />} */}
    </ContentSection>
  )
}
export default SectionCategories
