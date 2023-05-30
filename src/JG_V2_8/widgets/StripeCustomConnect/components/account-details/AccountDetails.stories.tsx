import { ComponentStory, ComponentMeta } from '@storybook/react'
import AccountDetails from '.'

export default {
  title: 'Stripe/AccountDetails',
  component: AccountDetails,
  argTypes: {},
} as ComponentMeta<typeof AccountDetails>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AccountDetails> = (args) => {
  return (
    <div className="border">
      <AccountDetails />
    </div>
  )
}
export const SingleAccountDetails = Template.bind({})

SingleAccountDetails.args = {}
