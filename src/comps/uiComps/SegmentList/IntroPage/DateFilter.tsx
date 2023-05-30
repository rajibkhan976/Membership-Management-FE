import { CheckCircleIcon } from '@heroicons/react/solid'
import moment from 'moment'
import { useEffect, useRef, useState } from 'react'
import Calendar from 'react-calendar'
import { useParams } from 'react-router-dom'
import { CalendarMonth } from '../../Icons'
import { useEmailHistory } from '../store/emailHistory'
// import './calendar.css'

const dateFilterDropDownOptions = [
  { title: 'Any Time', value: 0 },
  { title: 'Within the last week', value: 7 },
  { title: 'Within the last month', value: 30 },
  { title: 'Within the last 6 months', value: 180 },
  { title: 'Within the last year', value: 365 },
  { title: 'Custom range...', value: 999 },
]

type DateFilterDropdownprops = {
  isDateValid: boolean
  setIsDateValid: (value: boolean) => void
  btnClass?: string
  setIsRefresh?: (value: boolean) => void
}

const DateFilterDropdown = ({ isDateValid, setIsDateValid, btnClass }: DateFilterDropdownprops) => {
  const { clubDocId } = useParams()
  const [dateFilterStatus, setDateFilterStatus] = useState<string>('')
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [showDateFilterOptions, setShowDateFilterOptions] = useState<boolean>(false)
  const [showCalendar, setShowCalendar] = useState<boolean>(false)
  const { dateRange, setDateRange } = useEmailHistory((state) => state)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (dateRange === '') {
      setDateFilterStatus(dateFilterDropDownOptions[0].title)
    }
  }, [dateRange])

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowDateFilterOptions(false)
      }
    }
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [setShowDateFilterOptions])

  const clearDate = () => {
    setStartDate('')
    setEndDate('')
    setDateRange('')
  }

  const setDateRangeData = () => {
    if (startDate && endDate) {
      setDateFilterStatus(`${startDate} to ${endDate}`)
      setIsDateValid(true)
    }
    setShowCalendar(false)
  }

  const handleDateChange = (date: any) => {
    setStartDate(moment(date[0]).format('YYYY-MM-D'))
    setEndDate(moment(date[1]).format('YYYY-MM-D'))
    setDateRange(`${moment(date[0]).format('YYYY-MM-D')} , ${moment(date[1]).format('YYYY-MM-D')}`)
  }

  const onDateFilterSelect = (option: any) => {
    setDateFilterStatus(option.title)
    setShowDateFilterOptions(false)
    setShowCalendar(option.title === 'Custom range...')
    if (option.value === 0 && clubDocId) {
      setDateRange('')
    } else if (option.value === 999) {
      setStartDate('')
      setEndDate('')
      setIsDateValid(false)
    } else {
      setIsDateValid(true)
      setDateRange(`${moment().subtract(option.value, 'd').format('YYYY-MM-D')}, ${moment().format('YYYY-MM-D')}`)
    }
  }

  return (
    <>
      <div ref={ref} className="relative inline-block text-left ">
        <button
          onClick={() => {
            setShowDateFilterOptions(!showDateFilterOptions)
            setShowCalendar(false)
          }}
          className={`flex items-center justify-between border border-[#CFD8DC] text-[#90A4AE] text-[13px] focus-within:border-[#455A64] focus-within:text-[#455A64] rounded-sm p-2 min-w-[216px] ${btnClass}`}
        >
          <b className="mr-2">{dateFilterStatus ? dateFilterStatus : dateFilterDropDownOptions[0].title}</b>
          <div>
            <CalendarMonth height={16} width={16} />
          </div>
        </button>
        {showDateFilterOptions && (
          <div className="absolute sm:left-0 sm:right-auto mt-2 min-w-[212px] origin-top-right bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
            <div className="px-1 py-1">
              {dateFilterDropDownOptions.map((option, index) => (
                <div
                  key={index}
                  className={`last:border-t last:border-[#ECEFF1] flex items-center ' ${
                    dateFilterStatus === option.title ? ' bg-[#E8F5E9]' : 'bg-white'
                  }`}
                >
                  {dateFilterStatus === option.title && (
                    <div className="pl-2">
                      <CheckCircleIcon height={14} width={14} color="#4CAF4F" />
                    </div>
                  )}
                  <button
                    onClick={() => onDateFilterSelect(option)}
                    className={`flex w-full items-center rounded-md px-2 py-2 text-sm  ${
                      dateFilterStatus === option.title ? 'text-[#4CAF4F]' : ' text-gray-900'
                    }`}
                  >
                    {option.title}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        {showCalendar && (
          <div className="absolute w-auto md:p-4 p-2 sm:left-0 sm:right-auto mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
            <div className="flex gap-3 justify-between">
              <div className="h-[32px] min-w-[128px] w-full py-1 px-3 flex items-center justify-between border border-[#CFD8DC] text-[#90A4AE] text-[13px] focus-within:border-[#455A64] focus-within:text-[#455A64]">
                <p>{startDate ? startDate.split(' ')[0] : 'Start Date'}</p>
                <CalendarMonth />
              </div>
              <div className="h-[32px] min-w-[128px] w-full py-1 px-3 flex items-center justify-between border border-[#CFD8DC] text-[#90A4AE] text-[13px] focus-within:border-[#455A64] focus-within:text-[#455A64]">
                {endDate ? endDate.split(' ')[0] : 'End Date'}
                <CalendarMonth />
              </div>
            </div>
            <div className="py-1">
              <Calendar
                onChange={(value: any) => handleDateChange(value)}
                // prev2Label=""
                // next2Label=""
                selectRange
                className="p-2 border-none"
              />
            </div>
            {/* <p className="text-[13px] text-[#263238]">TimeZone</p> */}
            {/* <select
              className="h-[32px] w-full leading-[32px] text-[#455A64] my-1 border border-[#CFD8DC]"
              id="timezone"
              name="timezone"
            >
              <option value="BST">BST (GMT + 6.00), Dhaka, Bangladesh</option>
              <option value="ACST">ACST (GMT + 9.30), Australia</option>
              <option value="JST">JST (GMT + 9.00), Japan</option>
            </select> */}
            {/* <p className="text-[12px] text-[#90A4AE] font-light">
              Current time {moment(new Date()).format('LT')} */}
            {/* {new Date().toTimeString()} */}
            {/* </p> */}
            <div className="flex justify-end gap-3 p-2">
              <button onClick={clearDate} className="text-[#263238] text-[14px] font-normal h-[32px] px-3">
                Clear
              </button>
              <button
                onClick={() => setDateRangeData()}
                className="bg-[#4CAF4F] rounded-sm text-white text-[14px] font-normal h-[32px] px-3"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default DateFilterDropdown
