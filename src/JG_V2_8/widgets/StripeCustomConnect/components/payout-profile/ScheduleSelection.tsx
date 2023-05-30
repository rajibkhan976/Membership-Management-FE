import { SimpleSelect } from '@comps/uiComps'
import { useEffect, useState } from 'react'

type ScheduleSelectionProps = {
  interval: 'daily' | 'monthly' | 'weekly'
  monthly_anchor?: number
  weekly_anchor?: string
  handleScheduleSelect: (interval: 'daily' | 'monthly' | 'weekly', anchor?: string) => void
}

const ScheduleSelection = ({
  interval,
  monthly_anchor,
  weekly_anchor,
  handleScheduleSelect,
}: ScheduleSelectionProps) => {
  const [paymentSchedule, setPaymentSchedule] = useState<'daily' | 'monthly' | 'weekly'>('daily')

  const secondDateSelection =
    paymentSchedule === 'monthly'
      ? Array(31)
          .fill(0)
          .map((_, i) => ({ name: i + 1 + '', value: i + 1 + '' }))
      : DAYS

  const updateSchedule = (interval: 'daily' | 'monthly' | 'weekly', anchor?: string) => {
    if (!anchor) setPaymentSchedule(interval)

    if (interval === 'daily') {
      // `daily` selected. Directly post to server
      return handleScheduleSelect(interval)
    }

    if (['weekly', 'monthly'].includes(interval) && !anchor) {
      // There is 2nd option left unselect. wait for it to select
      return setPaymentSchedule(interval)
    }
    // weekly or monthly selected along with the second option. Post to server
    return handleScheduleSelect(interval, anchor)
  }

  useEffect(() => {
    interval && setPaymentSchedule(interval)
  }, [interval])

  return (
    <div className="  flex gap-4">
      <SimpleSelect
        items={[
          // { name: 'Daily', value: 'daily' },
          { name: 'Weekly', value: 'weekly' },
          { name: 'Monthly', value: 'monthly' },
        ]}
        className="w-max"
        hideLabel
        onSelect={(props) => updateSchedule(props.value)}
        value={paymentSchedule}
      />

      {paymentSchedule !== 'daily' && (
        <SimpleSelect
          placeholder={`Select ${paymentSchedule.slice(0, -2)}`}
          className="w-max border-jg-grey-50"
          items={secondDateSelection.map(({ name, value }) => ({ name, value }))}
          hideLabel
          onSelect={(props) => updateSchedule(paymentSchedule, props.value)}
          value={interval === 'monthly' ? monthly_anchor : weekly_anchor}
        />
      )}
    </div>
  )
}

export default ScheduleSelection

const DAYS = [
  { name: 'Sat', value: 'saturday' },
  { name: 'Sun', value: 'sunday' },
  { name: 'Mon', value: 'monday' },
  { name: 'Tue', value: 'tuesday' },
  { name: 'Wed', value: 'wednesday' },
  { name: 'Thr', value: 'thursday' },
  { name: 'Fri', value: 'friday' },
]
