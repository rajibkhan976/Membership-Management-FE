import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'

type JustGoSplitButtonProps = {
  options: dropDownOptions[]
  className?: string
  activeClass?: string
}
type dropDownOptions = {
  icon?: JSX.Element
  title: string
  action?: () => void
}

const JustGoSplitButton = ({ options, className }: JustGoSplitButtonProps) => {
  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div className="flex items-center border border-black rounded-sm pl-2 pr-2 pt-2 pb-2">
          <span className="mr-2 font-medium flex items-center" onClick={options[0].action && options[0].action}>
            {options[0].icon || ''}
            {options[0].title}
          </span>
          <span>|</span>
          <Menu.Button>
            <svg
              className="mr-1 ml-1"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4.66699 6.6665L8.00033 9.99984L11.3337 6.6665H4.66699Z" fill="#263238" />
            </svg>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute sm:left-0 sm:right-auto md:left-auto md:right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
            <div className="px-1 py-1 ">
              {options.slice(1).map((option, index) => (
                <Menu.Item key={index}>
                  <button
                    onClick={option.action && option.action}
                    className={
                      'bg-violet-500 text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm'
                    }
                  >
                    {option.icon || ''}
                    {option.title}
                  </button>
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  )
}

function EditInactiveIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 13V16H7L16 7L13 4L4 13Z" fill="#fffff" stroke="#000000" strokeWidth="2" />
    </svg>
  )
}

function DuplicateInactiveIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4H12V12H4V4Z" fill="#fffff" stroke="#000000" strokeWidth="2" />
      <path d="M8 8H16V16H8V8Z" fill="#fffff" stroke="#000000" strokeWidth="2" />
    </svg>
  )
}

export default JustGoSplitButton
