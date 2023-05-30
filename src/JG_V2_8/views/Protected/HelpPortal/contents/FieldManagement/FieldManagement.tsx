import H1 from '@comps/uiComps/Heading/H1'
import videoIntroDemo from '@jg/assets/images/videoIntroDemo.jpg'
import LinkButton from '@jg/common/comps/linkButton/LinkButton'
import HelpPortalItem from '../HelpPortalItem'

const HOW_TO_VIDEOES_GENERAL = {
  thumbnail: videoIntroDemo,
  title: 'How to set up Field Management',
  description: 'This video will help optimise your member data capture process. You will learn how to add data capture fields to the member purchase and ticket purchase journeys to gather more information about your members, thus ensuring a smooth member experience.',
  ytEmbedLink: '3VqcKKHj6eU',
}
const generalFaqs =  [
  {
    question: "Can I create my own fields to capture members data?",
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
          {/* <span className="text-jg-green-500">Ans: </span> */}
          Field  Management allows you to capture additional data from your members by placing questions on various journeys.
        </p>
      </div>
    ),
  },
  {
    question: "Can I create private fields that my members can’t, see?",
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
          {/* <span className="text-jg-green-500">Ans: </span> */}
          Any field can be private, a field accessibility can be managed through its settings on Field Management
        </p>
      </div>
    ),
  },

  {
    question: "Can I report on any new fields I create?",
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
          {/* <span className="text-jg-green-500">Ans: </span> */}
          Field Data can be downloaded through Club Reports
        </p>
      </div>
    ),
  },
  {
    question: "Can I add my fields to the membership purchase journey?",
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
          {/* <span className="text-jg-green-500">Ans: </span> */}
          Fields can be added to membership Journey, available for Pro.
        </p>
      </div>
    ),
  },
  {
    question: "Can I add additional data capture to my events?",
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
          {/* <span className="text-jg-green-500">Ans: </span> */}
          Fields can be added to Bookins Journey, available for Pro.
        </p>
      </div>
    ),
  },
  {
    question: "Where can I view my event data capture?",
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
          {/* <span className="text-jg-green-500">Ans: </span> */}
          Captured data can be found in the Manage Bookings area
        </p>
      </div>
    ),
  },
  {
    question: "What is the difference between Profile Overview and Event Booking Overview?",
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
          {/* <span className="text-jg-green-500">Ans: </span> */}
          Both overviews allows you to capture data in different areas of the system. For example, Event Booking Overview allows to add fields to Events area whereas profile overview allows you to add questions to Memberships. Based on selected package features maybe different.              </p>
      </div>
    ),
  },
]

const FieldManagement = () => {
  return <HelpPortalItem videoData={HOW_TO_VIDEOES_GENERAL} faqData={generalFaqs}/>
}
export default FieldManagement
