import { useEventSettingsContext } from '@jg/widgets/Events/providers/EventSettingsProvider'
import { DateTimeInfoProps } from './DateTimeInfoProps'
import { getDateInString } from '@jg/common/dataAPIs/_helpers/populateDateTime'
const formater = [{ day: 'numeric' }, { month: 'short' }, { year: 'numeric' }]
function DateTimeInfo({ dateTimeInfo, className }: DateTimeInfoProps) {
  const { systemSettings } = useEventSettingsContext() // epic mistake by Rahim shaheb
  const { time, date, timezone, hideDateTime, alternateMessageForDate } = dateTimeInfo || {}

  const [parsedDay, parsedDate] = new Date(dateTimeInfo ? date || '' + time || '' : '').toDateString().split(' ')
  const formatedTime = systemSettings['EVENT.TIME_FORMAT'].includes('24')
    ? time?.slice(0, 5)
    : formatTo12Hour(time?.slice(0, 5) || '00:00:00')

  let DateString = ''
  //yet another epic mistake by Rahim shaheb
  if (hideDateTime && alternateMessageForDate) {
    DateString = alternateMessageForDate
  }

  if (hideDateTime) {
    return <span className={className}>{DateString}</span>
  }

  return (
    <span className={className}>
      {parsedDay} &middot;
      {date ? getDateInString(new Date(date), formater, ' ') : ''} &middot;
      {` ${formatedTime} ${timezone}`}
    </span>
  )
}

export default DateTimeInfo

function formatTo12Hour(timeString: string) {
  const [hourString, minute] = timeString.split(':')
  const hour = +hourString % 24
  return (hour % 12 || 12) + ':' + minute + ' ' + (hour < 12 ? 'AM' : 'PM')
}
