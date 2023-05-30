import { Dialog, Transition } from '@headlessui/react'
import { Fragment, memo } from 'react'
import classNames from 'classnames'
import { ReactComponent as AlertIcon } from '@jg/assets/images/AlertIcon.svg'
import { ReactComponent as CrossBtnIcon } from '@jg/assets/images/CrossBtnIcon.svg'
import { Button } from '@comps/uiComps'

type StatusDialogProps = {
  actionBtnText?: string
  closeBtnText?: string
  customActionElement?: React.ReactElement
  customContent?: React.ReactElement
  customTitleElement?: React.ReactElement
  dialogStatus?: 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'
  disableActionBtn?: boolean
  descriptionText?: string
  isOpen: boolean
  showCrossBtn?: boolean
  showDefaultActionBtn?: boolean
  titleText?: string
  handleAction?: () => void
  setIsOpen: (status: boolean) => void
}

const dialogBgCls = {
  default: 'bg-jg-grey-50',
  primary: 'bg-jg-blue-300',
  secondary: 'bg-jg-grey-300',
  success: 'bg-jg-green-500',
  error: 'bg-jg-red-300',
  warning: 'bg-jg-yellow-300',
  info: 'bg-jg-violet-300',
}

const StatusDialog = (props: StatusDialogProps) => {
  const {
    actionBtnText,
    closeBtnText = 'Ok',
    customActionElement,
    customContent,
    customTitleElement,
    dialogStatus = 'warning',
    disableActionBtn,
    descriptionText,
    isOpen = false,
    showCrossBtn = true,
    showDefaultActionBtn = false,
    titleText,
    handleAction,
    setIsOpen,
  } = props

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog open={isOpen} as="div" onClose={() => setIsOpen(false)}>
        <div id="justgo-app" className="">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25  z-[99999]" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto  z-[99999]">
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
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-none bg-white text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="div"
                    className={classNames(
                      'flex text-md font-semibold leading-6 p-4 text-jg-grey-900',
                      dialogBgCls[dialogStatus],
                      titleText || customTitleElement ? 'justify-between' : 'justify-end'
                    )}
                  >
                    {titleText ? (
                      <div className="inline-block">
                        {dialogStatus === 'warning' ? <AlertIcon className="inline-block mr-2" /> : null}
                        <span className="inline-block align-middle">{titleText}</span>
                      </div>
                    ) : (
                      customTitleElement
                    )}
                    {showCrossBtn && <CrossBtnIcon className="cursor-pointer" onClick={() => setIsOpen(false)} />}
                  </Dialog.Title>
                  {descriptionText ? (
                    <div className="flex justify-center mt-2 p-4">
                      <p className="text-md text-jg-grey-800">{descriptionText}</p>
                    </div>
                  ) : (
                    <div className="w-full mt-2 p-4">{customContent}</div>
                  )}
                  <div className="flex justify-end mt-4 p-4">
                    {showDefaultActionBtn ? (
                      <Button
                        className={classNames(
                          'inline-flex justify-center rounded-sm border border-transparent px-8 py-1 text-sm font-semibold text-jg-grey-800',
                          dialogBgCls[dialogStatus]
                        )}
                        text={actionBtnText}
                        btnSize="xs"
                        disabled={disableActionBtn}
                        onClick={() => handleAction && handleAction()}
                      />
                    ) : (
                      customActionElement
                    )}
                    {!customActionElement && (
                      <Button
                        className={classNames(
                          'inline-flex justify-center rounded-sm border border-transparent px-8 py-1 ml-4 text-sm font-semibold text-jg-grey-800 bg-jg-metal-50'
                        )}
                        text={closeBtnText}
                        btnSize="xs"
                        onClick={() => setIsOpen(false)}
                      />
                    )}
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

export default memo(StatusDialog)
