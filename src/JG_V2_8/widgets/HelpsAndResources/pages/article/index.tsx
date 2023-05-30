import { Badge, FunnelChart, PyramidChart } from '@comps/uiComps'
import ContentCard from '@jg/common/comps/contents/contentCard/ContentCard'
import 'font-awesome/css/font-awesome.css'
import ArticalCards from '../category/components/ArticleCards'
import SecondaryNav from '../../components/SecondaryNav'
import SocialFeedbackSection from './components/SocialFeedbackSection'
import Pagination from './components/Pagination'
import CalendarMonth from '@comps/uiComps/Icons/SVG/CalendarMonth'
import DotsCircleHorizontalIcon from '@heroicons/react/solid/DotsCircleHorizontalIcon'
import ClockIcon from '@heroicons/react/outline/ClockIcon'
import Eye from '@comps/uiComps/Icons/SVG/Eye'
import EmoticonHappyOutline from '@comps/uiComps/Icons/SVG/EmoticonHappyOutline'
import ArticleMobSecNav from '../../components/ArticleMobSecNav'
import GraphChart from '@comps/uiComps/Charts/GraphChart'
import ArticleRightSideBar from '@jg/widgets/HelpsAndResources/components/ArticleRightSideBar'

const Article = () => {
  return (
    <div className="w-full bg-[#fafafa] flex">
      <div className="w-full flex justify-center flex-col">
        <div className="w-full max-w-[1170px] justify-center mx-auto my-0">
          <ArticleMobSecNav className="flex md:jg-hidden" />
          <img
            className="w-full max-h-[180px] h-full md:max-h-[300px] object-cover flex"
            src="https://images.unsplash.com/photo-1667845018782-9f5acae511c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
            alt="banner"
          />
          <SecondaryNav className="jg-hidden md:flex" title="How safe is JustGo from a data security aspect?" />
          <Badge
            label="Integration & Automation"
            variant="primary"
            fillType="faded"
            className="md:jg-hidden m-4"
            rounded
            size="lg"
          />
          <h2 className="flex md:jg-hidden text-[16px] font-semibold leading-5 text-jg-metal-900 mb-1 px-4">
            How safe is JustGo from a data security aspect?
          </h2>
          <div className="flex flex-row gap-x-8 relative mt-4 px-4 lg:px-0">
            <div className="flex lg:max-w-[770px] w-full flex-col flex-wrap justify-center">
              <div className="rounded shadow-md mb-4">
                <div className="bg-white border-jg-metal-50 pt-4 lg:pt-6 px-4 lg:px-6 ">
                  <Badge
                    label="Integration & Automation"
                    variant="primary"
                    fillType="faded"
                    className="mb-4 jg-hidden md:inline-block"
                    rounded
                    size="lg"
                  />
                  <div className="flex gap-x-2 text-jg-metal-300 text-globalTextSizeSm font-medium items-center pb-4 flex-wrap gap-y-4 md:gap-y-0">
                    <div className="flex items-center">
                      <CalendarMonth className="h-4 mr-1.5 px-[2px] py-[1.5px]" />
                      <div>Sun, 22 May 2022</div>
                    </div>
                    <DotsCircleHorizontalIcon className="h-1" />
                    <div className="flex items-center">
                      <ClockIcon className="h-3.5 mr-1.5 text-[14px]" />
                      <div>Sun, 22 May 2022</div>
                    </div>
                    <DotsCircleHorizontalIcon className="h-1" />
                    <div className="flex items-center">
                      <Eye className="mr-1.5 px-[2px] py-[1.5px]" />
                      <div>Sun, 22 May 2022</div>
                    </div>
                    <DotsCircleHorizontalIcon className="h-1" />
                    <div className="flex items-center">
                      <EmoticonHappyOutline className="mr-1.5 px-[2px] py-[1.5px]" />
                      <div>Sun, 22 May 2022</div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center justify-between ">
                      <div
                        id="Overview"
                        className="text-sm text-zinc-800 not-italic uppercase !text-[16px] font-semibold leading-5 text-jg-metal-900 mb-2"
                      >
                        OVERVIEW
                      </div>
                    </div>
                    <hr className="w-8 mt-1 my-2 border-t-2 border-jg-green-500 mb-6"></hr>
                    <p className="text-jg-metal-500 text-sm">
                      Jiminny provides a cloud-based conversation analysis service, utilizing customer information from
                      a CRM to intelligently log activity, transcribe and analyze calls for the purposes of note-taking
                      and coaching. We would like to make two things clear. First, we respect your privacy and take
                      significant efforts to protect all your data. Second, we would never do anything with your data
                      that we wouldn’t be proud to tell the world about. Keeping our customers' data secure is the most
                      important thing that Jiminny does. We go to considerable lengths to ensure that all data sent to
                      Jiminny is handled securely - keeping Jiminny secure is fundamental to our business. As you
                      continue to learn more about Jiminny we recommend you also review our Terms of Use and Privacy
                      Policy.
                    </p>
                    <p className="text-jg-metal-500 text-sm">
                      Jiminny provides a cloud-based conversation analysis service, utilizing customer information from
                      a CRM to intelligently log activity, transcribe and analyze calls for the purposes of note-taking
                      and coaching. We would like to make two things clear. First, we respect your privacy and take
                      significant efforts to protect all your data. Second, we would never do anything with your data
                      that we wouldn’t be proud to tell the world about. Keeping our customers' data secure is the most
                      important thing that Jiminny does. We go to considerable lengths to ensure that all data sent to
                      Jiminny is handled securely - keeping Jiminny secure is fundamental to our business. As you
                      continue to learn more about Jiminny we recommend you also review our Terms of Use and Privacy
                      Policy.
                    </p>
                  </div>
                  <div>
                    {/* <GraphChart
                      graphData={[
                        { date: 1636495200000, value: 100 },
                        { date: 1636581600000, value: 200 },
                        { date: 1636668000000, value: 300 },
                        { date: 1636927200000, value: 400 },
                        { date: 1637013600000, value: 500 },
                        { date: 1637100000000, value: 1600 },
                      ]}
                    /> */}

                    {/* <FunnelChart
                      FunnelData={[
                        { value: 100, category: 'A' },
                        { value: 200, category: 'B' },
                        { value: 300, category: 'A' },
                        { value: 400, category: 'A' },
                      ]}
                      FunnelWidth={500}
                    /> */}
                  </div>
                  <div className="mb-6">
                    <div className="flex items-center justify-between ">
                      <div
                        id="Infrastracture"
                        className="text-sm text-zinc-800 not-italic uppercase !text-[16px] font-semibold leading-5 text-jg-metal-900 mb-2"
                      >
                        Infrastracture
                      </div>
                    </div>
                    <hr className="w-8 mt-1 my-2 border-t-2 border-jg-green-500 mb-4"></hr>
                    <h2 className="text-jg-metal-700 text-sm uppercase">Key Takeaways</h2>
                    <ul className="list-disc px-5 mt-2">
                      <li className="text-jg-metal-500 text-sm">
                        All of our services run in the cloud. Jiminny does not run our own routers, load balancers, DNS
                        servers, or physical servers.
                      </li>
                      <li className="text-jg-metal-500 text-sm">
                        All of our services run in the cloud. Jiminny does not run our own routers, load balancers, DNS
                        servers, or physical servers.
                      </li>
                      <li className="text-jg-metal-500 text-sm">
                        All of our services run in the cloud. Jiminny does not run our own routers, load balancers, DNS
                        servers, or physical servers.
                      </li>
                      <li className="text-jg-metal-500 text-sm">
                        All of our services run in the cloud. Jiminny does not run our own routers, load balancers, DNS
                        servers, or physical servers.
                      </li>
                      <li className="text-jg-metal-500 text-sm">
                        All of our services run in the cloud. Jiminny does not run our own routers, load balancers, DNS
                        servers, or physical servers.
                      </li>
                    </ul>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center justify-between ">
                      <h2
                        id="Service-Levels"
                        className="text-sm text-zinc-800 not-italic uppercase !text-[16px] font-semibold leading-5 text-jg-metal-900 mb-2"
                      >
                        Service Levels
                      </h2>
                    </div>
                    <hr className="w-8 mt-1 my-2 border-t-2 border-jg-green-500 mb-4"></hr>
                    <p className="text-jg-metal-500 text-sm">
                      Jiminny provides a cloud-based conversation analysis service, utilizing customer information from
                      a CRM to intelligently log activity, transcribe and analyze calls for the purposes of note-taking
                      and coaching. We would like to make two things clear. First, we respect your privacy and take
                      significant efforts to protect all your data. Second, we would never do anything with your data
                      that we wouldn’t be proud to tell the world about. Keeping our customers' data secure is the most
                      important thing that Jiminny does. We go to considerable lengths to ensure that all data sent to
                      Jiminny is handled securely - keeping Jiminny secure is fundamental to our business. As you
                      continue to learn more about Jiminny we recommend you also review our Terms of Use and Privacy
                      Policy.
                    </p>
                  </div>
                  <div className="mb-6">
                    <div className="flex items-center justify-between ">
                      <h2
                        id="Data2"
                        className="text-sm text-zinc-800 not-italic uppercase !text-[16px] font-semibold leading-5 text-jg-metal-900 mb-2"
                      >
                        DATA
                      </h2>
                    </div>
                    <hr className="w-8 mt-1 my-2 border-t-2 border-jg-green-500 mb-4"></hr>
                    <p className="text-jg-metal-500 text-sm">
                      All customer data is stored in the USA or Europe, depending on the choice of the customer.
                      Customer data is stored in multi-tenant datastores, we do not have individual datastores for each
                      customer. However strict privacy controls exist in our application code to ensure data privacy and
                      prevent one customer from accessing another customer's data. We have many units and integration
                      tests in place to ensure these privacy controls work as expected. These tests are run every time
                      our codebase is updated and even one single test failing will prevent new code from being shipped
                      to production.
                    </p>
                    <h2 className="text-jg-metal-700 text-sm uppercase pb-2 pt-4">Data Transfer</h2>
                    <img
                      src="https://images.unsplash.com/photo-1668545813197-d68b020261dc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"
                      className="max-h-[360px] max-w-[580px] object-cover w-full mx-auto mb-4"
                    />
                    <p className="text-jg-metal-500 text-sm">
                      All data sent to or from Jiminny is encrypted in transit using 256-bit encryption. Media playback
                      has additional layers of security to prevent sources being shared outside of the Jiminny platform.
                      These include IP address restriction and time-sensitive cookies scoped to each authenticated
                      Jiminny user. Our API and application endpoints are TLS/SSL only and score an "A+" rating on SSL
                      Labs' tests. This means we only use strong cypher suites and have features such as HSTS and
                      Perfect Forward Secrecy fully enabled.
                    </p>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center justify-between ">
                      <h2
                        id="Authentication"
                        className="text-sm text-zinc-800 not-italic uppercase !text-[16px] font-semibold leading-5 text-jg-metal-900 mb-2"
                      >
                        Authentication
                      </h2>
                    </div>
                    <hr className="w-8 mt-1 my-2 border-t-2 border-jg-green-500 mb-4"></hr>
                    <p className="text-jg-metal-500 text-sm">
                      Jiminny is served 100% over HTTPS. Jiminny runs a zero-trust corporate network. There are no
                      corporate resources or additional privileges from being on Jiminny’s network. We have two-factor
                      authentication (2FA) and strong password policies on GitHub, Google, AWS, Twilio and Intercom to
                      ensure access to third-party cloud services are protected. Jiminny does not store passwords.
                      Single sign-on (SSO) allows you to authenticate users in your existing systems without requiring
                      them to enter login credentials to Jiminny. SSO support is available through GSuite, Office 365,
                      HubSpot, Pipedrive and Salesforce.
                    </p>
                  </div>
                  <div className="mb-6">
                    <div className="flex items-center justify-between ">
                      <h2
                        id="Permissions-and-Access-Control-Policy"
                        className="text-sm text-zinc-800 not-italic uppercase !text-[16px] font-semibold leading-5 text-jg-metal-900 mb-2"
                      >
                        Permissions and Access Control Policy
                      </h2>
                    </div>
                    <hr className="w-8 mt-1 my-2 border-t-2 border-jg-green-500 mb-4"></hr>
                    <p className="text-jg-metal-500 text-sm">
                      Jiminny enables permission levels to be set for any employees with access to our service.
                      Permissions and access can be set to include app settings, billing, user data, or the ability to
                      listen back to recorded media.
                    </p>
                  </div>
                  <div className="mb-6">
                    <div className="flex items-center justify-between ">
                      <h2
                        id="Personnel"
                        className="text-sm text-zinc-800 not-italic uppercase !text-[16px] font-semibold leading-5 text-jg-metal-900 mb-2"
                      >
                        Personnel
                      </h2>
                    </div>
                    <hr className="w-8 mt-1 my-2 border-t-2 border-jg-green-500 mb-4"></hr>
                    <ul className="list-disc px-5 mt-2">
                      <li className="text-jg-metal-500 text-sm">
                        All of our services run in the cloud. Jiminny does not run our own routers, load balancers, DNS
                        servers, or physical servers.
                      </li>
                      <li className="text-jg-metal-500 text-sm">
                        All of our services run in the cloud. Jiminny does not run our own routers, load balancers, DNS
                        servers, or physical servers.
                      </li>
                      <li className="text-jg-metal-500 text-sm">
                        All of our services run in the cloud. Jiminny does not run our own routers, load balancers, DNS
                        servers, or physical servers.
                      </li>
                      <li className="text-jg-metal-500 text-sm">
                        All of our services run in the cloud. Jiminny does not run our own routers, load balancers, DNS
                        servers, or physical servers.
                      </li>
                      <li className="text-jg-metal-500 text-sm">
                        All of our services run in the cloud. Jiminny does not run our own routers, load balancers, DNS
                        servers, or physical servers.
                      </li>
                    </ul>
                  </div>
                  <div className="mb-6">
                    <div className="flex items-center justify-between ">
                      <h2
                        id="Application-Monitoring"
                        className="text-sm text-zinc-800 not-italic uppercase !text-[16px] font-semibold leading-5 text-jg-metal-900 mb-2"
                      >
                        Application Monitoring
                      </h2>
                    </div>
                    <hr className="w-8 mt-1 my-2 border-t-2 border-jg-green-500 mb-4"></hr>
                    <ul className="list-disc px-5 mt-2">
                      <li className="text-jg-metal-500 text-sm">
                        All of our services run in the cloud. Jiminny does not run our own routers, load balancers, DNS
                        servers, or physical servers.
                      </li>
                      <li className="text-jg-metal-500 text-sm">
                        All of our services run in the cloud. Jiminny does not run our own routers, load balancers, DNS
                        servers, or physical servers.
                      </li>
                      <li className="text-jg-metal-500 text-sm">
                        All of our services run in the cloud. Jiminny does not run our own routers, load balancers, DNS
                        servers, or physical servers.
                      </li>
                      <li className="text-jg-metal-500 text-sm">
                        All of our services run in the cloud. Jiminny does not run our own routers, load balancers, DNS
                        servers, or physical servers.
                      </li>
                      <li className="text-jg-metal-500 text-sm">
                        All of our services run in the cloud. Jiminny does not run our own routers, load balancers, DNS
                        servers, or physical servers.
                      </li>
                    </ul>
                  </div>
                  <div className="mb-6">
                    <div className="flex items-center justify-between ">
                      <h2
                        id="Security-Audits"
                        className="text-sm text-zinc-800 not-italic uppercase !text-[16px] font-semibold leading-5 text-jg-metal-900 mb-2"
                      >
                        Security Audits
                      </h2>
                    </div>
                    <hr className="w-8 mt-1 my-2 border-t-2 border-jg-green-500 mb-4"></hr>
                    <p className="text-jg-metal-500 text-sm">
                      Jiminny is served 100% over HTTPS. Jiminny runs a zero-trust corporate network. There are no
                      corporate resources or additional privileges from being on Jiminny’s network. We have two-factor
                      authentication (2FA) and strong password policies on GitHub, Google, AWS, Twilio and Intercom to
                      ensure access to third-party cloud services are protected. Jiminny does not store passwords.
                      Single sign-on (SSO) allows you to authenticate users in your existing systems without requiring
                      them to enter login credentials to Jiminny. SSO support is available through GSuite, Office 365,
                      HubSpot, Pipedrive and Salesforce.
                    </p>
                  </div>
                  <div className="mb-6">
                    <div className="flex items-center justify-between ">
                      <h2
                        id="Compliance"
                        className="text-sm text-zinc-800 not-italic uppercase !text-[16px] font-semibold leading-5 text-jg-metal-900 mb-2"
                      >
                        Compliance
                      </h2>
                    </div>
                    <hr className="w-8 mt-1 my-2 border-t-2 border-jg-green-500 mb-4"></hr>
                    <p className="text-jg-metal-500 text-sm">
                      Jiminny complies with the EU/Swiss-U.S. Privacy Shield Framework as set forth by the U.S.
                      Department of Commerce regarding the collection, use, and retention of personal information from
                      European Union member countries/Switzerland. Jiminny is working to comply with the Vendor Security
                      Alliance (VSA) published best practices.
                    </p>
                  </div>
                  <div className="mb-6">
                    <div className="flex items-center justify-between ">
                      <h2
                        id="Security-Policies-and-Secure-Development-(SDLC)"
                        className="text-sm text-zinc-800 not-italic uppercase !text-[16px] font-semibold leading-5 text-jg-metal-900 mb-2"
                      >
                        Security Policies and Secure Development (SDLC)
                      </h2>
                    </div>
                    <hr className="w-8 mt-1 my-2 border-t-2 border-jg-green-500 mb-4"></hr>
                    <p className="text-jg-metal-500 text-sm">
                      We maintain security policies that are communicated and approved by management to ensure everyone
                      knows their security responsibilities. Our policies are audited annually. Software development is
                      done through a documented SDLC process. Design of all new product functionality is reviewed by our
                      security team. Senior engineers conduct mandatory code reviews for code changes and periodic
                      in-depth security review of architecture and sensitive code. We operate separate environments for
                      development, staging and production. Annually our engineers participate in secure code training
                      covering OWASP Top 10 security flaws, common attack vectors, and other security controls.
                    </p>
                    <h2 className="text-jg-metal-700 text-sm uppercase pt-4 pb-2">Vulnerability Disclosure</h2>
                    <p className="text-jg-metal-500 text-sm">
                      Jiminny complies with the EU/Swiss-U.S. Privacy Shield Framework as set forth by the U.S.
                      Department of Commerce regarding the collection, use, and retention of personal information from
                      European Union member countries/Switzerland. Jiminny is working to comply with the Vendor Security
                      Alliance (VSA) published best practices.
                    </p>
                  </div>
                  <div className="pb-4">
                    <div className="flex items-center justify-between ">
                      <h2 className="text-sm text-zinc-800 not-italic uppercase !text-[16px] font-semibold leading-5 text-jg-metal-900 mb-2">
                        TAGS
                      </h2>
                    </div>
                    <hr className="w-8 mt-1 my-2 border-t-2 border-jg-green-500 mb-4"></hr>
                    <div className="flex gap-2 flex-wrap">
                      {Tags.map((item, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          rounded
                          fillType="plain"
                          size="md"
                          label={item}
                          className="border border-jg-metal-500 bg-jg-grey-50 text-jg-metal-500 font-medium !text-inputSizeXs !px-3"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <SocialFeedbackSection />
                <Pagination />
              </div>
              <div className="pb-4">
                <ContentCard
                  heading="Popular Articles "
                  headingClass="!text-[16px] font-semibold leading-5 text-jg-metal-900 mb-2"
                  underlineClass="mb-6 w-8 border-t-2"
                  className="mb-4 md:mb-6"
                >
                  <ArticalCards />
                </ContentCard>
              </div>
            </div>
            <ArticleRightSideBar />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Article

const Tags = ['Security', 'Security', 'Security', 'Security', 'Security']
