import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Badge, { BadgeProps } from '@comps/uiComps/Badges/Badge'

export default {
  title: 'Basic/Badges',
  component: Badge,
  argTypes: {
    label: { control: 'text' },
    className: { control: 'text' },
  },
} as ComponentMeta<typeof Badge>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<React.FC<BadgeProps>> = (args) => {
  const { ...rest } = args
  return (
    <div>
      <Badge {...rest} />
    </div>
  )
}

export const SingleBadge = Template.bind({})

SingleBadge.args = {
  variant: 'primary',
  fillType: 'solid',
  size: 'md',
  label: 'Badge',
}
