import { useAppStore } from '@jg/hooks'
import shallow from 'zustand/shallow'
import AppStore from '@jg/store/store'
import 'font-awesome/css/font-awesome.css'
import { useEffect, useState } from 'react'
const socialMedia = [
  {
    icon: 'fab fa-facebook-f',
    link: 'https://www.facebook.com/',
    id: 'c8ccb7d6-f419-4197-a169-374cd6cbc49b',
  },
  {
    icon: 'fab fa-twitter',
    link: 'https://twitter.com/',
    id: 'b9bff429-7a65-487c-b553-ade154304b77',
  },
  {
    icon: 'fab fa-youtube-play',
    link: 'https://www.youtube.com/',
    id: '1def02e8-197e-44d8-97a6-72f3dbf066d6',
  },
  {
    icon: 'fa fa-home',
    link: 'http://Justgo.com',
    id: '02d6fb91-3b99-4034-b39c-e60c389cdd57',
  },
  {
    icon: 'fab fa-instagram',
    link: 'http://instagram.com',
    id: '2bd80f0f-58ff-4360-bb68-2673d408cd9c',
  },
  {
    icon: 'fab fa-pinterest-p',
    link: 'http://dfsdfsdfsdf.com',
    id: '503d8f69-a904-4e27-9c44-924e26357ace',
  },
  {
    icon: 'fa fa-home',
    link: 'http://Justgo.com',
    id: '02d6fb91-3b99-4034-b39c-e60c389cdd57',
  },
  {
    icon: 'fab fa-instagram',
    link: 'http://instagram.com',
    id: '2bd80f0f-58ff-4360-bb68-2673d408cd9c',
  },
  {
    icon: 'fab fa-pinterest-p',
    link: 'http://dfsdfsdfsdf.com',
    id: '503d8f69-a904-4e27-9c44-924e26357ace',
  },
]

const checkMatch = (str: string) => {
  if (str.includes('facebook')) {
    return 'bg-[#1877f2]'
  }
  if (str.includes('twitter')) {
    return 'bg-[#1da1f2]'
  }
  if (str.includes('youtube')) {
    return 'bg-[#ff0000]'
  }
  if (str.includes('instagram')) {
    return 'bg-[#c32aa3]'
  }
  if (str.includes('pinterest')) {
    return 'bg-[#bd081c]'
  }
  if (str.includes('linkedin')) {
    return 'bg-[#007bb5]'
  }
  if (str.includes('google')) {
    return 'bg-[#ea4335]'
  }
  if (str.includes('snapchat')) {
    return 'bg-[#fffc00]'
  }
  if (str.includes('whatsapp')) {
    return 'bg-[#25d366]'
  }
  if (str.includes('tumblr')) {
    return 'bg-[#35465d]'
  }
  if (str.includes('reddit')) {
    return 'bg-[#ff4500]'
  }
  if (str.includes('yelp')) {
    return 'bg-[#d32323]'
  }
  if (str.includes('vimeo')) {
    return 'bg-[#1ab7ea]'
  } else {
    return 'bg-[#029044]'
  }
}
export type SocialMediaLinkType = {
  icon?: string
  link?: string
  id: string
}
export default function FooterSocialIcons({ socialMediaLinks = [] }: { socialMediaLinks: SocialMediaLinkType[] }) {
  return (
    <div className="flex gap-x-[5px] p-2 justify-center flex-wrap">
      {socialMediaLinks.map((item, index) => (
        <a
          href={item.link}
          target="_blank"
          rel="noreferrer"
          className={checkMatch(item.icon || '') + ' h-[39px] w-[39px] flex justify-center items-center rounded-full'}
          id={item.id}
          key={index}
        >
          <i className={item.icon + ' fa text-white text-[20px]'}></i>
        </a>
      ))}
    </div>
  )
}
