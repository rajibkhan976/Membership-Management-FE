import videoIntroDemo from '@jg/assets/images/videoIntroDemo.jpg'
import { LinkButton } from '@jg/common/comps'
import FAQ from '@jg/common/comps/float-helper-button/FAQ'

const HOW_TO_VIDEOES_GENERAL = {
  thumbnail: videoIntroDemo,
  title: "JustGo pricing overview",
  description: '',
  ytEmbedLink: 'XWOQLRzBnpI',
}

const General = () => {
  return (
    <div className=" space-y-6">
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-3 mx-auto">
          <div className="max-w-[666px] w-full rounded-md overflow-hidden cursor-pointer mx-auto">
            <iframe
              className="max-w-[838px] w-full"
              style={{ aspectRatio: '2/1' }}
              src={'https://www.youtube-nocookie.com/embed/' + HOW_TO_VIDEOES_GENERAL.ytEmbedLink + '?autoplay=1'}
            />
            <div className="space-y-4 p-4 border border-jg-metal-50 rounded-b-md h-[130px] overflow-hidden">
              <h4 className="leading-5 font-semibold text-jg-metal-700 truncate">{HOW_TO_VIDEOES_GENERAL.title}</h4>
              <p className="text-sm leading-5 font-normal text-jg-metal-500">{HOW_TO_VIDEOES_GENERAL.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h4 className="text-xl leading-6 font-semibold text-jg-metal-900">Frequently Asked Questions (General) </h4>
          <p className="text-sm leading-4 font-normal text-jg-metal-500">
            Still have questions? Well we’ve got answers!
          </p>
        </div>
        <FAQ faqs={generalFaqs} />
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
export default General

const generalFaqs = [
  {
    question: 'Why should I choose JustGo?',
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
          JustGo has been developed over the past two decades, giving us plenty of time to fine-tune our platform and
          software. From managing members to sending branded emails to organising events, it’s a comprehensive solution
          to all your club management needs. Our team is committed to updating and enhancing the software over time,
          giving you the latest technology to grow your community whilst ensuring an excellent member experience.
        </p>
      </div>
    ),
  },

  {
    question: 'Why does JustGo have 3 pricing plans?',
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
          Our plans are designed to accommodate your needs, depending on your club's requirements and activities. Each
          plan offers a combination of features and benefits, allowing you to have complete flexibility and freedom in
          selecting the best option for your club. Additionally, we are offering you a 14-day free trial period for you
          to evaluate the options and make an informed decision for your community.
        </p>
      </div>
    ),
  },
  {
    question: 'Are VAT/taxes applicable to JustGo?',
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
          Depending on your region, local taxes may be applied to your transaction rates where applicable. You can find
          further information on the payment screen.
        </p>
      </div>
    ),
  },
  {
    question: 'What are the payment options?',
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>All JustGo subscriptions can be paid for by credit or debit card monthly, quarterly or annually.</p>
      </div>
    ),
  },
  {
    question: 'What is the cancellation policy? ',
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
  {
    question: 'What happens if I go over the member threshold I have purchased?',
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
          If you go over the member threshold, you will automatically be upgraded to the next tier. For example, if you
          have purchased a 50 member subscription and you go over the 50 member threshold, your subscription will be
          automatically upgraded to the next tier up and you will pay the new price following the upgrade.
        </p>
      </div>
    ),
  },
  // More questions...
]
