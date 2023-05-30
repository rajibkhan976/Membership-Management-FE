import { Checkbox } from '@comps/uiComps/forms'
import { useEventTicketListStoreContext } from '../../providers/EventTicketListStoreProvider'
import ToggleButton from '@jg/common/comps/filter/ToggleButton'
import { useState } from 'react'

const AttendeeConsentCheckbox = ({ entityId }: { entityId: number }) => {
  const { updateAttendeeConsents, attendeeConsents } = useEventTicketListStoreContext((state) => ({
    updateAttendeeConsents: state.updateAttendeeConsents,
    attendeeConsents: state.attendeeConsents,
  }))

  return (
    <>
      <ToggleButton
        enabled={attendeeConsents.find((e) => e.entityId === entityId)?.checked}
        handleChange={(enabled) => {
          updateAttendeeConsents(entityId, !enabled)
        }}
      />
    </>
  )
}
export default AttendeeConsentCheckbox
