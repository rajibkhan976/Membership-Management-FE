import videoIntroDemo from '@jg/assets/images/videoIntroDemo.jpg'
import { LinkButton } from '@jg/common/comps'
import FAQ from '@jg/common/comps/float-helper-button/FAQ'

const HOW_TO_VIDEOES_ESSENTIAL = {
  thumbnail: videoIntroDemo,
  title: 'Learn more about JustGo Essential',
  description:
    'Learn more about our JustGoEssential subscription to help you with your Membership, Event and Email Management needs.    ',
  ytEmbedLink: '64Y7nhhsNkA',
}

const Essential = () => {
  return (
    <div className=" space-y-6">
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-3 mx-auto">
          <div className="max-w-[666px] w-full rounded-md overflow-hidden cursor-pointer mx-auto">
            <iframe
              className="max-w-[838px] w-full"
              style={{ aspectRatio: '2/1' }}
              src={'https://www.youtube-nocookie.com/embed/' + HOW_TO_VIDEOES_ESSENTIAL.ytEmbedLink + '?autoplay=1'}
            />
            <div className="space-y-4 p-4 border border-jg-metal-50 rounded-b-md h-[130px] overflow-hidden">
              <h4 className="leading-5 font-semibold text-jg-metal-700 truncate">{HOW_TO_VIDEOES_ESSENTIAL.title}</h4>
              <p className="text-sm leading-5 font-normal text-jg-metal-500">{HOW_TO_VIDEOES_ESSENTIAL.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h4 className="text-xl leading-6 font-semibold text-jg-metal-900">Frequently Asked Questions (Essential) </h4>
          <p className="text-sm leading-4 font-normal text-jg-metal-500">
            Still have questions? Well we’ve got answers!
          </p>
        </div>
        <FAQ faqs={faqs} />
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
export default Essential

const faqs = [
  {
    question: 'How long is the free trial?',
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
          The 14-day free trial period allows you to fully test the features, after which you will be charged for the
          service unless you cancel your subscription before the trial ends.
        </p>
      </div>
    ),
  },
  {
    question: 'Who is the JustGo Essential plan for?',
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>The Essential plan is for both affiliated and standalone clubs.</p>
        <p>
          If you want to take your club to the next level, JustGo Essential is the plan for you. It features robust
          membership management capabilities, allowing you to easily manage an unlimited number of member records, sell
          memberships online and streamline your daily tasks. Whether your club is looking to increase productivity or
          expand its community, JustGo Essential provides the solution you need to achieve your goals.
        </p>
      </div>
    ),
  },
  {
    question: 'Why should I pick the JustGo Essential plan?',
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
          The JustGo Essential subscription includes all of the features of the Lite plan with additional advanced
          features. If you’re looking to enhance your existing members’ experience, grow your community and reduce your
          overall administrative burden, this plan’s the one for you.
        </p>
        <p>
          With its 14-day FREE trial, you have the opportunity to test out all of the system's features at no cost to
          you. This gives you the flexibility to fully evaluate the system before making a decision, and the option to
          cancel without any additional expenses.
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
