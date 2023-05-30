import { useAppStore } from '@jg/hooks'
import AppStore from '@jg/store/store'
import shallow from 'zustand/shallow'
import FooterSocialIcons, { SocialMediaLinkType } from './FooterSocialIcon'
import JGLogo from './JGLogo'
import useOnClickOutside from '@jg/hooks/useOnClickOutside'
import { useRef } from 'react'
export default function Footer({ onClose }: { onClose?: () => void }) {
  const BaseAppPath = AppStore((state) => state.BaseAppPath, shallow)
  const SystemSettings = AppStore((state) => state.SystemSettings, shallow)
  let links: SocialMediaLinkType[] = []
  if (SystemSettings['ORGANISATION.SOCIALMEDIA.LINKS']) {
    //console.log(JSON.parse(SystemSettings['ORGANISATION.SOCIALMEDIA.LINKS']))
    links = links.concat(JSON.parse(SystemSettings['ORGANISATION.SOCIALMEDIA.LINKS']))
  }
  const ref = useRef(null)
  useOnClickOutside(ref, () => onClose?.())
  return (
    <footer
      ref={ref}
      className=" bg-white flex flex-col-reverse lg:flex-row justify-between pt-[10px] pb-[10px] ring-1 ring-jg-grey-300"
    >
      <div className="flex w-[225px] h-[50px] m-2 self-center lg:self-auto">
        <JGLogo />
      </div>
      <div className="flex justify-center flex-col m-2">
        <div className="flex justify-center flex-row flex-wrap lg:flex-nowrap  ">
          <a
            href="https://agreements.justgo.com/user-terms-of-use/"
            target="_blank"
            rel="noreferrer"
            className="text-[14px] leading-[22px] text-[#7d7d7d] px-[5px] hover:underline"
          >
            Terms &amp; Conditions
          </a>
          <a
            href="https://agreements.justgo.com/privacy-policy/"
            target="_blank"
            rel="noreferrer"
            className="text-[14px] leading-[22px] text-[#7d7d7d]  px-[5px] hover:underline"
          >
            Privacy Policy
          </a>
          <a
            href={BaseAppPath + 'Workbench/Help'}
            target="_blank"
            rel="noreferrer"
            className="text-[14px] leading-[22px] text-[#7d7d7d]  px-[5px] hover:underline"
          >
            Help
          </a>
          <a
            href="https://www.JustGo.com/"
            target="_blank"
            rel="noreferrer"
            className="text-[14px] leading-[22px] text-[#7d7d7d]  px-[5px] hover:underline"
          >
            About Us
          </a>
        </div>
        <p className="text-[12px] leading-4.5 text-[#7d7d7d] flex justify-center text-center flex-col lg:flex-row">
          <span>© Copyright 2002 - {new Date().getFullYear()} JustGo. </span>
          <span className="block">All Rights Reserved.</span>
        </p>
      </div>
      <FooterSocialIcons socialMediaLinks={links} />
    </footer>
  )
}
