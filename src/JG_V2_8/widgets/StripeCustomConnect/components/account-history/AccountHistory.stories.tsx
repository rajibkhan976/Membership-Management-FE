import { ComponentStory, ComponentMeta } from '@storybook/react'
import AccountHistory from '.'

export default {
  title: 'Stripe/AccountHistory',
  component: AccountHistory,
  argTypes: {},
} as ComponentMeta<typeof AccountHistory>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AccountHistory> = (args) => {
  return (
    <div className="border">
      <AccountHistory />
    </div>
  )
}
export const SingleAccountHistory = Template.bind({})

SingleAccountHistory.args = {}
