import { useWidgetContext } from 'jg-widget'
import { Link } from 'react-router-dom'
import useEventStore from '../../store/useEventStore'
import CategoryCard from '../categoryCard/CategoryCard'
import ClubSummaryCard from '../clubSummaryCard/ClubSummaryCard'
import useNavigateWithArgs from '../hooks/useNavigateWithArgs'

function ClubListing() {
  const { basePath } = useWidgetContext()
  const clubSummary = useEventStore((state) => state.clubSummary)
  const { currentArgs, getSearchPath } = useNavigateWithArgs()
  return (
    <>
      {clubSummary?.map((item, index) => {
        const { clubName, eventCount } = item
        return (
          <Link
            key={index}
            to={`${basePath}browse/${getSearchPath({ provider: [item.clubId ? item.clubId.toString() : 'all'] })}`}
            className="w-full max-w-[270px]"
          >
            {/* <div className={'mx-1 mb-4 md:mx-2 md:mb-4 jgxl2:mx-3 jgxl2:mb-6 jgxl3:mx-4 jgxl3:mb-8 min-w-0'}>
              <div className="flex flex-wrap w-full  justify-center"> */}
            <ClubSummaryCard subItemCount={eventCount} eventCategory={item} />
            {/* </div> */}
          </Link>
        )
      })}
    </>
  )
}

export default ClubListing
