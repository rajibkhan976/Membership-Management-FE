import { CompBaseProps } from '@comps/uiComps'
import { EventInfo, PurchaseItem, TicketInfo } from '@jg/common/types'
import { createContext, useCallback, useContext } from 'react'
import { useEventTicketListStoreContext } from './EventTicketListStoreProvider'
import { useShoppingCartContext } from '@jg/providers/ShoppingCartProvider'
import { useSessionUserContext } from '@jg/providers/SessionUserProvider'
import useEventStore from '../store/useEventStore'

import _ from 'lodash'
import { automation } from '@jg/utils/ParentalServices'
import { MA_ProfileProductValueType } from '@jg/common/entityExtForms/dataCaptureForms/formComponents/MA_ProfileProduct'
import { EntityExtGenericDataCaptureItemValueByEntityIdType } from '@jg/common/entityExtForms/providers/EntityExtGenericDataCaptureProvider'

interface IEventTicketListRoot {
  checkout: () => void
  bookATicketModalStatus: 'loading' | 'rendered' | 'closed'
}

const EventTicketListRootContext = createContext<IEventTicketListRoot>({
  checkout: () => {},
  bookATicketModalStatus: 'closed',
})

export const useEventTicketListRootContext = () => {
  return useContext(EventTicketListRootContext)
}

