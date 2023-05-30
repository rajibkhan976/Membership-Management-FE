import { useEffect, useRef, useState } from 'react'
// import { CalendarMonth } from '@'
import '@comps/uiComps/EmailList/calendar.css'
import { CalendarMonth, MenuDown, MenuUp } from '@comps/uiComps/Icons'
import { CheckCircleIcon } from '@heroicons/react/solid'
import { useRecepientCountActivity } from '@jg/widgets/EmailAndCom/store/EmailReportStore'
import moment from 'moment'
import { useParams } from 'react-router-dom'

const dateFilterDropDownOptions = [
  { title: 'Past 24 hours', value: 1, ResultType: 2 },
  { title: 'Past week', value: 7, ResultType: 0 },
  { title: 'Past month', value: 30, ResultType: 1 },
  { title: 'Past 6 months', value: 180, ResultType: 1 },
  { title: 'Past 1 year', value: 365, ResultType: 1 },
  // { title: 'Custom range...', value: 999 },
]

// type DateFilterDropdownprops = {
//   isRefresh?: boolean
//   setIsRefresh?: (value: boolean) => void
// }

const ChartFilterWIthDate = () => {
  const { id } = useParams()
  const [icon, setIcon] = useState(<MenuDown />)

  const [dateFilterStatus, setDateFilterStatus] = useState<string>('')
  // const [startDate, setStartDate] = useState<string>('')
  // const [endDate, setEndDate] = useState<string>('')
  // const [showDateFilterOptions, setShowDateFilterOptions] = useState<boolean>(false)
  // const [showCalendar, setShowCalendar] = useState<boolean>(false)
  const {
    setDateFilterActive,
    getRecipientCountByActivity,
    setFetch,
    showDateFilterOptions,
    setShowDateFilterOptions,
    setHello,
  } = useRecepientCountActivity((state) => state)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setFetch(true)
  }, [setFetch])
  // useEffect(() => {
  //   startDate && endDate && setDateFilterData({ startDate, endDate })
  // }, [startDate, endDate])

  // useEffect(() => {
  //   if (!dateFilterActive) {
  //     setDateFilterStatus('Past 24 hours')
  //     // setShowCalendar(false)
  //     setShowDateFilterOptions(false)
  //     // setStartDate('')
  //     // setEndDate('')
  //     // setDateFilterData(null)
  //   }
  // }, [dateFilterActive])

  // useEffect(() => {
  //   const handleClickOutside = (event: any) => {
  //     if (ref.current && !ref.current.contains(event.target)) {
  //       setShowDateFilterOptions(false)
  //     }
  //   }
  //   document.addEventListener('click', handleClickOutside, true)
  //   return () => {
  //     document.removeEventListener('click', handleClickOutside, true)
  //   }
  // }, [setShowDateFilterOptions])

  // const clearDate = () => {
  //   setStartDate('')
  //   setEndDate('')
  // }

  // const setDateRange = () => {
  //   if (id && startDate && endDate) {
  //     setDateFilterStatus(moment(startDate).format('ll') + '-' + moment(endDate).format('ll'))
  //     setResultType(ResultType)
  //     setDateFilterData({ startDate, endDate })
  //     getRecipientCountByActivity(+id, 0, startDate, endDate)
  //   }
  //   setShowCalendar(false)
  // }

  // const handleDateChange = (date: any) => {
  //   const d1 = new Date(date)
  //   const d2 = new Date(startDate)
  //   startDate && d1 > d2 ? setEndDate(moment(date).format('YYYY-MM-D')) : setStartDate(moment(date).format('YYYY-MM-D'))
  // }

  const onDateFilterSelect = (option: any) => {
    setDateFilterActive(true)
    setDateFilterStatus(option.title)
    setShowDateFilterOptions(false)
    // setShowCalendar(option.title === 'Custom range...')
    if (id) {
      // setStartDate(moment().subtract(option.value, 'd').format('YYYY-MM-D'))
      // setEndDate(moment().format('YYYY-MM-D'))
      // option.value === 1 ? setResultType(2) : option.value === 7 ? setResultType(0) : option.value ===  30 ? setResultType(1) : option.value === 180 ? setResultType(1) : option.value === 365 ? setResultType(1) : null //0 for Day Based, 1 for Month Based, 2 for Hour Based
      getRecipientCountByActivity(
        +id,
        option.ResultType,
        moment().subtract(option.value, 'd').format('D-MM-YYYY'),
        moment().format('D-MM-YYYY')
      )
    }
  }

  return (
    <>
      <div ref={ref} className="relative inline-block text-left h-[36px]">
        <button
          onClick={() => {
            setShowDateFilterOptions(!showDateFilterOptions)
            setIcon(<MenuUp />)

            // setShowCalendar(false)
          }}
          className="flex items-center border border-[#CFD8DC] text-[#455A64] text-[13px] focus-within:border-[#CFD8DC rounded-sm p-2"
        >
          <b className="mr-2">{dateFilterStatus ? dateFilterStatus : dateFilterDropDownOptions[0].title}</b>
          <div>{icon}</div>
        </button>

        {showDateFilterOptions && (
          <div className="absolute right-0 mt-5 w-[164px] origin-top-right bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
            <div className="px-1 py-1]">
              {dateFilterDropDownOptions.map((option, index) => (
                <div
                  key={index}
                  className={` flex items-center ' ${dateFilterStatus === option.title ? ' bg-[#E8F5E9]' : 'bg-white'}`}
                >
                  {dateFilterStatus === option.title && (
                    <div className="pl-2">
                      <CheckCircleIcon height={14} width={14} color="#4CAF4F" />
                    </div>
                  )}
                  <button
                    onClick={() => {
                      onDateFilterSelect(option)
                      setIcon(<MenuDown />)
                      setHello(1)
                    }}
                    className={`flex w-full items-center rounded-md px-2 py-2 text-sm ${
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
        {/* {showCalendar && (
          <div className="relative w-auto p-4 sm:left-0 sm:right-auto mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
            <div className="flex gap-3">
              <div className="h-[32px] min-w-[128px] p-1 flex items-center justify-between border border-[#CFD8DC] text-[#90A4AE] text-[13px] focus-within:border-[#455A64] focus-within:text-[#455A64]">
                <p>{startDate ? startDate.split(' ')[0] : 'Start Date'}</p>
                <CalendarMonth />
              </div>
              <div className="h-[32px] min-w-[128px] p-1 flex items-center justify-between border border-[#CFD8DC] text-[#90A4AE] text-[13px] focus-within:border-[#455A64] focus-within:text-[#455A64]">
                {endDate ? endDate.split(' ')[0] : 'End Date'}
                <CalendarMonth />
              </div>
            </div>
            <div className="px-1 py-1 ">
              <Calendar
                onChange={(value: any) => handleDateChange(value)}
                prev2Label=""
                next2Label=""
                className="p-2"
              />
            </div>
            <p className="text-[12px] text-[#90A4AE] mx-1">Current time {new Date().toTimeString()}</p>
            <div className="flex justify-end gap-3 p-2">
              <button
                onClick={clearDate}
                className="bg-[#FAFAFA] rounded-sm border border-[#CFD8DC] text-[#263238] text-[14px] font-semibold h-[32px] px-3"
              >
                Clear
              </button>
              <button
                onClick={() => setDateRange()}
                className="bg-[#4CAF4F] rounded-sm border border-[#4CAF4F] text-white text-[14px] font-semibold h-[32px] px-3"
              >
                Done
              </button>
            </div>
          </div>
        )} */}
      </div>
    </>
  )
}

export default ChartFilterWIthDate
