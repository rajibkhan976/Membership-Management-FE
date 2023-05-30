import { ComponentStory, ComponentMeta } from '@storybook/react'
import HelpHomeDesign from './HelpHomeDesign'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/HelpHomeDesign ',
  component: HelpHomeDesign,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof HelpHomeDesign>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof HelpHomeDesign> = (args) => <HelpHomeDesign {...args} />

const imageCardArray = [
  {
    title: 'Get Started',
    subtitle: '5 Articles',
    imgSrc:
      'https://images.unsplash.com/photo-1668595473727-7c00beaf98bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMTJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  },
  {
    title: 'Manage Account',
    subtitle: '10 Articles',
    imgSrc:
      'https://images.unsplash.com/photo-1668475314128-77e400108c55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
  },
  {
    title: 'Billing & Invoices',
    subtitle: '3 Articles',
    imgSrc:
      'https://images.unsplash.com/photo-1668455520578-0847836e48ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0NHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
  },
  {
    title: 'Member Support',
    subtitle: '12 Articles',
    imgSrc:
      'https://images.unsplash.com/photo-1668437722728-f1ac85caab32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3Nnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
  },
  {
    title: 'Integration & Automation',
    subtitle: '5 Articles',
    imgSrc:
      'https://images.unsplash.com/photo-1659535969472-3f4e2ad3a0be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNzh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  },
  {
    title: 'Coaching',
    subtitle: '23 Articles',
    imgSrc:
      'https://images.unsplash.com/photo-1668630285968-fdc7a1b9f3f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0NHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
  },
  {
    title: 'Video Tutorials',
    subtitle: '36 Articles',
    imgSrc:
      'https://images.unsplash.com/photo-1668626317130-02228b116fd9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4OHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
  },
  {
    title: 'Resources',
    subtitle: '7 Articles',
    imgSrc:
      'https://images.unsplash.com/photo-1668437718856-22873a0cc31b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMjd8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  },
]

const articleCardArray = [
  {
    heading: 'Get What happened to Club+?',
    caption:
      'Club+ has been rebranded into the awesome new brand you see before you today. It retains all of the same functionality as before but has become uni...',
    imageSrc:
      'https://images.unsplash.com/photo-1668587778654-e0babf8483b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMzF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  },
  {
    heading: 'How safe is JustGo from a data security a...',
    caption:
      'We fully recognise the responsibility we have to provide a secure environment for our customers’ data and understand the sensitivity of the perso...',
    imageSrc:
      'https://images.unsplash.com/photo-1668534575280-3ad69fe76c47?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNDd8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  },
  {
    heading: 'What methods of online payments can Ju...',
    caption: 'JustGo supports Credit/Debit cards, and Direct Debit/SEPA.',
    imageSrc:
      'https://images.unsplash.com/photo-1668525834119-bd0860fa8e0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNzV8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  },
  {
    heading: 'Get What happened to Club+?',
    caption:
      'Club+ has been rebranded into the awesome new brand you see before you today. It retains all of the same functionality as before but has become uni...',
    imageSrc:
      'https://images.unsplash.com/photo-1667845018782-9f5acae511c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
  },
  {
    heading: 'How safe is JustGo from a data security a...',
    caption:
      'We fully recognise the responsibility we have to provide a secure environment for our customers’ data and understand the sensitivity of the perso...',
    imageSrc:
      'https://images.unsplash.com/photo-1668475314128-77e400108c55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
  },
  {
    heading: 'What methods of online payments can Ju...',
    caption: 'JustGo supports Credit/Debit cards, and Direct Debit/SEPA.',
    imageSrc:
      'https://images.unsplash.com/photo-1668455520578-0847836e48ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0NHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
  },
]

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  imageCardArray: imageCardArray,
  articleCardArray: articleCardArray,
}

// HelpHomeDesign
