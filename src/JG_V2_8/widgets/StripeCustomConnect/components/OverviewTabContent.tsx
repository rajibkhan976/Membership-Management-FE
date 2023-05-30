import BalanceOverView from './balance-overview'
import PayoutProfile from './payout-profile'
import { BalanceIcon, ProfileIcon } from '@comps/uiComps/Icons'
import { CardNavigation } from '@comps/uiComps'
import CardItem from '@comps/uiComps/CardNavigation/CardItem'

const OverviewTabContent = () => {
  return (
    <CardNavigation selectedValue={'1'} className="p-2 border-b">
      <CardItem title="Balances" icon={<BalanceIcon className="h-3.5 w-3" />} cardName="1">
        <BalanceOverView />
      </CardItem>
      <CardItem title="Profile" icon={<ProfileIcon className="h-3.5 w-3" />} cardName="2">
        <PayoutProfile />
      </CardItem>
    </CardNavigation>
  )
}

export default OverviewTabContent
