import { Fragment, memo } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import classNames from 'classnames'
import { XIcon } from '@heroicons/react/solid'

type DrawerProps = {
  title?: string | React.ReactElement
  shouldCloseOnBodyClick?: boolean
  showCrossButton?: boolean
  drawerContent?: React.ReactElement
  drawerAction?: React.ReactElement
  showFrom?: string
  onSelect?: (item: any) => void
  isOpen: boolean
  openDrawer: () => void
  closeDrawer: () => void
  size?: 'sm' | 'md'
}

const Drawer = (props: DrawerProps): React.ReactElement => {
  const {
    title,
    shouldCloseOnBodyClick,
    showCrossButton,
    drawerContent,
    drawerAction,
    showFrom = 'Right',
    onSelect,
    isOpen,
    openDrawer,
    closeDrawer,
    size = 'sm',
  } = props

  let enterFrom = 'absolute -right-96'
  let enterTo = 'absolute right-0'
  let leaveFrom = 'absolute right-0'
  let leaveTo = 'absolute -right-96'

  if (showFrom && showFrom.toLowerCase() === 'left') {
    enterFrom = 'absolute -left-96'
    enterTo = 'absolute left-0'
    leaveFrom = 'absolute left-0'
    leaveTo = 'absolute -left-96'
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog open={isOpen} as="div" onClose={shouldCloseOnBodyClick ? closeDrawer : openDrawer}>
        <div id="justgo-app" className="relative z-[9999]">
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-visible">
            <div className="flex min-h-screen items-start justify-end text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom={enterFrom}
                enterTo={enterTo}
                leave="ease-in duration-200"
                leaveFrom={leaveFrom}
                leaveTo={leaveTo}
              >
                <Dialog.Panel
                  as="div"
                  className={classNames(
                    'h-full flex flex-col justify-between overflow-hidden bg-white text-left align-middle shadow-xl transition-all',
                    size === 'sm' ? 'lg:w-[600px] md:w-[400px]' : 'lg:w-[900px] md:w-[80%]',
                    'w-full'
                  )}
                >
                  <Dialog.Title as="div" className="flex bg-gray-200">
                    {typeof title === 'string' && (
                      <h3 className="text-sm font-bold leading-6 text-gray-900 mx-2 my-3.5">{title}</h3>
                    )}
                    {typeof title !== 'string' && title}
                    {showCrossButton && (
                      <button onClick={closeDrawer} className="absolute right-2 top-3.5 w-6 h-6 text-gray-600">
                        <XIcon />
                      </button>
                    )}
                  </Dialog.Title>
                  <Dialog.Description as="div" className="flex flex-col flex-grow min-h-0">
                    <div className={'flex-1 overflow-y-auto'}>{drawerContent}</div>
                  </Dialog.Description>
                  {drawerAction && <div className="p-2 border-t border-jg-grey-300">{drawerAction}</div>}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default memo(Drawer)
