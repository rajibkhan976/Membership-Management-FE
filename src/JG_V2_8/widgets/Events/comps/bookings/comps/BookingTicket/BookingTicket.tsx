import { Button, CompBaseProps, H3 } from '@comps/uiComps'
import Avatars, { StackedAvatars } from '@comps/uiComps/Avatars'
import { Pen, Plus, TrashCan } from '@comps/uiComps/Icons'

export type BookingTicketProps = {
  title?: string
  details?: string
  price?: number
  ticketsCount?: number
  member?: { img?: string; name?: string; email?: string }[]
}

const BookingTicket = ({ title, details, price, ticketsCount, member }: BookingTicketProps) => {
  // const countMember = member?.length
  // let count = 0
  // const mm = ({ member }: BookingTicketProps) => {
  //   if (member) {
  //     if (member.length < 10) {
  //       member.map((item, index) => <Avatars key={index} src={item.img} size={'xs'} />)
  //     }
  //     count++
  //     console.log('count', count)
  //     console.log('minus:', member?.length - count)
  //   }
  // }
  return (
    <div className="ticket-wrapper flex flex-col py-3 px-4 bg-jg-grey-50 rounded border-jg-grey-50">
      <div className="flex flex-row justify-between">
        <div className="space-y-1">
          <div className="text-globalTextSizeMd text-jg-metal-900 font-medium">{title}</div>
          <div className="text-globalTextSizeSm text-jg-metal-500 font-normal">{details}</div>
        </div>
        <div className="flex flex-nowrap flex-row">
          <div className="space-y-1 justify-end">
            <div className="font-semibold text-globalTextSizeMd text-jg-metal-900 text-right">
              ${Number(price).toFixed(2)}
            </div>
            {ticketsCount && ticketsCount > 1 ? (
              <div className="text-xs text-jg-grey-700 text-right">Booking {ticketsCount} Tickets</div>
            ) : ticketsCount == 1 ? (
              <div className="text-xs text-jg-grey-700 text-right">Booking {ticketsCount} Ticket</div>
            ) : (
              <div className="text-xs text-jg-red-600">All Tickets Sold Out</div>
            )}
          </div>
          {member && member?.length < 1 ? (
            <Button
              text="Add Member"
              onClick={() => {}}
              fillType={'plain'}
              icon={<Plus />}
              className="hover:bg-transparent ml-1 bg-transparent"
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      {member && member.length !== 0 ? (
        <div className="flex flex-row justify-between items-center  mt-2">
          <div className="flex gap-x-2">
            <StackedAvatars size="xs" negativeSpace={2} numOfAvatar={11}>
              {member?.map((item, index) => (
                <Avatars key={index} src={item.img} size={'xs'} bordered={false} />
              ))}
            </StackedAvatars>
            {member.length > 11 ? (
              <div className="bg-jg-grey-50 border-jg-metal-100 text-jg-metal-500 border rounded-[100px] px-2 py-1 text-globalTextSizeSm font-medium">
                +{member.length - 11} More
              </div>
            ) : (
              <></>
            )}
          </div>
          <div>
            <Button
              text="Change Member"
              onClick={() => {}}
              fillType={'plain'}
              btnColor={'info'}
              icon={<Pen />}
              className="hover:bg-transparent ml-1 bg-transparent text-inputSizeMd font-medium p-0"
            />
            <Button
              text="Remove"
              onClick={() => {}}
              fillType={'plain'}
              btnColor={'error'}
              icon={<TrashCan />}
              className="hover:bg-transparent ml-2 bg-transparent text-inputSizeMd font-medium p-0 "
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}
export default BookingTicket
