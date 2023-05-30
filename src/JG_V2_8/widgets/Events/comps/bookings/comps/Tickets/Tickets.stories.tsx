import { ComponentStory, ComponentMeta } from '@storybook/react'
import { TicketProps } from './Ticket'
import Ticket from './Ticket'
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Events/Ticket',
  component: Ticket,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Ticket>

// const CategoryCardData: TicketProps = {
//     title: "EVENT 1 - 45cm 12 Years",
//   description: 'Cross Country Jump Card & Vest Mandatory',
//   price: 35,
//   quantity: 32
// }
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Ticket> = (args) => <Ticket {...args} />

export const Basic = Template.bind({})
Basic.args = {
  title: 'EVENT 1 - 45cm 12 Years',
  description: 'Cross Country Jump Card & Vest Mandatory',
  price: 35,
  quantity: 32,
}
