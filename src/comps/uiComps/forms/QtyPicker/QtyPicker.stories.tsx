import { ComponentStory, ComponentMeta } from '@storybook/react'
import QtyPicker from './QtyPicker'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Form/QtyPicker',
  component: QtyPicker,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof QtyPicker>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof QtyPicker> = (args) => <QtyPicker {...args} />

// const data= [
//   { max: 0, min: 5},
//   { max: 1, min: 10 },
//   { max: 0, min: 7 },
// ];

export const Basic = Template.bind({})
Basic.args = {
  fieldsize: 'sm',
  labelPosition: 'top',
  labelWidth: 120,

  onChange(value) {
    console.log(value)
  },
}
