import { createWidget } from 'jg-widget'
import ClubSwitcherWidget from '../ClubSwitcher/ClubSwitcherWidget'
import UserInfo from './UserInfo'

const UserInfoWidget = createWidget((context) => {
  const { routePath, config, getRootRoute } = context
  return new ClubSwitcherWidget(routePath, { captionComponent: <>Test</>, titleComponent: <>title</> }, [
    { index: true, element: <UserInfo {...config} post="comp 1" /> },
    { path: 'Test', element: <UserInfo {...config} post="comp 2" /> },
  ]).getRouteTree()

  // return {
  //   path: routePath,
  //   element: (
  //     <TestNotificationProvider>
  //       <Outlet />
  //     </TestNotificationProvider>
  //   ),
  //   children: [getRootRoute({ element: <UserInfo {...config} post="Frontend Designer" /> })],
  // }
})

export default UserInfoWidget
