import SendLater from '@comps/uiComps/Icons/SVG/SendLater'
import { useEffect, useState } from 'react'
import SchedulerSuggestion from '../comps/SchedulerSuggestion'
import PickDateTime from './PickDateTime'
import TimeZone from './TimeZone'
import SideMenu from './sideMenu'
import { useTimeZone } from '../store/useTimeZone'
import SpinerLoader from './spinerLoader'

const SendLaterComponents = ({ setFieldValue, submitForm, isValid, isSubmitting, values }: any) => {
  const [selected, setSelected] = useState<number>(0)
  const getTimeZone = useTimeZone(({ getTimeZone }) => getTimeZone)
  const isLoading = useTimeZone(({ isLoading }) => isLoading)
  const timeZoneList = useTimeZone(({ timeZoneList }) => timeZoneList)

  return (
    <>
      <label htmlFor={'SendLater'} onClick={() => getTimeZone()}>
        <span className="cursor-pointer font-medium flex items-center text-[13px] gap-1 justify-center">
          <span className="text-base">
            <span
              className={`flex gap-[8px] justify-center items-center h-[32px] px-[16px] border-[1px] font-medium bg-jg-green-50 cursor-pointer border-jg-green-500 text-jg-green-500`}
            >
              <SendLater /> <span className="hidden md:visible md:block"> Send Later </span>
            </span>
          </span>
        </span>
      </label>

      <SideMenu
        id={'SendLater'}
        isSubmitting={isSubmitting}
        isValid={isValid}
        setFieldValue={setFieldValue}
        submitForm={submitForm}
        title={'Schedule For'}
        footerBtnText="Schedule Send"
        values={values}
        onCloseClick={() => {
          setSelected(0)
          setFieldValue('ScheduleTimeZoneId', 0)
          setFieldValue('ScheduledTime', null)
        }}
      >
        {isLoading ? (
          <SpinerLoader />
        ) : (
          <>
            <div className="p-4 border-b last:border-none">
              {timeZoneList && (
                <TimeZone
                  ScheduleTimeZoneId={values.ScheduleTimeZoneId}
                  setFieldValue={setFieldValue}
                  ScheduledTime={values.ScheduledTime}
                />
              )}
            </div>
            <div className="p-4 border-b last:border-none">
              {timeZoneList && (
                <SchedulerSuggestion
                  scheduleTimeHandler={setFieldValue}
                  setSelected={setSelected}
                  selected={selected}
                />
              )}
            </div>
            <div className="p-4 border-b last:border-none">
              {timeZoneList && (
                <PickDateTime
                  submitForm={submitForm}
                  setFieldValue={setFieldValue}
                  setSelected={setSelected}
                  ScheduleTimeZoneId={values.ScheduleTimeZoneId}
                  ScheduledTime={values.ScheduledTime}
                  values={values}
                  isSubmitting={isSubmitting}
                  isValid={isValid}
                />
              )}
            </div>
          </>
        )}
      </SideMenu>
    </>
  )
}

export default SendLaterComponents
