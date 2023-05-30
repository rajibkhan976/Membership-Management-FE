import { ComponentStory, ComponentMeta } from '@storybook/react'
import Calendar from '@jg/common/comps/calendar/Calendar'
import moment from 'moment'

export default {
  title: 'Basic/Calendar',
  component: Calendar,
  argTypes: {
    dateOnTopLeft: {
      control: 'date',
    },
    startWeekFrom: {
      control: 'select',
      options: ['Mon', 'Monday', 1, 'Sun', 'Sunday', 0],
    },
  },
} as ComponentMeta<typeof Calendar>

const Template: ComponentStory<typeof Calendar> = (args) => <Calendar {...args} />

export const EventCalendar = Template.bind({})

EventCalendar.args = {
  viewItems: ['Week', 'Month', 'List', 'Day', 'Year'],
  startWeekFrom: 'Mon',
  eventsList: [
    {
      id: 101,
      name: 'Show Jumping Championship 2022',
      time: '08:00 AEDT',
      date: '2022-06-04',
      label: 'green',
    },
    {
      id: 102,
      name: 'Monbulk Pony Club Rally - April 2022',
      time: '09:00 AEST',
      date: '2022-06-05',
      label: 'green',
    },
    {
      id: 103,
      name: 'Cobram Horse & Pony Club 3 Day Camp',
      time: '08:10 AEDT',
      date: '2022-06-05',
      label: 'blue',
    },
    {
      id: 104,
      name: 'Doongala April Rally (Members Only)',
      time: '12:15 AEDT',
      date: '2022-06-05',
      label: 'red',
    },
    {
      id: 105,
      name: 'Design review in UK',
      time: '09:10 AEDT',
      date: '2022-06-06',
      label: 'green',
    },
    {
      id: 106,
      name: 'Design review in UK',
      time: '10:30 AEST',
      date: '2022-06-06',
      label: 'green',
    },
    {
      id: 107,
      name: 'Cobram Horse & Pony Club 3 Day Camp',
      time: '12:30 BST',
      date: '2022-06-06',
      label: 'green',
    },
    {
      id: 108,
      name: 'Show Jumping Championship 2022',
      time: '14:05 AEST',
      date: '2022-06-06',
      label: 'green',
    },
    {
      id: 109,
      name: 'Sales meeting in Australia',
      time: '11:30 AEDT',
      date: '2022-06-06',
      label: 'green',
    },
    {
      id: 110,
      name: 'Tall Timbers Pony Club April Rally',
      time: '08:30 AEDT',
      date: '2022-06-26',
      label: 'green',
    },
    {
      id: 111,
      name: 'Sales meeting in Canada',
      time: '15:00 IST',
      date: '2022-06-26',
      label: 'blue',
    },
    {
      id: 112,
      name: 'Show Jumping Championship 2022',
      time: '13:30 AEDT',
      date: '2022-06-26',
      label: 'red',
    },
    {
      id: 113,
      name: 'Sales meeting in China',
      time: '10:00 AEST',
      date: '2022-06-26',
      label: 'green',
    },
    {
      id: 114,
      name: 'Monbulk Pony Club Rally - April 2022',
      time: '09:00 AEST',
      date: '2022-07-06',
      label: 'green',
    },
    {
      id: 115,
      name: 'Cobram Horse & Pony Club 3 Day Camp',
      time: '08:10 AEDT',
      date: '2022-07-06',
      label: 'blue',
    },
    {
      id: 116,
      name: 'Doongala April Rally (Members Only)',
      time: '12:15 AEDT',
      date: '2022-07-06',
      label: 'red',
    },
    {
      id: 117,
      name: 'Sales meeting in China',
      time: '10:00 AEST',
      date: '2023-01-06',
      label: 'yellow',
    },
    {
      id: 118,
      name: 'Monbulk Pony Club Rally - April 2022',
      time: '09:00 AEST',
      date: '2023-01-06',
      label: 'purple',
    },
    {
      id: 119,
      name: 'Cobram Horse & Pony Club 3 Day Camp',
      time: '08:10 AEDT',
      date: '2023-02-06',
      label: 'pink',
    },
    {
      id: 120,
      name: 'Doongala April Rally (Members Only)',
      time: '12:15 AEDT',
      date: '2023-02-06',
      label: 'gray',
    },
    {
      id: 121,
      name: 'Design review in UK',
      time: '09:10 AEDT',
      date: '2023-02-06',
      label: 'indigo',
    },
    {
      id: 122,
      name: 'Monbulk Pony Club Rally - April 2022',
      time: '09:00 AEST',
      date: '2021-12-06',
      label: 'purple',
    },
    {
      id: 123,
      name: 'Cobram Horse & Pony Club 3 Day Camp',
      time: '08:10 AEDT',
      date: '2021-12-06',
      label: 'pink',
    },
    {
      id: 124,
      name: 'Doongala April Rally (Members Only)',
      time: '12:15 AEDT',
      date: '2021-11-05',
      label: 'gray',
    },
    {
      id: 125,
      name: 'Design review in UK',
      time: '09:10 AEDT',
      date: '2021-11-05',
      label: 'indigo',
    },
  ],
}
