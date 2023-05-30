import { lazy } from 'react'
import { createWidget } from 'jg-widget'
import ClubSwitcherWidget from '../ClubSwitcher/ClubSwitcherWidget'
import UpgradeSection from './components/UpgardeSection/UpgradeSection'
const EmailList = lazy(() => import('@comps/uiComps/EmailList/EmailList'))
const CreateSegment = lazy(() => import('./pages/CreateSegment'))
const CopyEmail = lazy(() => import('./pages/copyEmail'))
const EditEmail = lazy(() => import('./pages/editEmail'))
const InsertEmail = lazy(() => import('./pages/createEmail'))
const EditSegment = lazy(() => import('@jg/widgets/EmailAndCom/pages/EditSegment'))
const EmailReport = lazy(() => import('@comps/uiComps/EmailList/EmailReport'))
const EmailDetails = lazy(() => import('@comps/uiComps/EmailList/emailDetails'))
const Recipients = lazy(() => import('@comps/uiComps/EmailList/Recipients'))
const EmailHistoryDetails = lazy(() => import('@comps/uiComps/SegmentList/IntroPage/emailHistoryDetails'))

const EmailManagementWidget = createWidget((context) => {
  const { routePath, resolveRoutePath } = context
  return new ClubSwitcherWidget(
    routePath,
    {
      defaultTab: 'emails',
      clubDocIdParamName: 'clubDocId',
      captionComponent: <></>,
      titleComponent: <UpgradeSection />,
    },
    [
      {
        path: ':tab',
        element: <EmailList />,
        children: [
          { path: 'preview/:id', element: <EmailDetails /> },
          { path: 'report/:id', element: <EmailReport /> },
          { path: 'recipients/:segmentId/:title', element: <Recipients /> },
        ],
      },
      { path: resolveRoutePath(':clubDocId/emails/compose/'), element: <InsertEmail /> },
      { path: resolveRoutePath(':clubDocId/emails/compose/:emailId'), element: <EditEmail /> },
      { path: resolveRoutePath(':clubDocId/emails/compose/duplicate/:emailId'), element: <CopyEmail /> },
      { path: resolveRoutePath(':clubDocId/create-segment/'), element: <CreateSegment /> },
      { path: resolveRoutePath(':clubDocId/segment/edit/:segmentId'), element: <EditSegment /> },
      { path: resolveRoutePath(':clubDocId/segment/:segmentId/:title'), element: <Recipients /> },
      { path: resolveRoutePath(':clubDocId/history/:historyId'), element: <EmailHistoryDetails /> },
    ]
  ).getRouteTree()
})

export default EmailManagementWidget
