import { useState, useEffect } from 'react'
// import EventPriceOptionPicker from '../EventPriceOptionPicker'
import useNavigateWithArgs from '../hooks/useNavigateWithArgs'
import ReactSlider from 'react-slider'
import { TextField } from '@comps/uiComps'
// import DecimalField from '../DecimalField'
import IndividaulFilterOption from './FilterIndividualOption'
import { SettingsVertical } from '@comps/uiComps/Icons'
import AppStore from '@jg/store/store'
import { Currency } from '@jg/utils'
import useEventStore from '../../store/useEventStore'

const EventFilterOptionPrice = () => {
  const { currentArgs, setCurrentArgs, getArgsFromUrl } = useNavigateWithArgs()
  const selectedPriceOption = getArgsFromUrl().price
  const [active, setActive] = useState(selectedPriceOption?.length === 2 ? 'price-range' : selectedPriceOption?.[0])

  const MaxPrice = useEventStore((state) => state.MaxPrice)
  const MinPrice = useEventStore((state) => state.MinPrice)

  return (
    <div className="divide-y divide-jg-metal-50">
      {priceFilterOptions.map((op) => {
        return (
          <IndividaulFilterOption
            key={op.value}
            title={op.name}
            active={active === op.value}
            onClick={() => {
              setCurrentArgs({ ...currentArgs, ...{ price: [op.value] } })
              setActive(op.value)
            }}
          ></IndividaulFilterOption>
        )
      })}
      <IndividaulFilterOption
        title={
          <>
            <p className="text-sm leading-4 font-medium">{'Price range'}</p>
            <SettingsVertical className="w-4 h-4 rotate-90" />
          </>
        }
        active={active === 'price-range'}
        onClick={() => {
          setActive('price-range')
        }}
      ></IndividaulFilterOption>

      {active === 'price-range' && (
        <>
          <JGPriceRangeSlider
            max={MaxPrice}
            min={MinPrice}
            initialValue={
              selectedPriceOption?.length === 2
                ? [+selectedPriceOption[0], +selectedPriceOption[1]]
                : [MinPrice || 0, MaxPrice || 1000]
            }
            onChangeSattle={(v) => {
              setCurrentArgs({ ...currentArgs, ...{ price: v.map((el) => el.toString()) } })
            }}
          />
        </>
      )}
    </div>
  )
}

export default EventFilterOptionPrice

export const priceFilterOptions = [
  { name: 'Any Price', value: 'all' },
  { name: 'Free', value: 'free' },
  { name: 'Paid', value: 'paid' },
]

const JGPriceRangeSlider = ({
  max,
  min,
  initialValue,
  onChange,
  onChangeSattle,
}: {
  max?: number
  min?: number
  initialValue: [number, number]
  onChange?: (value: [number, number]) => void | undefined
  onChangeSattle?: (value: [number, number]) => void | undefined
}) => {
  const [value, setValue] = useState<[number, number]>(initialValue)
  const currency = AppStore.getState()?.CurrentUser?.Currency
  const currencySymbol = Currency.getSymbol(currency ?? '')

  useEffect(() => {
    onChange?.(value)
  }, [value, onChange])

  return (
    <div className="w-full h-1/2 p-4 border-b border-0">
      <ReactSlider
        className="horizontal-slider"
        thumbClassName="example-thumb"
        trackClassName="example-track"
        min={min || 0}
        max={max || 100}
        value={value}
        onChange={(value) => setValue(value)}
        onAfterChange={(value) => onChangeSattle?.(value)}
        ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
        pearling
        minDistance={1}
      />
      <div className="w-full h-full relative">
        <div className="w-5/12 absolute left-0 top-1">
          <TextField
            fieldsize="md"
            id="minPrice"
            label={currencySymbol}
            labelPosition="left"
            labelWidth={20}
            // onValueChange={(e) => setValue((v) => (+e < v[1] ? [+e, v[1]] : v))}
            onValueChange={(e) => setValue((v) => [+e, v[1]])}
            placeholder="min"
            required
            type="number"
            onKeyDown={(evt: any) => ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()}
            min={min}
            value={value[0] ? value[0] : ''}
            // @ts-ignore
            onBlur={() => onChangeSattle(value)}
            onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
              e.code.toLowerCase().includes('enter') && onChangeSattle?.(value)
            }}
          />
        </div>
        <div className="w-5/12 absolute right-0 top-1">
          <TextField
            fieldsize="md"
            id="maxPrice"
            label={currencySymbol}
            labelPosition="left"
            labelWidth={20}
            // onValueChange={(e) => setValue((v) => (v[0] < +e ? [v[0], +e] : v))}
            onValueChange={(e) => setValue((v) => [v[0], +e])}
            placeholder="max"
            required
            type="number"
            onKeyDown={(evt: any) => ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()}
            max={max}
            value={value[1] ? value[1] : ''}
            // @ts-ignore
            onBlur={() => onChangeSattle(value)}
            onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) =>
              e.code.toLowerCase().includes('enter') && onChangeSattle?.(value)
            }
          />
        </div>
      </div>
    </div>
  )
}
