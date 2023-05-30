import { Button } from '@comps/uiComps'
import classNames from 'classnames'
import { forwardRef, Fragment, useEffect, useRef, useState } from 'react'
import ModalOld from '../Modal/ModalOld'
import FAQ from './FAQ'
import videoIntroDemo from '@jg/assets/images/videoIntroDemo.jpg'
import { ArrowLeft } from '@comps/uiComps/Icons'

const roundedSideClass = {
  left: 'rounded-l-full',
  right: 'rounded-r-full',
  both: 'rounded-full',
}

const HelperButton = ({ roundedSide = 'left' }: { roundedSide?: 'left' | 'right' | 'both' }) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        className={classNames(
          'text-white bg-jg-green-500 border border-jg-green-100 overflow-hidden w-auto h-12 hover:max-w-sm transition-all duration-500 ease-linear flex items-center',
          open ? 'max-w-0' : 'max-w-[48px]',
          roundedSideClass[roundedSide]
        )}
        onClick={() => setOpen(true)}
      >
        <div className="inline-block pl-4 pr-2">
          <QuestionMarkCircleIcon className="" />
        </div>
        <div className="whitespace-nowrap pr-3 text-xl leading-6 font-semibold">
          <span>How it Works</span>
        </div>
      </button>
      <ModalOld
        open={open}
        setOpen={setOpen}
        titleSection={ModalTitle}
        bodySection={ModalBody}
        customSecionClassName={{ titleClass: '!h-[52px]', bodyClass: '!top-[52px]' }}
      />
    </>
  )
}

export default HelperButton

const ModalTitle = ({ open }: { open: boolean }) => {
  const [animate, setAnimate] = useState(false)
  useEffect(() => {
    setTimeout(() => setAnimate(open), 10)
  }, [open])
  return (
    <div
      className={classNames(
        'inline-flex gap-3 items-center transition duration-500',
        animate ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      <div className="bg-jg-green-500 w-[52px] h-[52px] px-4 inline-flex items-center justify-center">
        <QuestionMarkCircleIcon className="w-7 h-7" />
      </div>
      <h3 className="text-sm leading-4 font-semibold text-jg-metal-900">Help & FAQs</h3>
    </div>
  )
}
const ModalBody = ({ open }: { open: boolean; initialFocus?: React.MutableRefObject<HTMLElement | null> }) => {
  const [videoClicked, setVideoClicked] = useState<typeof HOW_TO_VIDEOES[0]>()
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) setVideoClicked(undefined)
    setTimeout(() => bodyRef.current?.scrollIntoView(false), 200)
  }, [open, videoClicked])

  const VideoPlayScreen = videoClicked && (
    <div className="mx-auto space-y-4 w-full max-w-[838px] py-8 ">
      <div
        className="inline-flex gap-2 items-center cursor-pointer text-sm font-semibold leading-4 text-jg-metal-700"
        onClick={() => setVideoClicked(undefined)}
      >
        <ArrowLeft />
        <span>Back</span>
      </div>
      <iframe
        className="max-w-[838px] w-full"
        style={{ aspectRatio: '2/1' }}
        src={videoClicked.ytEmbedLink + '?autoplay=1'}
      />
      <h4 className="leading-5 font-semibold text-jg-metal-700">{videoClicked.title}</h4>
      <p className="text-sm leading-5 font-normal text-jg-metal-500">{videoClicked.description}</p>
    </div>
  )
  const VideosAndFAQs = (
    <>
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h4 className="text-xl leading-6 font-semibold text-jg-metal-900">Video Tutorials</h4>
          <p className="text-sm leading-4 font-normal text-jg-metal-500">Discover our helpful videos</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mx-auto">
          {HOW_TO_VIDEOES.map((vData, i) => {
            const { title, description, thumbnail } = vData
            return (
              <VideoCard
                key={title + i}
                thumbnailLink={thumbnail}
                title={title}
                description={description}
                onClick={() => setVideoClicked(vData)}
              />
            )
          })}
        </div>
      </div>

      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h4 className="text-xl leading-6 font-semibold text-jg-metal-900">Frequently Asked Questions</h4>
          <p className="text-sm leading-4 font-normal text-jg-metal-500">
            Still have questions? Well we’ve got answers!
          </p>
        </div>
        <FAQ faqs={faqs} defaultOpenIndex={0} />
      </div>

      <div className="space-y-6 flex flex-col pb-12">
        <div className="text-center space-y-2">
          <h4 className="text-xl leading-6 font-semibold text-jg-metal-900">{`Can't Find What you're Looking for?`}</h4>
          <p className="text-base leading-5 font-normal text-jg-metal-500">
            Feel free to contact us by clicking on the button below
          </p>
        </div>
        {/* @ts-ignore */}
        <Button as="a" href="mailto:support@justgo.com" text="Talk To Us" className="mx-auto" />
      </div>
    </>
  )
  return (
    <div className="my-4 space-y-12 flex flex-col px-4 lg:px-24 w-full" ref={bodyRef}>
      {videoClicked ? VideoPlayScreen : VideosAndFAQs}
    </div>
  )
}

