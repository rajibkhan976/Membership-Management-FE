import { ComponentStory, ComponentMeta } from '@storybook/react'
import Drawer from '@jg/common/comps/drawer/Drawer'
import { useState } from 'react'
import Button from '@comps/uiComps/Button/Button'
import { ReactComponent as RightCaretIcon } from '@jg/assets/images/RightCaretIcon.svg'
import DrawerContent from '@jg/common/comps/drawer/IterableDrawerContent'
import { ReactComponent as ClubIcon } from '@jg/assets/images/ClubIcon.svg'

export default {
  title: 'Basic/Drawer',
  component: Drawer,
  argTypes: {
    showFrom: {
      control: 'select',
      options: ['Left', 'Right'],
    },
  },
} as ComponentMeta<typeof Drawer>

const Template: ComponentStory<typeof Drawer> = (args) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<string>('Select')

  const closeDrawer = () => {
    setIsOpen(false)
  }

  const openDrawer = () => {
    setIsOpen(true)
  }

  const onSelect = (item: any) => {
    setSelectedItem(item?.name)
  }
  return (
    <>
      <div className="my-3">
        <Button
          btnColor="secondary"
          btnSize="sm"
          fillType="outline"
          icon={<RightCaretIcon className="inline-block my-auto" />}
          iconPosition="right"
          onClick={openDrawer}
          text={selectedItem}
        />
      </div>
      <Drawer
        {...{
          ...args,
          selectedItem,
          onSelect,
          isOpen,
          openDrawer,
          closeDrawer,
          drawerContent: (
            <DrawerContent
              drawerItems={[
                {
                  name: 'Backwater Triathlon',
                },
                {
                  name: 'Bridged Swim',
                },
                {
                  name: 'Cheltenham Triathlon',
                },
                {
                  name: 'Triathlon England',
                },
                {
                  name: 'Triathlon Scotland',
                },
              ]}
              handleClick={onSelect}
              handleClose={closeDrawer}
            />
          ),
        }}
      />
    </>
  )
}

export const LeftDrawer = Template.bind({})

LeftDrawer.args = {
  title: 'Select Club',
  shouldCloseOnBodyClick: false,
  showCrossButton: true,
  showFrom: 'Left',
}

export const RightDrawer = Template.bind({})

RightDrawer.args = {
  title: 'Select Club',
  shouldCloseOnBodyClick: true,
  showCrossButton: false,
  showFrom: 'Right',
}
