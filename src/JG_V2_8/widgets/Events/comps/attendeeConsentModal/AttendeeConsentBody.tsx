import AttendeeConsentList from './AttendeeConsentList'

const AttendeeConsentBody = () => {
  return (
    <>
      <p className="py-4 mb-1 px-4 max-w-[900px] text-globalTextSizeSm text-jg-metal-500 font-normal border bottom-1 border-jg-grey-200">
        This organiser likes to publish name and town/city of people who have booked on this event. No further
        information will be visible. If you do not wish for your details to appear, please turn off this option.
      </p>
      <AttendeeConsentList />
    </>
  )
}

export default AttendeeConsentBody
