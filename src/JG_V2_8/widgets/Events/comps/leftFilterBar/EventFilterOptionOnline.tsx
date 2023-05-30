import Toggle from '@comps/uiComps/Toggle/Toggle'
import ToggleButton from '@jg/common/comps/filter/ToggleButton'
import { useState } from 'react'
import useEventStore from '../../store/useEventStore'
import useNavigateWithArgs from '../hooks/useNavigateWithArgs'
import EventFilterBarField from './EventFilterBarField'

const EventFilterOptionOnline = () => {
  const { currentArgs, setCurrentArgs, getArgsFromUrl } = useNavigateWithArgs()
  const showMap = useEventStore((state) => state.showMap)
  const toggleShowMap = useEventStore((state) => state.toggleShowMap)

  return (
    <EventFilterBarField label="Online Events">
      <div className="py-1.5 ">
        <Toggle
          value={getArgsFromUrl().isOnline}
          onChange={(value) => {
            setCurrentArgs((currentArgs) => ({ ...currentArgs, ...{ isOnline: value } }))
            value && showMap && toggleShowMap?.()
            !value && !showMap && toggleShowMap?.()
          }}
        />
      </div>
    </EventFilterBarField>
  )
}
export default EventFilterOptionOnline
