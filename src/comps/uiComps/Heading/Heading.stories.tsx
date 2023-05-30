import { ComponentStory, ComponentMeta } from '@storybook/react'
import H1 from './H1'
import H2 from './H2'
import H3 from './H3'
import H4 from './H4'
import H5 from './H5'
import H6 from './H6'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Heading',
  component: H1,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof H1>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof H1> = (args) => <H1 {...args} />
export const BasicH1 = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
BasicH1.args = {
  text: 'One',
}

const Template1: ComponentStory<typeof H1> = (args) => <H1 {...args}>First Child</H1>
export const WithChildH1 = Template1.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithChildH1.args = {}

const Template2: ComponentStory<typeof H2> = (args) => <H2 {...args} />
export const BasicH2 = Template2.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
BasicH2.args = {
  text: 'One',
}

const Template3: ComponentStory<typeof H2> = (args) => <H2 {...args}>Second Child</H2>
export const WithChildH2 = Template3.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithChildH1.args = {}

const Template4: ComponentStory<typeof H3> = (args) => <H3 {...args} />
export const BasicH3 = Template4.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
BasicH3.args = {
  text: 'One',
}

const Template5: ComponentStory<typeof H3> = (args) => <H3 {...args}>Third Child</H3>
export const WithChildH3 = Template5.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithChildH1.args = {}

const Template6: ComponentStory<typeof H4> = (args) => <H4 {...args} />
export const BasicH4 = Template6.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
BasicH4.args = {
  text: 'One',
}

const Template7: ComponentStory<typeof H4> = (args) => <H4 {...args}>Fourth Child</H4>
export const WithChildH4 = Template7.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithChildH1.args = {}

const Template8: ComponentStory<typeof H5> = (args) => <H5 {...args} />
export const BasicH5 = Template8.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
BasicH5.args = {
  text: 'One',
}

const Template9: ComponentStory<typeof H5> = (args) => <H5 {...args}>Fifth Child</H5>
export const WithChildH5 = Template9.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithChildH1.args = {}
const Template10: ComponentStory<typeof H6> = (args) => <H6 {...args} />
export const BasicH6 = Template10.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
BasicH6.args = {
  text: 'One',
}

const Template11: ComponentStory<typeof H6> = (args) => <H6 {...args}>Sixth Child</H6>
export const WithChildH6 = Template11.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithChildH1.args = {}
