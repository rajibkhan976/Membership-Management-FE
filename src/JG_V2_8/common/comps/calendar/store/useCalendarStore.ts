import create from 'zustand'
import moment from 'moment'

export type CalendarDays = {
  date: string
  isCurrentMonth: boolean
  isToday: boolean
  events: any[]
}

export interface CalendarStoreInterface {
  selectedView: string
  setSelectedView: (view: string) => void
  currentMonth: number
  setCurrentMonth: (monthNo: number) => void
  changeMonth: number
  setChangeMonth: (counter: number) => void
  changeWeek: number
  setChangeWeek: (counter: number) => void
  day: string
  setDay: (day: string) => void
  firstDayOfMonth: string
  setFirstDayOfMonth: (firstDayOfMonth: string) => void
  year: number
  setYear: (year: number) => void
  calendarDays: CalendarDays[]
  setCalendarDays: (calendarDays: CalendarDays[]) => void
  selectedMonthStr: string
  setSelectedMonthStr: (value: string) => void
  selectedMonthAndYear: string
  setSelectedMonthAndYear: (value: string) => void
  weekDates: CalendarDays[]
  setWeekDates: (weekDays: CalendarDays[]) => void
}

const useCalendarStore = create<CalendarStoreInterface>((set, get) => ({
  selectedView: '',
  setSelectedView: (view) => set({ selectedView: view }),
  currentMonth: moment().month(),
  setCurrentMonth: (monthNo) => set({ currentMonth: monthNo }),
  changeMonth: 0,
  setChangeMonth: (counter) => set({ changeMonth: counter }),
  changeWeek: 0,
  setChangeWeek: (counter) => set({ changeWeek: counter }),
  day: moment().format('YYYY-MM-DD'),
  setDay: (day) => set({ day: day }),
  firstDayOfMonth: moment().add(get()?.changeMonth, 'M').startOf('month').format('ddd'),
  setFirstDayOfMonth: (firstDayOfMonth) => set({ firstDayOfMonth: firstDayOfMonth }),
  year: moment().year(),
  setYear: (year) => set({ year: year }),
  calendarDays: [],
  setCalendarDays: (calendarDays) => set({ calendarDays: calendarDays }),
  selectedMonthStr: moment.months()[get()?.currentMonth],
  setSelectedMonthStr: (value) => set({ selectedMonthStr: value }),
  selectedMonthAndYear: '',
  setSelectedMonthAndYear: (value) => set({ selectedMonthAndYear: value }),
  weekDates: [],
  setWeekDates: (weekDays) => set({ weekDates: weekDays }),
}))

export default useCalendarStore
