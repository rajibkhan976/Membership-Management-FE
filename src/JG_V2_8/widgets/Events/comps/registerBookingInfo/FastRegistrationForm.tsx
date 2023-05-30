import { memo, useEffect, useRef, useState } from 'react'
import { GroupRegistrationFormType } from './GroupRegistration'
import { useRegisterBookingInfoStoreContext } from '../../providers/RegisterBookingInfoProvider'
import { useEntityExtGenericDataCaptureContext } from '@jg/common/entityExtForms/providers/EntityExtGenericDataCaptureProvider'
import RegistrationForm from './RegistrationForm'

const FastRegistrationForm = ({
  id,
  bookingItemIndex,
  mode,
}: {
  id: number
  bookingItemIndex: number
  mode: 'group' | 'single'
}) => {
  const { clear, copy } = useEntityExtGenericDataCaptureContext((state) => ({
    clear: state.clear,
    copy: state.copy,
  }))
  const { getForms } = useRegisterBookingInfoStoreContext((state) => ({
    getForms: state.getForms,
  }))
  const form = getForms().find((e) => e.id === id)

  return (
    <>
      <span className="hidden">
        {bookingItemIndex} || {form?.bookingItemIndex} | {id} | {form?.index} | {form?.member.FirstName}
      </span>
      {form && (
        <div id={`booking-form-${form?.bookingItemIndex}-${form?.index}`}>
          <RegistrationForm
            member={form.member}
            mode={mode}
            index={form.index}
            hideCopyAction={bookingItemIndex === 0 && form?.index === 0}
            onAction={(action) => {
              if (action === 'clear') {
                clear(form.member.DocId, form?.index)
              }
              if (action === 'copy') {
                let srcFrom
                if (form?.index > 0) {
                  srcFrom = getForms().find((e) => e.member.DocId === form?.member.DocId && e.index === form?.index - 1)
                } else {
                  srcFrom = getForms()
                    .filter((e) => e.bookingItemIndex === bookingItemIndex - 1)
                    .pop()
                } //srcFrom = getForms().find((e) => e.bookingItemIndex === form.bookingItemIndex - 1)

                if (srcFrom) {
                  copy(
                    { entityId: srcFrom.member.DocId, formIndex: srcFrom.index },
                    { entityId: form.member.DocId, formIndex: form?.index }
                  )
                }
              }
            }}
          />
        </div>
      )}
    </>
  )
}
export default memo(FastRegistrationForm)