const VideoCard = ({
  thumbnailLink,
  title,
  description,
  onClick = () => {},
}: {
  thumbnailLink: string
  title: string
  description?: string
  onClick?: () => void
}) => {
  return (
    <div className="max-w-[313px] rounded-md overflow-hidden cursor-pointer" onClick={onClick}>
      <img
        className="max-w-[313px] w-full h-auto object-cover"
        style={{ aspectRatio: '2/1' }}
        src={'https://i.ibb.co/7RsBX3X/video-Intro-Demo.jpg'}
      />
      <div className="space-y-4 p-4 border border-jg-metal-50 rounded-b-md h-[130px] overflow-hidden">
        <h4 className="leading-5 font-semibold text-jg-metal-700 truncate">{title}</h4>
        <p className="text-sm leading-5 font-normal text-jg-metal-500">{description}</p>
      </div>
    </div>
  )
}

export const QuestionMarkCircleIcon = forwardRef(
  (props: React.ComponentProps<'svg'>, ref: React.LegacyRef<SVGSVGElement>) => {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        ref={ref}
      >
        <path
          d="M12.0005 0C5.37529 0 0.000488281 5.36802 0.000488281 11.9937C0.000488281 18.6257 5.37529 24 12.0005 24C18.6293 24 23.9995 18.6256 23.9995 11.9937C23.9996 5.36802 18.6293 0 12.0005 0ZM12.8556 18.6708C12.5769 18.9188 12.2539 19.0435 11.888 19.0435C11.5095 19.0435 11.1792 18.9211 10.8974 18.6758C10.6151 18.4309 10.4736 18.0881 10.4736 17.6476C10.4736 17.2568 10.6105 16.928 10.8834 16.6614C11.1562 16.3949 11.491 16.2616 11.888 16.2616C12.2788 16.2616 12.6077 16.3949 12.8746 16.6614C13.1412 16.928 13.2749 17.2568 13.2749 17.6476C13.2744 18.0817 13.1348 18.4228 12.8556 18.6708ZM16.3309 10.0553C16.1167 10.4523 15.8624 10.7947 15.5674 11.0834C15.2733 11.3721 14.7444 11.8573 13.9809 12.5394C13.7704 12.7318 13.601 12.9008 13.4741 13.0462C13.3471 13.1922 13.2523 13.3254 13.1904 13.4465C13.128 13.5675 13.0802 13.6886 13.0463 13.8096C13.0124 13.9302 12.9613 14.143 12.8922 14.447C12.7748 15.0921 12.4057 15.4146 11.7854 15.4146C11.4629 15.4146 11.1919 15.3094 10.9709 15.0984C10.7509 14.8874 10.6412 14.5744 10.6412 14.1588C10.6412 13.638 10.722 13.1866 10.8833 12.805C11.0437 12.4232 11.2583 12.0885 11.5248 11.7998C11.7918 11.5112 12.1513 11.1687 12.6044 10.7717C13.0015 10.4243 13.2884 10.1623 13.465 9.98563C13.6421 9.80857 13.7907 9.61162 13.9113 9.39476C14.0329 9.17747 14.0925 8.94211 14.0925 8.68781C14.0925 8.19136 13.9087 7.77305 13.5391 7.43199C13.1701 7.09094 12.6939 6.92016 12.1107 6.92016C11.4282 6.92016 10.9258 7.09227 10.6033 7.4365C10.2807 7.78072 10.0083 8.28756 9.78472 8.95751C9.57331 9.65863 9.17307 10.0091 8.58442 10.0091C8.23703 10.0091 7.94388 9.88671 7.70491 9.64185C7.46638 9.39699 7.34712 9.13184 7.34712 8.84636C7.34712 8.25727 7.53641 7.66007 7.91453 7.0552C8.29311 6.45033 8.84512 5.94933 9.57103 5.5527C10.2965 5.15562 11.1436 4.95683 12.1107 4.95683C13.0101 4.95683 13.8038 5.12305 14.4923 5.45511C15.1808 5.78666 15.7129 6.23798 16.0883 6.80895C16.4632 7.37948 16.6511 7.99974 16.6511 8.66969C16.652 9.19603 16.545 9.65819 16.3309 10.0553Z"
          fill="white"
        />
      </svg>
    )
  }
)

const HOW_TO_VIDEOES = [
  {
    thumbnail: videoIntroDemo,
    title: 'Setting Up Stripe Express',
    description: 'A guide to setting up a Stripe Express account in order to start taking payments',
    ytEmbedLink: 'https://www.youtube.com/embed/NEiPN__0oMs',
  },
  {
    thumbnail: videoIntroDemo,
    title: 'Additional Stripe Express Administrators',
    description: 'A guide to adding Stripe Express administrators to help manage the account ',
    ytEmbedLink: 'https://www.youtube.com/embed/DkfLkXqDI20',
  },
  {
    thumbnail: videoIntroDemo,
    title: 'Restricted Account',
    description: 'A guide to re-enabling restricted Stripe Express accounts',
    ytEmbedLink: 'https://www.youtube.com/embed/jhdaIGF60oY',
  },
]

