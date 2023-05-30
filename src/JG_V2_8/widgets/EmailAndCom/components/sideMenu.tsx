import CloseIcon from '@comps/uiComps/Icons/SVG/closeIcon'
import { SendEmailInitialValue } from '../types'
import { values } from 'lodash'
import moment from 'moment'

type SideMenuProps = {
  id: string
  title: string
  footerBtnText?: string
  children: JSX.Element
  onCloseClick?: () => void
  setFieldValue?: any
  submitForm?: any
  isValid?: any
  isSubmitting?: any
  values?: SendEmailInitialValue
}

const SideMenu = ({
  id,
  title,
  children,
  footerBtnText,
  onCloseClick,
  setFieldValue,
  submitForm,
  isValid,
  isSubmitting,
  values,
}: SideMenuProps) => {
  return (
    <>
      <input type="checkbox" id={id} className="peer hidden" />
      <label className="bg-gray-900 opacity-0 scale-0 peer-checked:scale-100 fixed flex justify-end w-full h-full top-0 left-0 peer-checked:opacity-60 z-10 "></label>

      <div className="right-[-100%] overflow-y-auto w-full max-w-[416px] h-full bg-white fixed top-0 peer-checked:right-0 z-20 transition-all">
        <div
          style={{
            background: `linear-gradient(0deg, #FAFAFA, #FAFAFA), linear-gradient(0deg, #ECEFF1, #ECEFF1)`,
          }}
          className="flex sticky top-0 z-50 bg-white border-b justify-between items-center p-4"
        >
          <div className="text-sm font-semibold">{title}</div>
          <label htmlFor={id} className=" w-6 h-6 cursor-pointer flex items-center justify-center">
            <div onClick={onCloseClick && onCloseClick}>
              <CloseIcon />
            </div>
          </label>
        </div>
        <div
          className=""
          style={{
            minHeight: 'calc(100vh - 115px)',
          }}
        >
          {children}
        </div>
        <div
          style={{
            background: `linear-gradient(0deg, #FAFAFA, #FAFAFA), linear-gradient(0deg, #ECEFF1, #ECEFF1)`,
          }}
          className="sticky w-full left-0 bottom-0 text-right z-50 bg-white border-b px-4 py-2"
        >
          {footerBtnText !== 'Schedule Send' ? (
            <label
              htmlFor={id}
              className="bg-jg-green-500 inline-block cursor-pointer text-white py-2 px-4 rounded-sm md:w-auto w-full text-center"
            >
              {footerBtnText ? footerBtnText : 'Done'}
            </label>
          ) : (
            <button
              onClick={async () => {
                if (isValid && !isSubmitting && values?.ScheduleTimeZoneId !== 0 && values?.ScheduledTime) {
                  await setFieldValue('Status', 1)
                  await submitForm()
                }
              }}
              type="button"
              disabled={isSubmitting || !isValid}
              className={`${
                isValid && values?.ScheduleTimeZoneId !== 0 && values?.ScheduledTime
                  ? 'bg-jg-green-500 cursor-pointer'
                  : 'bg-jg-grey-500 cursor-not-allowed'
              }  inline-block text-white py-2 px-4 rounded-sm md:w-auto w-full text-center`}
            >
              {footerBtnText}
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default SideMenu
