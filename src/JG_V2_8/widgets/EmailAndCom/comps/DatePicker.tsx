import { FormikControl } from '@comps/uiComps/formControls/FormikControl'
import { EmailStatus } from '@comps/uiComps/EmailList/status.enum'
import { Button } from '@comps/uiComps'
import type { SchedulerSuggestionProps } from '@comps/uiComps/Dialog/Type'

const DatePicker = ({ dateTime, scheduleTimeHandler, handleSubmit, setOpen }: SchedulerSuggestionProps) => {
  return (
    <div className="p-4">
      <FormikControl
        control="datetime"
        name="datePicker"
        value={dateTime ? dateTime : ''}
        label=""
        id=""
        handleChange={(e: any) => {
          scheduleTimeHandler && scheduleTimeHandler(e.target.value)
        }}
        className="md:w-[90%]"
      />
      <div className="flex justify-end pt-4 gap-[10px]">
        <Button
          btnColor="primary"
          btnSize="md"
          fillType="solid"
          iconPosition="left"
          text="Schedule Send"
          onClick={() => {
            handleSubmit && handleSubmit(EmailStatus.SCHEDULE)
          }}
        />
        <Button
          btnColor="primary"
          btnSize="md"
          fillType="outline"
          iconPosition="left"
          text="Cancel"
          onClick={() => {
            scheduleTimeHandler && scheduleTimeHandler(null)
            setOpen && setOpen(false)
          }}
        />
      </div>
    </div>
  )
}

export default DatePicker