const faqs = [
  {
    question: 'How do I setup for taking payment online?',
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
          <span className="text-jg-green-500">Ans: </span>
          After logging into your JustGo account, navigate to the “Payment Dashboard” tile in the menu. Click on the
          green “Getting Started” button in the centre of the screen.
        </p>
        <p>
          You will be redirected to a Stripe sign-up form where you can create a new login to Stripe or log use an
          existing Stripe account login. Simply change the email address that has been pre-populated (if required). You
          will need to either enter the password to the existing account, or create one for a new account. Following
          this, you will be asked for a mobile number to set up two step authentication on your account. Follow the
          prompts on the screen and enter your verification code.
        </p>
        <p>
          Once your account has been finalised, you will be asked about your “Business”. Many clubs will fall under the
          “Individual/Sole Trader” as you are an individual organisation, although if you are registered for Charity
          then you will select “Not-for-Profit”. The “Company” would typically be used for a National Governing Body.
          Your selection at this point will define the required information for the rest of the process.
        </p>
        <p>
          If you select “Individual/Sole Trader” then you will enter your personal information next. After this you are
          required to provide your bank details where payouts from Stripe will be deposited. Upon reviewing your
          information you will complete the setup and be redirected back to your Payment Dashboard in JustGo.
        </p>
        <p>
          If you selected “Not-for-profit” or “Company”, you will need to enter information on your organisation
          including any registration numbers plus your registered business address. Next you will enter information on
          executives and/or directors within the organisation followed by banking information.
        </p>
        <p>
          It is important when entering information on individuals and organisations, regardless of the type of
          “business” you select, that the information matches any legal documents. Stripe will complete an automatic
          verification process using the supplied information. Where details cannot be automatically verified, such as
          if you entered a Club address against your personal information, your account will be restricted until such
          time that you verify your information.
        </p>
      </div>
    ),
  },

  {
    question: 'How do I add other admins to access to payment dashboard?',
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
          <span className="text-jg-green-500">Ans: </span>
          Adding additional administrators to your Stripe Express profile is recommended as it can assist in reducing
          access issues in the future for your organisation. To do this, from the Payment Dashboard in JustGo, click on
          the “VIEW STRIPE DASHBOARD” button on the right hand side of the screen. This is located under the summary
          values.
        </p>
        <p>
          Doing this will direct you to the Stripe website. If you are not already logged in, you will need to do so.
          You will then need to click on the profile icon to the top far right of the screen, then scroll down to the
          bottom of the page and click on your JustGo profile from the “PLATFORM SETTINGS” area.
        </p>
        <p>
          This will open up a side panel to the right of the screen. At the bottom of this panel, you will see “Team
          Members” click on the “Invite and Remove” button. You will be sent verification codes to your email and/or
          mobile to ensure the safety of your account. Enter this information when prompted.{' '}
        </p>
        <p>
          You will then be able to enter the email address of any person that you want to add to your organisation’s
          account. An email invitation will be received by the individual. They will then need to complete the process
          of creating a profile, which includes verifying their information. When complete, they will become an
          authorised administrator of your organisation’s Stripe Express account. You will be able to see the status of
          their invitation from the “Invite Team Members” area. If they have not yet accepted and completed all
          information, you will see “PENDING'' under their email and name. If they are a JustGo admin of your
          organisation and have used the same email address for both the JustGo login and Stripe Express, then from the
          Payment Dashboard they will be able to login direct from the Payment Dashboard.
        </p>
      </div>
    ),
  },
  {
    question: 'What if my account is restricted?',
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
          <span className="text-jg-green-500">Ans: </span>
          If your account is restricted, you will see this when you log into your Payment Dashboard. On the top left
          side you will see “RESTRICTED” rather than Active. You will also see that your Payouts may have a status of
          Disabled.
        </p>
        <p>
          Click on the “UPDATE PAYMENT PROFILE” button at the top of the screen. You may need to log into your Stripe
          Express account if you are not already logged in.
        </p>
        <p>When you are logged in, you will be taken straight to the areas that need to be verified.</p>
        <p>
          If it is your organisation that needs to be verified, check the details on the screen and update any incorrect
          fields. If all fields are correct, then you will need to upload a verification document. To do this, scroll to
          the bottom of the page and select “upload verification document instead” and select a file from your device to
          upload.
        </p>
        <p>
          If it is your personal details that need to be verified, you will be prompted to select how you want to verify
          your ID. You can choose to take a picture with your phone, in which case you will be able to generate a QR
          code to scan with your phone which will enable you to upload straight into your Stripe Account from your
          phone, you can select to take a picture with your webcam, or you can select to upload a file from the device
          that you are using. In each of the options you will be prompted to select the type of verification document
          you will be using. This can be a passport, Drivers Licence or other Identity Card.
        </p>
        <p>
          When you have updated and/or uploaded any required information you can click on the continue button at the
          bottom of the screen and then review your information and click submit. You will then be redirected back to
          your JustGo Payment Dashboard. If you have provided all of the required information you will see that your
          account status is Active and your payouts are enabled.
        </p>
      </div>
    ),
  },
  // More questions...
]
