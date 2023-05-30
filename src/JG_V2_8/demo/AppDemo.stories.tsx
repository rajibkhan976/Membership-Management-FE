import { ComponentStory, ComponentMeta } from '@storybook/react'

import AppDemo from './AppDemo'

export default {
  title: 'APP/JUSTGO',
  component: AppDemo,
} as ComponentMeta<typeof AppDemo>

const Template: ComponentStory<typeof AppDemo> = (args) => <AppDemo {...args} />

export const Events = Template.bind({})
Events.args = {
  view: 'Events',
}

export const EmailAndCom = Template.bind({})
EmailAndCom.args = {
  view: 'EmailAndCom',
}
export const CustomComponents = Template.bind({})
CustomComponents.args = {
  view: 'CustomComponents',
}
