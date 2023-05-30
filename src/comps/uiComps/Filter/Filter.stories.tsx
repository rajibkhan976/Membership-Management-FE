import { ComponentStory, ComponentMeta } from '@storybook/react'
import FilterBar from '@jg/common/comps/filter/FilterBar'

export default {
  title: 'Basic/FilterBar',
  component: FilterBar,
  argTypes: {},
} as ComponentMeta<typeof FilterBar>

const Template: ComponentStory<typeof FilterBar> = (args) => <FilterBar {...args} />

export const EventFilterBar = Template.bind({})

EventFilterBar.args = {
  filterItems: [
    {
      name: 'Date',
      subItems: [
        {
          title: 'Any day',
          subItemContents: [],
        },
        {
          title: 'Pick a date...',
          subItemContents: [],
        },
        {
          title: 'Today',
          subItemContents: [],
        },
        {
          title: 'Tomorrow',
          subItemContents: [],
        },
        {
          title: 'This weekend',
          subItemContents: [],
        },
        {
          title: 'This week',
          subItemContents: [],
        },
        {
          title: 'Next week',
          subItemContents: [],
        },
        {
          title: 'This month',
          subItemContents: [],
        },
        {
          title: 'Next month',
          subItemContents: [],
        },
        // More questions...
      ],
      group: 'one',
    },
    {
      name: 'Category',
      subItems: [
        {
          title: 'CLUB EVENT (100)',
          subItemContents: [
            {
              id: 1,
              name: 'NATIONAL CHAMPIONSHEEPS (2)',
              count: 0,
            },
            { id: 2, name: 'Aberdeen', count: 1 },
            { id: 3, name: 'Amberdeen', count: 2 },
          ],
        },
        {
          title: 'NATIONAL CHAMPIONSHIPS (2)',
          subItemContents: [
            {
              id: 1,
              name: 'NATIONAL CHAMPIONSHEEPS (2)',
              count: 0,
            },
            { id: 2, name: 'Aberdeen', count: 1 },
            { id: 3, name: 'Amberdeen', count: 2 },
          ],
        },
        {
          title: 'INTERNATIONAL TEAMS & TIPS (5)',
          subItemContents: [
            {
              id: 1,
              name: 'NATIONAL CHAMPIONSHEEPS (2)',
              count: 0,
            },
            { id: 2, name: 'Aberdeen', count: 1 },
            { id: 3, name: 'Amberdeen', count: 2 },
          ],
        },
        // More questions...
      ],
      group: 'one',
    },
    {
      name: 'Provider',
      subItems: [
        {
          title: 'CLUB EVENT (100)',
          subItemContents: [
            {
              id: 1,
              name: 'NATIONAL CHAMPIONSHEEPS (2)',
              count: 0,
            },
            { id: 2, name: 'Aberdeen', count: 1 },
            { id: 3, name: 'Amberdeen', count: 2 },
          ],
        },
        {
          title: 'NATIONAL CHAMPIONSHIPS (2)',
          subItemContents: [
            {
              id: 1,
              name: 'NATIONAL CHAMPIONSHEEPS (2)',
              count: 0,
            },
            { id: 2, name: 'Aberdeen', count: 1 },
            { id: 3, name: 'Amberdeen', count: 2 },
          ],
        },
        {
          title: 'INTERNATIONAL TEAMS & TIPS (5)',
          subItemContents: [
            {
              id: 1,
              name: 'NATIONAL CHAMPIONSHEEPS (2)',
              count: 0,
            },
            { id: 2, name: 'Aberdeen', count: 1 },
            { id: 3, name: 'Amberdeen', count: 2 },
          ],
        },
        // More questions...
      ],
      group: 'one',
    },
    {
      name: 'Price',
      subItems: [
        {
          title: 'Any price',
          subItemContents: [],
        },
        {
          title: 'Free',
          subItemContents: [],
        },
        {
          title: 'Paid',
          subItemContents: [],
        },
        // More questions...
      ],
      group: 'two',
    },
    {
      name: 'Region',
      subItems: [
        {
          title: 'CLUB EVENT (100)',
          subItemContents: [
            {
              id: 1,
              name: 'NATIONAL CHAMPIONSHEEPS (2)',
              count: 0,
            },
            { id: 2, name: 'Aberdeen', count: 1 },
            { id: 3, name: 'Amberdeen', count: 2 },
          ],
        },
        {
          title: 'NATIONAL CHAMPIONSHIPS (2)',
          subItemContents: [
            {
              id: 1,
              name: 'NATIONAL CHAMPIONSHEEPS (2)',
              count: 0,
            },
            { id: 2, name: 'Aberdeen', count: 1 },
            { id: 3, name: 'Amberdeen', count: 2 },
          ],
        },
        {
          title: 'INTERNATIONAL TEAMS & TIPS (5)',
          subItemContents: [
            {
              id: 1,
              name: 'NATIONAL CHAMPIONSHEEPS (2)',
              count: 0,
            },
            { id: 2, name: 'Aberdeen', count: 1 },
            { id: 3, name: 'Amberdeen', count: 2 },
          ],
        },
        // More questions...
      ],
      group: 'two',
    },
    {
      name: 'Distance',
      subItems: [
        {
          title: 'CLUB EVENT (100)',
          subItemContents: [
            {
              id: 1,
              name: 'NATIONAL CHAMPIONSHEEPS (2)',
              count: 0,
            },
            { id: 2, name: 'Aberdeen', count: 1 },
            { id: 3, name: 'Amberdeen', count: 2 },
          ],
        },
        {
          title: 'NATIONAL CHAMPIONSHIPS (2)',
          subItemContents: [
            {
              id: 1,
              name: 'NATIONAL CHAMPIONSHEEPS (2)',
              count: 0,
            },
            { id: 2, name: 'Aberdeen', count: 1 },
            { id: 3, name: 'Amberdeen', count: 2 },
          ],
        },
        {
          title: 'INTERNATIONAL TEAMS & TIPS (5)',
          subItemContents: [
            {
              id: 1,
              name: 'NATIONAL CHAMPIONSHEEPS (2)',
              count: 0,
            },
            { id: 2, name: 'Aberdeen', count: 1 },
            { id: 3, name: 'Amberdeen', count: 2 },
          ],
        },
        // More questions...
      ],
      group: 'two',
    },
  ],
}
