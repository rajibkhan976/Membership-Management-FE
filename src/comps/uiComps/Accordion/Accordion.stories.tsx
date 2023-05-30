import { ComponentStory, ComponentMeta } from '@storybook/react'
import Accordion from './Accordion'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Basic/Accordion ',
  component: Accordion,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Accordion>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Accordion> = (args) => <Accordion {...args} />

const data = [
  {
    title: "What's the best thing about Switzerland?",
    content:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    isOpen: false,
  },
  {
    title: 'How do you make holy water?',
    content:
      'You boil the hell out of it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam aut tempora vitae odio inventore fuga aliquam nostrum quod porro. Delectus quia facere id sequi expedita natus.',
    isOpen: true,
  },
  {
    title: 'What do you call someone with no body and no nose?',
    content: <h1>Test Text ....</h1>,
    isOpen: false,
  },
  // More questions...
]
export const Basic = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Basic.args = {
  items: data,
}
