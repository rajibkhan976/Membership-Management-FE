import { ComponentStory, ComponentMeta } from '@storybook/react'
// import Modal  from './Modal';
import Modal from './ModalTest'

// import TextField from '../forms/TextField/TextField'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Basic/Modal ',
  component: Modal,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Modal>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// const Template: ComponentStory<typeof Modal > = (args) => <Modal  {...args} />;

const Template: ComponentStory<typeof Modal> = (args) => <Modal />

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  // className: 'test',
  title: 'Test Title',
  description: 'Test description ....',
  isConfirmBtn: true,
  isCancelBtn: false,
  cancelBtnText: 'Cancel',
  confirmBtnText: 'Got it, thanks!',
  onSelect(data: any) {
    console.log(data)
  },
}
