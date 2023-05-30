import EventListing from '../eventListing/EventListing'
import EmptyResult from './EmptyResult'
import _ from 'lodash'
import SkeletonText from '@jg/common/comps/loader/placeholders/SkeletonText'
import EventInfoCardHover from '../eventListing/EventInfoCardHover'
import { FadeIn } from '@comps/uiComps'
import useFinderApi from '../hooks/useFinderApi'

function FilterResult() {
  const { status, data } = useFinderApi()
  return (
    <div className="bg-white ">
      {status === 'pending' && (
        <FadeIn className="p-3">
          <SkeletonText />
        </FadeIn>
      )}
      {/* {status === 'error' && data?.count === 0 && <EmptyResult />} */}
      {status === 'success' && (
        <EventListing itemAs={EventInfoCardHover} className="divide-y h-full" imageAlign="left" view="searchResults" />
      )}
    </div>
  )
}
export default FilterResult
