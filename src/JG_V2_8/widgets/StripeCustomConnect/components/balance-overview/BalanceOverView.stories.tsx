import { ComponentStory, ComponentMeta } from '@storybook/react'
import BalanceOverView from '.'

export default {
  title: 'Stripe/BalanceOverView',
  component: BalanceOverView,
  argTypes: {},
} as ComponentMeta<typeof BalanceOverView>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof BalanceOverView> = (args) => {
  return (
    <div className="border">
      <BalanceOverView />
    </div>
  )
}
export const SingleBalanceOverView = Template.bind({})

SingleBalanceOverView.args = {}
