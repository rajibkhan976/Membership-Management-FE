import { Children, cloneElement, Fragment, PropsWithChildren, ReactElement, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'

import Button from '@comps/uiComps/Button/Button'
import { CompBaseProps } from '../_base/types/CompBaseProps'
import JGListboxItem, { JGListboxItemProps } from './JGListboxItem'
import { MenuDown } from '../Icons'
import { SelectorIcon } from '@heroicons/react/outline'

type JGListboxProps = CompBaseProps & {
  defaultIndex?: number
  selectedValue?: string | number
  emptyText?: string
  type?: 'button' | 'input'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  onChange?: (selectedOption: JGListboxOptionType, selectedIndex: number) => void
}
type JGListboxOptionType = {
  name: string
  value: string | number
  icon?: import('react').ReactNode
}
const JGListbox = ({
  className = 'w-auto',
  children,
  defaultIndex = 0,
  selectedValue,
  emptyText = '',
  type = 'button',
  size = 'lg',
  onChange,
}: JGListboxProps) => {
  const items: JGListboxOptionType[] = []
  let selectedOptionIndex = -1

  if (Children.count(children)) {
    Children.map(children, (child, index) => {
      const item = child as ReactElement<PropsWithChildren<JGListboxItemProps>>
      if (selectedValue && String(item.props.value) === String(selectedValue)) {
        selectedOptionIndex = index
      }
      items.push({ name: item.props.name || '', value: item.props.value || '', icon: item.props.icon })
    })
  } else {
    items.push({ name: emptyText, value: '' })
  }

  if (selectedOptionIndex == -1) {
    selectedOptionIndex = defaultIndex
  }
  const [selectedOption, setSelectedOption] = useState<JGListboxOptionType>({ name: emptyText, value: '' })

  useEffect(() => {
    if (selectedOptionIndex > -1) {
      const item = Children.toArray(children)[selectedOptionIndex] as ReactElement<
        PropsWithChildren<JGListboxItemProps>
      >

      setSelectedOption({ name: item.props.name || '', value: item.props.value || '', icon: item.props.icon })
    }
  }, [selectedValue, defaultIndex])

  useEffect(() => {}, [selectedValue])
  useEffect(() => {
    let count = Children.count(children) - 1

    while (count > -1) {
      const item = Children.toArray(children)[count] as ReactElement<PropsWithChildren<JGListboxItemProps>>
      if (String(item.props.value) === String(selectedOption.value)) {
        onChange?.(selectedOption, count)
        break
      }
      count--
    }
  }, [selectedOption])
  return (
    <div className={className}>
      <Listbox
        value={selectedOption}
        onChange={(selectedOption) => {
          setSelectedOption(selectedOption)
        }}
      >
        <div className="relative">
          <Listbox.Button className="w-full outline-none">
            <Button
              as="span"
              className={type === 'button' ? 'ring-jg-grey-300 font-medium' : 'ring-0 font-medium'}
              btnSize={size}
              fillType="outline"
              block={true}
              text={
                <span>
                  {selectedOption.name}
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <SelectorIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                  </span>{' '}
                </span>
              }
              iconPosition="left"
              btnColor={type === 'button' ? 'primary' : 'secondary'}
              icon={selectedOption.icon}
            />
          </Listbox.Button>
          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Listbox.Options className="absolute z-50 mt-1 max-h-72 w-full overflow-auto rounded-sm bg-white py-1 shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {Children.map(children, (child, index) => {
                const option = child as ReactElement<PropsWithChildren<JGListboxItemProps>>
                if (selectedValue && String(option.props.value) === String(selectedValue)) {
                  selectedOptionIndex = index
                }
                return (
                  <Listbox.Option value={items[index]} key={index}>
                    {({ active }) => {
                      return cloneElement(option, { active, selected: selectedOption.value === items[index].value })
                    }}
                  </Listbox.Option>
                )
              })}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default JGListbox
