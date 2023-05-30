import { ComponentStory, ComponentMeta } from '@storybook/react'
import { BookingTicketProps } from './BookingTicket'
import BookingTicket from './BookingTicket'
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Events/BookingTicket',
  component: BookingTicket,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof BookingTicket>

// const CategoryCardData: BookingTicketProps = {
//   title: 'EVENT 1 - 45cm Under 12 Years',
//   details: 'Cross Country Jump Card & Vest Mandatory',
//   price: 50.0,
//   ticketsCount: 5,
//   member: [
//     { img: 'df', name: 'tt', email: 'w@gmail.com' },
//     { img: '', name: 'tt', email: 'w@gmail.com' },
//   ],
// }
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof BookingTicket> = (args) => <BookingTicket {...args} />

export const Basic = Template.bind({})
Basic.args = {
  title: 'EVENT 5 - Under 25 Years',
  details: 'Cross Country Jump Card & Vest Mandatory',
  price: 50,
  ticketsCount: 1,
  member: [
    {
      img: 'https://media.istockphoto.com/id/1338134319/photo/portrait-of-young-indian-businesswoman-or-school-teacher-pose-indoors.jpg?b=1&s=170667a&w=0&k=20&c=7wzo05o8oXxE8K7LxzFqWYZu9HbNlGev0f1Lt-Q1_6Q=',
      name: 'tt',
      email: 'w@gmail.com',
    },
    {
      img: 'https://media.istockphoto.com/id/1338134319/photo/portrait-of-young-indian-businesswoman-or-school-teacher-pose-indoors.jpg?b=1&s=170667a&w=0&k=20&c=7wzo05o8oXxE8K7LxzFqWYZu9HbNlGev0f1Lt-Q1_6Q=',
      name: 'tt',
      email: 'w@gmail.com',
    },
    {
      img: 'https://media.istockphoto.com/id/1338134319/photo/portrait-of-young-indian-businesswoman-or-school-teacher-pose-indoors.jpg?b=1&s=170667a&w=0&k=20&c=7wzo05o8oXxE8K7LxzFqWYZu9HbNlGev0f1Lt-Q1_6Q=',
      name: 'tt',
      email: 'w@gmail.com',
    },
    {
      img: 'https://media.istockphoto.com/id/1338134319/photo/portrait-of-young-indian-businesswoman-or-school-teacher-pose-indoors.jpg?b=1&s=170667a&w=0&k=20&c=7wzo05o8oXxE8K7LxzFqWYZu9HbNlGev0f1Lt-Q1_6Q=',
      name: 'tt',
      email: 'w@gmail.com',
    },
    {
      img: 'https://media.istockphoto.com/id/1338134319/photo/portrait-of-young-indian-businesswoman-or-school-teacher-pose-indoors.jpg?b=1&s=170667a&w=0&k=20&c=7wzo05o8oXxE8K7LxzFqWYZu9HbNlGev0f1Lt-Q1_6Q=',
      name: 'tt',
      email: 'w@gmail.com',
    },
    {
      img: 'https://media.istockphoto.com/id/1338134319/photo/portrait-of-young-indian-businesswoman-or-school-teacher-pose-indoors.jpg?b=1&s=170667a&w=0&k=20&c=7wzo05o8oXxE8K7LxzFqWYZu9HbNlGev0f1Lt-Q1_6Q=',
      name: 'tt',
      email: 'w@gmail.com',
    },
    {
      img: 'https://media.istockphoto.com/id/1338134319/photo/portrait-of-young-indian-businesswoman-or-school-teacher-pose-indoors.jpg?b=1&s=170667a&w=0&k=20&c=7wzo05o8oXxE8K7LxzFqWYZu9HbNlGev0f1Lt-Q1_6Q=',
      name: 'tt',
      email: 'w@gmail.com',
    },
    {
      img: 'https://media.istockphoto.com/id/1338134319/photo/portrait-of-young-indian-businesswoman-or-school-teacher-pose-indoors.jpg?b=1&s=170667a&w=0&k=20&c=7wzo05o8oXxE8K7LxzFqWYZu9HbNlGev0f1Lt-Q1_6Q=',
      name: 'tt',
      email: 'w@gmail.com',
    },
    {
      img: 'https://media.istockphoto.com/id/1338134319/photo/portrait-of-young-indian-businesswoman-or-school-teacher-pose-indoors.jpg?b=1&s=170667a&w=0&k=20&c=7wzo05o8oXxE8K7LxzFqWYZu9HbNlGev0f1Lt-Q1_6Q=',
      name: 'tt',
      email: 'w@gmail.com',
    },
    {
      img: 'https://media.istockphoto.com/id/1338134319/photo/portrait-of-young-indian-businesswoman-or-school-teacher-pose-indoors.jpg?b=1&s=170667a&w=0&k=20&c=7wzo05o8oXxE8K7LxzFqWYZu9HbNlGev0f1Lt-Q1_6Q=',
      name: 'tt',
      email: 'w@gmail.com',
    },
    {
      img: 'https://media.istockphoto.com/id/1338134319/photo/portrait-of-young-indian-businesswoman-or-school-teacher-pose-indoors.jpg?b=1&s=170667a&w=0&k=20&c=7wzo05o8oXxE8K7LxzFqWYZu9HbNlGev0f1Lt-Q1_6Q=',
      name: 'tt',
      email: 'w@gmail.com',
    },
    {
      img: 'https://media.istockphoto.com/id/1338134319/photo/portrait-of-young-indian-businesswoman-or-school-teacher-pose-indoors.jpg?b=1&s=170667a&w=0&k=20&c=7wzo05o8oXxE8K7LxzFqWYZu9HbNlGev0f1Lt-Q1_6Q=',
      name: 'tt',
      email: 'w@gmail.com',
    },
    {
      img: 'https://media.istockphoto.com/id/1338134319/photo/portrait-of-young-indian-businesswoman-or-school-teacher-pose-indoors.jpg?b=1&s=170667a&w=0&k=20&c=7wzo05o8oXxE8K7LxzFqWYZu9HbNlGev0f1Lt-Q1_6Q=',
      name: 'tt',
      email: 'w@gmail.com',
    },
  ],
}
