import { ComponentStory, ComponentMeta } from '@storybook/react'
import StackedAvatar from './StackedAvatar'
import Avatar from './Avatar'
// import StackedAvatar from '@jg/common/comps/Avatar/StackedAvatar';

const avatarSrcs = [
  'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
]

export default {
  title: 'Basic/Avatar',
  component: StackedAvatar,
  argTypes: {
    // backgroundColor: { control: 'color' },
    numOfAvatar: { control: 'radio', options: [1, 2, 3, 4, 5, 6] },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  },
} as ComponentMeta<typeof StackedAvatar>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof StackedAvatar> = ({ children, ...args }) => (
  <StackedAvatar {...args}>{children}</StackedAvatar>
)

export const StackedAvatarsWithPicture = Template.bind({})

StackedAvatarsWithPicture.args = {
  numOfAvatar: 3,
  size: 'md',
  negativeSpace: 3,
  children: avatarSrcs.map((src) => <Avatar src={src} />),
}

export const EmptyStackedAvatar = Template.bind({})

EmptyStackedAvatar.args = {
  numOfAvatar: 3,
  size: 'md',
  negativeSpace: 3,
  children: avatarSrcs.map((src) => <Avatar />),
}

export const StackedAvatarWithInitials = Template.bind({})

// You can also render the component with the named initials. Be sure to pass the `name` prop and `withNameInitials` to the Avatar component.
StackedAvatarWithInitials.args = {
  numOfAvatar: 3,
  size: 'md',
  negativeSpace: 3,
  children: ['Cristiano Ronaldo', 'Lionel Messi', 'neymar', 'mbappe', 'Mohammed Salah', 'mane'].map((name) => (
    <Avatar name={name} withNameInitials />
  )),
}
