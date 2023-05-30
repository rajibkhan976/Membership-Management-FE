import { ComponentStory, ComponentMeta } from '@storybook/react'
import { UserIcon } from '@heroicons/react/solid'
import Button from './Button'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Basic/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Button>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Primary = Template.bind({})

Primary.args = {
  text: 'Button Primary',
  btnSize: 'lg',
  btnColor: 'primary',
  disabled: false,
  fillType: 'solid',
  rounded: false,
}

export const WithIcon = Template.bind({})

WithIcon.args = {
  text: 'Button with icon',
  btnSize: 'lg',
  btnColor: 'primary',
  disabled: false,
  fillType: 'solid',
  rounded: false,
  icon: <UserIcon />,
  iconPosition: 'left',
}
