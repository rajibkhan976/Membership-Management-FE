import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import FeaturedEventCard from '@jg/common/comps/FeaturedEventCard'
import JgCarousel from '@comps/uiComps/JgCarousel/JgCarousel'

export default {
  title: 'Basic/JgCarousel',
  component: JgCarousel,
  argTypes: {
    // backgroundColor: { control: 'color' },
    items: { control: 'radio', options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  },
} as ComponentMeta<typeof JgCarousel>

type ArgTypes = {
  items: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
}

const Template: ComponentStory<React.FC<ArgTypes>> = ({ items = 4 }) => (
  <div className="flex flex-col justify-center overflow-hidden max-w-screen-xl">
    <JgCarousel>
      {people.slice(0, items).map((person, index) => (
        <FeaturedEventCard
          key={index}
          name={person.name}
          title={person.title}
          fee={person.fee}
          address={person.address}
          logo={person.logo}
          date={person.date}
          distance={person.distance}
          attendees={person.attendees}
          imageUrl={person.imageUrl}
        />
      ))}
    </JgCarousel>
    <button className="w-fit mx-auto px-6 py-3 bg-[#008345] text-white rounded-md">See All</button>
  </div>
)

export const JgCarouselResponsive = Template.bind({})

// DATA
const people = [
  {
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
  },
  {
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
  },
  {
    name: 'Doongala Pony Club',
    title: 'Paradigm Representative',
    fee: 'Free',
    address: '123 Main St, New York, NY 10001',
    logo: 'https://randomuser.me/api/portraits/med/men/75.jpg',
    date: ['sun', '10 apr 2022', '09:00 AEST'],
    distance: '12 km',
    attendees: 102,
    imageUrl:
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&q=80',
  },
  {
    name: 'Doongala Pony Club',
    title: 'Paradigm Representative',
    fee: 'Free',
    address: '123 Main St, New York, NY 10001',
    logo: 'https://randomuser.me/api/portraits/med/men/75.jpg',
    date: ['sun', '10 apr 2022', '09:00 AEST'],
    distance: '12 km',
    attendees: 102,
    imageUrl:
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&q=80',
  },
  {
    name: 'Doongala Pony Club',
    title: 'Paradigm Representative',
    fee: 'Free',
    address: '123 Main St, New York, NY 10001',
    logo: 'https://randomuser.me/api/portraits/med/men/75.jpg',
    date: ['sun', '10 apr 2022', '09:00 AEST'],
    distance: '12 km',
    attendees: 102,
    imageUrl:
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&q=80',
  },
  {
    name: 'Doongala Pony Club',
    title: 'Paradigm Representative',
    fee: 'Free',
    address: '123 Main St, New York, NY 10001',
    logo: 'https://randomuser.me/api/portraits/med/men/75.jpg',
    date: ['sun', '10 apr 2022', '09:00 AEST'],
    distance: '12 km',
    attendees: 102,
    imageUrl:
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&q=80',
  },
  {
    name: 'Doongala Pony Club',
    title: 'Paradigm Representative',
    fee: 'Free',
    address: '123 Main St, New York, NY 10001',
    logo: 'https://randomuser.me/api/portraits/med/men/75.jpg',
    date: ['sun', '10 apr 2022', '09:00 AEST'],
    distance: '12 km',
    attendees: 102,
    imageUrl:
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&q=80',
  },
  {
    name: 'Doongala Pony Club',
    title: 'Paradigm Representative',
    fee: 'Free',
    address: '123 Main St, New York, NY 10001',
    logo: 'https://randomuser.me/api/portraits/med/men/75.jpg',
    date: ['sun', '10 apr 2022', '09:00 AEST'],
    distance: '12 km',
    attendees: 102,
    imageUrl:
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&q=80',
  },
  {
    name: 'Doongala Pony Club',
    title: 'Paradigm Representative',
    fee: 'Free',
    address: '123 Main St, New York, NY 10001',
    logo: 'https://randomuser.me/api/portraits/med/men/75.jpg',
    date: ['sun', '10 apr 2022', '09:00 AEST'],
    distance: '12 km',
    attendees: 102,
    imageUrl:
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&q=80',
  },
  {
    name: 'Doongala Pony Club',
    title: 'Paradigm Representative',
    fee: 'Free',
    address: '123 Main St, New York, NY 10001',
    logo: 'https://randomuser.me/api/portraits/med/men/75.jpg',
    date: ['sun', '10 apr 2022', '09:00 AEST'],
    distance: '12 km',
    attendees: 102,
    imageUrl:
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&q=80',
  },
]
