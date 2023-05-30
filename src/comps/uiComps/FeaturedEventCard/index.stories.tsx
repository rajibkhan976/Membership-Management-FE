import { ComponentStory, ComponentMeta } from '@storybook/react'
import FeaturedEventCard from '@jg/common/comps/FeaturedEventCard'

export default {
  title: 'Basic/FeaturedEventCard',
  component: FeaturedEventCard,
  argTypes: {
    // backgroundColor: { control: 'color' },
    // size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  },
} as ComponentMeta<typeof FeaturedEventCard>

const Template: ComponentStory<typeof FeaturedEventCard> = (args) => <FeaturedEventCard {...args} />

export const SingleFeaturedEventCard = Template.bind({})

SingleFeaturedEventCard.args = {
  name: 'Doongala Pony Club',
  title: 'Paradigm Representative',
  fee: 'Free',
  address: '123 Main St, New York, NY 10001',
  logo: 'https://randomuser.me/api/portraits/med/men/75.jpg',
  date: ['sun', '10 apr 2022', '09:00 AEST'],
  distance: '12 km',
  attendees: 102,
  imageUrl:
    'https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&q=80',
}
