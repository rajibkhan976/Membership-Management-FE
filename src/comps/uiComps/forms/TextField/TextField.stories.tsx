import { CheckIcon, UserAddIcon } from '@heroicons/react/solid'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import TextField from './TextField'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Form/TextField',
  component: TextField,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    helpText: { control: 'text' },
    value: { control: 'text' },
    onValueChange: { action: 'change' },
  },
} as ComponentMeta<typeof TextField>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TextField> = (args) => <TextField {...args} />

export const Primary = Template.bind({})
Primary.parameters = {
  controls: {
    exclude: ['value', 'name', 'className', 'id', 'labelClassName', 'inputClassName', 'onChange'],
  },
}
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  label: 'Your Name:',
  initialValue: '',
  placeholder: 'Enter your name',
  id: 'someid',
  type: 'text',
  fieldsize: 'md',
  labelPosition: 'top',
  required: true,
  labelWidth: 120,
  helpText: (
    <p className="text-green-600 text-sm">
      We won&apos;t share it with anyone, promise!{' '}
      <a className="text-blue-700" href="#">
        Click Here!
      </a>
    </p>
  ),
  leftIcon: <UserAddIcon />,
  rightIcon: <CheckIcon />,
}
