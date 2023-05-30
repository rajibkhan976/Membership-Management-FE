import { ComponentStory, ComponentMeta } from '@storybook/react'
import ContentSection from './ContentSection'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Page Eelements/ContentSection ',
  component: ContentSection,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof ContentSection>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ContentSection> = (args) => (
  <ContentSection {...args}>This is content body</ContentSection>
)

export const Basic = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Basic.args = {
  heading: 'My Club Events',
  caption: 'Which clubs you have registered',
  bgColor: 'grey',
}
