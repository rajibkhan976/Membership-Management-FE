import FilterBarLabelItem from '@jg/common/comps/filter/FilterBarLabelItem'
import { withTooltip } from '@jg/utils/withTooltip'
import useEventStore from '@jg/widgets/Events/store/useEventStore'
import { sortByOptions } from '../EventFilterOptionSortBy'

const SortByLabel = () => {
  const { distance, order } = useEventStore((state) => ({
    distance: state.searchRequestArg.sortBy,
    order: state.searchRequestArg.orderBy,
  }))
  const displayText = sortByOptions.filter((el) => el.value === distance)?.[0]?.name || 'Date'
  const orderByText = `${order === 'asc' ? 'Ascending' : 'Descending'} order`
  const rotateClass = order === 'asc' ? '' : 'rotate-180'

  return (
    <FilterBarLabelItem
      isActive={true}
      name="sortBy"
      filterValueDispplayText={
        <div className="inline-flex gap-2 items-center">
          <OrderIconWithTooltip content={`${orderByText}`} className={`w-3.5 h-3.5 ${rotateClass}`} />
          <p>{displayText}</p>
        </div>
      }
      reset={null}
    />
  )
}
export default SortByLabel

const OrderIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg width="14" height="12" viewBox="0 0 14 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M11.6666 9.33333H13.6666L10.9999 12L8.33325 9.33333H10.3333V0H11.6666M0.333252 9.33333H6.99992V10.6667H0.333252M2.99992 1.33333V2.66667H0.333252V1.33333M0.333252 5.33333H4.99992V6.66667H0.333252V5.33333Z"
        fill="currentColor"
      />
    </svg>
  )
}
const OrderIconWithTooltip = withTooltip(OrderIcon)
