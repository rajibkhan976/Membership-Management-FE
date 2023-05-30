import { ComponentStory, ComponentMeta } from '@storybook/react'
import RadioButton from './radioButton'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/RadioButton ',
  component: RadioButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof RadioButton>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof RadioButton> = (args) => <RadioButton {...args} />

const notificationMethods = [{ id: 'email', title: 'Email' }]
export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  radioButton: notificationMethods,
  fontSize: 'small',
  orientation: 'horizontal',
  disable: false,
  spacing: 4,
  smallScreenSpacing: 5,
  heading: 'Notification method',
  helpText: 'How do you prefer to receive notifications?',
  HeadingclassName: 'text-base font-medium text-gray-900',
  HelpTextclassName: 'text-sm leading-5 text-gray-500',
}
