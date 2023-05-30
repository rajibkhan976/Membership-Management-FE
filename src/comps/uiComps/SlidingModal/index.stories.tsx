import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Modal from '@jg/common/comps/Modal'
import { JgCarouselResponsive } from '../JgCarousel/index.stories'

export default {
  title: 'Basic/SlidingModal',
  component: Modal,
  argTypes: {},
} as ComponentMeta<typeof Modal>

const Template: ComponentStory<typeof Modal> = (args) => {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <button className="p-4 border-2 " onClick={() => setOpen(true)}>
        Show Modal
      </button>
      <Modal {...{ ...args, open, setOpen }} />
    </>
  )
}

export const DefaultSlidingModal = Template.bind({})

DefaultSlidingModal.args = {}

const DefaultTitle = () => {
  return <h2 className="px-3 py-2">A Custom Title 🎆</h2>
}

const DefaultContent = () => {
  return (
    <div className="max-w-5xl w-full p-3">
      {/* @ts-ignore */}
      <JgCarouselResponsive {...JgCarouselResponsive.args} />
    </div>
  )
}

export const CustomSlidingModal = Template.bind({})

CustomSlidingModal.args = {
  titleSection: <DefaultTitle />,
  bodySection: <DefaultContent />,
}
