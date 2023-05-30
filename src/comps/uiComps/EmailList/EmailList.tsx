import { Email, Segment } from '@comps/uiComps/Icons/index'
import { useRouter } from '@jg/hooks'
import { useWidgetContext } from 'jg-widget'
import { Outlet, useParams } from 'react-router-dom'
import CloclIcon from '../Icons/SVG/CloclIcon'
import IntroPage from '../SegmentList/IntroPage/IntroPage'
import SegmentList from '../SegmentList/SegmentList'
import Tabs from '../Tab/Tabs'
import Emails from './Emails'

const EmailList = () => {
  // const { selectedTab, setSelectedTab } = useTabState()
  const { navigate } = useRouter()
  const { tab, clubDocId } = useParams()
  const { basePath } = useWidgetContext()
  const tabPath = `${basePath}${clubDocId}`
  return (
    <>
      <Tabs
        // activeItem={selectedTab}
        activeItem={tab === 'emails' ? 0 : tab === 'segments' ? 1 : 2}
        border
        className="capitalize"
        enableTabBarControl={false}
        items={[
          {
            content: <Emails />,
            icon: <Email width={20} height={16} />,
            title: 'Emails',
          },
          {
            content: <SegmentList />,
            icon: <Segment width={20} height={14} />,
            title: 'Segments',
          },
          {
            content: <IntroPage />,
            icon: <CloclIcon width={20} height={20} />,
            title: 'History',
          },
        ]}
        validateBeforeSelect={() => {
          return false
        }}
        // onSelect={(activeItem: number) => setSelectedTab(activeItem)}
        onSelect={(activeItem: number) => {
          navigate(
            activeItem === 0 ? `${tabPath}/emails` : activeItem === 1 ? `${tabPath}/segments` : `${tabPath}/history`
          )
        }}
        orientation="horizontal"
        showTabItemTxt
        tabItemAlignment="left"
        tabPanelClass="p-0 min-h-[calc(100vh-175px)] overflow-none"
      />
      <Outlet />
    </>
  )
}

export default EmailList
