import { ComponentStory, ComponentMeta } from '@storybook/react'
import Icons from './Icons'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Basic/Icons ',
  component: Icons,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Icons>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Icons> = () => <Icons />

export const Collections = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Collections.args = {}
