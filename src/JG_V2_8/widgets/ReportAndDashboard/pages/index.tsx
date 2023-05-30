import { Email, Segment } from '@comps/uiComps/Icons/index'
import Tabs from '@comps/uiComps/Tab/Tabs'
import Accodian from '../components/accodian'

const ReportAndDashboard = () => {
  return (
    <div className="mx-auto min-h-[calc(100vh-175px)]">
      <Tabs
        activeItem={0}
        border
        enableTabBarControl={false}
        items={[
          {
            content: <h1 className="text-jg-red-500 text-2xl mt-4 mb-4 text-center">Coming Soon</h1>,
            icon: <Email width={20} height={16} />,
            title: 'Overview',
          },
          {
            content: <h1 className="text-jg-red-500 text-2xl mt-4 mb-4 text-center">Coming Soon</h1>,
            icon: <Segment width={20} height={14} />,
            title: 'Dashboard',
          },
          {
            content: <Accodian />,
            icon: <Segment width={20} height={14} />,
            title: 'Reports',
          },
        ]}
        onSelect={() => {}}
        orientation="horizontal"
        showTabItemTxt
        tabItemAlignment="left"
        tabPanelClass="p-0 min-h-[calc(100vh-175px)]"
      />
    </div>
  )
}

export default ReportAndDashboard
