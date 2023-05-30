import { MemberType } from '@jg/common/types'
import BookingEntity from './BookingEntity'
import { EventBookingGroup } from '../../Types/EventBookingTypes'
import classNames from 'classnames'
import { useRegisterBookingInfoStoreContext } from '../../providers/RegisterBookingInfoProvider'
import { useEntityExtGenericDataCaptureContext } from '@jg/common/entityExtForms/providers/EntityExtGenericDataCaptureProvider'
import { memo, useCallback, useRef } from 'react'
import useScrollToForm from '../hooks/useScrollToForm'

//const FastBookingEntity = memo(BookingEntity)
const BookingEntityList = ({
  list,
  group,
  isWaitlist = false,
  parentEntityId,
  searchKey,
  hasDatacaptureForm,
}: {
  list: MemberType[]
  group: EventBookingGroup
  parentEntityId: number
  isWaitlist: boolean
  searchKey?: string
  hasDatacaptureForm: boolean
}) => {
  const { removeValueByMember, validate } = useEntityExtGenericDataCaptureContext((state) => ({
    removeValueByMember: state.removeValueByMember,
    validate: state.validate,
  }))
  const { addForm, removeForm, getFormCountByMember, getFormCount } = useRegisterBookingInfoStoreContext((state) => ({
    addForm: state.addForm,
    removeForm: state.removeForm,
    getFormCountByMember: state.getFormCountByMember,
    getFormCount: state.getFormCount,
  }))

  const { scrollTo } = useScrollToForm()
  // console.log('BookingEntityList', list)
  return (
    <>
      {list.map((item, index) => (
        <BookingEntity
          onErrorMessageClick={(bookingItemIndex, indexByMember) => {
            scrollTo({ bookingItemIndex, indexByMember }, () => {})
          }}
          onEntityClick={(bookingItemIndex) => {
            scrollTo({ bookingItemIndex })
          }}
          onAdd={(i, bookingItemIndex) => {
            if (hasDatacaptureForm) {
              const indexByMember = getFormCountByMember(item.DocId)
              const id = item.DocId * 10000 + indexByMember + 1

              addForm({
                index: indexByMember,
                id: id,
                member: item,
                bookingItemIndex: bookingItemIndex, //indexGlobalRef.current,
                name: '',
              })
              scrollTo({ bookingItemIndex, indexByMember }, () => {
                validate(true)
              })
            }
          }}
          onRemove={(i, bookingItemIndex) => {
            if (hasDatacaptureForm) {
              removeForm(item.DocId)
              removeValueByMember(item.DocId)
              scrollTo({ bookingItemIndex }, () => {
                validate(true)
              })
            }
          }}
          key={index}
          item={item}
          isWaitlist={isWaitlist}
          group={group}
          parentEntityId={parentEntityId}
          className={
            searchKey &&
            classNames(
              'pt-2.5 pb-1 px-3.5 bg-jg-grey-50 hover:bg-jg-grey-100',
              (
                item.FirstName +
                ' ' +
                item.LastName +
                ' ' +
                item.EmailAddress +
                ' ' +
                item.MID +
                ' ' +
                item.Town +
                ' ' +
                item.Surname
              )
                ?.toLowerCase()
                .indexOf(searchKey.toLowerCase()) > -1
                ? 'block'
                : 'hidden'
            )
          }
        />
      ))}
    </>
  )
}
export default BookingEntityList
