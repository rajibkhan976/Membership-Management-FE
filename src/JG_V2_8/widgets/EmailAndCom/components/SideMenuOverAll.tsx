import LeftAlign from '@comps/uiComps/Icons/SVG/LeftAlign'
import CloseIcon from '@comps/uiComps/Icons/SVG/closeIcon'
import moment from 'moment'

type SideMenuOverAllProps = {
  id: string
  title: string
  footerBtnText?: string
  children: JSX.Element
  zIndex?: number
  submitForm?: any
  setFieldValue?: any
  values?: any
  isSubmitting?: boolean
  isValid?: boolean
  timeZone?: string
  onClose?: () => void
}

const SideMenuOverAll = ({
  id,
  title,
  children,
  zIndex,
  footerBtnText,
  onClose,
  submitForm,
  setFieldValue,
  values,
  isValid,
  isSubmitting,
  timeZone,
}: SideMenuOverAllProps) => {
  return (
    <>
      <input type="checkbox" id={id} className="peer hidden" />
      <label className="bg-transparent opacity-0 scale-0 peer-checked:scale-100 fixed flex justify-end w-full h-full top-0 left-0 peer-checked:opacity-60 z-10 "></label>
      <div
        className={`
      right-[-100%] overflow-y-auto w-full max-w-[416px] h-full bg-white fixed top-0 peer-checked:right-0 transition-all`}
        style={{ zIndex: zIndex }}
      >
        <div
          style={{
            background: `linear-gradient(0deg, #FAFAFA, #FAFAFA), linear-gradient(0deg, #ECEFF1, #ECEFF1)`,
          }}
          className="flex sticky top-0 z-50 bg-white border-b justify-between items-center p-4"
        >
          <div className="text-sm font-semibold flex items-center gap-1">
            <label
              // htmlFor={moment().diff(values?.ScheduledTime, 'seconds') < 0 ? id : 'lklkee'}
              htmlFor={id}
              className="cursor-pointer"
            >
              <LeftAlign />
            </label>
            {title}
          </div>
          <label
            htmlFor={id}
            onClick={() => onClose && onClose()}
            className=" w-6 h-6 cursor-pointer flex items-center justify-center"
          >
            <CloseIcon />
          </label>
        </div>
        <div className="">{children}</div>
        {footerBtnText && (
          <div
            style={{
              background: `linear-gradient(0deg, #FAFAFA, #FAFAFA), linear-gradient(0deg, #ECEFF1, #ECEFF1)`,
            }}
            className="absolute w-full left-0 bottom-0 text-right z-60 bg-white border-b px-4 py-2"
          >
            <button
              type="button"
              // htmlFor={moment().diff(values?.ScheduledTime, 'seconds') < 0 ? id : 'lklk'}
              onClick={async () => {
                if (moment().diff(values?.ScheduledTime, 'seconds') < 0) {
                  setFieldValue && (await setFieldValue('Status', 1))
                  submitForm && (await submitForm())
                }
              }}
              disabled={isSubmitting || !isValid}
              className={`${
                !isSubmitting &&
                isValid &&
                moment(new Date().toLocaleString('en-US', { timeZone: timeZone })).diff(
                  values?.ScheduledTime,
                  'seconds'
                ) < 0
                  ? 'bg-jg-green-500 cursor-pointer'
                  : 'bg-jg-grey-500 cursor-not-allowed'
              }  inline-block text-white py-2 px-4 rounded-sm  md:w-auto w-full text-center`}
            >
              {footerBtnText}
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default SideMenuOverAll
