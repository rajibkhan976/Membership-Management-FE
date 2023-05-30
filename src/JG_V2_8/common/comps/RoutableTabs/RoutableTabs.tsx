import { CompBaseProps, TabItemProps, Tabs } from '@comps/uiComps'
import RoutableTab, { RoutableTabProps } from './RoutableTab'
import { Children, PropsWithChildren, ReactElement } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

type RoutableTabsProps = CompBaseProps & {
  basePath?: string
}
const RoutableTabs = ({ children, basePath = '/' }: RoutableTabsProps) => {
  const items: TabItemProps[] = []
  const routableItems: string[] = []
  const { pathname } = useLocation()
  const navigate = useNavigate()
  let activeTabIndex = -1
  if (Children.count(children)) {
    Children.map(children, (child, index) => {
      const item = child as ReactElement<PropsWithChildren<RoutableTabProps>>
      items.push({ icon: item.props.icon, title: item.props.title, content: <>{item.props.children}</> })
      if ('/' + item.props.path === pathname) activeTabIndex = index
      routableItems.push(item.props.path)
    })
  }
  console.log('activeTabIndex', activeTabIndex)
  const handleSelect = (index: number) => {
    const selectedPath = routableItems[index]
    console.log('handleSelect', index, `${basePath}${selectedPath}`)
    navigate(`${basePath}${selectedPath}`)
  }
  return (
    <Tabs
      activeItem={activeTabIndex}
      validateBeforeSelect={(currentIndex, tatgetIndex) => {
        handleSelect(tatgetIndex)
        return true
      }}
      items={items}
    />
  )
}

export { RoutableTabs as default, RoutableTab }
