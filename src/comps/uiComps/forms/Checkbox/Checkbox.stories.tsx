import { ComponentStory, ComponentMeta } from '@storybook/react'
import Checkbox from './Checkbox'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Form/Checkbox',
  component: Checkbox,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: { helpText: { control: 'text' }, value: { control: 'boolean' } },
  controls: { exclude: ['value', 'name', 'className', 'id'] },
} as ComponentMeta<typeof Checkbox>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Checkbox> = (args) => <Checkbox {...args} />

export const Basic = Template.bind({})
Basic.parameters = {
  controls: { exclude: ['value', 'name', 'className', 'id'] },
}
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Basic.args = {
  fieldsize: 'sm',
  //  value: true, // true-flase
  label: 'Option 1',
  indeterminate: true,
  name: 'option1',
}