const updatePIWithAttendeeConsent = (pItem: PurchaseItem, obj: { AttendeeConsentRes: boolean }) => {
  const splittedTag = pItem.Tag.split('|')
  let parsedTag = JSON.parse(splittedTag[1])
  parsedTag = { ...parsedTag, ...obj }
  // az.copy(parsedTag, obj)
  pItem.Tag = splittedTag[0] + '|' + JSON.stringify(parsedTag)
}
const guid = () => {
  let d = new Date().getTime()
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
  return uuid
}
const EventTicketListRootProvider = ({ children }: CompBaseProps) => {
  const { addItem, gotoCart, items } = useShoppingCartContext()
  const { userInfo } = useSessionUserContext()
  const eventData = useEventStore((state) => state.eventDetails)
  const { getBookingSummaryItems, clearSummaryItems, getDataCaptureValue, getAttendeeConsents } =
    useEventTicketListStoreContext((state) => ({
      getBookingSummaryItems: state.getBookingSummaryItems,
      clearSummaryItems: state.clearSummaryItems,
      getDataCaptureValue: state.getDataCaptureValue,
      getAttendeeConsents: state.getAttendeeConsents,
    }))
  // console.log('EventTicketListRootProvider', eventData)
  const { tickets } = eventData
  const getCartItem = useCallback(
    (args: {
      eventInfo: EventInfo
      ticketInfo?: TicketInfo
      qty: number
      entityDocId: number
      entityType: string
      entityName: string
      parentEntityType: string
      parentEntityId: number
    }): {
      dataCaptureValue: Record<number, Record<string, EntityExtGenericDataCaptureItemValueByEntityIdType<any>>>
      purchaseItem: PurchaseItem
    } => {
      const tag = args.ticketInfo?.productCategory + '|'
      const tagObj = {
        EventDocId: args.eventInfo.docId,
        EntityId: args.entityDocId,
        EntityType: args.entityType,
        BookerEntityId: userInfo?.MemberDocId,
        ParentEntityId: args.parentEntityId,
        ParentEntityType: args.parentEntityType,
        ResponseId: '',
        ProductDocId: args.ticketInfo?.docId,
      }

      const data = getDataCaptureValue()
      const dataByTicketDocId = data[args.ticketInfo?.docId || 0]
      const finalObject: any = {}
      if (dataByTicketDocId) {
        for (const captureItem in dataByTicketDocId) {
          switch (captureItem) {
            case 'form':
              {
                const additionaData: any[] = []
                for (const entityDocId in dataByTicketDocId['form']) {
                  if (Number(entityDocId) === args.entityDocId) {
                    const dataByForEntityId = dataByTicketDocId['form'][args.entityDocId]
                    dataByForEntityId.forEach((dataBySchema: any) => {
                      for (const schemaId in dataBySchema) {
                        const index = additionaData.findIndex((e) => e.SchemeId === schemaId)
                        // console.log('dataByForEntityId', index)
                        let item: any = {}
                        if (index === -1) {
                          item = { SchemeId: schemaId, $eventFieldSets: {} }
                          additionaData.push(item)
                        } else {
                          item = additionaData[index]
                        }
                        const data = dataBySchema[schemaId]
                        //const formValue: any = {}
                        data.Tag = guid()
                        item['$eventFieldSets'][_.uniqueId('-')] = data
                      }
                    })
                  }
                }
                finalObject['EventAdditionalDatas'] = additionaData
              }
              break

            default:
              break
          }
        }
      }
      // console.log('finalObject', finalObject, eventData)

      return {
        dataCaptureValue: data,
        purchaseItem: {
          ProductId: args.ticketInfo?.docId || 0,
          Name: `${args.ticketInfo?.name} (${args.entityName}) - ${args.eventInfo.name} (${args.eventInfo.reference})`,

          Description: args.ticketInfo?.description || '',
          Quantity: args.qty,
          InCart: true,
          ForEntityType: args.entityType,
          ForEntityId: args.entityDocId,
          Group: args.ticketInfo?.docId + '-' + args.entityDocId,
          AdditionalData: _.isEmpty(finalObject) ? '' : JSON.stringify(finalObject),
          Tag: tag + JSON.stringify(tagObj),
        },
      }
    },
    []
  )

  const checkout = () => {
    let isIndividualBooking = false
    getBookingSummaryItems().forEach((item) => {
      const ticket = tickets.find((e) => e.docId === item.ticketDocId)
      let entityType = ''
      let parentEntityType = ''

      switch (item.group) {
        case 'single':
          entityType = 'Member'
          isIndividualBooking = true
          break
        case 'club':
          entityType = 'Member' //Team
          parentEntityType = 'Club'
          break
        case 'family':
          entityType = 'Member'
          parentEntityType = 'Event'
          break
      }

      item.bookingFor.forEach((booking) => {
        const cartItem = getCartItem({
          eventInfo: eventData,
          ticketInfo: ticket,
          qty: booking.qty,
          entityDocId: booking.member.DocId,
          entityName: `${booking.member.FirstName} ${booking.member.LastName || ''}${booking.member.Surname || ''}`,
          entityType: entityType, //Team
          parentEntityType: parentEntityType,
          parentEntityId: booking.parentEntityId,
        })
        if (eventData.isPublishAttendee) {
          const consentChecked = getAttendeeConsents().find((e) => e.entityId === cartItem.purchaseItem.ForEntityId)
          updatePIWithAttendeeConsent(cartItem.purchaseItem, {
            AttendeeConsentRes: consentChecked ? consentChecked.checked : false,
          })
        }

        // console.log('isSelectedForInstallment', booking, ticket?.installmentDetails)
        if (booking.isSelectedForInstallment) {
          ticket?.installmentDetails?.forEach((installmentProduct) => {
            if (installmentProduct.ProductCategory === 'installmentinitialpay') {
              addItem({
                ProductId: installmentProduct.DocId,
                Name: cartItem.purchaseItem.Name, // + ('('+ px.sessionUser.FirstName+ ' '+ px.sessionUser.LastName +')'  )+ ' - '+ me.eventDetail.EventName +  '('+me.eventDetail.EventReference +')',
                Description: installmentProduct.Description,
                Quantity: cartItem.purchaseItem.Quantity,
                InCart: true,
                ForEntityType: cartItem.purchaseItem.ForEntityType,
                ForEntityId: cartItem.purchaseItem.ForEntityId,
                Tag: cartItem.purchaseItem.Tag, // tbd
                Group: cartItem.purchaseItem.Group,
                AdditionalData: cartItem.purchaseItem.AdditionalData,
              })
            }
          })
        } else {
          addItem(cartItem.purchaseItem)
        }
        // console.log('addItem', cartItem)
        const data = cartItem.dataCaptureValue
        const ticketDocId = cartItem.purchaseItem.ProductId
        const dataByTicketDocId = data[ticketDocId]
        // finalObject: any = {}
        if (dataByTicketDocId) {
          for (const captureItem in dataByTicketDocId) {
            switch (captureItem) {
              case 'product':
                for (const entityDocId in dataByTicketDocId['product']) {
                  if (Number(entityDocId) === cartItem.purchaseItem.ForEntityId) {
                    const dataByForEntityId = dataByTicketDocId['product'][cartItem.purchaseItem.ForEntityId]
                    //const upsells = dataByForEntityId[0].product

                    dataByForEntityId.forEach((upsells: any) => {
                      // console.log('upsells', upsells)
                      const usProductValue: MA_ProfileProductValueType = upsells
                      const tagObj = {
                        MemberDocId: Number.parseInt(entityDocId),
                        EventDocId: eventData.docId,
                      }
                      addItem({
                        ProductId: usProductValue.product[0].Id,
                        Name: usProductValue.product[0].Name, // + ('('+ px.sessionUser.FirstName+ ' '+ px.sessionUser.LastName +')'  )+ ' - '+ me.eventDetail.EventName +  '('+me.eventDetail.EventReference +')',
                        Description: usProductValue.product[0].Description,
                        Quantity: usProductValue.qty,
                        InCart: true,
                        ForEntityType: 'Member',
                        ForEntityId: Number.parseInt(entityDocId),
                        Tag: 'UpSell|' + JSON.stringify(tagObj),
                        Group: usProductValue.groupWithParentEntity ? cartItem.purchaseItem.Group : '',
                        AdditionalData: '',
                      })
                    })
                  }
                }
                //finalObject['EventAdditionalDatas'] = additionaData

                break

              default:
                break
            }
          }
        }
      })
    })

    automation.getEventBookingAutomationItems(
      eventData.ownerEntity?.id,
      'EventCartAddConfirmation',
      eventData.docId,
      items,
      isIndividualBooking,
      (automationResult: PurchaseItem[]) => {
        automationResult.forEach((e) => {
          addItem(e)
        })
        //  console.log('items', items)
        clearSummaryItems()
        gotoCart()
      }
    )
  }
  return (
    <EventTicketListRootContext.Provider value={{ checkout, bookATicketModalStatus: 'closed' }}>
      <div className="relative">{children}</div>
    </EventTicketListRootContext.Provider>
  )
}
export default EventTicketListRootProvider
