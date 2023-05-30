import videoIntroDemo from '@jg/assets/images/videoIntroDemo.jpg'
import { LinkButton } from '@jg/common/comps'
import HelpPortalItem from '../HelpPortalItem'

const HOW_TO_VIDEOES_GENERAL = {
  thumbnail: videoIntroDemo,
  title: 'Data Import - Member account creation',
  description:
    'Learn how to bulk import your member data into JustGo and save time when compared to adding each member individually.',
  ytEmbedLink: 'HNOPNX_MPdU',
}

const DataImport = () => {
  return <HelpPortalItem videoData={HOW_TO_VIDEOES_GENERAL} />
}
export default DataImport

const generalFaqs = [
  {
    question: 'How do I setup for taking payment online?',
    answer: (
      <div className="text-sm font-normal text-jg-metal-500 space-y-2">
        <p>
          {/* <span className="text-jg-green-500">Ans: </span> */}
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
          {/* <span className="text-jg-green-500">Ans: </span> */}
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
          {/* <span className="text-jg-green-500">Ans: </span> */}
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
