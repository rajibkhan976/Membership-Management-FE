import { ComponentStory, ComponentMeta } from '@storybook/react'
import TextArea from './TextArea'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Form/TextArea',
  component: TextArea,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    helpText: { control: 'text' },
    value: { control: 'text' },
    onValueChange: { action: 'change' },
  },
} as ComponentMeta<typeof TextArea>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TextArea> = (args) => <TextArea {...args} />

export const Primary = Template.bind({})
Primary.parameters = {
  controls: {
    exclude: ['value', 'name', 'className', 'id', 'labelClass', 'textAreaClass', 'containerClass'],
  },
}
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  label: 'TextArea Basic',
  fieldsize: 'md',
  labelPosition: 'top',
  labelWidth: 125,
  rows: 4,
  disabled: false,
  placeholder: 'Enter text',
}
