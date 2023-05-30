import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Close } from '@comps/uiComps/Icons'
import Footer from './Footer'
import JGLogoMini from './JGLogoMini'

export default function Example() {
  const [open, setOpen] = useState(false)
  //   useEffect(() => {
  //     setOpen(false)
  //   }, [])
  const [btnOpen, setBtnOpen] = useState(true)
  function toggle() {
    setBtnOpen((btnOpen) => !btnOpen)
    setOpen((open) => !open)
  }
  return (
    <>
      <div className="fixed bottom-[10px] z-10 cursor-pointer" onClick={() => toggle()}>
        <Transition
          show={btnOpen}
          enter="transition ease duration-500 transform"
          enterFrom="opacity-0 -translate-x-12"
          enterTo="opacity-100 translate-x-0"
          leave="transition ease duration-300 transform"
          leaveFrom="opacity-100 translate-x-0"
          leaveTo="opacity-0 -translate-x-12"
        >
          <div className="p-2 rounded-r-full shadow-md ring-1 ring-jg-grey-300 bg-white">
            <JGLogoMini />
          </div>
        </Transition>
      </div>
      {open && !btnOpen && (
        <div className="boxContent">
          <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="fixed bottom-0 left-0 right-0 z-10" onClose={setOpen}>
              <div className="fixed inset-0" />
              <div id="justgo-app" className="sticky bottom-0 left-0 right-0">
                <Transition
                  as={Fragment}
                  appear={true}
                  enter="transform transition ease-in-out duration-500"
                  enterFrom="translate-y-full"
                  enterTo="translate-y-0"
                  leave="transform transition ease duration-300"
                  leaveFrom="translate-y-0"
                  leaveTo="translate-y-full"
                  show={open}
                >
                  <Dialog.Panel>
                    <div className="flex h-full flex-col overflow-y-hidden shadow-xl sticky left-0 right-0 bottom-0 p-0 transform transition ease-in-out duration-500 translate-y-0">
                      <div className="relative flex  self-end items-center justify-center ring-1 ring-jg-grey-300 border-t-[1px] border-jg-grey-300 bg-white">
                        <button
                          type="button"
                          className="flex items-center h-10 w-10 rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:none focus:ring-offset-2 justify-center"
                          onClick={() => {
                            setOpen(false)
                            setBtnOpen(true)
                          }}
                        >
                          <span className="sr-only">Close panel</span>
                          <Close className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                      <div className="relative bg-white flex-1">
                        <Footer onClose={() => {}} />
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition>
              </div>
            </Dialog>
          </Transition.Root>
        </div>
      )}
      {open === false && btnOpen === false && setBtnOpen(true)}
    </>
  )
}
