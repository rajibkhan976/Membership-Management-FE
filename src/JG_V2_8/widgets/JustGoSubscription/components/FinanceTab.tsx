import Tabs from '@comps/uiComps/Tab/Tabs'
import { ReactComponent as FinanceAccountIcon } from '@jg/assets/images/FinanceAccountIcon.svg'
import { useState, useCallback } from 'react'
import AccountTabContent from './AccountTabContent'

type FinanceTabProps = {
  selectedTab?: number
}

const FinanceTab = (props: FinanceTabProps) => {
  const { selectedTab = 0 } = props

  const [activeItem, setActiveItem] = useState<number>(selectedTab)

  const handleTabItemSelection = useCallback((activeItem: number): void => {
    setActiveItem(activeItem)
  }, [])

  const tabItems = [
    {
      title: 'ACCOUNT',
      content: <AccountTabContent />,
      icon: <FinanceAccountIcon fill={activeItem === 0 ? '#4CAF4F' : ''} />,
    },
  ]

  return (
    <div className="jg-container mt-14 md:mt-12">
      <Tabs
        items={tabItems}
        activeItem={activeItem}
        orientation="horizontal"
        border
        enableTabBarControl={false}
        tabBarControl={null}
        tabItemAlignment={'left'}
        showTabItemTxt
        onSelect={handleTabItemSelection}
      />
    </div>
  )
}

export default FinanceTab
