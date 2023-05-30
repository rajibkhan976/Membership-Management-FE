import { ComponentMeta, ComponentStory } from '@storybook/react'
import InputField from './InputField'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/InputField ',
  component: InputField,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof InputField>

const data = [
  {
    label: 'First Name',
    value: 'First Name',
  },

  {
    label: 'Second Name',
    value: 'First Name',
  },
]

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof InputField> = (args) => <InputField {...args} />

export const InputFieldValue = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
InputFieldValue.args = {
  label: 'Hello world',
  className: '',
  a: 'text-yellow-500',
  inputItems: data,
  orientation: 'vertical',
  visibility: false,
  horizontalSpace: 5,
}

const Template1: ComponentStory<typeof InputField> = (args) => <InputField {...args}>Input Field Child</InputField>
export const InputFieldWithChild = Template1.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
InputFieldWithChild.args = {}
