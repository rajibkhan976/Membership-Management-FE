import { ComponentStory, ComponentMeta } from '@storybook/react'
import { BookingMemberProps } from './BookingMember'
import BookingMember from './BookingMember'
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Events/BookingMember',
  component: BookingMember,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof BookingMember>

// const CategoryCardData: BookingMemberProps = {
//   img: 'https://media.istockphoto.com/id/1338134319/photo/portrait-of-young-indian-businesswoman-or-school-teacher-pose-indoors.jpg?b=1&s=170667a&w=0&k=20&c=7wzo05o8oXxE8K7LxzFqWYZu9HbNlGev0f1Lt-Q1_6Q=',
//   name: 'Katelyn Abbott',
//   typeOfMember: 'Member',
//   currentMember: 'Open Rider (Riding)',
//   memberEmail: 'kate.abbott@live.com',
//   memberShipStatus: 'Registered',
// }
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof BookingMember> = (args) => <BookingMember {...args} />

export const Basic = Template.bind({})
Basic.args = {
  img: 'https://media.istockphoto.com/id/1338134319/photo/portrait-of-young-indian-businesswoman-or-school-teacher-pose-indoors.jpg?b=1&s=170667a&w=0&k=20&c=7wzo05o8oXxE8K7LxzFqWYZu9HbNlGev0f1Lt-Q1_6Q=',
  name: 'Katelyn Abbott',
  typeOfMember: 'Member',
  currentMember: 'Open Rider (Riding)',
  memberEmail: 'kate.abbott@live.com',
  memberShipStatus: 'Registered',
}
