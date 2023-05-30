import videoIntroDemo from '@jg/assets/images/videoIntroDemo.jpg'
import { LinkButton } from '@jg/common/comps'
import HelpPortalItem from '../HelpPortalItem'

const HOW_TO_VIDEOES_GENERAL = {
  thumbnail: videoIntroDemo,
  title: 'How to set up your payment account',
  description:
    'This tutorial will show you how to create a Stripe Express account so that you and your fellow administrators can begin accepting payments.',
  ytEmbedLink: 'G-AJrNOsD08',
}

const ClubFinance = () => {
  return <HelpPortalItem faqData={generalFaqs}/>
}
export default ClubFinance

const generalFaqs = [
  {
    question: "Can I cancel my members subscriptions for them?",
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
          {/* <span className="text-jg-green-500">Ans: </span> */}
          Members suscription plans can be cancelled through Club Finance Suscriptions.
        </p>
      </div>
    ),
  },
  {
    question: "Can I create new payment plans for my members?",
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
          {/* <span className="text-jg-green-500">Ans: </span> */}
          You Can create new payment plans for members through Club Finance Subscription.
        </p>
      </div>
    ),
  },

  {
    question: "How can I see my members plans?",
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
          {/* <span className="text-jg-green-500">Ans: </span> */}
          Club Finance has various tabs for better organise view of your organisation’s financial transactions. You can find your members payments, subscriptions and instalment plans on their respective tabs
        </p>
      </div>
    ),
  },
  {
    question: "Is it easy for me to find the financial records of a certain member even when the table becomes populated?",
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
          {/* <span className="text-jg-green-500">Ans: </span> */}
          JustGo has various reports regarding financial transactions under Club Reports, you will have the ability to filter out certain variables to reflect the information you would like to view.
        </p>
      </div>
    ),
  },
  {
    question: "What kind of reports do I have access to?",
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
          {/* <span className="text-jg-green-500">Ans: </span> */}
          JustGo provides various standard reports categorized in various categories based on the area they have been specialized, you can switch through various categories to find the most suitable report for you.
        </p>
      </div>
    ),
  },
  // More questions...
]
