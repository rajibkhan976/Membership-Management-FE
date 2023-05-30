import { Button } from '@comps/uiComps'
import { LinkButton, RouteButton } from '@jg/common/comps'
import { TicketInfo } from '@jg/common/types'
import { Currency } from '@jg/utils'
import { useWidgetContext } from 'jg-widget'
import React, { useState } from 'react'
import { Retryer } from 'react-query/types/core/retryer'
import { useShoppingCartContext } from '../../../../../providers/ShoppingCartProvider'
import SeeMore from './SeeMore'
import Ticket from './Ticket'

function Tickets({ docId = '-1', tickets = [] }: { docId?: string; tickets?: TicketInfo[] }) {
  const [selectedTickets, setSelectedTickets] = useState<number[]>([])
  const { gotoCart } = useShoppingCartContext()
  const [showAll, setShowAll] = React.useState(false)
  const { basePath } = useWidgetContext()
  const pathToBooking = `${basePath}details/${docId}/individualBooking`
  //console.log('tickets', tickets)
  const handleClick = () => {
    /*
     ProductId: ctrl.product.DocId,
                        Name: ctrl.product.Name + (px.wb.isPublic ? '' : ' (' + px.sessionUser.FirstName + ' ' + px.sessionUser.LastName + ')') + ' - ' + me.eventDetail.EventName + ' (' + me.eventDetail.EventReference + ')',
                        Description: ctrl.product.Description,
                        Quantity: ctrl.getValue(),
                        InCart: true,
                        ForEntityType: "Member",
                        ForEntityId: !px.wb.isPublic ? (px.sessionMember.DocId || me.owner.owner.memberId) : 0,
                        AdditionalData: '',
                        //Tag: ctrl.product.Category + '|'+me.eventSummary.Id + (!px.wb.isPublic? ('|' + me.owner.owner.memberId) : '|0') + '|'});
                        Group: ctrl.product.DocId + '-' + (!px.wb.isPublic ?  (px.sessionMember.DocId || me.owner.owner.memberId) : 0),
                Tag: tag + JSON.stringify(tagObj)});
    */

    gotoCart()
  }
  return (
    <div className="space-y-4 divide-y opacity-80">
      <div
        className={`space-y-4 divide-y transition-all ease-in-out h-full duration-1000 ${
          showAll ? 'max-h-[800px] overflow-auto' : ' max-h-80 overflow-hidden'
        } `}
      >
        {tickets.map(
          (
            { name, docId, priceSettings, quantity, description, maxPurchase, minPurchase, unitPrice, ends, currency },
            i
          ) => (
            <Ticket
              key={i}
              {...{
                docId,
                name,
                quantity,
                subTitle: description,
                min: minPurchase,
                max: maxPurchase,
                price: unitPrice,
                endsIn: ends,
                currency: Currency.getSymbol(priceSettings?.Currency || ''),
              }}
            />
          )
        )}
      </div>

      <div className="flex justify-between items-center pt-4">
        {tickets.length > 3 ? (
          <SeeMore
            text={showAll ? 'Show Less' : 'Show More'}
            dir={showAll ? 'up' : 'down'}
            onClick={() => setShowAll((s) => !s)}
          />
        ) : (
          <div></div>
        )}

        <div className="flex justify-end items-center gap-4">
          <Button onClick={handleClick} btnColor="primary" fillType="solid" btnSize="md" text="Confirm Booking" />
          {/*  <RouteButton to={pathToBooking} btnColor="primary" fillType="outline" btnSize="md" text="Club Booking" />
          <RouteButton to={pathToBooking} btnColor="primary" fillType="solid" btnSize="md" text="Book Tickets" />*/}
        </div>
      </div>
    </div>
  )
}
export default Tickets
