import { ComponentStory, ComponentMeta } from '@storybook/react'
import LoaderOverlay from './LoaderOverlay'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Page Eelements/LoaderOverlay',
  component: LoaderOverlay,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof LoaderOverlay>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof LoaderOverlay> = (args) => (
  <div className="h-[500px] w-[500px]">
    <LoaderOverlay />
  </div>
)

export const Basic = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Basic.args = {}
