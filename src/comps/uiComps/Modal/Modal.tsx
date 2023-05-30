import { Dialog, Transition } from '@headlessui/react'
import { useState } from 'react'

export type ModalProps = {
  // className?: string,
  title?: string | number
  description?: any
  isConfirmBtn?: boolean
  isCancelBtn?: boolean
  confirmBtnText?: string
  cancelBtnText?: string
  children?: any

  isOpen?: any
  setIsOpen?: any
  onSelect?: (data: any) => void
}

function Modal({ isOpen = false, setIsOpen, ...props }: ModalProps) {
  const {
    title,
    description,
    isConfirmBtn = true,
    isCancelBtn = false,
    confirmBtnText = 'Confirm',
    cancelBtnText = 'Cancel',
    onSelect = () => {},
    children,
  } = props

  const [data, setData] = useState(false)

  onSelect(data)

  const confirmHandle = (e: any) => {
    setData(true)
    setIsOpen(false)
  }

  return (
    <Transition
      show={isOpen}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <div className="dark:bg-gray-700 relative bg-white rounded max-w-sm mx-auto p-8">
            <Dialog.Title as="h3" className="dark:text-white text-lg font-medium leading-6 text-gray-900">
              {title}
            </Dialog.Title>
            <div className="mt-2">
              <p className="dark:text-white text-sm text-gray-500">{description}</p>
              {children}
            </div>
            <div className="mt-4 flex">
              <button
                className={
                  isConfirmBtn
                    ? 'dark:bg-black dark:text-white inline-flex justify-center rounded-md border mr-1 border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                    : 'hidden'
                }
                onClick={confirmHandle}
                // onClick={() => setIsOpen(false)}
              >
                {confirmBtnText}
              </button>

              <button
                className={
                  isCancelBtn
                    ? 'dark:bg-black dark:text-white inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                    : 'hidden'
                }
                onClick={() => setIsOpen(false)}
              >
                {cancelBtnText}
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Modal
