import { dateTimeInfo } from '@jg/common/types'

export function getDateInString(t: any, a: any, s: any) {
  function format(m: any) {
    const f = new Intl.DateTimeFormat('en', m)
    let isNumber = false
    for (const i in m) {
      if (i != 'year' && m[i] === 'numeric') isNumber = true
    }
    let res = f.format(t)

    if (isNumber) {
      res = ('0' + res).slice(-2)
    }
    return res
  }
  return a.map(format).join(s)
}

const formater = [{ year: 'numeric' }, { month: 'numeric' }, { day: 'numeric' }]

export default ({ Date, Time, TimeZone, TimeZoneId, hideDateTime, alternateMessageForDate }: any): dateTimeInfo => {
  return {
    date: Date ? getDateInString(Date, formater, '-') : '',
    time: Time,
    timezone: TimeZone,
    timezoneId: TimeZoneId,
    hideDateTime,
    alternateMessageForDate,
  }
}
