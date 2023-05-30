import { ComponentStory, ComponentMeta } from '@storybook/react'
import EventInfoCard from './EventInfoCard'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Events/EventInfoCard',
  component: EventInfoCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof EventInfoCard>

export const eventInfoData = {
  docId: 0,
  name: 'Half Marathon 1',
  reference: undefined,
  isFeatured: true,
  isPrivate: false,
  locationType: undefined,
  status: undefined,
  imgSrc:
    'https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&q=80',
  category: 'Coach',
  subCategories: undefined,
  address: {
    address1: 'Address line 1',
    address2: '',
    address3: '',
    town: 'London city',
    county: 'London',
    postCode: 'PO 123',
    country: 'United Kingdom',
  },
  latlng: undefined,
  ownerEntity: {
    id: 0,
    name: 'Harrington Club',
    imgSrc: 'https://randomuser.me/api/portraits/med/men/75.jpg',
  },
  starts: {
    date: '2022-06-10',
    time: '6:30',
    timezone: 'BST',
    timezoneId: 2,
  },
  ends: {
    date: '2022-06-20',
    time: '6:30',
    timezone: 'BST',
    timezoneId: 2,
  },
  bookingEnds: {
    date: '2022-06-20',
    time: '6:30',
    timezone: 'BST',
    timezoneId: 2,
  },
  timezoneId: undefined,
  hideDateTime: false,
  calendarInviteEnabled: false,
  priceSettings: {
    max: 30,
    min: 20,
    source: '',
    options: {},
  },
  tickets: [],
}
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof EventInfoCard> = (args) => <EventInfoCard {...args} />

export const Basic = Template.bind({})
Basic.args = {
  eventInfo: eventInfoData,
}
