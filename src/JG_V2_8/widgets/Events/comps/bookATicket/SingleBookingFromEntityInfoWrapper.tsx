import { MemberType, TicketInfo } from '@jg/common/types'
import BookingEntity from './BookingEntity'
import { useRegisterBookingInfoStoreContext } from '../../providers/RegisterBookingInfoProvider'
import GroupRegistrationPanel from '../registerBookingInfo/GroupRegistration'
import { useEntityExtGenericDataCaptureContext } from '@jg/common/entityExtForms/providers/EntityExtGenericDataCaptureProvider'
import { useCallback } from 'react'
import useScrollToForm from '../hooks/useScrollToForm'

const SingleBookingFromEntityInfoWrapper = ({ member, ticketInfo }: { member: MemberType; ticketInfo: TicketInfo }) => {
  const { addForm, removeForm, getFormCountByMember } = useRegisterBookingInfoStoreContext((state) => ({
    addForm: state.addForm,
    removeForm: state.removeForm,
    getFormCountByMember: state.getFormCountByMember,
  }))

  const { removeValueByMember, validate } = useEntityExtGenericDataCaptureContext((state) => ({
    removeValueByMember: state.removeValueByMember,
    validate: state.validate,
  }))
  const { scrollTo } = useScrollToForm()
  return (
    <>
      <BookingEntity
        onErrorMessageClick={(bookingItemIndex, indexByMember) => {
          scrollTo({ bookingItemIndex, indexByMember })
        }}
        onEntityClick={(bookingItemIndex) => {
          scrollTo({ bookingItemIndex })
        }}
        item={member}
        isWaitlist={false}
        group="single"
        parentEntityId={0}
        onAdd={(i, bookingItemIndex) => {
          if (ticketInfo.dataCaptureItems && ticketInfo.dataCaptureItems.length) {
            const indexByMember = getFormCountByMember(member.DocId)
            const id = member.DocId * 10000 + indexByMember + 1
            addForm({
              index: indexByMember,
              id: id,
              member: member,
              bookingItemIndex: bookingItemIndex, //indexGlobalRef.current,
              name: '',
            })
            scrollTo({ bookingItemIndex, indexByMember }, () => {
              validate(true)
            })
          }
        }}
        onRemove={(i, bookingItemIndex) => {
          if (ticketInfo.dataCaptureItems && ticketInfo.dataCaptureItems.length) {
            removeForm(member.DocId)
            removeValueByMember(member.DocId)
            scrollTo({ bookingItemIndex }, () => {
              validate(true)
            })
          }
        }}
      />
      {ticketInfo.dataCaptureItems && ticketInfo.dataCaptureItems.length > 0 && (
        <GroupRegistrationPanel mode="single" />
      )}
    </>
  )
}
export default SingleBookingFromEntityInfoWrapper
