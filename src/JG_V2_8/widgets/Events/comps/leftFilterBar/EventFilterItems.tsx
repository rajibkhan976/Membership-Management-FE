import { FilterBarItem } from '@jg/common/comps/filter/FilterBar'
import EventFilterOptionCategory from './EventFilterOptionCategory'
import EventFilterOptionDate from './EventFilterOptionDate'
import EventFilterOptionOnline from './EventFilterOptionOnline'
import EventFilterOptionPrice from './EventFilterOptionPrice'
import DateLabel from './labelComps/DateLabel'
import PriceLabel from './labelComps/PriceLabel'
import ProviderLabel from './labelComps/ProviderLabel'
import CategoryLabel from './labelComps/CategoryLabel'
import EventFilterOptionDistance from './EventFilterOptionDistance'
import DistanceLabel from './labelComps/DistanceLabel'
import EventFilterOptionFeatured from './EventFilterOptionFeatured'
import EventFilterOptionIsMyOrganisers from './EventFilterOptionIsMyOrganisers'
import EventFilterOptionSavedEvents from './EventFilterOptionSavedEvents'
import EventFilterOptionInstallment from './EventFilterOptionInstallment'
import { OrganiserOptionScreen } from './OrganiserOptionScreen'

export const getEventFilterItems = (mode: string, isEvent = true, isPublic = false): FilterBarItem[] => {
  const itemBuffer: FilterBarItem[] =
    mode === 'browse' && isEvent
      ? [
          {
            title: 'Date',
            name: 'date',
            filterOptionComp: <EventFilterOptionDate />,
            formatedOptionValueComp: <DateLabel />,

            group: 'one',
          },
        ]
      : []
  const restItems: FilterBarItem[] = [
    {
      title: 'Category',
      name: 'category',
      filterOptionComp: <EventFilterOptionCategory />,
      group: 'one',
      formatedOptionValueComp: <CategoryLabel />,
    },
    {
      title: 'My Organisations',
      name: 'isMyOrganisers',
      filterOptionComp: <EventFilterOptionIsMyOrganisers />,
      group: 'one',
    },
    {
      title: isEvent ? 'Organisers' : 'Sellers',
      name: 'provider',
      filterOptionComp: <OrganiserOptionScreen />,
      group: 'one',
      formatedOptionValueComp: <ProviderLabel />,
    },
    // {
    //   title: isEvent ? 'Organisers' : 'Sellers',
    //   name: 'provider',
    //   filterOptionComp: <EventFilterOptionProvider />,
    //   group: 'one',
    //   formatedOptionValueComp: <ProviderLabel />,
    // },

    {
      title: 'Price',
      name: 'price',
      filterOptionComp: <EventFilterOptionPrice />,
      group: 'two',
      formatedOptionValueComp: <PriceLabel />,
    },
    {
      title: 'Installment Available',
      name: 'installment',
      filterOptionComp: <EventFilterOptionInstallment />,
      group: 'two',
    },
    {
      title: 'Distance',
      name: 'distance',
      filterOptionComp: <EventFilterOptionDistance />,
      group: 'two',
      formatedOptionValueComp: <DistanceLabel />,
    },
    {
      title: 'Is online',
      name: 'isOnline',
      filterOptionComp: <EventFilterOptionOnline />,
      group: 'three',
    },
    {
      title: `Featured ${isEvent ? 'Events' : 'Items'}`,
      name: 'isFeatured',
      filterOptionComp: <EventFilterOptionFeatured />,
      group: 'three',
    },
    {
      title: `Saved ${isEvent ? 'Events' : 'Items'}`,
      name: 'isSaved',
      filterOptionComp: <EventFilterOptionSavedEvents />,
      group: 'three',
    },
    // {
    //   title: `Saved ${isEvent ? 'Events' : 'Items'}`,
    //   name: 'isSaved',
    //   filterOptionComp: <DatePickerField />,
    //   group: 'three',
    // },
    // {
    //   title: 'Sort by',
    //   name: 'sortBy',
    //   filterOptionComp: <EventFilterOptionSortBy />,
    //   group: 'three',
    //   formatedOptionValueComp: <SortByLabel />,
    // },
  ].filter(
    (item) =>
      (isEvent || !['isOnline', 'distance'].includes(item.name)) &&
      (!isPublic || !['isMyOrganisers', 'isSaved'].includes(item.name))
  )
  return itemBuffer.concat(restItems)
}
