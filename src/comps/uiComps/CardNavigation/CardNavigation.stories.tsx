import { createSBItem, createSBTpl } from '../../../sb/JGStoryBook'
import { CsvOutline, EmailOpen, GestureTapButton, ImageBox } from '../Icons'
import CardNavigation from './CardNavigation'
import CardItem from './CardItem'
import { useEffect } from 'react'
import Lorem from '@jg/utils/Lorem'

export default createSBItem(CardNavigation, { section: 'Basic', title: 'Card Navigation' })

const TestCompPanel = ({ name }: { name: string }) => {
  console.log('Test ' + name)
  useEffect(() => {
    console.log('TestCompPanel' + name)
  }, [])
  return (
    <>
      TestCompPanel: {name} <br />
      <Lorem></Lorem>
    </>
  )
}
const tpl = createSBTpl<typeof CardNavigation>((args) => {
  return (
    <CardNavigation {...args}>
      <CardItem icon={<CsvOutline className="h-3.5 w-3" />} title="All" cardName="1">
        <TestCompPanel name="Tab1" />
      </CardItem>
      <CardItem icon={<GestureTapButton className="h-3.5 w-3 " />} title="Drafts" cardName="2">
        <>{console.log('Tab content 2')}Tab content 2</>
      </CardItem>
      <CardItem icon={<ImageBox className="h-3.5 w-3" />} title="Schedule" cardName="3">
        <>{console.log('Tab content 3')}Tab content 3</>
      </CardItem>
      <CardItem icon={<EmailOpen className="h-3.5 w-3" />} title="Sent" cardName="4">
        <TestCompPanel name="Tab4" />
      </CardItem>
    </CardNavigation>
  )
})
export const Basic = tpl.bind({})
Basic.args = {
  selectedValue: '1',
}
