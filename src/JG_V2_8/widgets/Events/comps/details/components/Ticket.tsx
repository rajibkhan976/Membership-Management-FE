import QtyPicker from '@comps/uiComps/forms/QtyPicker/QtyPicker'
import DateTimeInfo from '@jg/common/comps/labels/DateTimeInfo/DateTimeInfo'
import { dateTimeInfo } from '@jg/common/types'
import { useShoppingCartContext } from '@jg/providers/ShoppingCartProvider'
import { Currency } from '@jg/utils'
import { useEventConfig } from '@jg/widgets/Events/EventWidget'
import { useState } from 'react'

type TicketPorps = {
  name?: string
  subTitle?: string
  endsIn?: dateTimeInfo
  quantity?: number
  price?: number
  currency?: string
  min?: number
  max?: number
  docId: number
}
function Ticket(props: TicketPorps) {
  const { docId, name, currency, endsIn, max, min, price, quantity, subTitle } = props
  const { addItem } = useShoppingCartContext()
  const { isEvent } = useEventConfig()
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between pt-4 ">
      <div className="space-y-2 mb-4 sm:mb-0">
        <h5 className="text-jg-metal-900 text-[14px] leading-4 font-medium">{name}</h5>
        <p className="text-jg-metal-500 text-[13px] leading-4 font-normal">{subTitle}</p>
        {endsIn?.date && isEvent === true && (
          <small className="text-jg-metal-200">
            Sale Ends
            <DateTimeInfo dateTimeInfo={endsIn} className="text-jg-metal-200" />
          </small>
        )}
      </div>

      <div className="flex items-center gap-3 justify-between">
        <div className="sm:text-right">
          <p className="text-jg-green-900 sm:text-jg-green-500 text-[14px] leading-4 font-semibold">
            {currency}
            {price}
          </p>
          <small className="text-jg-metal-300 text-xs font-normal">{quantity || 'No'} Tickets Available</small>
        </div>
        <QtyPicker
          hideLabel
          onChange={() => {}}
          value={0}
          fieldsize="md"
          className="mb-0"
          onValueChange={(e) => {
            addItem({
              ProductId: docId,
              Quantity: Number(e),
              InCart: true,
              ForEntityType: 'Member',
              ForEntityId: 87571,
              Name: name || '',
              Description: subTitle || '',
              Tag: '',
              Group: `${docId}-p`,
              AdditionalData: '',
            })
            //   console.log(e)
          }}
        />
      </div>
    </div>
  )
}

export default Ticket
