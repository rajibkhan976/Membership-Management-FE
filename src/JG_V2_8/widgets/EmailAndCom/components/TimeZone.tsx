import CheckedIcon from '@comps/uiComps/Icons/SVG/CheckedIcon'
import Edit from '@comps/uiComps/Icons/SVG/Edit'
import { useTimeZone } from '../store/useTimeZone'
import SideMenuOverAll from './SideMenuOverAll'
import { memo, useEffect } from 'react'
import moment from 'moment'
type TimeZoneProp = {
  ScheduleTimeZoneId: number
  setFieldValue: any
  ScheduledTime: string
}
const TimeZone = ({ ScheduleTimeZoneId, setFieldValue, ScheduledTime }: TimeZoneProp) => {
  const timeZoneList = useTimeZone(({ timeZoneList }) => {
    return timeZoneList
  })
  useEffect(() => {
    timeZoneList && ScheduleTimeZoneId === 0 && setFieldValue('ScheduleTimeZoneId', timeZoneList[0].ZoneId)
  }, [])

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="">
          <div className="text-[#455A64] text-[13px]">
            <div className="text-[14px] text-jg-metal-500 font-medium">
              {timeZoneList &&
                timeZoneList.length > 0 &&
                timeZoneList.find((item) => item.ZoneId == ScheduleTimeZoneId)?.ZoneName}
            </div>
            <div className="text-[13px] text-jg-metal-300 font-normal">
              {ScheduledTime && moment(ScheduledTime).format('LLLL')}
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="TimeZone" className="cursor-pointer flex text-[#4CAF4F]">
            <Edit />
          </label>
        </div>
      </div>
      <SideMenuOverAll zIndex={999} id={'TimeZone'} title={'Time Zone'}>
        <>
          {/* <div className="px-4 border-b sticky top-[57px] bg-white z-50">
            <div className="relative">
              <div className="absolute top-0 left-0 flex h-full w-8 justify-center items-center">
                <SearchIcon className="text-jg-grey-500 w-4 m-1" />
              </div>
              <input
                type="text"
                placeholder="Search time zone"
                className="px-3 p-2 pl-8 placeholder-jg-metal-300 text-jg-metal-700 shadow-none focus:outline-none w-full"
              />
            </div>
          </div> */}
          {/* TODO: if backend get API then implement the search fuctionality :MAHADI: */}

          <div className="p-4 border-b last:border-none">
            {timeZoneList &&
              timeZoneList.map((item: any, i: number) => (
                <div className="mb-4 last:mb-0" key={i}>
                  <label htmlFor={`timeZone_${i}`} className="cursor-pointer relative block">
                    <div className="text-[#90A4AE] text-[13px]">{item.ZoneName}</div>
                    <input
                      type="radio"
                      onChange={(e) => setFieldValue('ScheduleTimeZoneId', item.ZoneId)}
                      className="peer hidden"
                      value={item.ZoneId}
                      id={`timeZone_${i}`}
                      name="timeZone"
                    />
                    <div
                      className={`absolute top-0 right-0 text-[#4CAF4F] ${
                        item.ZoneId === ScheduleTimeZoneId ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <CheckedIcon />
                    </div>
                  </label>
                </div>
              ))}
          </div>
        </>
      </SideMenuOverAll>
    </>
  )
}

export default memo(TimeZone)
