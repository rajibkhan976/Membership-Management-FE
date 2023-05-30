import JGDialog from '@comps/uiComps/Dialog/Dialog'
import { useState } from 'react'
import DatePicker from './DatePicker'
import { CalendarMonth } from '@comps/uiComps/Icons'
import type { SchedulerSuggestionProps } from '@comps/uiComps/Dialog/Type'

const SchedulerFooter = ({ dateTime, scheduleTimeHandler, handleSubmit, setOpen }: SchedulerSuggestionProps) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false)
  return (
    <div className="flex justify-start gap-[10px] px-4 cursor-pointer hover:bg-jg-grey-100">
      <CalendarMonth />
      <p onClick={() => setIsDatePickerOpen(true)}>Pick date and time</p>
      <JGDialog
        open={isDatePickerOpen}
        setOpen={setIsDatePickerOpen}
        title="Pick date and time"
        description={new Date().toString().split('(')[1].split(')')[0]}
        body={
          <DatePicker
            dateTime={dateTime}
            scheduleTimeHandler={scheduleTimeHandler}
            handleSubmit={handleSubmit}
            setOpen={setOpen}
          />
        }
      />
    </div>
  )
}

export default SchedulerFooter
