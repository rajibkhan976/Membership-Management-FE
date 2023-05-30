import { Checkbox } from '@comps/uiComps/forms'
import QtyPicker from '@comps/uiComps/forms/QtyPicker/QtyPicker'
import { Check } from '@comps/uiComps/Icons'

export type TicketProps = {
  title: string
  description?: string
  price?: number
  quantity?: number
}
const Ticket = ({ title, description, price, quantity }: TicketProps) => {
  return (
    <div className="">
      <Checkbox className="" />
      <div className="flex justify-between">
        <div className="">
          <div className="text-globalTextSizeMd font-medium text-jg-metal-500">{title}</div>
          <div className="text-globalTextSizeSm text-jg-metal-500">{description}</div>
          <div className="text-jg-metal-700 text-globalTextSizeMd font-semibold">{price}</div>
        </div>
        <div>
          <QtyPicker hideLabel onChange={() => {}} value={0} />
          <div>{quantity}</div>
        </div>
      </div>
    </div>
  )
}
export default Ticket
