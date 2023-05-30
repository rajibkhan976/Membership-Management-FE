import videoIntroDemo from '@jg/assets/images/videoIntroDemo.jpg'
import HelpPortalItem from '../HelpPortalItem'

const HOW_TO_VIDEOES_GENERAL = {
  thumbnail: videoIntroDemo,
  title: 'How to create Events ',
  description:
    'Watch this video for a comprehensive overview of the event features in JustGo and learn how you can create your first event. Use it to organise events, courses, webinars and more.',
  ytEmbedLink: 'xzMsTyUAnAE',
}

const generalFaqs = [
  {
    question: 'Why do I need to select a category for my event?',
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
        Categories allows you to organize your events view for your members.
        </p>
      </div>
    ),
  },

  {
    question: 'Why would I hide the date & time of my event?',
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
        Event Start/End date can be hidden for members, these are suitable for events/courses that does not have any fixed date.
        </p>
      </div>
    ),
  },
  {
    question: 'Can I restrict who can buy my event tickets?',
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
        Purchase ticket restrictions allows you to prevent certain members from purchasing an event ticket through various smart rules.
        </p>
      </div>
    ),
  },
  {
    question: 'Are my events visible to everyone or only my members?',
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
        Purchase ticket restrictions allows you to prevent certain members from purchasing an event ticket through various smart rules.
        </p>
        <p>
        An event is visible to everyone if it’s set to public, however, not everyone will be able to purchase tickets unless satisfying the ticket purchase rules.
        </p>
      </div>
    ),
  },
  {
    question: 'Why would I add a product to my event ticket?',
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
        Upsell products allows you to provide additional benefits to your members through ticket/membership purchase journey.
        </p>
        <p>
        Available for Pro.
        </p>
      </div>
    ),
  },
  {
    question: 'Can I book people onto my event?',
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
        As an Administrator, you have the access to book your members to an event through Manage Bookings under Event Management.
        </p>
      </div>
    ),
  },
  {
    question: 'How do I cancel an event booking?',
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
        Member Bookings can be cancelled through events Manage bookings for Event Management.
        </p>
      </div>
    ),
  },
  {
    question: "Why can't I edit the tickets for my live event?",
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
        Once an event has been published the tickets cannot be amended,
        </p>
        <p>
        to further edit a published ticket first you will need to return the event back to draft and make the adjustments.
        </p>
      </div>
    ),
  },
  {
    question: "Why doesn't the map move when I set the address?",
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
        The map automatically calibrates depending on the event location entered during event create.
        </p>
        <p>
        If you find the map is not showing the correct location, feel free to select the "Not the right location on Map?"
        </p>
        <p>
        to add manually update the location latlog.
        </p>
      </div>
    ),
  },
  {
    question: 'What does it mean by event contacts?',
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
          {/* <span className="text-jg-green-500">Ans: </span> */}
          Event contacts helps present direct information for members to reach out if they have questions
          regarding the event
        </p>
      </div>
    ),
  },
  {
    question: 'What does it mean by ticket code?',
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
          {/* <span className="text-jg-green-500">Ans: </span> */}
          Ticket code helps you to identify tickets in the Products
        </p>
      </div>
    ),
  },
  {
    question: 'What does it mean by ticket code?',
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
          {/* <span className="text-jg-green-500">Ans: </span> */}
          Ticket code helps you to identify tickets in the Products
        </p>
      </div>
    ),
  },
  {
    question: 'What does it mean by ticket code?',
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
          {/* <span className="text-jg-green-500">Ans: </span> */}
          It can be done through Event Management
        </p>
      </div>
    ),
  },
  {
    question: 'What does featured event mean?',
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
          {/* <span className="text-jg-green-500">Ans: </span> */}
          Featured Event allows to present specific events to the spotlight by adding them to the Featured events
          panel.
        </p>
      </div>
    ),
  },
  {
    question: 'How do I share the event with my members?',
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
          {/* <span className="text-jg-green-500">Ans: </span> */}
          After publishing the event, it will be visible to all members. You can also feature event to make it
          more visible to members
        </p>
      </div>
    ),
  },
  // More questions...
]
const EventManagement = () => {
  return (
    <HelpPortalItem  videoData={HOW_TO_VIDEOES_GENERAL} faqData={generalFaqs}/>
  )
}
export default EventManagement

