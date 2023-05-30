import classNames from 'classnames'
import { useWidgetContext } from 'jg-widget'
import { Link } from 'react-router-dom'
import useEventStore from '../../store/useEventStore'
import CategoryCard from '../categoryCard/CategoryCard'
import useNavigateWithArgs from '../hooks/useNavigateWithArgs'
// import { getEventCategorySummary } from '@jg/common/dataAPIs/eventsAnsSchedules/GetSummaryEventsHomeRequest';

function CategoryListing() {
  const { basePath } = useWidgetContext()
  const categories = useEventStore((state) => state.categories)
  // const {basePath}= useContext(WidgetContext)
  const { currentArgs, getSearchPath } = useNavigateWithArgs()
  return (
    <>
      {categories?.map((item, index) => {
        const { name, eventsCount } = item
        return (
          <Link
            key={index}
            to={`${basePath}browse/${getSearchPath({ category: [item.name || 'all'] })}`}
            className={classNames(
              'w-full flex-[300px] max-w-full jg600p:max-w-[50%] jglg:max-w-[33.3333%] jgxl:max-w-[25%] jg1500p:max-w-[16.666%] jg1800p:max-w-[14%] jgxl3:max-w-[12.333%]'
            )}
          >
            <div className={'mx-1 mb-4 md:mx-2 md:mb-4 jgxl2:mx-3 jgxl2:mb-6 jgxl3:mx-4 jgxl3:mb-8 min-w-0'}>
              <CategoryCard subItemCount={eventsCount} eventCategory={item} />
            </div>
          </Link>
        )
      })}
    </>
  )
}

export default CategoryListing
