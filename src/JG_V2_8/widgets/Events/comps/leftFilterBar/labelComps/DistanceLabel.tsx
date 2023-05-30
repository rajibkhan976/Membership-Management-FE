import FilterBarLabelItem from '@jg/common/comps/filter/FilterBarLabelItem'
import { useEventSettingsContext } from '@jg/widgets/Events/providers/EventSettingsProvider'
import useEventStore from '@jg/widgets/Events/store/useEventStore'
import useNavigateWithArgs from '../../hooks/useNavigateWithArgs'

const DistanceLabel = () => {
  const { sysDistanceUnit } = useEventSettingsContext()
  const { currentArgs, setCurrentArgs } = useNavigateWithArgs()
  const distance = useEventStore((state) => state.searchRequestArg.distance)
  let distanceLabel = ''
  if (distance) {
    switch (distance) {
      case 'all':
        distanceLabel = 'Any Distance'
        break

      default:
        distanceLabel = `Within ${distance} ${sysDistanceUnit.toLowerCase()}s`
        break
    }
  } else distanceLabel = 'Any distance'

  return (
    <FilterBarLabelItem
      isActive={distance != 'all'}
      name="distance"
      filterValueDispplayText={distanceLabel}
      reset={() => {
        setCurrentArgs({ ...currentArgs, distance: 'all' })
      }}
    />
  )
}
export default DistanceLabel
