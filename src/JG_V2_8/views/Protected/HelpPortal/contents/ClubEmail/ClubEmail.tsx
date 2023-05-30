import videoIntroDemo from '@jg/assets/images/videoIntroDemo.jpg'
import { LinkButton } from '@jg/common/comps'
import FAQ from '@jg/common/comps/float-helper-button/FAQ'
import HelpPortalItem from '../HelpPortalItem'

const HOW_TO_VIDEOES_GENERAL = {
  thumbnail: videoIntroDemo,
  title: 'How to send your first email through JustGo',
  description: "Learn how to send your first email using JustGo’s Club Email feature. You will learn how to change the layout, content, and schedule of the automated system emails.",
  ytEmbedLink: 'Tl-HH96VAkE',
}

const ClubEmail = () => {
  return <HelpPortalItem videoData={HOW_TO_VIDEOES_GENERAL} faqData={generalFaqs}/>
}
export default ClubEmail

const generalFaqs = [
  {
    question: "What is Club Email used for?",
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
          {/* <span className="text-jg-green-500">Ans: </span> */}
          Club email is used to send email in Bulk to all club members or certain group of members.
        </p>
      </div>
    ),
  },
  {
    question: "How do I email just a group of my members instead of them all?",
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
          {/* <span className="text-jg-green-500">Ans: </span> */}
          Club email provides you the flaxibilitty to filterout spacific group of recipients you would prefer to send your emails i.e. members who does not have membership, or membership and much more.
        </p>
      </div>
    ),
  },

  {
    question: "Can I preview an email before I send it to my members?",
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
          {/* <span className="text-jg-green-500">Ans: </span> */}
          You have the option to preview or send a test email to your self before sending your email to all members.
        </p>
      </div>
    ),
  },
  // More questions...
]
