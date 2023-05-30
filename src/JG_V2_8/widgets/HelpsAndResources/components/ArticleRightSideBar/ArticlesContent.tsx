import { ChevronDoubleRight } from '@comps/uiComps/Icons'

export const ArticlePageData = [
  'Overview',
  'Infrastracture',
  'Service Levels',
  'Data2',
  'Authentication',
  'Permissions and Access Control Policy',
  'Application Monitoring',
  'Security Audits',
  'Compliance',
  'Security Policies and Secure Development (SDLC)',
]
const ArticlesContent = () => {
  return (
    <div className="flex flex-col flex-nowrap gap-y-4">
      {ArticlePageData.map((item, index) => (
        <button
          key={index}
          className="flex flex-row text-jg-metal-500 font-medium !leading-4 text-sm"
          // href={`#${item.split(' ').join('-')}`}
          onClick={() => {
            document
              ?.getElementById(`${item.split(' ').join('-')}`)
              ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }}
        >
          <ChevronDoubleRight className="mr-1 h-4 w-4 p-1" /> <span className="text-left">{item}</span>
        </button>
      ))}
    </div>
  )
}
export default ArticlesContent
