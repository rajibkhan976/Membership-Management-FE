import { ComponentStory, ComponentMeta } from '@storybook/react'
import ColorPalette from '@comps/designSystem/colorPalette/ColorPalette'

export default {
  title: 'Design System/ColorPalette',
  component: ColorPalette,
} as ComponentMeta<typeof ColorPalette>

const Template: ComponentStory<typeof ColorPalette> = (args) => <ColorPalette />

export const Example = Template.bind({})
