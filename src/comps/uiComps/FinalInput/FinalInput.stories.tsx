import { ComponentMeta, ComponentStory } from '@storybook/react'
import InputField from './input'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/FinalInputField ',
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

export const FinalInputFieldValue = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
FinalInputFieldValue.args = {
  label: 'Hello world',
  placeholder: 'Type here...',
  required: false,
  iconRight: false, 
  iconLeft: false,
}

const Template1: ComponentStory<typeof InputField> = (args) => <InputField {...args}>Input Field Child</InputField>
export const InputFieldWithChild = Template1.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
InputFieldWithChild.args = {}
