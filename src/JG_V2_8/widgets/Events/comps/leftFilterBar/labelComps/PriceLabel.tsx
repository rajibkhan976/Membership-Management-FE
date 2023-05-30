import FilterBarLabelItem from '@jg/common/comps/filter/FilterBarLabelItem'
import useEventStore from '@jg/widgets/Events/store/useEventStore'
import useNavigateWithArgs from '../../hooks/useNavigateWithArgs'

const PriceLabel = () => {
  const { currentArgs, setCurrentArgs } = useNavigateWithArgs()
  const price = useEventStore((state) => state.searchRequestArg.price)
  let priceLabel = ''
  if (price && price.length == 1) {
    switch (price[0]) {
      case 'all':
        priceLabel = 'All'
        break
      case 'free':
        priceLabel = 'Free'
        break
      case 'paid':
        priceLabel = 'Paid'
        break
      default:
        priceLabel = price[0]
        break
    }
  } else if (price && price.length == 2) {
    priceLabel = `From ${price[0]} to ${price[1]}`
  }
  return (
    <FilterBarLabelItem
      isActive={price?.[0] != 'all'}
      name="price"
      filterValueDispplayText={priceLabel}
      reset={() => {
        setCurrentArgs({ ...currentArgs, price: ['all'] })
      }}
    />
  )
}
export default PriceLabel
