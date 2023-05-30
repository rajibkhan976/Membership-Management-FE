import QtyPicker from '@comps/uiComps/forms/QtyPicker/QtyPicker'
import { AsyncStatus, MemberType } from '@jg/common/types'
import { useBookATicketStoreContext } from '../../providers/BookATicketProvider'
import { BookATicketItem, EventBookingGroup } from '../../Types/EventBookingTypes'
import { useCallback, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import WaitlistToggle from './WaitlistToggle'
import MemberAvatar from './MemberAvatar'
import InstallmentToggle from './InstallmentToggle'
import FormValidationSummary from './FormValidationSummary'
import BookingHistorySummary from './BookingHistorySummary'

export type BookingEntityProps = {
  item: MemberType
  // mode?: 'qtyPicker' | 'switch'
  group: EventBookingGroup
  parentEntityId: number
  isWaitlist: boolean
  className?: string
  onAdd: (index: number, bookingItemIndex: number) => void
  onRemove: (index: number, bookingItemIndex: number) => void
  onEntityClick: (bookingItemIndex: number) => void
  onErrorMessageClick: (bookingItemIndex: number, indexByMember: number) => void
}

const BookingEntity = ({
  item,
  group,
  parentEntityId,
  isWaitlist,
  className,
  onAdd,
  onRemove,
  onEntityClick,
  onErrorMessageClick,
}: BookingEntityProps) => {
  const {
    ticketInfo,
    updateBooking,
    // updateWaitlist,
    //waitlistItems,
    getBookingItems,
    evaluateTicketByEntity,
    hideBookingEntityWhenQtyIsZero,
  } = useBookATicketStoreContext((state) => ({
    ticketInfo: state.ticketInfo,
    updateBooking: state.updateBooking,
    getBookingItems: state.getBookingItems,
    evaluateTicketByEntity: state.evaluateTicketByEntity,
    hideBookingEntityWhenQtyIsZero: state.hideBookingEntityWhenQtyIsZero,
  }))

  /* const { addForm, removeForm } = useRegisterBookingInfoStoreContext((state) => ({
    addForm: state.addForm,
    removeForm: state.removeForm,
  }))*/
  const [asyncStatus, setAsyncStatus] = useState<AsyncStatus>('idle')
  const [qty, setQty] = useState(0)
  const qtyRef = useRef(0)
  const [purchaseable, setPurchaseable] = useState<null | boolean>(null)

  const getBookingQty = useCallback((bookingItems: BookATicketItem[]) => {
    const bookingItemsByGroup = bookingItems.find((e) => e.group === group)
    if (bookingItemsByGroup) {
      const bookFor = bookingItemsByGroup.bookingFor.find((e) => e.member.DocId === item.DocId)
      if (bookFor) {
        return bookFor.qty
      } else return 0
    } else return 0
  }, [])

  const getBookingItemIndex = useCallback(() => {
    let bookingItemIndex = -1
    let count = -1
    getBookingItems().forEach((e) => {
      e.bookingFor.forEach((i) => {
        count++
        if (i.member.DocId === item.DocId) {
          bookingItemIndex = count
        }
      })
    })
    return bookingItemIndex
  }, [])

  useEffect(() => {
    const currentQty = getBookingQty(getBookingItems())
    setQty(currentQty)

    if (currentQty > 0) {
      setPurchaseable(true)
    }
  }, [])

  useEffect(() => {
    if (qty > qtyRef.current) {
      const diff = qty - qtyRef.current
      for (let i = 0; i < diff; i++) {
        // addForm({ name: 'booing form ' + i, onClear: () => {} })

        onAdd(i, getBookingItemIndex())
      }
    } else {
      const diff = qtyRef.current - qty
      for (let i = diff - 1; i >= 0; i--) {
        // removeForm(i)
        onRemove(i, getBookingItemIndex())
      }
    }

    qtyRef.current = qty
  }, [qty])

  const evaluateTicket = (qty: number) => {
    if (purchaseable === true) {
      if (qty <= ticketInfo.maxPurchase) {
        updateBooking(item, qty, 'replace', group, parentEntityId)
        setQty(getBookingQty(getBookingItems()))
      }
    } else {
      setAsyncStatus('pending')
      evaluateTicketByEntity(ticketInfo.docId, item.DocId, 'Member', (res) => {
        setAsyncStatus('success')
        setPurchaseable(res)
        if (qty <= ticketInfo.maxPurchase && res) {
          updateBooking(item, qty, 'replace', group, parentEntityId)
          setQty(getBookingQty(getBookingItems()))
        }
      })
    }
  }

  if (hideBookingEntityWhenQtyIsZero && qty === 0) return <></>
  else
    return (
      <div className={`relative  py-2 px-4 border-b border-jg-metal-50 ${className}`}>
        {/* <div className="flex flex-row items-center w-full justify-between"> */}
        <div className="flex flex-row items-center w-full justify-between lg:inline-grid lg:grid-cols-3 lg:gap-4 ">
          <a
            className="cursor-pointer mr-2 md:mr-0"
            onClick={() => {
              onEntityClick(getBookingItemIndex())
            }}
          >
            <MemberAvatar member={item} />
          </a>
          <div className="jg-hidden sm:block md:hidden lg:block ml-4 max-w-[174px] w-full  space-y-1">
            <div className="text-inputSizeSm text-jg-green-300 break-all">{item.EmailAddress}</div>
            <div className="text-jg-metal-500 text-globalTextSizeSm capitalize break-all">
              {item.Town ? item.Town : <></>}
            </div>
          </div>
          <div className="flex justify-center items-center max-w-[156px] ml-auto">
            {isWaitlist ? (
              <div className="flex max-w-[250px] w-full justify-end items-center">
                <span className="text-globalTextSizeSm font-medium text-jg-metal-500 mr-4">Add to Waitlist</span>
                <WaitlistToggle item={item} group={group} parentEntityId={parentEntityId} />
              </div>
            ) : (
              <QtyPicker
                hideLabel
                value={qty}
                onChange={(value) => {
                  evaluateTicket(Number(value))
                }}
                className="!mb-0"
              />
            )}
          </div>
        </div>
        <div className="flex flex-col-reverse md:flex-row mt-2 justify-between gap-2">
          <div className="flex flex-col xl:flex-row">
            <div>
              <BookingHistorySummary ticketDocId={ticketInfo.docId} entityId={item.DocId} />
            </div>
            {qty > 0 && (
              <div className="flex gap-1">
                <FormValidationSummary
                  entityId={item.DocId}
                  onClick={(indexByMember) => {
                    onErrorMessageClick(getBookingItemIndex(), indexByMember)
                  }}
                />
                {/** <button
                  className="text-jg-green-800 text-sm flex gap-1 "
                  onClick={(e) => {
                    const el = document.getElementById(`booking-form-${getBookingItemIndex()}`)
                    if (el) el.scrollIntoView()
                    e.preventDefault()
                  }}
                >
                  <span>Edit the forms</span>
                  <ChevronDoubleRightIcon className="w-3 py-1" />
                </button>*/}
              </div>
            )}
          </div>
          {qty > 0 && ticketInfo.isInstallmentEnabled && (
            <div className="flex flex-row gap-2 items-center justify-between md:justify-start">
              <div className="text-globalTextSizeSm text-jg-metal-500 ml-1 md:ml-0">Pay By Installment</div>
              <InstallmentToggle qty={qty} item={item} group={group} parentEntityId={parentEntityId} />
            </div>
          )}
        </div>

        {(purchaseable === false || asyncStatus === 'pending') && (
          <div
            className={classNames(
              'absolute bg-jg-grey-100 opacity-50 inset-0 flex items-center justify-center ',
              purchaseable === false && 'cursor-not-allowed'
            )}
          >
            {asyncStatus === 'pending' && (
              <svg
                aria-hidden="true"
                className="w-10 h-10 mr-2 text-jg-green-100 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="rgba(76, 175, 79,1)"
                />
              </svg>
            )}
          </div>
        )}
      </div>
    )
}

export default BookingEntity
