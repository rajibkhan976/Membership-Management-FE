import { CalendarDay } from '@comps/uiComps/Icons'
import SideMenuOverAll from './SideMenuOverAll'
import TimeZone from './TimeZone'
import { useEffect, useState } from 'react'
import moment from 'moment'
import { useTimeZone } from '../store/useTimeZone'

const PickDateTime = ({
  submitForm,
  setFieldValue,
  setSelected,
  ScheduleTimeZoneId,
  ScheduledTime,
  values,
  isValid,
  isSubmitting,
}: any) => {
  const [date, setDate] = useState<string>('')
  const [time, setTime] = useState<string>('')
  const [timeZone, setTimeZone] = useState<string>('Europe/London')
  const timeZoneList = useTimeZone(({ timeZoneList }) => {
    return timeZoneList
  })

  useEffect(() => {
    const tz = timeZoneList?.find((item) => item.ZoneId === values.ScheduleTimeZoneId)?.ZoneName.split(' ')[0]
    tz && setTimeZone(tz)
  }, [values.ScheduleTimeZoneId])

  useEffect(() => {
    ScheduledTime && setDate(moment(ScheduledTime).format('YYYY-MM-DD'))
    ScheduledTime && setTime(moment(ScheduledTime).format('HH:mm:ss'))
  }, [ScheduledTime])

  return (
    <>
      <label
        htmlFor={'pickDateTime'}
        className="text-sm text-[#607D8B] font-medium leading-4 flex gap-2 cursor-pointer"
        onClick={() => setSelected(0)}
      >
        <span>
          <CalendarDay />
        </span>
        <span>Pick date & time</span>
      </label>
      <SideMenuOverAll
        id={'pickDateTime'}
        title={'Pick Date Time'}
        zIndex={60}
        footerBtnText="Schedule Send"
        setFieldValue={setFieldValue}
        submitForm={submitForm}
        values={values}
        onClose={() => {
          setFieldValue('ScheduledTime', null)
          setDate('')
          setTime('')
        }}
        isSubmitting={isSubmitting}
        isValid={isValid}
        timeZone={timeZone}
      >
        <>
          <div className="p-4 border-b last:border-none">
            <TimeZone
              setFieldValue={setFieldValue}
              ScheduleTimeZoneId={ScheduleTimeZoneId}
              ScheduledTime={ScheduledTime}
            />
          </div>
          <div className="p-4">
            <div className="mb-4 last:mb-0">
              <div className="text-sm text-[#263238] font-medium leading-4 mb-1">Date</div>
              <div className="">
                <div className="relative">
                  <input
                    value={ScheduledTime ? moment(ScheduledTime).format('YYYY-MM-DD') : date}
                    type="date"
                    min={moment(new Date().toLocaleString('en-US', { timeZone: timeZone })).format('YYYY-MM-DD')}
                    className="border px-2 py-1 placeholder-jg-metal-300 text-jg-metal-700 shadow-none focus:outline-none w-full"
                    onChange={(e) => {
                      time && e.target.value && setFieldValue('ScheduledTime', `${e.target.value}T${time}`)
                      setDate(e.target.value)
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="mb-4 last:mb-0">
              <div className="text-sm text-[#263238] font-medium leading-4 mb-1">Time</div>
              <div className="">
                <div className="relative">
                  <input
                    disabled={!date}
                    type="time"
                    min={moment().format('YYYY-MM-DDThh:mm')}
                    value={ScheduledTime ? moment(ScheduledTime).format('HH:mm:ss') : ''}
                    className="border px-2 py-1 placeholder-jg-metal-300 text-jg-metal-700 shadow-none focus:outline-none w-full"
                    onChange={async (e) => {
                      date && e.target.value && setFieldValue('ScheduledTime', `${date}T${e.target.value}`)
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      </SideMenuOverAll>
    </>
  )
}

export default PickDateTime
