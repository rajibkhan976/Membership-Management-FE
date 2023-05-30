import { Button } from '@comps/uiComps'
import { useBookATicketStoreContext } from '../../providers/BookATicketProvider'
import { useEventTicketListStoreContext } from '../../providers/EventTicketListStoreProvider'
import Dots from '@comps/uiComps/Icons/SVG/Dots'
import { useRef, useState } from 'react'
import Floater from '@jg/common/comps/JGFloater/Floater'
import useOnClickOutside from '@jg/hooks/useOnClickOutside'

const BookATicketBottombar = () => {
  const { setBookingProgressStatus } = useEventTicketListStoreContext((state) => ({
    setBookingProgressStatus: state.setBookingProgressStatus,
  }))
  const { dirty, isBookingFormScreen, setBookingformScreen } = useBookATicketStoreContext((state) => ({
    dirty: state.dirty,
    isBookingFormScreen: state.isBookingFormScreen,
    setBookingformScreen: state.setBookingformScreen,
  }))

  if (isBookingFormScreen) {
    return (
      <div className="flex justify-end w-full">
        <Button
          btnColor="primary"
          fillType="solid"
          text="Done"
          onClick={() => {
            setBookingformScreen?.(false)
          }}
        />
      </div>
    )
  }

  return (
    <div className="flex justify-between md:justify-end items-center w-full">
      <DotMenu className="p-1 text-jg-metal-500 md:jg-hidden">
        <Button
          btnColor="secondary"
          fillType="outline"
          text="Cancel"
          onClick={() => {
            setBookingProgressStatus('canceled')
          }}
        />
      </DotMenu>

      <div className="flex justify-end items-center gap-3">
        <Button
          btnColor="secondary"
          fillType="outline"
          text="Cancel"
          onClick={() => {
            setBookingProgressStatus('canceled')
          }}
          className="jg-hidden md:block"
        />
        <Button
          disabled={!dirty}
          btnColor="primary"
          fillType="outline"
          text={
            <>
              <span className="jg-hidden md:inline">Proceed to checkout</span>
              <span className="md:jg-hidden">Checkout</span>
            </>
          }
          onClick={() => {
            setBookingProgressStatus('addAndCheckout')
          }}
        />
        <Button
          disabled={!dirty}
          btnColor="primary"
          fillType="solid"
          text="Add & continue"
          onClick={() => {
            setBookingProgressStatus('addAndContinue')
          }}
        />
      </div>
    </div>
  )
}

export default BookATicketBottombar

const DotMenu = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  const [isOpen, setOpen] = useState(false)
  const reference = useRef<HTMLDivElement>(null)
  const floaterRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(floaterRef, () => setOpen(false))
  return (
    <>
      <div className={className} ref={reference} onClick={() => setOpen(!isOpen)}>
        <Dots className="w-6 h-6" />
      </div>

      <Floater
        referenceElement={reference.current}
        isVisible={isOpen}
        position={'top'}
        ref={floaterRef}
        className="z-[9999]"
      >
        {children}
      </Floater>
    </>
  )
}
