import { ResolveClientURL } from '@jg/_core/utils/URL'
import img1 from '@jg/assets/images/pop-up.png'
import { LinkButton } from '@jg/common/comps'
import FAQ from '@jg/common/comps/float-helper-button/FAQ'

interface videoDataType {
  thumbnail: string
  title: string
  description: string
  ytEmbedLink: string
}
interface faqDataType {
  question: string
  answer: any
}

type HelpPortalItemType = {
  faqData?: faqDataType[]
  videoData?: videoDataType
}
const HelpPortalItem = (props: HelpPortalItemType) => {
  const { faqData, videoData } = props
  return (
    <div className="container py-4 mx-auto space-y-6">
      {videoData && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-3 mx-auto">
            <div className="max-w-[666px] w-full rounded-md overflow-hidden cursor-pointer mx-auto">
              <iframe
                className="max-w-[838px] w-full"
                style={{ aspectRatio: '2/1' }}
                src={'https://www.youtube-nocookie.com/embed/' + videoData.ytEmbedLink + '?autoplay=1'}
              />
              <div className="space-y-4 p-4 border border-jg-metal-50 rounded-b-md h-[130px] overflow-hidden">
                <h4 className="leading-5 font-semibold text-jg-metal-700 truncate">{videoData.title}</h4>
                <p className="text-sm leading-5 font-normal text-jg-metal-500">{videoData.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {faqData && (
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h4 className="text-xl leading-6 font-semibold text-jg-metal-900">Frequently asked questions (General) </h4>
            <p className="text-sm leading-4 font-normal text-jg-metal-500">
              Still have questions? Well we’ve got answers!
            </p>
          </div>
          <FAQ faqs={faqData} />
        </div>
      )}

      {videoData || faqData ? (
        <div className="space-y-6 flex flex-col pb-12">
          <div className="text-center space-y-2">
            <h4 className="text-xl leading-6 font-semibold text-jg-metal-900">{`Can’t find what you’re looking for?`}</h4>
            <p className="text-base leading-5 font-normal text-jg-metal-500">
              Feel free to contact us by clicking on the button below
            </p>
          </div>
          <LinkButton href="mailto:support@justgo.com" text="Talk To Us" className="mx-auto" />
        </div>
      ) : (
        <div className="space-y-6 flex flex-col justify-center items-center" style={{ height: 'calc(100vh - 150px)' }}>
          <img src={ResolveClientURL(img1)} className="w-full max-w-md" />
          <div className="text-center space-y-2">
            <p className="text-lg leading-8 font-normal text-jg-metal-500">For any queries contact our Support team</p>
          </div>
          <LinkButton href="mailto:support@justgo.com" text="Talk to Support" className="mx-auto" btnSize="lg" />
        </div>
      )}
    </div>
  )
}

export default HelpPortalItem
