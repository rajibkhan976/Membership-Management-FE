import { Fragment, memo, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'

type LoaderOverlayProps = {
  show: boolean
  message: string
  showCrossBtn: boolean
}

const LoadingSpinner = (props: LoaderOverlayProps) => {
  const { show, message, showCrossBtn } = props
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    setIsOpen(!!show)
  }, [show])

  const renderSpinner = () => {
    return (
      <svg
        className="animate-spin inline-block w-6 h-6 rounded-full"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    )
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog open={isOpen} as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
        <div id="justgo-app">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-64 transform overflow-hidden rounded-3xl bg-white text-left align-middle shadow-xl transition-all">
                  <div className="pointer-events-auto w-full overflow-hidden bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="p-2">
                      <div className="flex items-center justify-center">
                        <div className="ml-3 w-0 flex flex-1 pt-0.5">
                          {renderSpinner()}
                          <span className="ml-4 my-auto text-sm text-jg-green-500 font-semibold">{message}</span>
                        </div>
                        {showCrossBtn && (
                          <div className="mr-2 flex flex-shrink-0">
                            <button
                              type="button"
                              className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              onClick={() => {
                                setIsOpen(false)
                              }}
                            >
                              <span className="sr-only">Close</span>
                              <span className="text-2xl" aria-hidden="true">
                                &times;
                              </span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default memo(LoadingSpinner)
