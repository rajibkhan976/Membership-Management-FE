import { ComponentStory, ComponentMeta } from '@storybook/react'
import PayoutProfile from '.'

export default {
  title: 'Stripe/PayoutProfile',
  component: PayoutProfile,
  argTypes: {},
} as ComponentMeta<typeof PayoutProfile>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof PayoutProfile> = (args) => {
  return (
    <div className="border">
      <PayoutProfile />
    </div>
  )
}
export const Profile = Template.bind({})

Profile.args = {}
