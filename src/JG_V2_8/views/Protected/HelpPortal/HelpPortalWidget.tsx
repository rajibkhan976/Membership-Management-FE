import { createWidget } from 'jg-widget'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import ClubEmail from './contents/ClubEmail/ClubEmail'
import ClubFinance from './contents/ClubFinance/ClubFinance'
import ClubProfile from './contents/ClubProfile/ClubProfile'
import ClubReports from './contents/ClubReports/ClubReports'
import DataImport from './contents/DataImport/DataImport'
import EmailManagement from './contents/EmailManagement/EmailManagement'
import EventManagement from './contents/EventManagement/EventManagement'
import FieldManagement from './contents/FieldManagement/FieldManagement'
import TeamProfile from './contents/TeamProfile'
import MembershipSetup from './contents/MembershipSetup/MembershipSetup'
import WebsiteBuilder from './contents/WebsiteBuilder/WebsiteBuilder'
import Essential from './contents/membershipManagementContents/Essential'
import General from './contents/membershipManagementContents/General'
import Lite from './contents/membershipManagementContents/Lite'
import MembeshipManagement from './contents/membershipManagementContents/MembeshipManagement'
import Pro from './contents/membershipManagementContents/Pro'
import ChartComponent from './contents/chart/Chart'

const HelpPortalWidget = createWidget((context) => {
  const { routePath, config, resolveRoutePath, getRootRoute } = context
  const { title } = config as { title: string }
  return {
    path: routePath,
    element: (
      <>
        {/*parent element should not have any html for now , but only outlet*/}
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </>
    ),
    children: [
      getRootRoute({
        element: <>This is just a page, index page, never visible</>,
      }),
      {
        path: resolveRoutePath('learn-more/'),
        element: <MembeshipManagement />,
        children: [
          {
            index: true,
            element: <General />, // general specific content
          },
          {
            path: 'lite',
            element: <Lite />, // lite specific content will come here, could be a diffrent comp
          },
          {
            path: 'essential',
            element: <Essential />, // same as above, but for essential
          },
          {
            path: 'pro',
            element: <Pro />, // same as above, but for pro
          },
        ],
      },
      {
        path: resolveRoutePath('club-profile/'),
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ClubProfile />
          </Suspense>
        ),
      },
      {
        path: resolveRoutePath('chart/'),
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ChartComponent />
          </Suspense>
        ),
      },
      {
        path: resolveRoutePath('team-profile/'),
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <TeamProfile />
          </Suspense>
        ),
      },
      {
        path: resolveRoutePath('data-import/'),
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <DataImport />
          </Suspense>
        ),
      },
      {
        path: resolveRoutePath('club-reports/'),
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ClubReports />
          </Suspense>
        ),
      },
      {
        path: resolveRoutePath('club-members/'),
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <TeamProfile />
          </Suspense>
        ),
      },
      {
        path: resolveRoutePath('club-affiliations/'),
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <TeamProfile />
          </Suspense>
        ),
      },
      {
        path: resolveRoutePath('membership-setup/'),
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <MembershipSetup />
          </Suspense>
        ),
      },
      {
        path: resolveRoutePath('club-finances/'),
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ClubFinance />
          </Suspense>
        ),
      },
      {
        path: resolveRoutePath('event-management/'),
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <EventManagement />
          </Suspense>
        ),
      },
      {
        path: resolveRoutePath('club-email/'),
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ClubEmail />
          </Suspense>
        ),
      },
      {
        path: resolveRoutePath('website-builder/'),
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <WebsiteBuilder />
          </Suspense>
        ),
      },
      {
        path: resolveRoutePath('email-management/'),
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <EmailManagement />
          </Suspense>
        ),
      },
      {
        path: resolveRoutePath('field-management/'),
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <FieldManagement />
          </Suspense>
        ),
      },
    ],
  }
})

export default HelpPortalWidget
