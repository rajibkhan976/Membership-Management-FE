import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import ListBox from './ListBox'

import { MdScheduleSend } from 'react-icons/md'
import { CgInbox } from 'react-icons/cg'
import { BiCheckDouble } from 'react-icons/bi'
import { TiDocument } from 'react-icons/ti'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Form/ListBox',
  component: ListBox,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof ListBox>

const items = [
  {
    id: 1,
    name: 'All',
    unavailable: false,
    icon: <CgInbox />,
  },
  {
    id: 2,
    name: 'Drafts',
    unavailable: false,
    icon: <TiDocument />,
  },
  {
    id: 3,
    name: 'Scheduled',
    unavailable: false,
    icon: <MdScheduleSend />,
  },
  {
    id: 4,
    name: 'Sent',
    unavailable: true,
    icon: <BiCheckDouble />,
  },
]

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ListBox> = (args) => {
  const [selected, setSelected] = React.useState(items[0])

  const handleChange = (e: { id: number; name: string; unavailable: boolean; icon: JSX.Element }) => {
    setSelected(e)
    console.log(e)
  }
  return (
    <>
      <ListBox {...{ ...args, selected, items, handleChange }} />
    </>
  )
}

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  className: '',
  label: 'User',
  labelposition: 'top',
  labelwidth: 120,
  hideLabel: true,
}
