import { createWidget } from 'jg-widget'
import { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'

type ClubSwitcherWidgetConfigType = {
  titleComponent: ReactNode
  captionComponent: ReactNode
}

const CardNavigationWidget = createWidget<ClubSwitcherWidgetConfigType>((context) => {
  const { routePath, config, getRootRoute, resolveRoutePath, children } = context
  return {
    path: routePath,
    element: <>ss</>,
    children: [
      {
        path: resolveRoutePath(':clubDocId'),
        element: (
          <>
            <>
              {config.titleComponent} {config.captionComponent}
            </>
            <Outlet />
          </>
        ),
        children: children,
      },
    ],
  }
})
export default CardNavigationWidget
