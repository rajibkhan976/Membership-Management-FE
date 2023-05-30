import ToggleButton from '@jg/common/comps/filter/ToggleButton'
import { useBookATicketStoreContext } from '../../providers/BookATicketProvider'
import { MemberType } from '@jg/common/types'
import { BookATicketItem, EventBookingGroup } from '../../Types/EventBookingTypes'
import { useCallback, useEffect, useState } from 'react'
export type InstallmentToggleProps = {
  item: MemberType
  // mode?: 'qtyPicker' | 'switch'
  qty: number
  group: EventBookingGroup
  parentEntityId: number
}
const InstallmentToggle = ({ item, group, parentEntityId, qty }: InstallmentToggleProps) => {
  const { updateBooking, getBookingItems } = useBookATicketStoreContext((state) => ({
    updateBooking: state.updateBooking,
    getBookingItems: state.getBookingItems,
  }))
  const getBookingInstallmentChecked = useCallback((bookingItems: BookATicketItem[]) => {
    const bookingItemsByGroup = bookingItems.find((e) => e.group === group)
    if (bookingItemsByGroup) {
      const bookFor = bookingItemsByGroup.bookingFor.find((e) => e.member.DocId === item.DocId)
      if (bookFor) {
        return !!bookFor.isSelectedForInstallment
      } else return false
    } else return false
  }, [])
  const [toggled, setToggled] = useState(getBookingInstallmentChecked(getBookingItems()))
  return (
    <ToggleButton
      enabled={toggled}
      handleChange={() => {
        // updateWaitlist(item, group, !toggled, parentEntityId)
        updateBooking(item, qty, 'replace', group, parentEntityId, !toggled)
        setToggled(getBookingInstallmentChecked(getBookingItems()))
      }}
    />
  )
}
export default InstallmentToggle
