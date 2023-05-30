import useNavigateWithArgs from '../hooks/useNavigateWithArgs'
import EventFilterBarField from './EventFilterBarField'
import IndividaulFilterOption from './FilterIndividualOption'
import SortButton from './SortButton'

const EventFilterOptionSortBy = () => {
  const { currentArgs, setCurrentArgs, getArgsFromUrl } = useNavigateWithArgs()
  const sortBy = getArgsFromUrl().sortBy

  //console.log('Arguments from url', getArgsFromUrl())

  return (
    <div className="divide-y divide-jg-metal-50 border-b">
      {/* <SortButton
        distanceText="Distance"
        dateText="Date"
        sortBy={getArgsFromUrl().sortBy}
        onChange={(sortBy) => {
          setCurrentArgs({ ...currentArgs, ...{ sortBy: sortBy } })
        }}
      /> */}
      {sortByOptions.map((op) => {
        return (
          <IndividaulFilterOption
            key={op.value}
            title={op.name}
            active={sortBy === op.value}
            onClick={() => setCurrentArgs({ ...currentArgs, sortBy: op.value })}
          />
        )
      })}
    </div>
  )
}
export default EventFilterOptionSortBy

export const sortByOptions = [
  {
    name: 'Date',
    value: 'date',
  },
  {
    name: 'Distance',
    value: 'distance',
  },
  {
    name: 'Name',
    value: 'relevant',
  },
]
