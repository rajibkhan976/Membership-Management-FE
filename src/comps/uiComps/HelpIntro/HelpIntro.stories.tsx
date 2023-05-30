import { ComponentStory, ComponentMeta } from '@storybook/react'
import HelpIntro from './HelpIntro'
import { ReactComponent as EmailLogoIcon } from '@jg/assets/images/EmailLogoIcon.svg'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/HelpIntro',
  component: HelpIntro,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof HelpIntro>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof HelpIntro> = (args) => <HelpIntro {...args} />

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  title: 'Let’s Send Email',
  description:
    'Now the time to automate, personalise and streameline your communication! It’s easier to send emails to your members through',
  iconSVG: <EmailLogoIcon />,
  videoSrc: 'Ehy0UO7AwCo',
  routeLink: '#',
}
