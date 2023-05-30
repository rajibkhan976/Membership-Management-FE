import { EventPriceSettings } from '@jg/common/types'

export default ({ Source, Max, Min, DisplayPrice, Currency }: any): EventPriceSettings => ({
  displayPrice: DisplayPrice,
  max: Max,
  min: Min,
  currency: Currency,
})
