import { MenuUp } from '@comps/uiComps/Icons'
import { Disclosure } from '@headlessui/react'
import ToggleButton from '@jg/common/comps/filter/ToggleButton'
import { useBookATicketStoreContext } from '../../providers/BookATicketProvider'
import { useSessionUserContext } from '@jg/providers/SessionUserProvider'
import BookingEntityList from './BookingEntityList'
import { Fragment, memo, useRef, useState } from 'react'
import { CompBaseProps } from '@comps/uiComps'
import { FastChildren } from '@jg/common/comps'
import classNames from 'classnames'
import { useHref } from 'react-router-dom'
const FastBookingEntity = memo(BookingEntityList)
const GroupBookingEntityListFamilyMembers = ({
  isWaitlist,
  onCollapseAction,
}: {
  isWaitlist?: boolean
  onCollapseAction: (elRef: HTMLDivElement | null, elBtn: HTMLButtonElement | null) => void
}) => {
  const { userInfo } = useSessionUserContext()

  const { ticketInfo, familyMembers, setHideBookingEntityWhenQtyIsZero, hideBookingEntityWhenQtyIsZero } =
    useBookATicketStoreContext((state) => ({
      ticketInfo: state.ticketInfo,

      familyMembers: state.familyMembers,

      setHideBookingEntityWhenQtyIsZero: state.setHideBookingEntityWhenQtyIsZero,
      hideBookingEntityWhenQtyIsZero: state.hideBookingEntityWhenQtyIsZero,
    }))

  if (familyMembers.length === 0) {
    familyMembers.push({
      DocId: userInfo?.MemberDocId || -1,
      ProfilePicURL: userInfo?.ProfilePicURL,
      MID: userInfo?.MID || '',
      Gender: userInfo?.Gender || '',
      Town: userInfo?.Town,
      EmailAddress: userInfo?.EmailAddress,
      Country: userInfo?.Country || '',
      FirstName: userInfo?.FirstName,
      LastName: userInfo?.LastName,
      UserId: userInfo?.UserId,
    })
  }
  //onsole.log('BookATicketGroupBookingBody', clubMembers, asyncStatusForClubMembers)
  const hasRegistrationForm = ticketInfo.dataCaptureItems && ticketInfo.dataCaptureItems.length > 0
  const collapssiblePanelRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  return (
    <>
      <div className="!ring-0 !focus:ring-0">
        <>
          <div className="flex bg-jg-grey-50 px-4 py-2  !ring-0 border-b border-t border-jg-metal-50">
            <button
              ref={buttonRef}
              onClick={() => {
                onCollapseAction(collapssiblePanelRef.current, buttonRef.current)
              }}
              className="flex w-full rounded-lg items-center"
            >
              <MenuUp className={' transform rotate-180  w-[9px] text-jg-metal-900 mr-[13px]'} />
              <span className="text-globalTextSizeMd text-jg-metal-900">My Family</span>
            </button>
            {!isWaitlist && (
              <div className="jg-hidden md:flex max-w-[250px] w-full justify-end items-center">
                <span className="text-globalTextSizeSm font-medium text-jg-metal-500 mr-4">Show Selected Member</span>
                <ToggleButton
                  enabled={hideBookingEntityWhenQtyIsZero}
                  handleChange={() => {
                    setHideBookingEntityWhenQtyIsZero(!hideBookingEntityWhenQtyIsZero)
                  }}
                />
              </div>
            )}
          </div>

          <div ref={collapssiblePanelRef} className={classNames('text-sm text-gray-500')}>
            <BookingEntityList
              hasDatacaptureForm={!!hasRegistrationForm}
              isWaitlist={!!isWaitlist}
              list={familyMembers}
              group="family"
              parentEntityId={0}
            />
          </div>
        </>
      </div>
    </>
  )
}
export default GroupBookingEntityListFamilyMembers
