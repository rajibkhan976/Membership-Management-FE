import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ZipCodeInput } from '@jg/common/comps/searchBar'
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Basic/PostCode',
  component: ZipCodeInput,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof ZipCodeInput>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ZipCodeInput> = (args) => (
  <div className="border rounded-2" style={{ width: 'fit-content' }}>
    <ZipCodeInput {...args} />
  </div>
)

export const ZipCode = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
ZipCode.args = {
  // className: 'test',
  //placeholder: 'City or Zip Code',
}
