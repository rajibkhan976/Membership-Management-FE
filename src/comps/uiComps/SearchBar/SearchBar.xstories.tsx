import { ComponentStory, ComponentMeta } from '@storybook/react'
// import SearchBar  from './SearchBar';
import { SearchBar } from '@jg/common/comps/searchBar'
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Basic/SearchBarGrouped',
  component: SearchBar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof SearchBar>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SearchBar> = (args) => <SearchBar {...args} />

export const SearchBarGrouped = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
SearchBarGrouped.args = {
  className: 'test',
  // datesOrder: 'order-2',
  // zipcodeOrder: 'order-1',
  // searchOrder: 'order-3',
  // isTrue: false,
  // onSelect: function(value) {console.log(value)}
}
