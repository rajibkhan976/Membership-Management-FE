import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ArrowLeftIcon, TemplateIcon, DocumentIcon } from '@heroicons/react/solid'
import Tabs from './Tabs'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Basic/Tabs',
  component: Tabs,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Tabs>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

function Button(props: any) {
  const { orientation } = props
  return (
    <>
      {orientation === 'vertical' ? (
        <button onClick={() => console.log('button clicked')} type="button" className="flex items-center ml-2">
          <ArrowLeftIcon width="20" className="mr-2" />
          <span className="hidden visible md:block">Create an email</span>
        </button>
      ) : (
        <button onClick={() => console.log('button clicked')} type="button" className="flex items-center">
          <ArrowLeftIcon width="20" className="mr-2" />
          <span className="block visible">Create an email</span>
        </button>
      )}
    </>
  )
}

const TemplateHorizontalTab: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />
export const HorizontalTab = TemplateHorizontalTab.bind({})

HorizontalTab.args = {
  items: [
    {
      title: 'Basic1',
      content: <>content for tab 1</>,
      icon: <DocumentIcon />,
    },
    {
      title: 'Template1',
      content: <>content for tab 2</>,
      icon: <TemplateIcon />,
    },
    {
      title: 'Basic2',
      content: <>content for tab 3</>,
      icon: <DocumentIcon />,
    },
    {
      title: 'Template2',
      content: <>content for tab 4</>,
      icon: <TemplateIcon />,
    },
    {
      title: 'Basic3',
      content: <>content for tab 5</>,
      icon: <DocumentIcon />,
    },
    {
      title: 'Template3',
      content: <>content for tab 6</>,
      icon: <TemplateIcon />,
    },
    {
      title: 'Basic4',
      content: <>content for tab 7</>,
      icon: <DocumentIcon />,
    },
    {
      title: 'Template4',
      content: <>content for tab 8</>,
      icon: <TemplateIcon />,
    },
  ],
  orientation: 'horizontal',
  activeItem: 0,
  enableTabBarControl: true,
  tabItemAlignment: 'left',
  border: true,
  tabBarControl: <Button orientation="horizontal" />,
  showTabItemTxt: true,
}

const TemplateVerticalTab: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />

export const VerticalTab = TemplateVerticalTab.bind({})
VerticalTab.args = {
  items: [
    {
      title: 'Basic1',
      content: <>content for tab 1</>,
      icon: <DocumentIcon />,
    },
    {
      title: 'Template1',
      content: <>content for tab 2</>,
      icon: <TemplateIcon />,
    },
    {
      title: 'Basic2',
      content: <>content for tab 3</>,
      icon: <DocumentIcon />,
    },
    {
      title: 'Template2',
      content: <>content for tab 4</>,
      icon: <TemplateIcon />,
    },
    {
      title: 'Basic3',
      content: <>content for tab 5</>,
      icon: <DocumentIcon />,
    },
    {
      title: 'Template3',
      content: <>content for tab 6</>,
      icon: <TemplateIcon />,
    },
    {
      title: 'Basic4',
      content: <>content for tab 7</>,
      icon: <DocumentIcon />,
    },
    {
      title: 'Template4',
      content: <>content for tab 8</>,
      icon: <TemplateIcon />,
    },
  ],
  orientation: 'vertical',
  activeItem: 0,
  enableTabBarControl: true,
  tabItemAlignment: 'left',
  border: true,
  tabBarControl: <Button orientation="vertical" />,
  showTabItemTxt: true,
}
