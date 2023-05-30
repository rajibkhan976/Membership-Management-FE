import { ComponentStory, ComponentMeta } from '@storybook/react'
import CountDownTimer from '@jg/common/comps/countDownTimer'
import '@jg/common/comps/countDownTimer/CountDownTimer.css'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Basic/CountDownTimer',
  component: CountDownTimer,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof CountDownTimer>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CountDownTimer> = (args) => <CountDownTimer {...args} />

export const Timer = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Timer.args = {
  endDate: '2022-08-10 14:30',
  // endTime: '14:30'
  // new Date('yy-m-d')
}
