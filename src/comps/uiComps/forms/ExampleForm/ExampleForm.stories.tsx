import { ComponentStory, ComponentMeta } from '@storybook/react'
import ExampleForm from './ExampleForm'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Form/ExampleForm',
  component: ExampleForm,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: { helpText: { control: 'text' }, value: { control: 'text' } },
} as ComponentMeta<typeof ExampleForm>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ExampleForm> = (args) => <ExampleForm {...args} />

export const Primary = Template.bind({})

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {}
