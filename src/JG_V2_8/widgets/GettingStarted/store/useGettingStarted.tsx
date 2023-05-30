import create from 'zustand'

import { CategoryType } from './Interface'
import { categorieLocalsData } from './categorieLocals.json'

type FaqType = {
  id?: string
  [answer: string]: any
}

type BodyType = {
  introText?: string
  videoLink?: string
  pdfLink?: string
  articleBody?: any
  faqBody?: FaqType[]
  tags?: string[]
  leadImage?: string
}
type ContentType = {
  contentId: number
  type: 'Video' | 'User Guide' | 'Article' | 'FAQ'
  category: string
  title: string
  thumbnail?: string
  description: string
  relatedword?: string
  body: BodyType
}

const contentsLocal: ContentType[] = [
  {
    contentId: 1,
    type: 'Video',
    category: 'Getting Started',
    title: 'How to navigate the system',
    relatedword: 'Tutorial System Introduction Intro understand',
    thumbnail:
      'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/GettingStarted/VideoThumbNail/How%20to%20navigate%20the%20system%20(Video)%20.jpg',
    description:
      "Welcome to the JustGo Help Center, the ultimate destination for all your JustGo-related queries! We are here to answer all of your questions about JustGo and help you get the most out of the system. In this video, we will provide an overview of the features and resources available to you. We understand that learning a new system can be challenging, but don't worry—we are here to support you every step of the way.",

    body: {
      leadImage:
        'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/GettingStarted/Banner(Lead)Image/GettingStartedLeadImage.jpg',
      introText:
        "Welcome to the JustGo Help Center, the ultimate destination for all your JustGo-related queries! We are here to answer all of your questions about JustGo and help you get the most out of the system. In this video, we will provide an overview of the features and resources available to you. We understand that learning a new system can be challenging, but don't worry—we are here to support you every step of the way.",
      videoLink: '4ldS4V-h9PY',
      // videoLink: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
      pdfLink: '',
      articleBody: '',
      tags: ['Video', 'User Guide', 'PDF', 'FAQ'],
    },
  },
  {
    contentId: 2,
    type: 'User Guide',
    category: 'Getting Started',
    title: 'Features combined',
    relatedword: 'features how to explanation',
    thumbnail:
      'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/GettingStarted/pdfThumbnail/UserGuideImageOfClubEngagementProject_0012_Layer6.jpg',
    description:
      'Get a look at how you can combine various JustGo features to enhance and streamline administrative processes and create a seamless experience for your members.',

    body: {
      leadImage:
        'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/GettingStarted/Banner(Lead)Image/GettingStartedLeadImage.jpg',
      introText: `Get a look at how you can combine various JustGo features to enhance and streamline administrative processes and create a seamless experience for your members.`,
      videoLink: '',
      pdfLink:
        'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/GettingStarted/pdf/Features%20Combined.pdf',
      articleBody: '',
      tags: ['Video', 'User Guide', 'PDF', 'FAQ'],
    },
  },
  {
    contentId: 3,
    type: 'User Guide',
    category: 'Membership',
    title: 'How to create a Membership',
    thumbnail:
      'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Membership/pdfThumbnail/UserGuideImageOfClubEngagementProject_0009_Layer9.jpg',
    description:
      'Take a look at how you can set up your first membership, add relevant details and benefits, setup pricing for each membership as well as add special discounts and surcharges. ',
    relatedword: 'membership management member new member',
    body: {
      leadImage:
        'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Membership/Banner(Lead)Image/MembershipLeadImage.jpg',
      introText: `Take a look at how you can set up your first membership, add relevant details and benefits, setup pricing for each membership as well as add special discounts and surcharges.`,
      videoLink: '',
      pdfLink:
        'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Membership/pdf/How%20to%20Create%20Membership.pdf',
      articleBody: [],
      tags: ['Video', 'User Guide', 'PDF', 'FAQ'],
    },
  },

  {
    contentId: 4,
    type: 'Video',
    category: 'Membership',
    title: 'How to create a Membership',
    thumbnail:
      'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Membership/VideoThumbNail/Create-a-membership-video.jpg',
    description:
      'A video walkthrough of the system to understand the membership setup in JustGo. Learn how you can add membership information and perks, set a price for each membership tier, and offer special discounts or surcharges with each membership category.',
    relatedword: 'membership management member new member video',
    body: {
      leadImage:
        'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Membership/Banner(Lead)Image/MembershipLeadImage.jpg',
      introText: `A video walkthrough of the system to understand the membership setup in JustGo. Learn how you can add membership information and perks, set a price for each membership tier, and offer special discounts or surcharges with each membership category.`,
      videoLink: '02lhAn33tq8',
      pdfLink: '',
      articleBody: [],
      tags: ['Video', 'User Guide', 'PDF', 'FAQ'],
    },
  },

  {
    contentId: 5,
    type: 'User Guide',
    category: 'Membership',
    title: 'Additional requirements',
    thumbnail:
      'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Membership/pdfThumbnail/UserGuideImageofClubEngagementProject_0016_Layer2.jpg',
    description:
      'Explore how you can combine Field Management with your memberships to collect additional data from your members. This can give you special insights into your members’ goals and help you upsell products with each membership.',
    body: {
      leadImage:
        'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Membership/Banner(Lead)Image/MembershipLeadImage.jpg',
      introText: ` Explore how you can combine Field Management with your memberships to collect additional data from your members. This can give you special insights into your members’ goals and help you upsell products with each membership.`,
      videoLink: '',
      pdfLink:
        'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Membership/pdf/Features%20Combined.pdf',
      articleBody: [],
      tags: ['Video', 'User Guide', 'PDF', 'FAQ'],
    },
  },

  {
    contentId: 6,
    type: 'User Guide',
    category: 'Membership',
    title: 'Smart Rules',
    thumbnail:
      'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Membership/pdfThumbnail/UserGuideImageOfClubEngagementProject_0002_Layer16.jpg',
    description:
      ' Get a look at how you can add conditions or “smart rules” to apply restrictions, discounts, and surcharges to your memberships and event tickets.',
    relatedword: 'rules smart purchase purchase rule restrictions',
    body: {
      leadImage:
        'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Membership/Banner(Lead)Image/MembershipLeadImage.jpg',
      introText: `  Get a look at how you can add conditions or “smart rules” to apply restrictions, discounts, and surcharges to your memberships and event tickets.`,
      videoLink: '',
      pdfLink:
        'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Membership/pdf/Smart%20Rules.pdf',
      articleBody: [],
      tags: ['Video', 'User Guide', 'PDF', 'FAQ'],
    },
  },

  {
    contentId: 7,
    type: 'Video',
    category: 'Membership',
    title: 'Bulk renew',
    thumbnail:
      'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Membership/VideoThumbNail/Bulk-Renew-Video-(1).jpg',
    description:
      'Save hours at a time by learning how club admins can renew all their club members’ memberships in bulk.',
    relatedword: 'membership renew bulk member new member club',
    body: {
      leadImage:
        'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Membership/Banner(Lead)Image/MembershipLeadImage.jpg',
      introText: ` Save hours at a time by learning how club admins can renew all their club members’ memberships in bulk.`,
      videoLink: 'OHV90W9Fq2o',
      pdfLink: '',
      articleBody: [],
      tags: ['Video', 'User Guide', 'PDF', 'FAQ'],
    },
  },

  {
    contentId: 8,
    type: 'User Guide',
    category: 'Membership',
    title: 'Bulk renew',
    thumbnail:
      'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Membership/pdfThumbnail/User%20guide%20image%20of%20Club%20Engagement%20Project_0015_Layer%203.jpg',
    description: 'In this guide, we will demonstrate how you can update and renew club members’ memberships in bulk.',
    relatedword: 'membership renew management bulk member new member',
    body: {
      leadImage:
        'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Membership/Banner(Lead)Image/MembershipLeadImage.jpg',
      introText: ` In this guide, we will demonstrate how you can update and renew club members’ memberships in bulk.`,
      videoLink: '',
      pdfLink: 'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Membership/pdf/Bulk%20renew.pdf',
      articleBody: [],
      tags: ['Video', 'User Guide', 'PDF', 'FAQ'],
    },
  },

  {
    contentId: 9,
    type: 'User Guide',
    category: 'Membership',
    title: 'Family membership configuration',
    thumbnail:
      'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Membership/pdfThumbnail/User%20guide%20image%20of%20Club%20Engagement%20Project_0013_Layer%205.jpg',
    description:
      'Explore how you can combine Field Management with your memberships to collect additional data from your members. This can give you special insights into your members’ goals and help you upsell products with each membership.',
    relatedword: 'Family Family discount family membership',
    body: {
      leadImage:
        'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Membership/Banner(Lead)Image/MembershipLeadImage.jpg',
      introText: ` Learn how to configure family memberships and set up discount criteria to help your community take advantage of the family discount feature.`,
      videoLink: '',
      pdfLink:
        'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Membership/pdf/Family%20membership%20configuration.pdf',
      articleBody: [],
      tags: ['Video', 'User Guide', 'PDF', 'FAQ'],
    },
  },

  {
    contentId: 10,
    type: 'User Guide',
    category: 'Events',
    title: 'How to create Events',
    thumbnail:
      'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Events/pdfThumbnail/UserGuideImageofClubEngagementProject_0010_Layer8.jpg',
    description:
      'See how you can organise successful events using JustGo’s powerful Event Management feature. With this feature, you’ll be able to pull off a tournament with other local clubs joining, an AGM, and even fundraisers too.',
    relatedword: 'Booking events ticketing courses attendance',
    body: {
      leadImage:
        'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Events/Banner(Lead)Image/EventBanner.jpg',
      introText: ` See how you can organise successful events using JustGo’s powerful Event Management feature. With this feature, you’ll be able to pull off a tournament with other local clubs joining, an AGM, and even fundraisers too.`,
      videoLink: '',
      pdfLink:
        'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/GettingStarted/VideoThumbNail/Event_Management_User_Guide.pdf',
      articleBody: [],
      tags: ['Video', 'User Guide', 'PDF', 'FAQ'],
    },
  },

  {
    contentId: 11,
    type: 'Video',
    category: 'Events',
    title: 'How to create Events',
    thumbnail:
      'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Events/VideoThumbNail/Events-video.jpg',
    description:
      'Watch this video for a comprehensive overview of the event features in JustGo and learn how you can create your first event. Use it to organise events, courses, webinars and more.',
    relatedword: 'Booking events ticketing courses attendance',
    body: {
      leadImage:
        'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Events/Banner(Lead)Image/EventBanner.jpg',
      introText: `Watch this video for a comprehensive overview of the event features in JustGo and learn how you can create your first event. Use it to organise events, courses, webinars and more.`,
      videoLink: 'xzMsTyUAnAE',
      pdfLink: '',
      articleBody: [],
      tags: ['Video', 'User Guide', 'PDF', 'FAQ'],
    },
  },

  {
    contentId: 12,
    type: 'User Guide',
    category: 'Events',
    title: 'Managing waitlists',
    thumbnail:
      'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Events/pdfThumbnail/UserGuideImageOfClubEngagementProject_0004_Layer14.jpg',
    description:
      "Learn how to build, manage, transfer and export waitlists for any event using JustGo's Event Waitlist feature.",
    relatedword: 'Booking, events, ticketing, attendance waitlist, courses',
    body: {
      leadImage:
        'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Events/Banner(Lead)Image/EventBanner.jpg',
      introText: ` Learn how to build, manage, transfer and export waitlists for any event using JustGo's Event Waitlist feature.`,
      videoLink: '',
      pdfLink:
        'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Events/pdf/Manage%20Waitlist.pdf',
      articleBody: [],
      tags: ['Video', 'User Guide', 'PDF', 'FAQ'],
    },
  },

  {
    contentId: 13,
    type: 'User Guide',
    category: 'Events',
    title: 'Smart Rules',
    thumbnail:
      'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Events/pdfThumbnail/UserGuideImageOfClubEngagementProject_0014_Layer4.jpg',
    description:
      'Get a look at how you can add conditions or “smart rules” to apply restrictions, discounts, and surcharges to your memberships and event tickets.',
    relatedword:
      'Booking, events, ticketing, courses, attendance, rules, smart rules, customisation, customise, configure',
    body: {
      leadImage:
        'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Events/Banner(Lead)Image/EventBanner.jpg',
      introText: `Get a look at how you can add conditions or “smart rules” to apply restrictions, discounts, and surcharges to your memberships and event tickets.`,
      videoLink: '',
      pdfLink: 'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Events/pdf/Smart%20Rules.pdf',
      articleBody: [],
      tags: ['Video', 'User Guide', 'PDF', 'FAQ'],
    },
  },
  {
    contentId: 14,
    type: 'User Guide',
    category: 'Email & Communications',
    title: 'How to use Email Management ',
    thumbnail:
      'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Communications/pdfThumbnail/User-guide-image-of-Club-Engagement-Project.jpg',
    description:
      'This user guide will give you a run-through of how you can edit the appearance, personalise the content and schedule your systems automated emails.',
    relatedword: 'Enquiry Handling​, Email, Message, Communications, Branded Email, Mail, Announcement, Chat',
    body: {
      leadImage:
        'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Communications/Banner(Lead)Image/EmailCommunicationsLeadImage.jpg',
      introText: `This user guide will give you a run-through of how you can edit the appearance, personalise the content and schedule your systems automated emails.`,
      videoLink: '',
      pdfLink:
        'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Communications/pdf/How%20to%20Use%20Email%20Management.pdf',
      articleBody: [],
      tags: ['Video', 'User Guide', 'PDF', 'FAQ'],
    },
  },
  {
    contentId: 15,
    type: 'Video',
    category: 'Email & Communications',
    title: 'How to use Email Management',
    thumbnail:
      'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Communications/VideoThumbNail/How-to-use-Email-Management-(Video)-(1).jpg',
    description:
      'This video is a step-by-step demonstration of customising the appearance, personalising the content, and scheduling your system automated emails.',
    relatedword: 'Enquiry Handling​, Email, Message, Communications, Branded Email, Mail, Announcement',
    body: {
      leadImage:
        'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Communications/Banner(Lead)Image/EmailCommunicationsLeadImage.jpg',
      introText: `This video is a step-by-step demonstration of customising the appearance, personalising the content, and scheduling your system automated emails.`,
      videoLink: 'KCMgM_i6qNI',
      pdfLink: '',
      articleBody: [],
      tags: ['Video', 'User Guide', 'PDF', 'FAQ'],
    },
  },
  {
    contentId: 16,
    type: 'Video',
    category: 'Email & Communications',
    title: 'How to Use Email and Communication',
    thumbnail:
      'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Communications/VideoThumbNail/Send-your-first-email-video.jpg',
    description:
      'This video is a step-by-step demonstration of what is available in the Email and Communication module and how you can use those.',
    relatedword: 'Enquiry Handling​, Email, Message, Communications, Branded Email, Mail, Announcement',
    body: {
      leadImage:
        'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Communications/Banner(Lead)Image/EmailCommunicationsLeadImage.jpg',
      introText: `This video is a step-by-step demonstration of what is available in the Email and Communication module and how you can use those.`,
      videoLink: 'eCVgm0jMmUo',
      pdfLink: '',
      articleBody: [],
      tags: ['Video', 'User Guide', 'PDF', 'FAQ'],
    },
  },
  {
    contentId: 17,
    type: 'User Guide',
    category: 'Email & Communications',
    title: 'How to brand your email templates',
    thumbnail:
      'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Communications/pdfThumbnail/UserGuideMageOfClubEngagementProject_0011_Layer7.jpg',
    description:
      'This guide demonstrates how you can personalise your email templates to suit your brand, create new email templates and personalise all or some of your emails with a single click.',
    relatedword: 'Enquiry Handling​, Email, Message, Communications, Branded Email, Mail, Announcement',
    body: {
      leadImage:
        'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Communications/Banner(Lead)Image/EmailCommunicationsLeadImage.jpg',
      introText: `This guide demonstrates how you can personalise your email templates to suit your brand, create new email templates and personalise all or some of your emails with a single click.`,
      videoLink: '',
      pdfLink:
        'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Communications/pdf/How%20to%20Brand%20Your%20Email%20Templates.pdf',
      articleBody: [],
      tags: ['Video', 'User Guide', 'PDF', 'FAQ'],
    },
  },
  {
    contentId: 18,
    type: 'User Guide',
    category: 'Finance & Payments',
    title: 'How to set up your payment account',
    thumbnail:
      'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Finance/pdfThumbnail/UserGuideImageOfClubEngagementProject_0006_Layer12.jpg',
    description: 'Want to start taking payments online? Follow this guide to set up your Stripe Express account.',
    relatedword: 'Payment, Stripe, Fees, Online payment, finance, payment dashboard, account, payment account,',
    body: {
      leadImage:
        'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Finance/Banner(Lead)Image/FinanceAndPaymentsCategory.png',
      introText: `Want to start taking payments online? Follow this guide to set up your Stripe Express account.`,
      videoLink: '',
      pdfLink:
        'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Finance/pdf/JustGo%20Payment%20Setup.pptx.pdf',
      articleBody: [],
      tags: ['Video', 'User Guide', 'PDF', 'FAQ'],
    },
  },
  {
    contentId: 19,
    type: 'Video',
    category: 'Finance & Payments',
    title: 'How to set up your payment account',
    thumbnail:
      'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Finance/VideoThumbNail/How-to-set-up-your-payment-account-(Video)-(1).jpg',
    description:
      'This tutorial will show you how to create a Stripe Express account so that you and your fellow administrators can begin accepting payments.',
    relatedword: 'Payment, Stripe, Fees, Online payment, finance, payment dashboard, account, payment account',
    body: {
      leadImage:
        'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Finance/Banner(Lead)Image/FinanceAndPaymentsCategory.png',
      introText: `This tutorial will show you how to create a Stripe Express account so that you and your fellow administrators can begin accepting payments.`,
      videoLink: 'G-AJrNOsD08',
      pdfLink: '',
      articleBody: [],
      tags: ['Video', 'User Guide', 'PDF', 'FAQ'],
    },
  },
  {
    contentId: 20,
    type: 'User Guide',
    category: 'Website Builder',
    title: 'Website Builder',
    thumbnail:
      'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/WebsiteBuilder/pdfThumbnail/UserGuideImageOfClubEngagementProject_0001_Layer17.jpg',
    description:
      'This guide teaches you how to build a front-end website for your club to create your own shop window. You can showcase membership details, member activities, training and club information, upcoming events and lots more.',
    relatedword: 'site, website, webpage, feed, social media feed',
    body: {
      leadImage:
        'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/WebsiteBuilder/Banner(Lead)Image/WebsiteBuildercategory.JPG',
      introText: `This guide teaches you how to build a front-end website for your club to create your own shop window. You can showcase membership details, member activities, training and club information, upcoming events and lots more.`,
      videoLink: '',
      pdfLink:
        'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/WebsiteBuilder/pdf/Website%20Builder%20User%20Guide.pptx.pdf',
      articleBody: [],
      tags: ['Video', 'User Guide', 'PDF', 'FAQ'],
    },
  },
  {
    contentId: 21,
    type: 'User Guide',
    category: 'Field Management',
    title: 'How to set up Field Management',
    thumbnail:
      'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/FieldManagement/pdfThumbnail/UserGuideImageOfClubEngagementProject_0007_Layer11.jpg',
    description:
      'Take your member data capture to the next level with this user guide. Get tips on adding data capture fields within member purchase and ticket purchase journey.',
    relatedword: 'fields, data, information, member, club',
    body: {
      leadImage:
        'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/FieldManagement/Banner(Lead)Image/FieldManagementcategory.JPG',
      introText: `Take your member data capture to the next level with this user guide. Get tips on adding data capture fields within member purchase and ticket purchase journey.`,
      videoLink: '',
      pdfLink:
        'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/FieldManagement/pdf/How%20to%20Setup%20Field%20Management.pdf',
      articleBody: [],
      tags: ['Video', 'User Guide', 'PDF', 'FAQ'],
    },
  },
  {
    contentId: 22,
    type: 'Video',
    category: 'Field Management',
    title: 'How to set up Field Management',
    thumbnail:
      'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/FieldManagement/VideoThumbNail/How-to-set-up-Field-Management-(Video)-(1).jpg',
    description:
      'This video will help optimise your member data capture process. You will learn how to add data capture fields to the member purchase and ticket purchase journeys to gather more information about your members, thus ensuring a smooth member experience.',
    relatedword: 'fields, data, information, member, club, video',
    body: {
      leadImage:
        'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/FieldManagement/Banner(Lead)Image/FieldManagementcategory.JPG',
      introText: `This video will help optimise your member data capture process. You will learn how to add data capture fields to the member purchase and ticket purchase journeys to gather more information about your members, thus ensuring a smooth member experience.`,
      videoLink: '3VqcKKHj6eU',
      pdfLink: '',
      articleBody: [],
      tags: ['Video', 'User Guide', 'PDF', 'FAQ'],
    },
  },
  {
    contentId: 23,
    type: 'User Guide',
    category: 'Field Management',
    title: 'How to use fields in event & membership setup',
    thumbnail:
      'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/FieldManagement/pdfThumbnail/UserGuideImageOfClubEngagementProject_0005_Layer13.jpg',
    description:
      'Get a look at how you can use field management to streamline administrative processes and design a seamless experience for your members.',
    relatedword: 'event, membership, field, data,',
    body: {
      leadImage:
        'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/FieldManagement/Banner(Lead)Image/FieldManagementcategory.JPG',
      introText: `Get a look at how you can use field management to streamline administrative processes and design a seamless experience for your members.`,
      videoLink: '',
      pdfLink:
        'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Membership/pdf/Features%20Combined.pdf',
      articleBody: [],
      tags: ['Video', 'User Guide', 'PDF', 'FAQ'],
    },
  },
  {
    contentId: 24,
    type: 'User Guide',
    category: 'Club Profile',
    title: 'How to navigate your Club Profile',
    thumbnail:
      'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/ClubProfile/pdfThumbnail/UserGuideImageOfClubEngagementProject_0008_Layer10.jpg',
    description:
      'This tutorial will show you how to see and update member information, pay for your club affiliation (if required), and keep your club’s information up-to-date.',
    relatedword: 'club, profile, setup',
    body: {
      leadImage:
        'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/ClubProfile/Banner(Lead)Image/ClubProfilecategory.JPG',
      introText: `This tutorial will show you how to see and update member information, pay for your club affiliation (if required), and keep your club’s information up-to-date.`,
      videoLink: '',
      pdfLink:
        'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/ClubProfile/pdf/Club%20Profile.pdf',
      articleBody: [],
      tags: ['Video', 'User Guide', 'PDF', 'FAQ'],
    },
  },
  {
    contentId: 25,
    type: 'Video',
    category: 'Club Profile',
    title: 'How to navigate your Club Profile',
    thumbnail:
      'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/ClubProfile/VideoThumbNail/Club-Profile-video.jpg',
    description:
      'Get a look at how you can use field management to streamline administrative processes and design a seamless experience for your members.',
    relatedword: 'club, profile, setup',
    body: {
      leadImage:
        'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/ClubProfile/Banner(Lead)Image/ClubProfilecategory.JPG',
      introText: `Get a look at how you can use field management to streamline administrative processes and design a seamless experience for your members.`,
      videoLink: '0NqLRoBZ-n4',
      pdfLink: '',
      articleBody: [],
      tags: ['Video', 'User Guide', 'PDF', 'FAQ'],
    },
  },
  {
    contentId: 26,
    type: 'User Guide',
    category: 'Family',
    title: 'Family membership configuration',
    thumbnail:
      'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Family/pdfThumbnail/UserGuideImageOfClubEngagementProject_0013_Laye5.jpg',
    relatedword: 'family, membership,',
    description:
      'Learn how to set up family member discounts to offer your members a preferential pricing model when they join as a family.',
    body: {
      leadImage:
        'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Family/Banner(Lead)Image/Familyleadimage.jpg',
      introText: `Learn how to set up family member discounts to offer your members a preferential pricing model when they join as a family.`,
      videoLink: '',
      pdfLink:
        'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Family/pdf/Family%20Membership%20Configuration.pdf',
      articleBody: [],
      tags: ['Video', 'User Guide', 'PDF', 'FAQ'],
    },
  },
  {
    contentId: 27,
    type: 'Video',
    category: 'Importing Data',
    title: 'Data Import - Member account creation',
    thumbnail:
      'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/ImportingData/VideoThumbNail/Data-Import---Member-account-creation-(video).jpg',
    description:
      ' Learn how to bulk import your member data into JustGo and save time when compared to adding each member individually.',
    relatedword: 'data, import, video',
    body: {
      leadImage:
        'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/ImportingData/Banner(Lead)Image/ImportingDataCategory.JPG',
      introText: ` Learn how to bulk import your member data into JustGo and save time when compared to adding each member individually.`,
      videoLink: 'HNOPNX_MPdU',
      pdfLink: '',
      articleBody: [],
      tags: ['Video', 'User Guide', 'PDF', 'FAQ'],
    },
  },
  {
    contentId: 28,
    type: 'User Guide',
    category: 'Importing Data',
    title: 'Overview of Data Import',
    thumbnail:
      'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/ImportingData/pdfThumbnail/User%20guide%20image%20of%20Club%20Engagement%20Project_0003_Layer%2015.jpg',
    description:
      '  Learn how to bulk import a full list of members you may have stored elsewhere. It’s as simple as uploading a spreadsheet.',
    relatedword: 'data, import',
    body: {
      leadImage:
        'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/ImportingData/Banner(Lead)Image/ImportingDataCategory.JPG',
      introText: `  Learn how to bulk import a full list of members you may have stored elsewhere. It’s as simple as uploading a spreadsheet.`,
      videoLink: '',
      pdfLink:
        'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/ImportingData/pdf/Overview%20Of%20Data%20Import.pdf',
      articleBody: [],
      tags: ['Video', 'User Guide', 'PDF', 'FAQ'],
    },
  },
  {
    contentId: 29,
    type: 'User Guide',
    category: 'Reporting',
    title: 'How to download reports from the system',
    thumbnail:
      'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Reporting/pdfThumbnail/HowToDownloadReportsFromTheSystemUserGuide.jpg',
    description:
      '  This guide will showcase how you can generate extensive reports for various categories, including your Club Events, Finance, Members, Membership, and more.',
    relatedword: 'reports, stats, data',
    body: {
      leadImage:
        'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Reporting/Banner(Lead)Image/Reportingcategory.JPG',
      introText: `  This guide will showcase how you can generate extensive reports for various categories, including your Club Events, Finance, Members, Membership, and more.`,
      videoLink: '',
      pdfLink:
        'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Reporting/pdf/Club%20Report%20User%20Guide.pdf',
      articleBody: [],
      tags: ['Video', 'User Guide', 'PDF', 'FAQ'],
    },
  },
  {
    contentId: 30,
    type: 'User Guide',
    category: 'Branding',
    title: 'How to brand your email templates',
    thumbnail:
      'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Branding/pdfThumbnail/UserGuideImage%20ofClubEngagementProject_0011_Layer.jpg',
    description:
      '  This guide demonstrates how you can personalise your email templates to suit your brand, create new email templates and personalise all or some of your emails with a single click.',
    relatedword: 'branding, email, template, communication, mail',
    body: {
      leadImage:
        'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Branding/Banner(Lead)Image/Brandingcategory.JPG',
      introText: `  This guide demonstrates how you can personalise your email templates to suit your brand, create new email templates and personalise all or some of your emails with a single click.`,
      videoLink: '',
      pdfLink:
        'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Branding/pdf/How%20to%20Brand%20Your%20Email%20Templates.pdf',
      articleBody: [],
      tags: ['Video', 'User Guide', 'PDF', 'FAQ'],
    },
  },
  {
    contentId: 31,
    type: 'User Guide',
    category: 'Smart Rules',
    title: 'Smart Rules',
    thumbnail:
      'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/SmartRules/pdfThumbnail/SmartRulesLeadImage.jpg',
    description:
      '   Get a look at how you can add conditions or “smart rules” to apply restrictions, discounts, and surcharges to your memberships  and event tickets.',
    relatedword: 'rules, membership, events, ticketing, credentials',
    body: {
      leadImage:
        'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/SmartRules/Banner(Lead)Image/SmartRules.jpg',
      introText: `   Get a look at how you can add conditions or “smart rules” to apply restrictions, discounts, and surcharges to your memberships  and event tickets.`,
      videoLink: '',
      pdfLink:
        'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/SmartRules/pdf/Smart%20Rules.pdf',
      articleBody: [],
      tags: ['Video', 'User Guide', 'PDF', 'FAQ'],
    },
  },
  {
    contentId: 33,
    type: 'User Guide',
    category: 'Email & Communications',
    title: 'How to Use Email and Communication ',
    thumbnail:
      'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/GettingStarted/VideoThumbNail/Email-%26-Communication-user-guide.jpg',
    description: 'This user guide will give you a run-through of how you can use the Email and Communication Features.',
    relatedword: 'Enquiry Handling​, Email, Message, Communications, Branded Email, Mail, Announcement, Chat',
    body: {
      leadImage:
        'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Communications/Banner(Lead)Image/EmailCommunicationsLeadImage.jpg',
      introText: `This user guide will give you a run-through of how you can use the Email and Communication Features.`,
      videoLink: '',
      pdfLink:
        'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/GettingStarted/VideoThumbNail/Email_and_Communication_%281%29.pdf',
      articleBody: [],
      tags: ['Video', 'User Guide', 'PDF', 'FAQ'],
    },
  },

  {
    contentId: 34,
    type: 'Video',
    category: 'Events',
    title: 'New additions to the Event Management',
    thumbnail:
      'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/GettingStarted/VideoThumbNail/event-managenet-new-updates.jpg',
    description: 'This video is a demonstration of what is new in Event Management and how you can use those.',
    relatedword: 'Booking events ticketing courses attendance',
    body: {
      leadImage:
        'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Events/Banner(Lead)Image/EventBanner.jpg',
      introText: `This video is a demonstration of what is new in Event Management and how you can use those.`,
      videoLink: 'qZGx00fHSEY',
      pdfLink: '',
      articleBody: [],
      tags: ['Video', 'User Guide', 'PDF', 'FAQ'],
    },
  },

  {
    contentId: 35,
    type: 'Video',
    category: 'Website Builder',
    title: 'How to Use Website Builder',
    thumbnail:
      'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/GettingStarted/VideoThumbNail/Website-Builder-help-center-image.jpg',
    description:
      'This video is a step-by-step demonstration of what is available in the Website Builder and how you can use those to make a website.  ',
    relatedword: 'site, website, webpage, feed, social media feed',
    body: {
      leadImage:
        'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/WebsiteBuilder/Banner(Lead)Image/WebsiteBuildercategory.JPG',
      introText: `This video is a step-by-step demonstration of what is available in the Website Builder and how you can use those to make a website.  `,
      videoLink: 'v0fNSj1ewgg',
      pdfLink: '',
      articleBody: [],
      tags: ['Video', 'User Guide', 'PDF', 'FAQ'],
    },
  },

  // {
  //   contentId: 32,
  //   type: 'FAQ',
  //   category: 'Membership',
  //   title: ' How to create a Membership (FAQ)',
  //   thumbnail:
  //     'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/SmartRules/pdfThumbnail/SmartRulesLeadImage.jpg',
  //   description: '',

  //   body: {
  //     introText: '',
  //     leadImage:
  //       'https://justgowebz1.blob.core.windows.net/002/Central/media/HelpCenter/Membership/Banner(Lead)Image/MembershipLeadImage.jpg',
  //     videoLink: '',
  //     pdfLink: '',
  //     articleBody: '',
  //     faqBody: [
  //       {
  //         question: 'Can I add my own colors?',
  //         answer: (
  //           <div className="text-sm font-normal text-jg-metal-500 space-y-2">
  //             <p>
  //               {/* <span className="text-jg-green-500">Ans: </span> */}
  //               You can add colors from a pre-selected list when creating your new membership..
  //             </p>
  //           </div>
  //         ),
  //       },

  //       {
  //         question: 'What is Classification?',
  //         answer: (
  //           <div className="text-sm font-normal text-jg-metal-500 space-y-2">
  //             <p>
  //               {/* <span className="text-jg-green-500">Ans: </span> */}
  //               Classification helps an organization to classically link multiple levels of membership together. For
  //               example, you can link JustGo Club membership with NGB so when a member selects a Club membership NGB
  //               membership auto add itself to the cart. Note, the functionality is available for available enterprise
  //               subscriptions.
  //             </p>
  //           </div>
  //         ),
  //       },
  //       {
  //         question: 'Can my members pay by instalments?',
  //         answer: (
  //           <div className="text-sm font-normal text-jg-metal-500 space-y-2">
  //             <p>
  //               {/* <span className="text-jg-green-500">Ans: </span> */}
  //               Pro package allows you to enable instruments for your memberships via Membership Setup.
  //             </p>
  //           </div>
  //         ),
  //       },
  //       {
  //         question: 'Can I restrict which members can buy my memberships?',
  //         answer: (
  //           <div className="text-sm font-normal text-jg-metal-500 space-y-2">
  //             <p>
  //               {/* <span className="text-jg-green-500">Ans: </span> */}
  //               Purchase restrictions allows you can prevent certain members from purchasing membership through various
  //               smart rules.
  //             </p>
  //           </div>
  //         ),
  //       },
  //       {
  //         question: 'Can I create multiple combinations for a family membership?',
  //         answer: (
  //           <div className="text-sm font-normal text-jg-metal-500 space-y-2">
  //             <p>
  //               {/* <span className="text-jg-green-500">Ans: </span> */}
  //               Family configuration allows you to create limitless family combos to provide discounts suitable for any
  //               household.
  //             </p>
  //           </div>
  //         ),
  //       },
  //       {
  //         question: 'How do I know what my membership is going to look like before I press save?',
  //         answer: (
  //           <div className="text-sm font-normal text-jg-metal-500 space-y-2">
  //             <p>
  //               {/* <span className="text-jg-green-500">Ans: </span> */}
  //               The Preview button in Membership Setup allows you to create
  //             </p>
  //           </div>
  //         ),
  //       },
  //       {
  //         question: 'How would I add a product to my event Membership?',
  //         answer: (
  //           <div className="text-sm font-normal text-jg-metal-500 space-y-2">
  //             <p>
  //               {/* <span className="text-jg-green-500">Ans: </span> */}
  //               Upsell products allows you to provide additional benefits to your members through ticket/membership
  //               purchase journey. Available for Pro.
  //             </p>
  //           </div>
  //         ),
  //       },
  //       // More questions...
  //     ],

  //     // tags: ['Video', 'User Guide', 'PDF', 'FAQ'],
  //   },
  // },
]

interface GettingStartedStorage {
  categories: CategoryType[]
  contents: ContentType[]
  contentByIds: ContentType[]
  tabsItems: string[]
  getContentsByIds: (ids: number[]) => ContentType[]
  getContentsByIdsCategoryType: (ids: number[]) => void
}

const useGettingStartedStore = create<GettingStartedStorage>((set, get) => ({
  categories: categorieLocalsData,
  contents: contentsLocal,
  contentByIds: [],
  tabsItems: [],
  getContentsByIds: (ids) => {
    const selectedContents = []
    for (let i = 0; i <= ids.length; i++) {
      const content = get().contents.find((e) => {
        return e.contentId === ids[i]
      })
      if (content) {
        selectedContents.push(content)
      }
    }
    return selectedContents
  },

  getContentsByIdsCategoryType: (ids: number[]) => {
    const selectedContents = []
    for (let i = 0; i <= ids.length; i++) {
      const content = get().contents.find((e) => {
        return e.contentId === ids[i]
      })
      if (content) {
        selectedContents.push(content)
      }
    }
    set({ contentByIds: selectedContents })
    set({ tabsItems: selectedContents.map((item) => item.type).filter((v, i, a) => a.indexOf(v) === i) })
  },
}))

export default useGettingStartedStore
