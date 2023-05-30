import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Badge, { BadgeProps1 } from '@comps/uiComps/BadgesNew/Badge'

export default {
  title: 'Basic/BadgeNew',
  component: Badge,
  argTypes: {
    label: { control: 'text' },
    className: { control: 'text' },
  },
} as ComponentMeta<typeof Badge>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<React.FC<BadgeProps1>> = (args) => {
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
