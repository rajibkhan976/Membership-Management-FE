import { H1 } from '@comps/uiComps'
import useEventStore from '../../store/useEventStore'

import PostcodeDD from './PostcodeDD'
import AnimatedSpin from '@jg/common/comps/loader/AnimatedSpin'

const SearchResultSummary = () => {
  const searchCount = useEventStore((state) => state.searchCount)
  const finderStatus = useEventStore((state) => state.finderStatus)
  const isFilterBarReady = useEventStore((state) => state.filterBarReadyStatus)
  const summaryHeading = `We found ${searchCount} events`

  return (
    <>
      {finderStatus != 'pending' && <H1 className="text-white text-center">{summaryHeading}</H1>}
      {(!isFilterBarReady || finderStatus === 'pending') && (
        <div className="text-center">
          <AnimatedSpin />
          <H1 className="text-white  font-light inline"> Searching...</H1>
        </div>
      )}
      <div className="text-white ">{isFilterBarReady && <PostcodeDD />}</div>
    </>
  )
}
export default SearchResultSummary
