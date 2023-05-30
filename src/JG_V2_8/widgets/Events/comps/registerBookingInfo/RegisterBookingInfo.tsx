import { useRegisterBookingInfoStoreContext } from '../../providers/RegisterBookingInfoProvider'
import RegistrationForm from './RegistrationForm'
import React from 'react'
import { useEntityExtGenericDataCaptureContext } from '@jg/common/entityExtForms/providers/EntityExtGenericDataCaptureProvider'

const FastForm = React.memo(RegistrationForm)

const RegisterBookingInfo = ({ mode = 'single' }: { mode: 'single' | 'group' }) => {
  const { clear, copy } = useEntityExtGenericDataCaptureContext((state) => ({ clear: state.clear, copy: state.copy }))
  const { forms, getForms } = useRegisterBookingInfoStoreContext((state) => ({
    forms: state.forms,
    getForms: state.getForms,
  }))
  return (
    <>
      {forms
        .sort(function (a, b) {
          return a.name > b.name ? 1 : -1
        })
        .map((e, i) => {
          return (
            <div key={i}>
              <>form : {e.name}</>
              <FastForm
                member={e.member}
                mode={mode}
                index={e.id}
                hideCopyAction={false}
                key={i}
                onAction={(action) => {
                  const srcFrom = forms[i - 1]
                  const toFormFrom = forms[i]
                  //console.log('srcFrom', srcFrom, toFormFrom)
                  if (action === 'copy')
                    copy(
                      { entityId: srcFrom.member.DocId, formIndex: srcFrom.id },
                      { entityId: toFormFrom.member.DocId, formIndex: toFormFrom.id }
                    )
                  else if (action === 'clear') {
                    clear(toFormFrom.member.DocId, toFormFrom.id)
                  }
                }}
              />
            </div>
          )
        })}
    </>
  )
}
export default RegisterBookingInfo
