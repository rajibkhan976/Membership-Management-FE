import { createWidget } from 'jg-widget'
import ReportAndDashboard from './pages'
import ClubSwitcherWidget from '../ClubSwitcher/ClubSwitcherWidget'
import CreateReportMain from '@jg/widgets/ReportAndDashboard/pages/create-report'
import UpgradeSection from '../EmailAndCom/components/UpgardeSection/UpgradeSection'

const ReportAndDashboardWidget = createWidget((context) => {
  const { routePath } = context

  return new ClubSwitcherWidget(
    routePath,
    {
      defaultTab: 'overview',
      clubDocIdParamName: 'clubDocId',
      captionComponent: <ReportAndDashboard />,
      titleComponent: <UpgradeSection />,
    },
    [
      {
        path: ':tab',
        // path: 'create-report',
        element: <CreateReportMain />,
        children: [{ path: 'compose/', element: <p>Hello </p> }],
      },
    ]
  ).getRouteTree()
})

export default ReportAndDashboardWidget
