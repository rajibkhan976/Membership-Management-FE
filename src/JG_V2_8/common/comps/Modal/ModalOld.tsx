import { Dialog, Transition } from '@headlessui/react'
import { XCircleIcon } from '@heroicons/react/outline'
import classNames from 'classnames'
import React, { Fragment, useRef } from 'react'
import TimeoutChildren from '../children/TimeoutChildren'

type BasicModalProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export type RenderedModalProps = BasicModalProps & {
  initialFocus?: React.MutableRefObject<HTMLElement | null>
}

type CustomSectionClassNameTypes = {
  titleClass?: string
  bodyClass?: string
  actionClass?: string
}

type ModalProps = BasicModalProps & {
  onClose?: () => void
  hideCloseAction?: boolean
  titleSection?: (params: RenderedModalProps) => JSX.Element
  bodySection?: (params: RenderedModalProps) => JSX.Element
  actionButtons?: (params: RenderedModalProps) => JSX.Element
  customSecionClassName?: CustomSectionClassNameTypes
}
function ModalOld({
  open = false,
  hideCloseAction = false,
  setOpen,
  onClose,
  titleSection = DefaultTitle,
  bodySection = DefaultContent,
  actionButtons,
  customSecionClassName,
}: ModalProps) {
  const initialFocus = useRef<HTMLElement>(null)
  const handleClose = () => {
    setOpen(false)
    setTimeout(() => {
      onClose?.()
    }, 200)
  }

  const { titleClass, bodyClass, actionClass } = customSecionClassName || {}

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="" initialFocus={initialFocus} onClose={!hideCloseAction ? handleClose : () => {}}>
        <div id="justgo-app" className="relative z-[9999]">
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-in duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed z-10 inset-0 overflow-y-visible">
            <div className="flex items-end justify-center min-h-full p-0 pt-8 sm:px-8 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-in duration-175"
                enterFrom="translate-y-[90%]"
                enterTo="translate-y-0 sm:scale-100"
                leave="ease-out duration-200"
                leaveFrom="translate-y-0 sm:scale-100"
                leaveTo="translate-y-full sm:scale-95"
              >
                <Dialog.Panel className="relative h-[90vh] w-full lg:max-w-[1000px]  xl:max-w-[1400px]  bg-white rounded-t-3xl sm:rounded-t-xl text-left overflow-hidden shadow-xl transform transition-all sm:max-w-[1150px] divide-y divide-gray-100">
                  {/* Top Section */}
                  <div className="absolute top-0 w-full flex items-center bg-gray-100 z-10">
                    <Dialog.Title as="div" className={classNames(titleClass, 'w-full h-16')}>
                      {titleSection && titleSection({ open, setOpen, initialFocus })}
                    </Dialog.Title>
                    {!hideCloseAction && (
                      <button onClick={handleClose} className="absolute top-auto right-3 w-6 h-6 text-gray-600">
                        <XCircleIcon />
                      </button>
                    )}
                  </div>
                  {/* Body Section */}
                  {
                    <TimeoutChildren sec={300}>
                      <div
                        className={classNames(
                          'absolute top-16 w-full flex overflow-auto',
                          actionButtons ? 'bottom-20' : 'bottom-0',
                          bodyClass
                        )}
                      >
                        {bodySection && bodySection({ open, setOpen, initialFocus })}
                      </div>
                    </TimeoutChildren>
                  }
                  {/* Bottom Section */}
                  {actionButtons && (
                    <div className={'absolute bottom-0 mt-5 p-4 w-full flex  bg-white z-10 ' + actionClass}>
                      {actionButtons({ open, setOpen, initialFocus })}
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

function DefaultTitle(params: RenderedModalProps) {
  return <></>
}
function DefaultContent(params: RenderedModalProps) {
  // const focusHere = useRef<HTMLInputElement | null>(null);
  const { initialFocus } = params
  return <></>
}
function DefaultActions(params: RenderedModalProps) {
  const { setOpen } = params
  return (
    <button onClick={() => setOpen(false)} className="w-fit px-4 py-2 text-sm bg-[#008345] text-white rounded-sm">
      Next
    </button>
  )
}

export default ModalOld
