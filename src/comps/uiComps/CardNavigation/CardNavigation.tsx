import { Tab, Transition } from '@headlessui/react'
import { Children, Fragment, PropsWithChildren, ReactElement, useState } from 'react'

import JGListbox from '../JGListbox/JGListbox'
import JGListboxItem from '../JGListbox/JGListboxItem'
import FadeIn from '../Transitions/FadeIn'
import { CompBaseProps } from '../_base/types/CompBaseProps'
import CardItem, { CardItemProps } from './CardItem'
import classNames from 'classnames'

type CardNavigationProps = CompBaseProps & {
  selectedIndex?: number
  defaultIndex?: number
  selectedValue?: string | number
  onChange?: (selectedNavigation: CardItemType) => void
}

type CardItemType = {
  name: string
  value: string | number
  icon?: React.ReactElement
}

const CardNavigation = ({ className, children, defaultIndex = 0, selectedValue, onChange }: CardNavigationProps) => {
  const items: CardItemType[] = []

  let selectedOptionIndex = -1

  if (Children.count(children)) {
    Children.map(children, (child, index) => {
      const item = child as ReactElement<PropsWithChildren<CardItemProps>>
      if (selectedValue && item.props.cardName === selectedValue) {
        selectedOptionIndex = index
      }
      items.push({ name: item.props.title || '', value: item.props.cardName || '', icon: item.props.icon })
    })
  }

  const [selectedCardIndex, setSelectedCardIndex] = useState<number>(selectedOptionIndex)
  //const handleTabChange = () => {}
  return (
    <>
      <div className={`lg:hidden ${className}`}>
        <JGListbox
          defaultIndex={selectedCardIndex}
          onChange={(selectedOption, selectedIndex) => {
            setSelectedCardIndex(selectedIndex)
          }}
        >
          {items.map((item, index) => {
            return <JGListboxItem key={index} icon={item.icon} name={item.name} value={item.value} />
          })}
        </JGListbox>
      </div>
      <Tab.Group
        vertical
        selectedIndex={selectedCardIndex}
        onChange={(seletedIndex) => {
          setSelectedCardIndex(seletedIndex)
        }}
      >
        <div className="flex">
          <Tab.List className="hidden visible  lg:flex flex-col w-0 lg:w-[10%] gap-1 border-r">
            {items.map((item, index) => {
              return (
                <Tab className="focus:outline-none " key={index} as={'button'}>
                  {({ selected }) => (
                    <CardItem key={index + 'item'} icon={item.icon} title={item.name} selected={selected} />
                  )}
                </Tab>
              )
            })}
          </Tab.List>
          <Tab.Panels className="flex flex-1 w-[90%]">
            {Children.map(children, (child, index) => {
              const item = child as ReactElement<PropsWithChildren<CardItemProps>>
              return (
                <Tab.Panel as={FadeIn} key={index} className="w-full focus:outline-none">
                  {item.props.children}
                </Tab.Panel>
              )
            })}
          </Tab.Panels>
        </div>
      </Tab.Group>
    </>
  )
}

export default CardNavigation
