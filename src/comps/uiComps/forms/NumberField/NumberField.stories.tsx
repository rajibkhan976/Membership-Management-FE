import { CheckIcon, CalculatorIcon } from '@heroicons/react/solid'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import NumberField from './NumberField'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Form/NumberField',
  component: NumberField,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    helpText: { control: 'text' },
    value: { control: 'number' },
    onValueChange: { action: 'change' },
  },
} as ComponentMeta<typeof NumberField>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof NumberField> = (args) => <NumberField {...args} />

export const Primary = Template.bind({})
Primary.parameters = {
  controls: {
    exclude: ['value', 'name', 'className', 'id', 'labelClassName', 'inputClassName', 'onChange'],
  },
}
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  label: 'Your Number:',
  initialValue: '',
  placeholder: 'Enter your number',
  id: 'someid',
  fieldsize: 'md',
  labelPosition: 'top',
  required: true,
  labelWidth: 120,
  helpText: 'You entered nothing',
  leftIcon: <CalculatorIcon />,
  rightIcon: <CheckIcon />,
}
