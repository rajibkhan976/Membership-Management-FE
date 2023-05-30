import { ComponentStory, ComponentMeta } from '@storybook/react'
import Avatar from '@comps/uiComps/Avatars/Avatar'

export default {
  title: 'Basic/Avatar',
  component: Avatar,
  argTypes: {
    // backgroundColor: { control: 'color' },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  },
} as ComponentMeta<typeof Avatar>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />

export const SingleAvatar = Template.bind({})

SingleAvatar.args = {
  shape: 'circular',
  size: 'md',
  src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  bordered: false,
  name: 'mg',
}

export const EmptyAvatar = Template.bind({})
EmptyAvatar.args = {
  shape: 'circular',
  size: 'md',
  bordered: false,
  src: '',
  withNameInitials: false,
}

export const AvatarWithInitials = Template.bind({})
AvatarWithInitials.args = {
  shape: 'circular',
  size: 'md',
  bordered: false,
  withNameInitials: true,
  name: 'mg',
  src: '',
}
