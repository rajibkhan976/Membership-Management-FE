import moment from 'moment'

const SchedulerSuggestion = ({ scheduleTimeHandler, handleSubmit, setSelected, selected }: any) => {
  return (
    <>
      <div className="flex-col rounded w-full">
        <div
          className={`py-2 w-full cursor-pointer ${selected === 1 ? 'bg-jg-green-50' : 'bg-white'}`}
          onClick={() => {
            setSelected(1)
            scheduleTimeHandler &&
              scheduleTimeHandler('ScheduledTime', moment().startOf('day').add(33, 'hours').format().split('+')[0])
            // handleSubmit && handleSubmit(EmailStatus.SCHEDULE)
          }}
        >
          <div className="text-[14px] text-jg-metal-500 font-medium">Tomorow Morning</div>
          <div className="text-[13px] text-jg-metal-300 font-normal">
            {moment().startOf('day').add(33, 'hours').format('MMM Do, h:mm a')}
          </div>
        </div>
        <div
          className={`py-2 w-full cursor-pointer ${selected === 2 ? 'bg-jg-green-50' : 'bg-white'}`}
          onClick={() => {
            setSelected(2)
            scheduleTimeHandler &&
              scheduleTimeHandler('ScheduledTime', moment().startOf('day').add(42, 'hours').format().split('+')[0])
            // handleSubmit && handleSubmit(EmailStatus.SCHEDULE)
          }}
        >
          <div className="text-[14px] text-jg-metal-500 font-medium">Tomorow evening</div>
          <div className="text-[13px] text-jg-metal-300 font-normal">
            {moment().startOf('day').add(42, 'hours').format('MMM Do, h:mm a')}
          </div>
        </div>
        <div
          className={`py-2 w-full cursor-pointer ${selected === 3 ? 'bg-jg-green-50' : 'bg-white'}`}
          onClick={() => {
            setSelected(3)
            scheduleTimeHandler &&
              scheduleTimeHandler('ScheduledTime', moment().startOf('day').add(57, 'hours').format().split('+')[0])
            // handleSubmit && handleSubmit(EmailStatus.SCHEDULE)
          }}
        >
          <div className="text-[14px] text-jg-metal-500 font-medium">
            {moment().add(2, 'days').format('dddd')} Morning
          </div>
          <div className="text-[13px] text-jg-metal-300 font-normal">
            {moment().startOf('day').add(57, 'hours').format('MMM Do, h:mm a')}
          </div>
        </div>
        <div
          className={`py-2 w-full cursor-pointer ${selected === 4 ? 'bg-jg-green-50' : 'bg-white'}`}
          onClick={() => {
            setSelected(4)
            scheduleTimeHandler('ScheduledTime', moment().endOf('month').add(9, 'hours').format().split('+')[0])
            // handleSubmit && handleSubmit(EmailStatus.SCHEDULE)
          }}
        >
          <div className="text-[14px] text-jg-metal-500 font-medium">Beginning of next month</div>
          <div className="text-[13px] text-jg-metal-300 font-normal">
            {moment().add(1, 'months').startOf('month').add(9, 'hours').format('MMM Do, h:mm a')}
          </div>
        </div>
      </div>
    </>
  )
}

export default SchedulerSuggestion
