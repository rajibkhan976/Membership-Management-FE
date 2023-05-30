import { CompBaseProps } from '@comps/uiComps'

export const priceFilterOptions = [
  { name: 'Any Price', value: 'all' },
  { name: 'Free', value: 'free' },
  { name: 'Paid', value: 'paid' },
  // { name: 'Pick a price...', value: 'pickAPrice' },
  { name: 'Price range', value: 'pickARange' },
]

type EventPriceOptionPickerProps = CompBaseProps & {
  value?: string
  onChange: (value: string) => void
}

const EventPriceOptionPicker = ({ value, onChange }: EventPriceOptionPickerProps) => {
  return (
    <>
      {Array.isArray(priceFilterOptions) &&
        priceFilterOptions.map((option, index) => (
          <div
            key={index}
            className="w-full text-jg-grey-600 font-medium p-3 text-sm cursor-pointer border-b border-0"
            onClick={() => onChange(option?.value)}
          >
            {option?.name}
          </div>
        ))}
    </>
  )
}

export default EventPriceOptionPicker
