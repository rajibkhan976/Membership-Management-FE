import videoIntroDemo from '@jg/assets/images/videoIntroDemo.jpg'
import HelpPortalItem from '../HelpPortalItem'

const HOW_TO_VIDEOES_GENERAL = {
  thumbnail: videoIntroDemo,
  title: 'How to use Email Management',
  description: 'This video is a step-by-step demonstration of customising the appearance, personalising the content, and scheduling your system automated emails.',
  ytEmbedLink: 'KCMgM_i6qNI',
}

const generalFaqs = [
  {
    question: 'Can I have my own template?',
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
          {/* <span className="text-jg-green-500">Ans: </span> */}
          You can create as many templates as you prefer through Email Management Templates
        </p>
      </div>
    ),
  },
  {
    question: 'Why are my emails JustGo branded?',
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
          {/* <span className="text-jg-green-500">Ans: </span> */}
          For any automated emails the default template is JustGo branded, you can change this through Email
          Management {'>'} Email templates
        </p>
      </div>
    ),
  },

  {
    question: 'Can I create my own copies of the emails?',
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
          {/* <span className="text-jg-green-500">Ans: </span> */}
          In email management you will have the ability to copy default emails and tailor them to your suit
        </p>
      </div>
    ),
  },
  {
    question: 'Why are my members receiving two copies of the same email?',
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
          {/* <span className="text-jg-green-500">Ans: </span> */}
          There might be two emails with the same purpose is enabled therefore members are receiving two copies of
          the same email.
        </p>
      </div>
    ),
  },
  {
    question: 'Can I add my own emails in Email Management?',
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
          {/* <span className="text-jg-green-500">Ans: </span> */}
          You can tailor default emails to your preference including updating the email body to include your own
          email to the email body for your members convenience.
        </p>
      </div>
    ),
  },
  // More questions...
]
const EmailManagement = () => {
  return <HelpPortalItem videoData={HOW_TO_VIDEOES_GENERAL} faqData={generalFaqs}/>
}
export default EmailManagement

