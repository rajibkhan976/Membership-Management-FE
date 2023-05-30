import { ComponentStory, ComponentMeta } from '@storybook/react'
import SimpleSelect from './SimpleSelect'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'form/SimpleSelect',
  component: SimpleSelect,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    helpText: { control: 'text' },
  },
} as ComponentMeta<typeof SimpleSelect>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SimpleSelect> = (args) => <SimpleSelect {...args} />
Template.parameters = {
  controls: {
    exclude: ['value', 'name', 'className', 'id', 'onChange', 'fieldsize'],
  },
}

const data = [
  { name: 'All Dates', value: 'all' },
  { name: 'This Week', value: 'thisWeek' },
  { name: 'This Month', value: 'thisMonth' },
  { name: 'Next Month', value: 'nextMonth' },
]

export const Basic = Template.bind({})
Basic.args = {
  items: data,
  labelPosition: 'top',
  labelWidth: 120,
}

export const WithValue = Template.bind({})
WithValue.args = {
  items: data,
  labelPosition: 'top',
  labelWidth: 120,
  value: 'thisMonth',
}
