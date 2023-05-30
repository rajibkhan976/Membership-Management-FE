import { Dialog, Transition } from '@headlessui/react'
import { XCircleIcon } from '@heroicons/react/outline'
import React, { Fragment, useRef } from 'react'

type BasicModalProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
type RenderedModalProps = BasicModalProps & {
  initialFocus?: React.MutableRefObject<HTMLElement | null>
}

type ModalProps = BasicModalProps & {
  titleSection?: React.ReactNode
  bodySection?: React.ReactNode
  showActionBtn?: boolean
  actionButtons?: React.ReactNode
}

const Modal = (props: ModalProps) => {
  const initialFocus = useRef<HTMLElement>(null)
  const {
    open = false,
    setOpen,
    titleSection = <DefaultTitle />,
    bodySection = <DefaultContent initialFocus={initialFocus} />,
    showActionBtn = true,
    actionButtons = <DefaultActions setOpen={setOpen} />,
  } = props

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={initialFocus} onClose={setOpen}>
        <div id="justgo-app">
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
            <div className="flex items-end justify-center min-h-full p-0 pt-8 pb-6 sm:px-8 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-in duration-175"
                enterFrom="translate-y-[90%]"
                enterTo="translate-y-0 sm:scale-100"
                leave="ease-out duration-200"
                leaveFrom="translate-y-0 sm:scale-100"
                leaveTo="translate-y-full sm:scale-95"
              >
                <Dialog.Panel className="relative h-[90vh] w-full max-w-[1150px] bg-white rounded-t-3xl sm:rounded-t-xl text-left overflow-hidden shadow-xl transform transition-all sm:max-w-[1150px] divide-y divide-gray-100">
                  {/* Top Section */}
                  <div className="w-full flex bg-jg-grey-100" style={{ minHeight: '3rem' }}>
                    <Dialog.Title as="div" className="">
                      {titleSection}
                    </Dialog.Title>
                    <button onClick={() => setOpen(false)} className="absolute top-3 right-3 w-6 h-6 text-jg-grey-600">
                      <XCircleIcon />
                    </button>
                  </div>
                  {/* Body Section */}
                  <div className="w-full h-5/6 ">{bodySection}</div>
                  {/* Bottom Section */}
                  {showActionBtn && (
                    <div className="absolute bottom-0 mt-5 p-4 w-full flex justify-end bg-white z-10">
                      {showActionBtn && actionButtons}
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

const DefaultTitle = () => {
  return <h2 className="px-3 py-2">A Default Title</h2>
}

const DefaultContent = (props: any) => {
  const { initialFocus } = props

  return (
    <div className="p-4">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere commodi optio, blanditiis ad quis velit omnis
        consequatur ab, maxime explicabo consequuntur corrupti distinctio voluptate pariatur.
      </p>
      <br />
      <input
        className="p-2 border-2 border-gray-300 rounded-sm"
        ref={initialFocus}
        type="text"
        placeholder="Auto Focused"
      />
    </div>
  )
}

const DefaultActions = (props: any) => {
  const { setOpen } = props
  return (
    <button onClick={() => setOpen(false)} className="w-fit px-4 py-2 text-sm bg-jg-red-700 text-white rounded-sm">
      Close
    </button>
  )
}

export default Modal
