import { ComponentStory, ComponentMeta } from '@storybook/react'
import { PrinterIcon, SaveIcon, ClipboardCopyIcon } from '@heroicons/react/solid'
import SplitButton, { SplitButtonItem } from './SplitButton'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Basic/SplitButton',
  component: SplitButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof SplitButton>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SplitButton> = (args) => <SplitButton {...args} />

export const Basic = Template.bind({})

const items: SplitButtonItem[] = [
  {
    text: 'Print',
    name: 'print',
  },
  {
    text: 'Save',
    name: 'save',
  },
  {
    text: 'Copy',
    name: 'copy',
  },
]
Basic.args = {
  text: 'Button Primary',
  btnSize: 'lg',
  btnColor: 'primary',
  fillType: 'solid',
  items,
}
const itemsWithIcons: SplitButtonItem[] = [
  {
    text: 'Print',
    name: 'print',
    icon: <PrinterIcon />,
  },
  {
    text: 'Save',
    name: 'save',
    icon: <SaveIcon />,
  },
  {
    text: 'Copy',
    name: 'copy',
    icon: <ClipboardCopyIcon />,
  },
]
export const WithIcon = Template.bind({})

WithIcon.args = {
  text: 'Button Primary',
  btnSize: 'lg',
  btnColor: 'primary',
  fillType: 'solid',
  items: itemsWithIcons,
}
