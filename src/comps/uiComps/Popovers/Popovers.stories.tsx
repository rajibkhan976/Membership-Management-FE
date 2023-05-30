import { ComponentStory, ComponentMeta } from '@storybook/react'
import Popovers from './Popovers'
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Basic/Popovers ',
  component: Popovers,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Popovers>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Popovers> = (args) => (
  <Popovers
    {...args}
    items={[
      {
        name: 'Insights',
        description: 'Measure actions your users take',
        href: '##',
        // icon: <UserCircleIcon width="28" />,
        icon: (
          <svg width="44" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" rx="8" fill="#FFEDD5" />
            <path d="M24 11L35.2583 17.5V30.5L24 37L12.7417 30.5V17.5L24 11Z" stroke="#FB923C" strokeWidth="2" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16.7417 19.8094V28.1906L24 32.3812L31.2584 28.1906V19.8094L24 15.6188L16.7417 19.8094Z"
              stroke="#FDBA74"
              strokeWidth="2"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20.7417 22.1196V25.882L24 27.7632L27.2584 25.882V22.1196L24 20.2384L20.7417 22.1196Z"
              stroke="#FDBA74"
              strokeWidth="2"
            />
          </svg>
        ),
      },
      {
        name: 'Automations',
        description: 'Create your own targeted content',
        href: '##',
        icon: (
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" rx="8" fill="#FFEDD5" />
            <path
              d="M28.0413 20L23.9998 13L19.9585 20M32.0828 27.0001L36.1242 34H28.0415M19.9585 34H11.8755L15.9171 27"
              stroke="#FB923C"
              strokeWidth="2"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18.804 30H29.1963L24.0001 21L18.804 30Z"
              stroke="#FDBA74"
              strokeWidth="2"
            />
          </svg>
        ),
      },
      {
        name: 'Reports',
        description: 'Keep track of your growth',
        href: '##',
        icon: (
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" rx="8" fill="#FFEDD5" />
            <rect x="13" y="32" width="2" height="4" fill="#FDBA74" />
            <rect x="17" y="28" width="2" height="8" fill="#FDBA74" />
            <rect x="21" y="24" width="2" height="12" fill="#FDBA74" />
            <rect x="25" y="20" width="2" height="16" fill="#FDBA74" />
            <rect x="29" y="16" width="2" height="20" fill="#FB923C" />
            <rect x="33" y="12" width="2" height="24" fill="#FB923C" />
          </svg>
        ),
      },
    ]}
  />
)

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  className: 'test',
  btnText: 'Solutions',
  footerDir: '##',
  footerTitle: 'Documentation',
  footerBody: 'Start integrating products and tools',
  icons: true,
  footer: true,
}
