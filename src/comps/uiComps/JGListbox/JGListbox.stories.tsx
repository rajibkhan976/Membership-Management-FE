import { createSBItem, createSBTpl } from 'src/sb/JGStoryBook'
import { CsvOutline, EmailOpen, GestureTapButton, ImageBox } from '../Icons'
import JGListbox from './JGListbox'
import JGListboxItem from './JGListboxItem'

export default createSBItem(JGListbox, { section: 'Basic', title: 'JGListbox' })

const tpl = createSBTpl<typeof JGListbox>((args) => {
  return (
    <JGListbox {...args}>
      <JGListboxItem icon={<CsvOutline className="w-3.5 w-3.5 mr-1" />} name="test" value="1" />
      <JGListboxItem icon={<GestureTapButton className="w-3.5 w-3.5 mr-1" />} name="test 2" value="2" />
      <JGListboxItem icon={<ImageBox className="w-3.5 w-3.5 mr-1" />} name="test 3" value="3" />
      <JGListboxItem icon={<EmailOpen className="w-3.5 w-3.5 mr-1" />} name="test 5" value="4" />
    </JGListbox>
  )
})

export const Basic = tpl.bind({})
Basic.args = {
  //selectedValue: '3',
  defaultIndex: 3,
  onChange: (option, index) => {
    console.log(option, index)
  },
}
