import RichTextEditor from '@jg/common/comps/RichTextEditor/RichTextEditor'
import { ComponentStory, ComponentMeta } from '@storybook/react'

export default {
  title: 'Basic/RichTextEditor',
  component: RichTextEditor,
} as ComponentMeta<typeof RichTextEditor>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof RichTextEditor> = (args) => <RichTextEditor {...args} />

export const Basic = Template.bind({})

Basic.args = {
  value: '<h1>Hello world</h1>',
  hideBorder: false,
  // editorConfig: { placeholderText: 'Write here' },
}
