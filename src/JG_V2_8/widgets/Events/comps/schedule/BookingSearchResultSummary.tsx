import { H1 } from '@comps/uiComps'
import AnimatedSpin from '@jg/common/comps/loader/AnimatedSpin'
import useCourseBookingStore from '../../store/useCourseBookingStore'

const BookingSearchResultSummary = () => {
  const finderStatus = useCourseBookingStore((state) => state.finderStatus)
  const isFilterBarReady = useCourseBookingStore((state) => state.filterBarReadyStatus)
  const eventCountByCalendarView = useCourseBookingStore((state) => state.eventCountByCalendarView)
  const summaryHeading = `We found ${eventCountByCalendarView} booking${eventCountByCalendarView > 1 ? 's' : ''}`
  // console.log('searchResultCount', searchResultCount)
  return (
    <>
      {finderStatus !== 'pending' && (
        <H1 className="text-white text-center hidden visible md:block">{summaryHeading}</H1>
      )}
      {(!isFilterBarReady || finderStatus === 'pending') && (
        <div className="text-center">
          <AnimatedSpin />
          <H1 className="text-white font-light inline"> Searching...</H1>
        </div>
      )}
    </>
  )
}
export default BookingSearchResultSummary
