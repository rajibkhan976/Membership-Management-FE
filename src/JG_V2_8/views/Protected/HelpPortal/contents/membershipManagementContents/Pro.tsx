import videoIntroDemo from '@jg/assets/images/videoIntroDemo.jpg'
import { LinkButton } from '@jg/common/comps'
import FAQ from '@jg/common/comps/float-helper-button/FAQ'

const HOW_TO_VIDEOES_PRO = {
  thumbnail: videoIntroDemo,
  title: 'Learn more about JustGo Pro',
  description:
    'Learn more about our JustGo Pro subscription to help you with all your administration needs. Our most comprehensive package to help you save time and improve your member experience in one.',
  ytEmbedLink: 'XsvwH-g_-x0',
}

const Pro = () => {
  return (
    <div className=" space-y-6">
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-3 mx-auto">
          <div className="max-w-[666px] w-full rounded-md overflow-hidden cursor-pointer mx-auto">
            <iframe
              className="max-w-[838px] w-full"
              style={{ aspectRatio: '2/1' }}
              src={'https://www.youtube-nocookie.com/embed/' + HOW_TO_VIDEOES_PRO.ytEmbedLink + '?autoplay=1'}
            />
            <div className="space-y-4 p-4 border border-jg-metal-50 rounded-b-md h-[130px] overflow-hidden">
              <h4 className="leading-5 font-semibold text-jg-metal-700 truncate">{HOW_TO_VIDEOES_PRO.title}</h4>
              <p className="text-sm leading-5 font-normal text-jg-metal-500">{HOW_TO_VIDEOES_PRO.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h4 className="text-xl leading-6 font-semibold text-jg-metal-900">Frequently asked questions (Pro)</h4>
          <p className="text-sm leading-4 font-normal text-jg-metal-500">
            Still have questions? Well we’ve got answers!
          </p>
        </div>
        <FAQ faqs={proFaqs} />
      </div>

      <div className="space-y-6 flex flex-col pb-12">
        <div className="text-center space-y-2">
          <h4 className="text-xl leading-6 font-semibold text-jg-metal-900">{`Can’t find what you’re looking for?`}</h4>
          <p className="text-base leading-5 font-normal text-jg-metal-500">
            Feel free to contact us by clicking on the button below
          </p>
        </div>
        <LinkButton href="mailto:support@justgo.com" text="Talk To Us" className="mx-auto" />
      </div>
    </div>
  )
}
export default Pro

const proFaqs = [
  {
    question: 'How long is the free trial?',
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
          The free trial is 14 days. Your account will be automatically converted to a paid subscription unless you
          cancel before the trial period expires.
        </p>
      </div>
    ),
  },

  {
    question: 'Who is the JustGo Pro plan for?',
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
          JustGo Pro is for the clubs that truly want the best member experience. It minimises the administrative
          workload for club administrators and helps create a space where members can fully participate in and enjoy
          club activities. If you want to be a pro at running your club successfully, this plan is the one for you!
        </p>
      </div>
    ),
  },
  {
    question: 'Why should I pick the JustGo Pro plan?',
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
          JustGo Pro subscription offers all the advantages of both Lite and Essential, along with an advanced and
          all-inclusive solution to manage your club effectively.
        </p>
        <p>
          t handles all the aspects of membership management, events coordination, communication, website management and
          member journey, so you can fully focus on enjoying your sport. It’s built to make your life easier—give it a
          try!
        </p>
      </div>
    ),
  },
  {
    question: 'What is the cancellation policy?',
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
          You can cancel your JustGo Lite, Essential or Pro subscription at any time. The cancellation will take effect
          from the end of your existing contract. So if you have signed up and paid for an annual subscription, the
          cancellation will take effect at the end of the subscription year.
        </p>
      </div>
    ),
  },
  // More questions...
]
