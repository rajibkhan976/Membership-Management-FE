import createView from 'jg-view'
import ReportAndDashboardWidget from '@jg/widgets/ReportAndDashboard/ReportAndDashboardWidget'

export default createView(({ initWidget, routePath, config }) =>
  initWidget(ReportAndDashboardWidget, routePath, config)
)
