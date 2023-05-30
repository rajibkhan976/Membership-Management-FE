import Toggle from '@comps/uiComps/Toggle/Toggle'
import EventFilterBarField from './EventFilterBarField'
import useNavigateWithArgs from '../hooks/useNavigateWithArgs'
import { useEventConfig } from '../../EventWidget'

const EventFilterOptionFeatured = () => {
  const { currentArgs, setCurrentArgs, getArgsFromUrl } = useNavigateWithArgs()
  const { isEvent } = useEventConfig()
  return (
    <EventFilterBarField label={`Featured ${isEvent ? 'Events' : 'Items'}`}>
      <div className="py-1.5 ">
        <Toggle
          value={getArgsFromUrl().isFeatured}
          onChange={(value) => {
            setCurrentArgs({ ...currentArgs, ...{ isFeatured: value } })
          }}
        />
      </div>
    </EventFilterBarField>
  )
}
export default EventFilterOptionFeatured
