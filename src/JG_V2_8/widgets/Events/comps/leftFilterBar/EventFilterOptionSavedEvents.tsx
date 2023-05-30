import Toggle from '@comps/uiComps/Toggle/Toggle'
import EventFilterBarField from './EventFilterBarField'
import useNavigateWithArgs from '../hooks/useNavigateWithArgs'
import { useEventConfig } from '../../EventWidget'

const EventFilterOptionSavedEvents = () => {
  const { currentArgs, setCurrentArgs, getArgsFromUrl } = useNavigateWithArgs()
  const { isEvent } = useEventConfig()

  return (
    <EventFilterBarField label={`Saved ${isEvent ? 'Events' : 'Items'}`}>
      <div className="py-1.5 ">
        <Toggle
          value={getArgsFromUrl().isSaved}
          onChange={(value) => {
            setCurrentArgs({ ...currentArgs, ...{ isSaved: value } })
          }}
        />
      </div>
    </EventFilterBarField>
  )
}
export default EventFilterOptionSavedEvents
