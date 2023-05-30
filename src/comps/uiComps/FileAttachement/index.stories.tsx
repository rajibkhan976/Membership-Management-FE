import { useState } from 'react'
import FileAttachment from '@comps/uiComps/FileAttachement'
import { ComponentStory, ComponentMeta } from '@storybook/react'

export default {
  title: 'Basic/FileAttachment',
  component: FileAttachment,
} as ComponentMeta<typeof FileAttachment>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof FileAttachment> = (args) => {
  const [files, setFiles] = useState<any[]>([])

  const handleSetFiles = (files: any[]) => {
    setFiles(files)
  }

  return <FileAttachment {...{ ...args, files, handleSetFiles }} />
}

export const Basic = Template.bind({})

Basic.args = {
  hideBorder: false,
}
