import { memo, useState, useEffect, useCallback, useMemo } from 'react'
import moment from 'moment'
import CalendarHeader from './CalendarHeader'
import MonthView from './MonthView'
import WeekView from './WeekView'
import DayView from './DayView'
import ListView from './ListView'
import YearView from './YearView'
import LoadingSpinner from '../loader/LoadingSpinner'
import { ViewBaseProps } from './ViewBaseProps'
import { CompBaseProps } from '@comps/uiComps'
import useCalendarStore from './store/useCalendarStore'
import classNames from 'classnames'

type CalendarProps = CompBaseProps &
  ViewBaseProps & {
    isLoading?: boolean
    startWeekFrom?: number | string
    eventsList?: any[]
    viewItems?: string[]
    viewMode?: string
    onSelectView?: (view: string) => void
  }

const Calendar = (props: CalendarProps) => {
  const {
    isLoading = false,
    startWeekFrom = 1,
    eventsList,
    viewItems = ['Day', 'Week', 'Month', 'Year', 'List'],
    viewMode,
    className,
    onItemDetailsClick,
    onItemClick,
    onItemOutSideClick,
    onShowMoreItemsClick,
    getItemCount,
    onSelectView,
    onClickMenuBarIcon,
  } = props

  const months = moment.months() //Months name array
  const [weekdays, setWeekdays] = useState<string[]>([...moment.weekdaysShort().slice(1), moment.weekdaysShort()[0]]) //Seven days name array

  const calendarDays = useCalendarStore((state) => state.calendarDays) //Monthly calendar days array used in the month view
  const changeMonth = useCalendarStore((state) => state.changeMonth) //Variable responsible for changing month in the month view
  const changeWeek = useCalendarStore((state) => state.changeWeek) //Variable responsible for changing week in the week view
  const currentMonth = useCalendarStore((state) => state.currentMonth) //Variable responsible for determining the current navigated month
  const day = useCalendarStore((state) => state.day) //State for maintaining the day view
  const firstDayOfMonth = useCalendarStore((state) => state.firstDayOfMonth)
  const selectedMonthStr = useCalendarStore((state) => state.selectedMonthStr)
  const selectedMonthAndYear = useCalendarStore((state) => state.selectedMonthAndYear)
  const selectedView = useCalendarStore((state) => state.selectedView)
  const weekDates = useCalendarStore((state) => state.weekDates)
  const year = useCalendarStore((state) => state.year)
  const setCalendarDays = useCalendarStore((state) => state.setCalendarDays)
  const setChangeMonth = useCalendarStore((state) => state.setChangeMonth)
  const setChangeWeek = useCalendarStore((state) => state.setChangeWeek)
  const setCurrentMonth = useCalendarStore((state) => state.setCurrentMonth)
  const setDay = useCalendarStore((state) => state.setDay)
  const setFirstDayOfMonth = useCalendarStore((state) => state.setFirstDayOfMonth)
  const setSelectedMonthStr = useCalendarStore((state) => state.setSelectedMonthStr)
  const setSelectedMonthAndYear = useCalendarStore((state) => state.setSelectedMonthAndYear)
  const setSelectedView = useCalendarStore((state) => state.setSelectedView)
  const setWeekDates = useCalendarStore((state) => state.setWeekDates)
  const setYear = useCalendarStore((state) => state.setYear)

  useEffect(() => {
    if (startWeekFrom === 0 || startWeekFrom === 'Sun' || startWeekFrom === 'Sunday') {
      setWeekdays(moment.weekdaysShort())
    } else if (startWeekFrom === 1 || startWeekFrom === 'Mon' || startWeekFrom === 'Monday') {
      setWeekdays([...moment.weekdaysShort().slice(1), moment.weekdaysShort()[0]])
    }
  }, [startWeekFrom])

  useEffect(() => {
    if (viewMode) {
      setSelectedView(viewMode)
    }
  }, [viewMode])

  const selectView = useCallback((item: string): void => {
    if (item) {
      onSelectView && onSelectView(item)
      setSelectedView(item)
    }
  }, [])

  const checkCurrentMonth = (date: string): boolean => {
    const month = new Date(date).getMonth()
    if (month === currentMonth) {
      return true
    }
    return false
  }

  const checkToday = useCallback((date: string | undefined): boolean => {
    const today = moment().format('YYYY-MM-DD')
    if (date && date === today) {
      return true
    }
    return false
  }, [])

  const checkWeekend = (date: string) => {
    const indexOfWeekDay = new Date(date).getDay()
    if (
      weekdays?.indexOf(weekdays[indexOfWeekDay]) === 5 &&
      (startWeekFrom === 0 || startWeekFrom === 'Sun' || startWeekFrom === 'Sunday')
    ) {
      return true
    } else if (weekdays?.indexOf(weekdays[indexOfWeekDay]) === 6) {
      return true
    } else if (
      weekdays?.indexOf(weekdays[indexOfWeekDay]) === 0 &&
      (startWeekFrom === 1 || startWeekFrom === 'Mon' || startWeekFrom === 'Monday')
    ) {
      return true
    }
    return false
  }

  const addEventsToDate = (date: string): any[] => {
    const eventsArr: any[] = []
    eventsList?.forEach((event) => {
      if (event.date === date) {
        eventsArr.push(event)
      }
    })
    return eventsArr
  }

  const setStartDateOfMonth = useMemo((): string => {
    let startDayOfMonth: string = moment().add(changeMonth, 'M').startOf('month').format('YYYY-MM-DD')

    if (Array.isArray(weekDates) && weekDates.length > 0) {
      startDayOfMonth = moment(weekDates[weekDates.length - 1].date)
        .add(changeMonth, 'M')
        .startOf('month')
        .format('YYYY-MM-DD')
    }

    if (+moment(startDayOfMonth).format('YYYY') !== year) {
      startDayOfMonth = moment().add(changeMonth, 'M').year(year).startOf('month').format('YYYY-MM-DD')
    }

    setFirstDayOfMonth(moment(startDayOfMonth).startOf('month').format('ddd'))
    // console.log(startDayOfMonth)
    return startDayOfMonth
  }, [changeMonth, currentMonth, weekdays, weekDates, year])

  const currentMonthsCalendarDays = useMemo((): any[] => {
    const calendarDaysArr: any[] = []
    let subtractBy = weekdays.indexOf(firstDayOfMonth)
    let addBy = 0
    const startDayOfMonth = setStartDateOfMonth
    for (let i = 0; i < 42; i++) {
      if (weekdays.indexOf(firstDayOfMonth) > 0 && subtractBy > 0) {
        const pastDate = moment(startDayOfMonth).subtract(subtractBy, 'd').format('YYYY-MM-DD')
        calendarDaysArr.push({
          date: pastDate,
          isCurrentMonth: false,
          isToday: false,
          isWeekend: checkWeekend(pastDate),
          events: addEventsToDate(pastDate),
        })
        --subtractBy
      } else {
        const futureDate = moment(startDayOfMonth).add(addBy, 'd').format('YYYY-MM-DD')
        calendarDaysArr.push({
          date: futureDate,
          isCurrentMonth: checkCurrentMonth(futureDate),
          isToday: checkToday(futureDate),
          isWeekend: checkWeekend(futureDate),
          events: addEventsToDate(futureDate),
        })
        ++addBy
      }
    }
    console.log(calendarDaysArr)
    return calendarDaysArr
  }, [changeMonth, currentMonth, firstDayOfMonth, eventsList, weekdays, weekDates, year])

  const setStartDateOfWeek = useMemo((): string => {
    let startDayOfWeek: string = moment()
      .add(changeWeek, 'w')
      .year(year)
      .startOf(startWeekFrom === 0 || startWeekFrom === 'Sun' || startWeekFrom === 'Sunday' ? 'week' : 'isoWeek')
      .format('YYYY-MM-DD')

    if (calendarDays && calendarDays.length > 0) {
      startDayOfWeek = moment(calendarDays[0].date)
        .add(changeWeek, 'w')
        .startOf(startWeekFrom === 0 || startWeekFrom === 'Sun' || startWeekFrom === 'Sunday' ? 'week' : 'isoWeek')
        .format('YYYY-MM-DD')
      for (let i = 0; i < calendarDays.length; i++) {
        if (!calendarDays[i].isToday) {
          continue
        }
        if (calendarDays[i].isToday) {
          startDayOfWeek = moment(calendarDays[i].date)
            .add(changeWeek, 'w')
            .startOf(startWeekFrom === 0 || startWeekFrom === 'Sun' || startWeekFrom === 'Sunday' ? 'week' : 'isoWeek')
            .format('YYYY-MM-DD')
          break
        }
      }
    }

    // console.log(startDayOfWeek)
    return startDayOfWeek
  }, [calendarDays, changeWeek, startWeekFrom, year])

  const currentWeeksCalendarDays = useMemo((): any[] => {
    const weekDaysArr: any[] = []
    let addBy = 0
    const startDayOfWeek = setStartDateOfWeek
    for (let i = 0; i < 7; i++) {
      const weekDate = moment(startDayOfWeek).add(addBy, 'd').format('YYYY-MM-DD')

      weekDaysArr.push({
        date: weekDate,
        isCurrentMonth: checkCurrentMonth(weekDate),
        isToday: checkToday(weekDate),
        events: addEventsToDate(weekDate),
      })
      ++addBy
    }
    // console.log(weekDaysArr)
    return weekDaysArr
  }, [calendarDays, changeWeek, eventsList, startWeekFrom, year])

  const addMonth = () => {
    setSelectedMonthStr(months[months.indexOf(selectedMonthStr) + 1])
    setCurrentMonth(currentMonth + 1)
    setChangeMonth(changeMonth + 1)
  }

  const addYear = () => {
    setSelectedMonthStr(months[0])
    setCurrentMonth(0)
    setYear(year + 1)
    setChangeMonth(changeMonth + 1)
  }

  const addDay = () => {
    if (
      moment(day).add(1, 'd').format('YYYY-MM-DD') === moment(day).add(1, 'd').startOf('month').format('YYYY-MM-DD')
    ) {
      setChangeMonth(changeMonth + 1)
    }
    setDay(moment(day).add(1, 'd').format('YYYY-MM-DD'))
  }

  const navNext = useCallback((): void => {
    // add month
    if (
      months &&
      months.length > 0 &&
      months.includes(selectedMonthStr) &&
      months.indexOf(selectedMonthStr) < months.length &&
      selectedView?.toLowerCase() === 'month'
    ) {
      addMonth()
    }
    // add year on month change
    if (
      months &&
      months.length > 0 &&
      months.includes(selectedMonthStr) &&
      months.length - months.indexOf(selectedMonthStr) === 1 &&
      selectedView?.toLowerCase() === 'month'
    ) {
      addYear()
    }
    // add year on year change
    if (selectedView?.toLowerCase() === 'year') {
      setYear(year + 1)
    }
    // add week
    if (selectedView?.toLowerCase() === 'week') {
      setChangeWeek(changeWeek + 1)
    }
    // add day
    if (selectedView?.toLowerCase() === 'day') {
      addDay()
    }
  }, [changeMonth, changeWeek, day, selectedMonthStr, selectedView, year])

  const subtractMonth = () => {
    setSelectedMonthStr(months[months.indexOf(selectedMonthStr) - 1])
    setCurrentMonth(currentMonth - 1)
    setChangeMonth(changeMonth - 1)
  }

  const subtractYear = () => {
    setSelectedMonthStr(months[months.length - 1])
    setCurrentMonth(months.length - 1)
    setYear(year - 1)
    setChangeMonth(changeMonth - 1)
  }

  const subtractDay = () => {
    if (
      moment(day).subtract(1, 'd').format('YYYY-MM-DD') ===
      moment(day).subtract(1, 'd').endOf('month').format('YYYY-MM-DD')
    ) {
      setChangeMonth(changeMonth - 1)
    }
    setDay(moment(day).subtract(1, 'd').format('YYYY-MM-DD'))
  }

  const navPrev = useCallback((): void => {
    // subtract month
    if (
      months &&
      months.length > 0 &&
      months.includes(selectedMonthStr) &&
      months.indexOf(selectedMonthStr) > 0 &&
      selectedView?.toLowerCase() === 'month'
    ) {
      subtractMonth()
    }
    // subtract year on month change
    if (
      months &&
      months.length > 0 &&
      months.includes(selectedMonthStr) &&
      months.indexOf(selectedMonthStr) === 0 &&
      selectedView?.toLowerCase() === 'month'
    ) {
      subtractYear()
    }
    // subtract year on year change
    if (selectedView?.toLowerCase() === 'year') {
      setYear(year - 1)
    }
    // subtract week
    if (selectedView?.toLowerCase() === 'week') {
      setChangeWeek(changeWeek - 1)
    }
    // subtract day
    if (selectedView?.toLowerCase() === 'day') {
      subtractDay()
    }
  }, [changeMonth, changeWeek, day, selectedMonthStr, selectedView, year])

  useEffect(() => {
    if (selectedView?.toLowerCase() === 'week' && weekDates.length === 0) {
      setWeekDates(currentWeeksCalendarDays)
    }
  }, [eventsList, selectedView, weekDates])

  useEffect(() => {
    if (selectedView?.toLowerCase() === 'week') {
      setWeekDates(currentWeeksCalendarDays)
    }
  }, [changeWeek, eventsList, selectedView, startWeekFrom])

  useEffect(() => {
    if (selectedView?.toLowerCase() === 'week' && calendarDays && calendarDays.length > 0) {
      setWeekDates(currentWeeksCalendarDays)
      setChangeMonth(0)
    }
  }, [calendarDays, changeMonth, selectedView])

  useEffect(() => {
    if (selectedView?.toLowerCase() === 'week' && weekDates && weekDates.length > 0) {
      setCurrentMonth(parseInt(moment(weekDates[weekDates.length - 1].date).format('M')) - 1)
      setFirstDayOfMonth(
        moment(weekDates[weekDates.length - 1].date)
          .startOf('month')
          .format('ddd')
      )
      setSelectedMonthStr(moment(weekDates[weekDates.length - 1].date).format('MMMM'))
      setYear(parseInt(moment(weekDates[weekDates.length - 1].date).format('YYYY')))
    }
  }, [changeWeek, selectedView, weekDates])

  useEffect(() => {
    if (selectedView?.toLowerCase() === 'week' && weekDates && weekDates.length > 0) {
      let monthAndYearStr = ''
      const weeksStartMonth = moment(weekDates[0].date).format('MMMM')
      const weeksEndMonth = moment(weekDates[weekDates.length - 1].date).format('MMMM')
      const weeksStartYear = moment(weekDates[0].date).format('YYYY')
      const weeksEndYear = moment(weekDates[weekDates.length - 1].date).format('YYYY')
      if (weeksStartMonth !== weeksEndMonth && weeksStartYear !== weeksEndYear) {
        monthAndYearStr = `${weeksStartMonth} ${weeksStartYear} - ${weeksEndMonth} ${weeksEndYear}`
      } else if (weeksStartMonth !== weeksEndMonth && weeksStartYear === weeksEndYear) {
        monthAndYearStr = `${weeksStartMonth} - ${weeksEndMonth} ${weeksStartYear}`
      } else if (weeksStartMonth === weeksEndMonth && weeksStartYear === weeksEndYear) {
        monthAndYearStr = `${weeksStartMonth} ${weeksStartYear}`
      }
      setSelectedMonthAndYear(monthAndYearStr)
    }
  }, [selectedView, weekDates])

  useEffect(() => {
    if (selectedView && calendarDays.length === 0) {
      setCalendarDays(currentMonthsCalendarDays)
    }
  }, [selectedView])

  useEffect(() => {
    if (selectedView?.toLowerCase() !== 'week') {
      setCalendarDays(currentMonthsCalendarDays)
    }
  }, [changeMonth, currentMonth, firstDayOfMonth, eventsList, selectedView, weekdays])

  useEffect(() => {
    if (selectedView?.toLowerCase() !== 'week' && weekDates && weekDates.length > 0) {
      setCalendarDays(currentMonthsCalendarDays)
      setChangeWeek(0)
    }
  }, [changeWeek, currentMonth, firstDayOfMonth, eventsList, selectedView, weekdays, weekDates])

  useEffect(() => {
    if (selectedView?.toLowerCase() === 'month' && Array.isArray(calendarDays) && calendarDays.length > 0 && year) {
      let monthAndYearStr = ''
      monthAndYearStr = `${moment(calendarDays[calendarDays.length / 2].date).format('MMMM')} ${year.toString()}`
      setSelectedMonthStr(moment(calendarDays[calendarDays.length / 2].date).format('MMMM'))
      setCurrentMonth(months.indexOf(moment(calendarDays[calendarDays.length / 2].date).format('MMMM')))
      setSelectedMonthAndYear(monthAndYearStr)
    }
  }, [calendarDays, selectedView, year])

  useEffect(() => {
    if (selectedView?.toLowerCase() !== 'day' && Array.isArray(calendarDays) && calendarDays.length !== 0) {
      moment().month() === moment(calendarDays[calendarDays.length / 2].date).month() &&
      moment().year() === moment(calendarDays[calendarDays.length / 2].date).year()
        ? setDay(moment().format('YYYY-MM-DD'))
        : setDay(
            moment(calendarDays[calendarDays.length / 2].date)
              .startOf('month')
              .format('YYYY-MM-DD')
          )
    }
  }, [calendarDays, selectedView])

  useEffect(() => {
    if (selectedView?.toLowerCase() === 'day' && day) {
      let dayMonthYearStr = ''
      dayMonthYearStr = `${moment(day).format('MMMM')} ${moment(day).format('DD')}, ${moment(day).format('YYYY')}`
      moment(day).year() !== year && setYear(moment(day).year())
      setSelectedMonthAndYear(dayMonthYearStr)
    }
  }, [day, selectedView])

  useEffect(() => {
    if (selectedView?.toLowerCase() === 'year' && year) {
      setSelectedMonthAndYear(year.toString())
    }
  }, [selectedView, year])

  const renderSelectedView = () => {
    if (selectedView?.toLowerCase() === 'month') {
      return (
        <MonthView
          weekdays={weekdays}
          calendarDays={calendarDays}
          selectedMonth={selectedMonthStr}
          onItemClick={onItemClick}
          onItemOutSideClick={onItemOutSideClick}
          onItemDetailsClick={onItemDetailsClick}
          onShowMoreItemsClick={onShowMoreItemsClick}
          getItemCount={getItemCount}
        />
      )
    }
    if (selectedView?.toLowerCase() === 'week') {
      return (
        <WeekView
          weekdays={weekdays}
          weekDates={weekDates}
          onItemClick={onItemClick}
          onItemOutSideClick={onItemOutSideClick}
          onItemDetailsClick={onItemDetailsClick}
          onShowMoreItemsClick={onShowMoreItemsClick}
          getItemCount={getItemCount}
        />
      )
    }
    if (selectedView?.toLowerCase() === 'list') {
      return (
        <ListView
          events={eventsList}
          onItemClick={onItemClick}
          onItemOutSideClick={onItemOutSideClick}
          getItemCount={getItemCount}
        />
      )
    }
    if (selectedView?.toLowerCase() === 'year') {
      return (
        <YearView
          year={year}
          events={eventsList}
          onItemClick={onItemClick}
          onItemOutSideClick={onItemOutSideClick}
          getItemCount={getItemCount}
        />
      )
    }
    if (selectedView?.toLowerCase() === 'day') {
      return (
        <DayView
          day={day}
          events={eventsList}
          onItemClick={onItemClick}
          onItemOutSideClick={onItemOutSideClick}
          onItemDetailsClick={onItemDetailsClick}
          onShowMoreItemsClick={onShowMoreItemsClick}
          getItemCount={getItemCount}
        />
      )
    }
  }

  useEffect(() => {
    if (onItemOutSideClick) {
      document.body.addEventListener('click', onItemOutSideClick)
    }
    return () => {
      if (onItemOutSideClick) document.body.removeEventListener('click', onItemOutSideClick)
    }
  }, [onItemOutSideClick])

  const handleTodayBtnClick = useCallback(() => {
    switch (selectedView) {
      case 'Day':
        setDay(moment().format('YYYY-MM-DD'))
        break
      case 'Week':
        setChangeWeek(0)
        setYear(moment().year())
        break
      case 'Month':
        setChangeMonth(0)
        setYear(moment().year())
        break
      case 'Year':
        setYear(moment().year())
        break
    }
  }, [selectedView])

  return (
    <div className={classNames('w-full h-full flex flex-col', className)}>
      <CalendarHeader
        selectedOption={selectedMonthAndYear}
        navNext={navNext}
        navPrev={navPrev}
        items={viewItems}
        selectedItem={selectedView}
        selectItem={selectView}
        onClickMenuBarIcon={onClickMenuBarIcon}
        onTodayBtnClick={() => handleTodayBtnClick()}
      />
      {renderSelectedView()}
      <LoadingSpinner show={isLoading} message={'Please wait. Loading...'} showCrossBtn={false} />
    </div>
  )
}

export default memo(Calendar)
