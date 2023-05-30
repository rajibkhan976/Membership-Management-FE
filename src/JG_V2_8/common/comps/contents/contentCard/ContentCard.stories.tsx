import { ComponentStory, ComponentMeta } from '@storybook/react'
import ContentCard from './ContentCard'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Page Eelements/ContentCard',
  component: ContentCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof ContentCard>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ContentCard> = (args) => (
  <ContentCard {...args}>
    <div className="mt-2 w-full">Content body</div>
  </ContentCard>
)

export const Basic = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Basic.args = {
  heading: 'This is a card heading',
  className: 'w-full h-48',
}
