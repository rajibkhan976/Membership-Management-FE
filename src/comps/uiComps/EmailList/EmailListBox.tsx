import { Fragment, memo, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import type { EmailListBoxProps, EmailListItemProps } from './Interfaces'
import { MenuDown } from '../Icons'

const EmailListBox = ({ items, ...props }: EmailListBoxProps) => {
  const { className = '', label, labelposition = 'top', labelwidth = 120, hideLabel = false, handleChange } = props
  const [selectedItem, setSelectedItem] = useState<EmailListItemProps>(items[0])
  const labelPos = classNames(labelposition === 'left' ? 'flex items-center' : '', className)
  const labelCls = classNames(
    'flex text-gray-400 dark:text-white',
    hideLabel ? ' hidden visible ' : ' block ',
    labelposition === 'left' ? '' : 'mb-2'
  )
  const labelWidStyle = classNames(labelwidth)

  return (
    <div className={labelPos}>
      <div>
        <label className={labelCls} style={{ width: labelWidStyle }}>
          {label}
        </label>
      </div>
      <div className="w-full">
        <Listbox
          value={props.selected}
          onChange={(e) => {
            handleChange(e.status)
            setSelectedItem(e)
          }}
        >
          <div className="relative">
            <Listbox.Button className="relative dark:bg-gray-600 dark:text-white w-full py-2 px-2 pr-10 text-left bg-white border border-jg-metal-50 cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
              <div className="flex items-center gap-2 truncate text-jg-metal-700">
                <span>{selectedItem.icon}</span>
                <span>{selectedItem.title}</span>
              </div>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <MenuDown className="text-jg-metal-700" aria-hidden="true" />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute dark:bg-gray-600 dark:text-white w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black z-[99] ring-opacity-5 focus:outline-none sm:text-sm">
                {items.map((item, index: number) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      `cursor-default select-none relative py-2 pl-4 pr-4 ${
                        active ? 'text-amber-900 bg-amber-100' : 'text-jg-metal-700'
                      }`
                    }
                    value={item}
                  >
                    {({ selected }) => (
                      <>
                        <div className={`flex items-center truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                          {item.icon !== undefined ? <span className="mr-1">{item.icon}</span> : null}
                          <span>{item.title}</span>
                        </div>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    </div>
  )
}

export default memo(EmailListBox)
