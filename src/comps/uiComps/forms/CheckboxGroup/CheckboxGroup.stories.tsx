import { ComponentStory, ComponentMeta } from '@storybook/react'
import NewCheckboxGroup from './CheckboxGroup'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Form/CheckboxGroup',
  component: NewCheckboxGroup,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: { helpText: { control: 'text' }, onChange: { action: 'clicked' } },
} as ComponentMeta<typeof NewCheckboxGroup>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof NewCheckboxGroup> = (args) => <NewCheckboxGroup {...args} />

export const Primary = Template.bind({})
Primary.parameters = {
  controls: { exclude: ['name', 'className', 'id'] },
}
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  type: 'radio',
  label: 'Vegetables',
  fieldsize: 'md',
  items: [
    {
      name: '1',
      value: 'Espn',
      cap: 'Espn',
    },
    {
      name: '2',
      value: 'Star sports',
      cap: 'Star sports',
    },
    {
      name: '3',
      value: 'Zee Bangla',
      cap: 'Zee Bangla',
    },
    {
      name: '4',
      value: 'HBO',
      cap: 'HBO',
    },
    {
      name: '5',
      value: 'Sony',
      cap: 'Sony',
    },
  ],
  value: 'Espn',
  helpText: <small className="text-purple-500">Select all the box that's applicable</small>,
}
