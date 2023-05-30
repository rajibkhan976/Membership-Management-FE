import AccountHistory from './account-history'
import AccountDetails from './account-details'
import { CardNavigation } from '@comps/uiComps'
import CardItem from '@comps/uiComps/CardNavigation/CardItem'
import { DetailsIcon, HistoryIcon } from '@comps/uiComps/Icons'

const AccountTabContent = () => {
  return (
    <CardNavigation selectedValue={'1'} className="p-2 border-b">
      <CardItem title="Details" icon={<DetailsIcon className="h-3.5 w-3" />} cardName="1">
        <AccountDetails />
      </CardItem>
      <CardItem title="History" icon={<HistoryIcon className="h-3.5 w-3" />} cardName="2">
        <AccountHistory />
      </CardItem>
    </CardNavigation>
  )
}

export default AccountTabContent
