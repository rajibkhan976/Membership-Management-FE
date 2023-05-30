import videoIntroDemo from '@jg/assets/images/videoIntroDemo.jpg'
import { LinkButton } from '@jg/common/comps'
import FAQ from '@jg/common/comps/float-helper-button/FAQ'

const HOW_TO_VIDEOES_LITE = {
  thumbnail: videoIntroDemo,
  title: 'Learn more about JustGo Lite',
  description: 'Learn more about our JustGoEssential subscription to help you with your Membership, Event and Email Management needs.',
  ytEmbedLink: 'UEJusQiTWbs',
}

const Lite = () => {
  return (
    <div className=" space-y-6">
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-3 mx-auto">
          <div className="max-w-[666px] w-full rounded-md overflow-hidden cursor-pointer mx-auto">
            <iframe
              className="max-w-[838px] w-full"
              style={{ aspectRatio: '2/1' }}
              src={'https://www.youtube-nocookie.com/embed/' + HOW_TO_VIDEOES_LITE.ytEmbedLink + '?autoplay=1'}
            />
            <div className="space-y-4 p-4 border border-jg-metal-50 rounded-b-md h-[130px] overflow-hidden">
              <h4 className="leading-5 font-semibold text-jg-metal-700 truncate">{HOW_TO_VIDEOES_LITE.title}</h4>
              <p className="text-sm leading-5 font-normal text-jg-metal-500">{HOW_TO_VIDEOES_LITE.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h4 className="text-xl leading-6 font-semibold text-jg-metal-900">Frequently Asked Questions (Lite)</h4>
          <p className="text-sm leading-4 font-normal text-jg-metal-500">
            Still have questions? Well we’ve got answers!
          </p>
        </div>
        <FAQ faqs={liteFaqs} />
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
export default Lite

const liteFaqs = [
  {
    question: 'How long is the free trial?',
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
          The free trial is for 14 days, after which you will be automatically upgraded to a paid plan unless you cancel
          your subscription before the trial ends.
        </p>
      </div>
    ),
  },

  {
    question: 'Who is the JustGo Lite plan for?',
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
          The JustGo Lite plan is for organisations that do not require the full range of functionality JustGo has to
          offer. If you’re looking for a good solution to communicate with your members better and organise events (or
          courses), then we recommend trying out JustGo Lite. If you want to take advantage of a more comprehensive
          solution to streamline your administration, you can check out JustGo Essential and Pro.
        </p>
      </div>
    ),
  },
  {
    question: 'Why should I pick the JustGo Lite plan?',
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
          The Lite plan is a great starting point for simplifying your club administration. If you’re looking for
          time-saving features to help you grow your club, then this is the perfect option for you. Plus, the 14-day
          FREE trial gives you the chance to explore and utilise every feature within the system, so you can always
          cancel afterwards with no further cost to you!
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
