import { createWidget } from 'jg-widget'
import { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import ClubSwitcher from './ClubSwitcher'
import ClubSwitcherProvider from './ClubSwitcherProvider'
import JGPackageProvider from '@jg/providers/JGPackageProvider'

type ClubSwitcherWidgetConfigType = {
  titleComponent: ReactNode
  captionComponent: ReactNode
  defaultTab?: string
  clubDocIdParamName?: string
}

const ClubSwitcherWidget = createWidget<ClubSwitcherWidgetConfigType>((context) => {
  const { routePath, config, resolveRoutePath, children } = context
  const paramName = config.clubDocIdParamName || 'clubMerchantId'

  return {
    path: routePath,
    element: (
      <ClubSwitcherProvider paramName={paramName}>
        <ClubSwitcher paramName={paramName} defaultTab={config.defaultTab || ''} />
      </ClubSwitcherProvider>
    ),
    children: [
      {
        path: resolveRoutePath(`:${paramName}`),
        element: (
          <>
            <div className="jg-container">
              <div className="hidden md:block visible">
                {config.titleComponent} {config.captionComponent}
              </div>
              <JGPackageProvider>
                <Outlet />
              </JGPackageProvider>
            </div>
          </>
        ),
        children: children,
      },
    ],
  }
})

export default ClubSwitcherWidget
