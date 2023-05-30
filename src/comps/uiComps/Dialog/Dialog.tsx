import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Close } from '../Icons'
import type { DialogPropsType } from './Type'
import CloseIconRound from '../Icons/SVG/CloseIconRound'
import CheckedIconRound from '../Icons/SVG/CheckedIconRound'

const JGDialog = ({ open, setOpen, title, description, body, footer }: DialogPropsType) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog className="fixed inset-0 z-10 overflow-y-auto" open={open} onClose={() => setOpen(false)}>
        <div id="justgo-app" className="relative z-20">
          <div className="min-h-screen px-4 text-center bg-jg-grey-900 bg-opacity-30 flex justify-center items-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Panel className="relative bg-white w-[512px] rounded">
                <button
                  className="absolute top-4 right-4 p-2 bg-white text-jg-grey-700 cursor-pointer hover:bg-gray-200"
                  onClick={() => {
                    setOpen && setOpen(false)
                  }}
                >
                  <Close />
                </button>
                <div className="text-left p-4">
                  <Dialog.Title className="text-base font-semibold text-[#263238] leading-5 flex gap-2 items-center">
                    <CloseIconRound />
                    {/* <CheckedIconRound /> */}
                    {title}</Dialog.Title>
                  <Dialog.Description className="text-[14px] text-[#607D8B]">{description}</Dialog.Description>
                </div>
                <div className="text-[14px] text-[#607D8B] text-left p-4 border-b border-t">{body}</div>

                {footer && <div className="px-4 py-2 text-right">{footer}</div>}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default JGDialog
