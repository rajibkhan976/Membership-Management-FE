import { ComponentStory, ComponentMeta } from '@storybook/react'
import { SearchBox } from '@jg/common/comps/searchBar'
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Basic/Search',
  component: SearchBox,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof SearchBox>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SearchBox> = (args) => (
  <div className="border rounded-2">
    <SearchBox {...args} />
  </div>
)

export const SearchInput = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
SearchInput.args = {
  className: 'test',
  // isTrue: false,

  text: 'Find Event',
  placeholder: 'Search for anything like venues, events, etc...',
}
