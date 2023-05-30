import { useState, useEffect, useRef } from 'react'
import CommonPlaceholder from '../loader/placeholders/CommonPlaceholder'
import FlipUnitContainer from './FlipUnitContainer'

export type CountDownTimerProps = {
  endDate?: string | number // 2022-06-21
  endTime?: string
}

export default function CountDownTimer({ endDate = 0, endTime = '' }: CountDownTimerProps) {
  // Define all State
  const [days, setDays] = useState<number>()
  const [daysShuffle, setDaysShuffle] = useState<boolean>(true)
  const [hours, setHours] = useState<number>()
  const [hoursShuffle, setHoursShuffle] = useState<boolean>(true)
  const [minutes, setMinutes] = useState<number>()
  const [minutesShuffle, setMinutesShuffle] = useState<boolean>(true)
  const [seconds, setSeconds] = useState<number>()
  const [secondsShuffle, setSecondsShuffle] = useState<boolean>(false)

  // Define all State ref for get current value and clear purposes
  const daysRef = useRef(days)
  const hoursRef = useRef(hours)
  const minutesRef = useRef(minutes)
  const secondsRef = useRef(seconds)

  const endDateRef = useRef<number>()

  const interval = useRef<NodeJS.Timer>()

  const startTimer = () => {
    if (!endDateRef.current) return

    const now = new Date().getTime()
    const distance = endDateRef.current - now
    // const distance = countDistance - now;

    const timerDays = Math.floor(distance / (24 * 60 * 60 * 1000))
    const timerHours = Math.floor((distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60))
    const timerMinutes = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60))
    const timerSeconds = Math.floor((distance % (60 * 1000)) / 1000)

    if (distance > 0) {
      // on day chanage, update day and shuffle state
      if (daysRef.current !== timerDays) {
        setDays(timerDays)
        setDaysShuffle((daysShuffle) => !daysShuffle)
      }

      // on hour chanage, update hours and shuffle state
      if (hoursRef.current !== timerHours) {
        setHours(timerHours)
        setHoursShuffle((hoursShuffle) => !hoursShuffle)
      }

      // on minute chanage, update minutes and shuffle state
      if (minutesRef.current !== timerMinutes) {
        setMinutes(timerMinutes)
        setMinutesShuffle((minutesShuffle) => !minutesShuffle)
      }

      // on second chanage, update seconds and shuffle state
      if (secondsRef.current !== timerSeconds) {
        setSeconds(timerSeconds)
        setSecondsShuffle((secondsShuffle) => !secondsShuffle)
      }
    } else {
      setDays(0)
      setHours(0)
      setMinutes(0)
      setSeconds(0)
      clearInterval(interval.current as unknown as number)
    }
  }

  useEffect(() => {
    interval.current = setInterval(startTimer, 1000)
    return () => clearInterval(interval.current)
  }, [])

  useEffect(() => {
    daysRef.current = days
    hoursRef.current = hours
    minutesRef.current = minutes
    secondsRef.current = seconds
  }, [days, hours, minutes, seconds])

  useEffect(() => {
    endDateRef.current = new Date(endDate).getTime()
    clearInterval(interval.current)
    interval.current = setInterval(startTimer, 1000)

    // return () => clearInterval(interval.current)
  }, [endDate])

  return Number.isInteger(seconds) ? (
    <div className="CountDownTimer">
      <FlipUnitContainer unit="days" digit={days} shuffle={daysShuffle} />
      <FlipUnitContainer unit="hours" digit={hours} shuffle={hoursShuffle} />
      <FlipUnitContainer unit="minutes" digit={minutes} shuffle={minutesShuffle} />
      <FlipUnitContainer unit="seconds" digit={seconds} shuffle={secondsShuffle} />
    </div>
  ) : (
    <CommonPlaceholder />
  )
}
