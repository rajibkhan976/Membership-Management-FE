import { ComponentStory, ComponentMeta } from '@storybook/react'
import CategoryCard from './CategoryCard'
import { CategoryCardProps } from './CategoryCardProps'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Events/CategoryCard',
  component: CategoryCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof CategoryCard>

const CategoryCardData: CategoryCardProps = {
  eventCategory: {
    displayName: 'Custom Event',
    imgSrc:
      'https://unsplash.com/photos/aZVpxRydiJk/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjU1ODg2NzMw&force=true&w=640',
    name: '',
  },
  subItemCount: 123,
}
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CategoryCard> = (args) => <CategoryCard {...args} />

export const Basic = Template.bind({})
Basic.args = {
  eventCategory: {
    displayName: 'Custom Event',
    imgSrc:
      'https://unsplash.com/photos/aZVpxRydiJk/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjU1ODg2NzMw&force=true&w=640',
    name: '',
  },
  subItemCount: 123,
}
