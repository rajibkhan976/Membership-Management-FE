import { CheckCircleIcon } from '@heroicons/react/solid'
import { useEmailList } from '@jg/widgets/EmailAndCom/store/EmailStore'
import moment from 'moment'
import { useEffect, useRef, useState } from 'react'
import Calendar from 'react-calendar'
import { useParams } from 'react-router-dom'
import { CalendarMonth } from '../Icons'

const dateFilterDropDownOptions = [
  { title: 'Any Time', value: 0 },
  { title: 'Within the last week', value: 7 },
  { title: 'Within the last month', value: 30 },
  { title: 'Within the last 6 months', value: 180 },
  { title: 'Within the last year', value: 365 },
  { title: 'Custom range...', value: 999 },
]

const DateFilterDropdown = ({ setSearch, showDateFilterOptions, setShowDateFilterOptions }: any) => {
  const { clubDocId } = useParams()
  const [dateFilterStatus, setDateFilterStatus] = useState<string>('')
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [showCalendar, setShowCalendar] = useState<boolean>(false)
  const {
    key,
    tagFilterData,
    sideFilterStatus,
    dateFilterData,
    setDateFilterData,
    dateFilterActive,
    setDateFilterActive,
    fetch,
    setValueNull,
    setPageNumber,
    pageNumber,
    numberOfRows,
  } = useEmailList((state) => state)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    startDate && endDate && setDateFilterData({ startDate, endDate })
  }, [startDate, endDate])

  useEffect(() => {
    if (!dateFilterActive) {
      setDateFilterStatus('Any Time')
      setShowCalendar(false)
      setShowDateFilterOptions(false)
      setStartDate('')
      setEndDate('')
      setDateFilterData(null)
    }
  }, [dateFilterActive])

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
    setDateFilterActive(false)
  }

  const setDateRange = () => {
    if (startDate && endDate) {
      setDateFilterStatus(moment(startDate).format('ll') + '-' + moment(endDate).format('ll'))
      setDateFilterData({ startDate, endDate })
      setPageNumber(1)
      setValueNull()
      clubDocId &&
        fetch({
          Method: 'GetEmailList',
          OwningEntityId: +clubDocId,
          PageNumber: pageNumber,
          NumberOfRows: numberOfRows,
          Key: key,
          Status: sideFilterStatus === 100 ? null : sideFilterStatus,
          Tags: tagFilterData,
          Date: dateFilterData,
        })
      setSearch(true)
    }
    setShowCalendar(false)
  }

  const handleDateChange = (date: any) => {
    setEndDate(moment(date[1]).format('YYYY-MM-D'))
    setStartDate(moment(date[0]).format('YYYY-MM-D'))
  }

  const onDateFilterSelect = (option: any) => {
    setDateFilterActive(true)
    setDateFilterStatus(option.title)
    setShowDateFilterOptions(false)
    setShowCalendar(option.title === 'Custom range...')
    setPageNumber(1)
    setValueNull()
    if (clubDocId && option.value !== 0 && option.value !== 999) {
      setStartDate(moment().subtract(option.value, 'd').format('YYYY-MM-D')), setEndDate(moment().format('YYYY-MM-D'))
      fetch({
        Method: 'GetEmailList',
        OwningEntityId: +clubDocId,
        PageNumber: pageNumber,
        NumberOfRows: numberOfRows,
        Date: [moment().subtract(option.value, 'd').format('YYYY-MM-D'), moment().format('YYYY-MM-D')],
        Key: key,
        Tags: tagFilterData,
        Status: sideFilterStatus === 100 ? null : sideFilterStatus,
      })
      setSearch(true)
    } else if (option.value === 0 && clubDocId) {
      setDateFilterData(null)
      fetch({
        Method: 'GetEmailList',
        OwningEntityId: +clubDocId,
        PageNumber: pageNumber,
        NumberOfRows: numberOfRows,
        Date: null,
        Key: key,
        Tags: tagFilterData,
        Status: sideFilterStatus === 100 ? null : sideFilterStatus,
      })
      setSearch(true)
    }
  }

  return (
    <>
      <div ref={ref} className="relative inline-block text-left h-[36px] w-full lg:w-auto">
        <button
          onClick={() => {
            setShowDateFilterOptions(!showDateFilterOptions)
            setShowCalendar(false)
          }}
          className="hidden visible lg:flex items-center border border-[#CFD8DC] text-[#90A4AE] text-[13px] focus-within:border-[#455A64] focus-within:text-[#455A64] rounded-sm p-2"
        >
          <b className="mr-2">{dateFilterStatus ? dateFilterStatus : dateFilterDropDownOptions[0].title}</b>
          <div>
            <svg
              className="mr-1 ml-1"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4.66699 6.6665L8.00033 9.99984L11.3337 6.6665H4.66699Z" fill="#263238" />
            </svg>
          </div>
        </button>

        {/* showDateFilterOptions */}
        {showDateFilterOptions && (
          <div className="lg:absolute sm:left-0 sm:right-auto lg:mt-2 min-w-[212px] origin-top-right bg-white lg:shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
            <div className="">
              {dateFilterDropDownOptions.map((option, index) => (
                <div
                  key={index}
                  className={`bg-[#FAFAFA] p-4 lg:p-3 border-b border-[#ECEFF1] lg:border-b-0 lg:last:border-t last:border-[#ECEFF1] flex items-center ' ${
                    dateFilterStatus === option.title
                      ? ' lg:bg-[#E8F5E9] border-l-[3px] lg:border-l-0 border-l-[#4CAF4F]'
                      : 'bg-[#FAFAFA] lg:bg-white'
                  }`}
                >
                  {dateFilterStatus === option.title && (
                    <div className="pr-2">
                      <CheckCircleIcon height={20} width={20} color="#4CAF4F" />
                    </div>
                  )}
                  <button
                    onClick={() => onDateFilterSelect(option)}
                    className={`flex w-full items-center rounded-md text-sm  ${
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
        {/* showDateFilterOptions */}

        {showCalendar && (
          <div className="lg:absolute w-auto lg:p-4 p-8 sm:left-0 sm:right-auto lg:mt-2 origin-top-right rounded-md bg-white lg:shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
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
                className="p-2 border-none w-full"
              />
            </div>
            <p className="text-[13px] text-[#263238]">TimeZone</p>
            <select
              className="h-[32px] w-full leading-[32px] text-[#455A64] my-1 border border-[#CFD8DC]"
              id="timezone"
              name="timezone"
            >
              <option value="BST">BST (GMT + 6.00), Dhaka, Bangladesh</option>
              <option value="ACST">ACST (GMT + 9.30), Australia</option>
              <option value="JST">JST (GMT + 9.00), Japan</option>
            </select>
            <p className="text-[12px] text-[#90A4AE] font-light">
              Current time {moment(new Date()).format('LT')}
              {/* {new Date().toTimeString()} */}
            </p>
            <div className="flex justify-end gap-3 p-2">
              <button onClick={clearDate} className="text-[#263238] text-[14px] font-normal h-[32px] px-3">
                Clear
              </button>
              <button
                onClick={() => setDateRange()}
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
