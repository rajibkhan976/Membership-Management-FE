import { CalendarIcon } from '@heroicons/react/outline'
import ContentCard from '@jg/common/comps/contents/contentCard/ContentCard'
import CountDownTimer from '@jg/common/comps/countDownTimer'
import '@jg/common/comps/countDownTimer/CountDownTimer.css'
import { Dropdown, DropdownItem } from '@comps/uiComps'
import { DateTimeInfo } from '@jg/common/types/common/DateTimeInfo'
import { EventInfo } from '@jg/common/types'
import { useEventConfig } from '@jg/widgets/Events/EventWidget'
import { SaveEventButton } from '../../eventListing/EventListing'
const shareItems = [
  { name: 'Google Calender', value: 'gc' },
  { name: 'Yahoo Calender', value: 'yc' },
  { name: 'iCal Calender', value: 'ic' },
  { name: 'Outlook Calender', value: 'oc' },
]
function BookingTimeLeft({
  endDateObj,
  addToCalender = (c) => {}, // console.log(c),
  calendarInviteEnabled,
  EventDetails,
}: {
  endDateObj?: DateTimeInfo
  addToCalender?: (calender: string) => void
  calendarInviteEnabled?: boolean
  EventDetails?: EventInfo
}) {
  const endDate = endDateObj ? `${endDateObj.date} ${endDateObj.time}` : ''

  const { isEvent, isPublic } = useEventConfig()

  if (!EventDetails) return <></>
  return (
    <ContentCard
      heading="Booking Ends"
      headingClass={`${
        isEvent != true ? 'text-[0px] h-0 text-transparent' : '!text-jg-metal-700  !text-globalTextSizeLg'
      }`}
      underlineClass={`${isEvent != true && 'jg-hidden'}`}
    >
      <div className="space-y-2 divide-y-2">
        {isEvent && <CountDownTimer endDate={endDate} />}

        {/* <CountDownTimer endDate={getFutureDate(10)} /> */}
        <div
          className={`${
            isEvent == true ? 'pt-3 flex justify-between items-center' : 'flex justify-between items-center '
          }`}
        >
          {/* <div className="flex items-center space-x-2 cursor-pointer text-green-1">
            <CalendarIcon className="w-5" />
            <span className="font-semibold text-sm">Add To Calender</span>
          </div> */}
          {calendarInviteEnabled === true && isEvent === true && (
            <Dropdown
              className="!flex"
              customButton={
                <div className="flex items-center space-x-2 cursor-pointer text-green-1">
                  <CalendarIcon className="w-5 h-5 text-jg-green-500" />
                  <span className="font-medium text-jg-green-500 text-globalTextSizeMd">Add To Calendar</span>
                </div>
              }
              onSelect={addToCalender}
            >
              {shareItems.map((item, i) => {
                return (
                  <DropdownItem
                    key={i}
                    groupName="ql"
                    value={item.value}
                    name={item.name}
                    icon={<CalendarIcon className="w-4 h-4 " />}
                  />
                )
              })}
            </Dropdown>
          )}
          <div
            className={
              isEvent
                ? 'inline-flex items-center space-x-4 !relative w-6 h-6 !justify-end '
                : 'w-full h-6 !relative flex justify-between'
            }
          >
            {/* <BookmarkIcon className="w-5 h-5" /> */}
            {!isPublic && (
              <SaveEventButton
                id={EventDetails.docId}
                isSaved={EventDetails.isSavedByUser}
                className={isEvent ? ' text-[20px] absolute right-0 bottom-0 hover:text-jg-red-800 ' : 'left-0'}
              />
            )}
            {!isEvent && (
              <div className="h-5 w-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 20 22" fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16 2C14.8954 2 14 2.89543 14 4C14 4.33286 14.0813 4.64673 14.2252 4.92283L14.3216 5.08812C14.6782 5.63699 15.2967 6 16 6C17.1046 6 18 5.10457 18 4C18 2.89543 17.1046 2 16 2ZM13.1581 6.81485C13.883 7.54668 14.8885 8 16 8C18.2091 8 20 6.20914 20 4C20 1.79086 18.2091 0 16 0C13.7909 0 12 1.79086 12 4C12 4.37702 12.0522 4.74185 12.1497 5.08768L6.84194 8.18515C6.11704 7.45332 5.11146 7 4 7C1.79086 7 0 8.79086 0 11C0 13.2091 1.79086 15 4 15C5.11167 15 6.11741 14.5465 6.84234 13.8144L12.1509 16.9079C12.0526 17.255 12 17.6214 12 18C12 20.2091 13.7909 22 16 22C18.2091 22 20 20.2091 20 18C20 15.7909 18.2091 14 16 14C14.8902 14 13.886 14.452 13.1613 15.1819L7.8505 12.0871C7.9479 11.7415 8 11.3768 8 11C8 10.623 7.94784 10.2581 7.85034 9.91232L13.1581 6.81485ZM5.67837 9.91188L5.77484 10.0772C5.91869 10.3533 6 10.6671 6 11C6 11.3324 5.91891 11.6459 5.77543 11.9217L5.67906 12.0871C5.32259 12.6365 4.70374 13 4 13C2.89543 13 2 12.1046 2 11C2 9.89543 2.89543 9 4 9C4.70329 9 5.3218 9.36301 5.67837 9.91188ZM14.1752 17.1802L14.3854 16.8195C14.7493 16.3227 15.337 16 16 16C17.1046 16 18 16.8954 18 18C18 19.1046 17.1046 20 16 20C14.8954 20 14 19.1046 14 18C14 17.7079 14.0626 17.4304 14.1752 17.1802Z"
                    fill="#263238"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
    </ContentCard>
  )
}

export default BookingTimeLeft

// const getFutureDate = (days: number) => {
//   const now = new Date()
//   return now.setDate(now.getDate() + days)
// }

// const goToGoogle = `https://calendar.google.com/calendar/u/0/r/eventedit?text=${evnet}&dates=${startdatetime}/${endDateTime}&details=${details}&location=${location}&sf=true`
