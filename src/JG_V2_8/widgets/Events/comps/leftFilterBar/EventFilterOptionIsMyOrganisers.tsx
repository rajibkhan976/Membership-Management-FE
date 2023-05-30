import Toggle from '@comps/uiComps/Toggle/Toggle'
import ToggleButton from '@jg/common/comps/filter/ToggleButton'
import { useRef, useState } from 'react'
import useEventStore from '../../store/useEventStore'
import useNavigateWithArgs from '../hooks/useNavigateWithArgs'
import EventFilterBarField from './EventFilterBarField'

const EventFilterOptionIsMyOrganisers = () => {
  const { currentArgs, setCurrentArgs, getArgsFromUrl } = useNavigateWithArgs()
  const filterBarData = useEventStore((state) => state.filterBarData)
  const myProvider = useRef(
    filterBarData?.Clubs.filter((club) => club.IsMyOrganization).map((club) => `${club.DocId}`) || ['all']
  )
  return (
    <EventFilterBarField label="My Organisations">
      <div className="py-1.5 ">
        <Toggle
          value={getArgsFromUrl().provider?.every((club) => {
            // const myProvider = getMyProvider()
            return myProvider.current.includes(club)
          })}
          // value={getArgsFromUrl().provider?.[0] === 'my-provider'}
          onChange={(value) => {
            setCurrentArgs({ ...currentArgs, provider: value ? myProvider.current : ['all'] })
          }}
        />
      </div>
    </EventFilterBarField>
  )
}
export default EventFilterOptionIsMyOrganisers
