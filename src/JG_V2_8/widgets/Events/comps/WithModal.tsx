import { CompBaseProps } from '@comps/uiComps'
import { ModalOld } from '@jg/common/comps'
import Drawer from '@jg/common/comps/drawer/Drawer'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
//import { useBookATicketContext } from '../../providers/BookATicketProvider'
import { useEventTicketListStoreContext } from '../providers/EventTicketListStoreProvider'

import { useBookATicketStoreContext } from '../providers/BookATicketProvider'
import { useEntityExtGenericDataCaptureContext } from '@jg/common/entityExtForms/providers/EntityExtGenericDataCaptureProvider'
import _ from 'lodash'
import { useMessageBoxContext } from '@jg/providers/MessageBoxProvider'
import { useWidgetContext } from 'jg-widget'

type WithModalProps = CompBaseProps & {
  // onClose?: () => void
  children: JSX.Element
  tbar: JSX.Element
  bbar: JSX.Element
  mode?: 'group' | 'single'
}
const WithModal = ({ tbar, bbar, children, mode = 'group' }: WithModalProps) => {
  //const { show: ShowMesseageBox } = useMessageBoxContext((state) => ({ show: state.show }))
  const { basePath } = useWidgetContext()
  const { bookingProgressStatus, updateBookingSummaryByTicket, setBookingProgressStatus, updateInvalidSummary } =
    useEventTicketListStoreContext((state) => ({
      bookingProgressStatus: state.bookingProgressStatus,
      updateBookingSummaryByTicket: state.updateBookingSummaryByTicket,
      setBookingProgressStatus: state.setBookingProgressStatus,
      updateInvalidSummary: state.updateInvalidSummary,
    }))
  const { getBookingItems, ticketInfo } = useBookATicketStoreContext((state) => ({
    ticketInfo: state.ticketInfo,
    getBookingItems: state.getBookingItems,
  }))
  const { getValue, validate, getInvalidMsgSummary } = useEntityExtGenericDataCaptureContext((state) => ({
    getValue: state.getValue,
    validate: state.validate,
    getInvalidMsgSummary: state.getInvalidMsgSummary,
  }))

  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams()
  useEffect(() => {
    return () => {
      setBookingProgressStatus('init')
    }
  }, [])
  useEffect(() => {
    if (
      !open &&
      (bookingProgressStatus === 'canceled' ||
        bookingProgressStatus === 'addAndContinue' ||
        bookingProgressStatus === 'addAndCheckout' ||
        bookingProgressStatus === 'saveWaitlistCompleted')
    ) {
      setTimeout(() => {
        if (bookingProgressStatus === 'addAndContinue' || bookingProgressStatus === 'addAndCheckout') {
          updateBookingSummaryByTicket(getBookingItems(), ticketInfo.docId, getValue())
          if (ticketInfo.dataCaptureItems && ticketInfo.dataCaptureItems.length > 0) {
            updateInvalidSummary(ticketInfo.docId, getInvalidMsgSummary())
          }
        }
        if (bookingProgressStatus === 'addAndCheckout') {
          setBookingProgressStatus('validateAndCheckout')
        }
        const url =
          location.pathname.indexOf('booking-details') > -1
            ? `${basePath}booking-details/${params['docId']}/`
            : `${basePath}details/${params['docId']}/`
        navigate(url)
      }, 300)
    }
  }, [open])

  useEffect(() => {
    switch (bookingProgressStatus) {
      case 'init':
        setOpen(true)
        break
      case 'canceled':
      case 'saveWaitlistCompleted':
        setOpen(false)
        break
      case 'addAndContinue':
      case 'addAndCheckout':
        {
          /* const dcValue = getValue()
          if (!_.isEmpty(dcValue)) {
            /* validate()
            const invalids = getInvalidMsgSummary()
            if (invalids.length) {
              ShowMesseageBox({ title: 'Alert', message: invalids[0] })
              setBookingProgressStatus('init')
            } else setOpen(false)
          
          } else setOpen(false)*/

          setOpen(false)
          //updateBookingSummaryByTicket(getBookingItems(), ticketInfo.docId)
          //updateDataCaptureValue(getValue(), ticketInfo.docId)
        }
        break
    }
  }, [bookingProgressStatus])

  return (
    <>
      {mode === 'group' && (
        <ModalOld
          {...{
            ...{
              titleSection: (params) => tbar,
              bodySection: (params) => children,
              actionButtons: (params) => bbar,
            },
            hideCloseAction: true,
            open,
            setOpen,
            customSecionClassName: { titleClass: '!h-12 md:!h-16', bodyClass: '!top-12 md:!top-16' },
          }}
        />
      )}
      {mode === 'single' && (
        <Drawer
          size="md"
          isOpen={open}
          drawerAction={<>{bbar}</>}
          title={<>{tbar}</>}
          drawerContent={<>{children}</>}
          showFrom="Right"
          openDrawer={function (): void {
            // throw new Error('Function not implemented.')
          }}
          closeDrawer={function (): void {
            setOpen(false)
          }}
        />
      )}
    </>
  )
}
export default WithModal
