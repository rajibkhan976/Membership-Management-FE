import { ComponentStory, ComponentMeta } from '@storybook/react'
import { MA_FieldProps } from '../../types'
import MA_ProfileProduct from './MA_ProfileProduct'
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Events/MA_ProfileProduct',
  component: MA_ProfileProduct,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof MA_ProfileProduct>

// const CategoryCardData: TicketProps = {
//     title: "EVENT 1 - 45cm 12 Years",
//   description: 'Cross Country Jump Card & Vest Mandatory',
//   price: 35,
//   quantity: 32
// }
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof MA_ProfileProduct> = (args) => <MA_ProfileProduct {...args} />

export const Basic = Template.bind({})
Basic.args = {}
