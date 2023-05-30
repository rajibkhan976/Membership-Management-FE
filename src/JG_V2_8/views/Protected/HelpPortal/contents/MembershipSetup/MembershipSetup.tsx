import videoIntroDemo from '@jg/assets/images/videoIntroDemo.jpg'
import { LinkButton } from '@jg/common/comps'
import HelpPortalItem from '../HelpPortalItem'

const HOW_TO_VIDEOES_GENERAL = {
  thumbnail: videoIntroDemo,
  title: 'How to create a membership',
  description:
    'A video walkthrough of the system to understand the membership setup in JustGo. Learn how you can add membership information and perks, set a price for each membership tier, and offer special discounts or surcharges with each membership category',
  ytEmbedLink: '02lhAn33tq8',
}

const MembershipSetup = () => {
  return <HelpPortalItem videoData={HOW_TO_VIDEOES_GENERAL} faqData={generalFaqs} />
}
export default MembershipSetup

const generalFaqs = [
  {
    question: 'Can I add my own colors?',
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
          {/* <span className="text-jg-green-500">Ans: </span> */}
          You can add colors from a pre-selected list when creating your new membership..
        </p>
      </div>
    ),
  },

  {
    question: 'What is Classification?',
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
          {/* <span className="text-jg-green-500">Ans: </span> */}
          Classification helps an organization to classically link multiple levels of membership together.
        </p>
        <p>
        For example, you can link JustGo Club membership with NGB so when a member selects a Club membership NGB membership auto add itself to the cart.
        </p>
        <p>
        Note, the functionality is available for available enterprise subscriptions.
        </p>
      </div>
    ),
  },
  {
    question: 'Can my members pay by instalments?',
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
          {/* <span className="text-jg-green-500">Ans: </span> */}
          Pro package allows you to enable instruments for your memberships via Membership Setup.
        </p>
      </div>
    ),
  },
  {
    question: 'Can I restrict which members can buy my memberships?',
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
          {/* <span className="text-jg-green-500">Ans: </span> */}
          Purchase restrictions allows you can prevent certain members from purchasing membership through various smart rules.
        </p>
      </div>
    ),
  },
  {
    question: 'Can I create multiple combinations for a family membership?',
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
          {/* <span className="text-jg-green-500">Ans: </span> */}
          Family configuration allows you to create limitless family combos to provide discounts suitable for any household.
        </p>
      </div>
    ),
  },
  {
    question: 'How do I know what my membership is going to look like before I press save?',
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
          {/* <span className="text-jg-green-500">Ans: </span> */}
          The Preview button in Membership Setup allows you to create
        </p>
      </div>
    ),
  },
  {
    question: 'How would I add a product to my event Membership?',
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
          {/* <span className="text-jg-green-500">Ans: </span> */}
          Upsell products allows you to provide additional benefits to your members through ticket/membership purchase journey. Available for Pro.
        </p>
      </div>
    ),
  },
  // More questions...
]
