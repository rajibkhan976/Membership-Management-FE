import React, { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import classNames from 'classnames'

type ListItemProps = {
  name?: string
  id?: number
  unavailable?: boolean
  icon?: JSX.Element
}

export type ListBoxProps = {
  name?: string
  className?: string
  label?: string
  labelposition?: 'top' | 'left'
  labelwidth?: number
  id?: string
  children?: import('react').ReactNode
  as?: string
  items?: ListItemProps[]
  hideLabel?: boolean
  selected?: any
  handleChange?: (e: { id: number; name: string; unavailable: boolean; icon: JSX.Element }) => void
  helpText?: React.ReactNode
  asterisk?: boolean
}

export default function ListBox({ items = [], ...props }: ListBoxProps) {
  const {
    className = 'mb-5',
    label,
    labelposition = 'top',
    labelwidth = 120,
    hideLabel = false,
    handleChange = () => {},
    asterisk,
  } = props
  const labelPos = classNames(labelposition === 'left' ? 'flex items-center' : '', className)
  const labelCls = classNames(
    'flex text-jg-metal-900 font-medium text-sm leading-4 dark:text-white',
    hideLabel ? ' hidden visible ' : ' block ',
    labelposition === 'left' ? '' : 'mb-2'
  )
  const labelWidStyle = classNames(labelwidth)

  return (
    <div className={labelPos}>
      <div>
        <label className={labelCls} style={{ width: labelWidStyle }}>
          {label}
          {asterisk && <span className={'text-jg-red-500'}>*</span>}
        </label>
      </div>
      <div className="w-full">
        <Listbox value={props.selected} onChange={(e) => props.handleChange && props.handleChange(e)}>
          <div className="relative mt-1">
            <Listbox.Button className="relative dark:bg-gray-600 dark:text-white w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
              <div className="flex items-center truncate">
                {props.selected?.icon !== undefined ? <span className="mr-1">{props.selected.icon}</span> : null}
                <span>{props.selected?.name || ''}</span>
              </div>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute dark:bg-gray-600 dark:text-white w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
                {items.map((item) => (
                  <Listbox.Option
                    key={item.id}
                    className={({ active }) =>
                      `cursor-default select-none relative py-2 pl-4 pr-4 ${
                        active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'
                      }`
                    }
                    value={item}
                    disabled={item.unavailable}
                  >
                    {({ selected }) => (
                      <>
                        <div className={`flex items-center truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                          {item.icon !== undefined ? <span className="mr-1">{item.icon}</span> : null}
                          <span>{item.name}</span>
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
