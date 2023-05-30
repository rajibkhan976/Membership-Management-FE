import { createSBItem, createSBTpl } from '../../../sb/JGStoryBook'
import Footer from '@jg/_app/footer/Footer'
import Lorem from '@jg/utils/Lorem'

export default createSBItem(Footer, { section: 'Misc', title: 'Footer' })

const tpl = createSBTpl<typeof Footer>((args) => {
  return (
    <div className="flex flex-col h-screen justify-between">
      <header className="h-10 bg-red-500">Header</header>
      <main className="mb-auto  bg-green-500">
        <Lorem />
        <Lorem />
        <Lorem />
        <Lorem />
        <Lorem />
        <Lorem />
      </main>
      <Footer />
    </div>
  )
})
export const Basic = tpl.bind({})
Basic.args = {}
