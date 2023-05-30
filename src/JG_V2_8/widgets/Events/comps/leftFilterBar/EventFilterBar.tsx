import { CompBaseProps } from '@comps/uiComps'
import FilterBar from '@jg/common/comps/filter/FilterBar'
import ListPlaceHolder from '@jg/common/comps/loader/placeholders/ListPlaceHolder'
import { useRouter } from '@jg/hooks'
import { useWidgetContext } from 'jg-widget'
import { useEffect } from 'react'
import { SearchRequestArg } from '../../store/useEventStore'
import useNavigateWithArgs from '../hooks/useNavigateWithArgs'
import { getEventFilterItems } from './EventFilterItems'
import { useFilterDataContext } from '../../providers/FilterDataProvider'
import useFilterBarData from '../hooks/useFilterBarData'
import { useEventConfig } from '../../EventWidget'
//import { getEventFilterOptions } from './EventFilterOptions'
type EventFilterBarProps = CompBaseProps & {
  onReady: () => void
}
const EventFilterBar = ({ onReady, className }: EventFilterBarProps) => {
  const { resultDisplayBy: mode } = useFilterDataContext()
  const { filterBarData } = useFilterBarData()
  const { getSearchPath, defaultArgs } = useNavigateWithArgs()
  const { basePath } = useWidgetContext()
  const { navigate } = useRouter()
  const { isEvent, isPublic } = useEventConfig()

  const filteredDefaultArgs = (Object.keys(defaultArgs) as (keyof SearchRequestArg)[])
    .filter((key) => isEvent || !['isOnline', 'distance'].includes(key))
    .reduce((prev, curr) => ({ ...prev, [curr]: defaultArgs[curr] }), {})

  useEffect(() => {
    if (filterBarData !== null) {
      onReady()
    }
  }, [filterBarData])

  return (
    <div className={className}>
      {filterBarData !== null ? (
        <FilterBar
          onReset={() => {
            navigate({
              pathname: `${basePath}${mode}/`,
              search: getSearchPath(filteredDefaultArgs),
            })
          }}
          items={getEventFilterItems(mode, isEvent, isPublic)}
        />
      ) : (
        <ListPlaceHolder />
      )}
    </div>
  )
}
export default EventFilterBar
