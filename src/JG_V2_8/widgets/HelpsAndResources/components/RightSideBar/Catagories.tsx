import { ChevronDoubleRight } from '@comps/uiComps/Icons'
import ContentCard from '@jg/common/comps/contents/contentCard/ContentCard'

export const catagoryData = [
  'Get Started',
  'Manage Account',
  'Billing & Invoices',
  'Member Support',
  'Integration & Automation',
  'Coaching',
  'Video Tutorial',
  'Resources',
]
const Catagories = () => {
  return (
    <div className="flex flex-col flex-nowrap gap-y-4">
      {catagoryData.map((item, index) => (
        <a key={index} className="flex flex-row items-center text-jg-metal-500 font-medium !leading-4 text-sm" href="#">
          <ChevronDoubleRight className="mr-1 h-4 w-4 p-1" /> <span>{item}</span>
        </a>
      ))}
    </div>
  )
}
export default Catagories
