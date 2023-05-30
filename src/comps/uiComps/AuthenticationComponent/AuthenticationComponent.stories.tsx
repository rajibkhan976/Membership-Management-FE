import { ComponentStory, ComponentMeta } from '@storybook/react'
import AuthenticationComponent from './AuthenticationComponent'

export default {
  title: 'Events/AuthenticationComponent',
  component: AuthenticationComponent,
  argTypes: {},
} as ComponentMeta<typeof AuthenticationComponent>
const Template: ComponentStory<typeof AuthenticationComponent> = (args) => <AuthenticationComponent {...args} />

export const Basic = Template.bind({})
Basic.args = {
  existingUser: 'Existing User',
  subTextofExistingUser: "Welcome back to JustGo! Sign in to continue your journey hassle-free. Let's go!",
  existingUserBtn: 'Login',
  newUser: 'New User',
  subTextofNewUser: 'Welcome to JustGo! Are you ready to embark on your next adventure? Sign up now.',
  newUserBtn: 'Sign Up',
}
