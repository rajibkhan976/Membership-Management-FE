import RegisterBookingInfo from './RegisterBookingInfo'
import { useBookATicketStoreContext } from '../../providers/BookATicketProvider'
import { useCallback, useRef } from 'react'
import { BookATicketItem, EventBookingForType, EventBookingGroup } from '../../Types/EventBookingTypes'
import { MemberType } from '@jg/common/types'
import FastRegistrationForm from './FastRegistrationForm'
import { useRegisterBookingInfoStoreContext } from '../../providers/RegisterBookingInfoProvider'
import { useEntityExtGenericDataCaptureContext } from '@jg/common/entityExtForms/providers/EntityExtGenericDataCaptureProvider'
import classNames from 'classnames'

const FormGroup = ({
  entityId,
  bookingItemIndex,
  mode,
}: {
  entityId: number
  bookingItemIndex: number
  mode: 'group' | 'single'
}) => {
  const { forms } = useRegisterBookingInfoStoreContext((state) => ({
    forms: state.forms,
  }))
  const formsByMember = forms.filter((e) => e.member.DocId === entityId)

  return (
    <div id={`booking-form-${bookingItemIndex}`} className="">
      {formsByMember.map((e) => {
        return (
          <div key={e.id}>
            <FastRegistrationForm mode={mode} bookingItemIndex={bookingItemIndex} id={e.id} />
          </div>
        )
      })}
    </div>
  )
}

export type GroupRegistrationFormType = {
  globalIndex: number
  index: number
  id: number
  member: MemberType
}

const GroupRegistrationPanel = ({ mode }: { mode: 'group' | 'single' }) => {
  const { bookingItems } = useBookATicketStoreContext((state) => ({
    getBookingItems: state.getBookingItems,
    bookingItems: state.bookingItems,
  }))

  const getGroups = useCallback(() => {
    const group: JSX.Element[] = []
    let bookingItemIndex = -1
    bookingItems.forEach((e) => {
      e.bookingFor.forEach((i) => {
        bookingItemIndex++
        group.push(<FormGroup mode={mode} entityId={i.member.DocId} bookingItemIndex={bookingItemIndex} />)
      })
    })
    return group
  }, [bookingItems])
  return (
    <>
      {getGroups().map((e, i) => (
        <div key={i}>{e}</div>
      ))}
    </>
  )
}

export default GroupRegistrationPanel
