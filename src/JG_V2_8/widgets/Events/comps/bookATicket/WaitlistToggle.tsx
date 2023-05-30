import ToggleButton from '@jg/common/comps/filter/ToggleButton'
import { useBookATicketStoreContext } from '../../providers/BookATicketProvider'
import { MemberType } from '@jg/common/types'
import { EventBookingGroup } from '../../Types/EventBookingTypes'
import { useEffect, useState } from 'react'
export type WaitlistToggleProps = {
  item: MemberType
  // mode?: 'qtyPicker' | 'switch'
  group: EventBookingGroup
  parentEntityId: number
}
const WaitlistToggle = ({ item, group, parentEntityId }: WaitlistToggleProps) => {
  const [toggled, setToggled] = useState(false)
  const { updateWaitlist } = useBookATicketStoreContext((state) => ({
    updateWaitlist: state.updateWaitlist,
  }))

  return (
    <ToggleButton
      enabled={toggled}
      handleChange={() => {
        updateWaitlist(item, group, !toggled, parentEntityId)
        setToggled(!toggled)
      }}
    />
  )
}
export default WaitlistToggle
