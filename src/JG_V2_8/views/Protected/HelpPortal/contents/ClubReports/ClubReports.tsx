import videoIntroDemo from '@jg/assets/images/videoIntroDemo.jpg'
import { LinkButton } from '@jg/common/comps'
import FAQ from '@jg/common/comps/float-helper-button/FAQ'
import HelpPortalItem from '../HelpPortalItem'

const HOW_TO_VIDEOES_GENERAL = {
  thumbnail: videoIntroDemo,
  title: 'How to Navigate your Club Profile',
  description: "Get a full overview of your club profile, keep your club's information up to date, view and manage your members data and membership effectively.",
  ytEmbedLink: '0NqLRoBZ-n4',
}

const ClubReports = () => {
  return <HelpPortalItem/>
}
export default ClubReports

const generalFaqs = [
  {
    question: "How do I update my club details?",
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
          {/* <span className="text-jg-green-500">Ans: </span> */}
          Club Basic details can be updated via Club Profile.
        </p>
      </div>
    ),
  },
  {
    question: "How do I give other members administration rights to my club?",
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
          {/* <span className="text-jg-green-500">Ans: </span> */}
          The administrator role can be given to any member by simply providing the Admin role to any member.
        </p>
      </div>
    ),
  },

  {
    question: "Can I buy memberships on behalf of my members?",
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
          {/* <span className="text-jg-green-500">Ans: </span> */}
          As administrator, you can purchase a membership on behalf of any member.
        </p>
      </div>
    ),
  },
  {
    question: "How do I see which of my members have an active membership?",
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
          {/* <span className="text-jg-green-500">Ans: </span> */}
          You can see if the member has a membership checking summary on the Club Members page.
        </p>
      </div>
    ),
  },
  {
    question: "How do I pay for my club affiliation?",
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
          {/* <span className="text-jg-green-500">Ans: </span> */}
          Club affiliations can be directly purchased through Club Affiliation.
        </p>
      </div>
    ),
  },
  {
    question: "Can I bulk renew memberships of Club members?",
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
          {/* <span className="text-jg-green-500">Ans: </span> */}
          Bulk renew tool allows you to renew all your club members membership in bulk.
        </p>
      </div>
    ),
  },
  // More questions...
]
