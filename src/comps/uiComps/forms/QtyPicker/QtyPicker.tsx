import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { PlusIcon, MinusIcon } from '@heroicons/react/solid'
import { useComp } from '../../_base/hooks'
import { QtyPickerProps } from './QtyPickerProps'
import { number } from 'yup'

const fieldTextSize = {
  xs: 'sm:text-xs',
  sm: 'sm:text-xs',
  md: 'md:text-base text-xs',
  lg: 'lg:text-lg text-base',
  xl: 'lg:text-lg text-base',
}
function QtyPicker(props: QtyPickerProps) {
  const { withRootElId } = useComp(props)
  const {
    className,
    label = 'Quantity picker',
    hideLabel,
    fieldsize = 'sm',
    labelPosition = 'top',
    labelWidth = 120,
    disabledMax = false,
    disabledMin = false,
    value = 0,
    disabled,

    onChange,
  } = props
  const labelPos = classNames(
    labelPosition === 'left' ? 'flex items-center ' : '',
    'mb-5 block text-sm font-medium text-gray-700',
    className
  )
  const labelCls = classNames(
    'inline-block mr-2 text-sm font-medium text-gray-700 dark:text-white',
    labelPosition === 'left' ? '' : 'mb-2'
  )
  const labelWidStyle = `${labelWidth}px`
  const fieldCls = classNames(
    'justify-between w-full border px-4 py-2 w-full bg-white text-sm font-medium text-gray-400 leading-4',
    fieldTextSize[fieldsize]
  )

  return (
    <div id={withRootElId()} {...(disabled ? { className: `disabled ${labelPos}` } : { className: labelPos })}>
      {!hideLabel && (
        <label htmlFor={withRootElId('quantity')} className={labelCls} style={{ width: labelWidStyle }}>
          {label}
        </label>
      )}
      <div className="flex items-center">
        <button
          value={''}
          className={
            disabledMin
              ? 'disabled button-minus h-9 w-9 p-2 bg-jg-grey-50   border border-metal-secondery-300 rounded-l '
              : 'button-minus h-9 w-9 p-2  border border-metal-secondery-300 rounded-l text-metal-secondery-900 bg-jg-green-50'
          }
          data-field="quantity"
          onClick={() => {
            const amnt = Number(value) - 1
            if (amnt > -1) onChange(amnt)
          }}
          disabled={disabledMin}
        >
          <MinusIcon
            className={disabledMin ? 'text-jg-metal-100 bg-jg-grey-50 h-4 w-4' : ' text-jg-green-500 h-4 w-4'}
          />
        </button>
        <input
          type="number"
          id="quantity"
          name={withRootElId('quantity')}
          //min={min}
          // max={max}
          value={value}
          onChange={(e) => {
            onChange(Number(e.target.value))
          }}
          className={`${fieldCls} h-9 w-16 px-2 py-2.5 border-tb border-metal-secondery-300 focus:outline-none focus:none`}
        />
        <button
          value=""
          className={
            disabledMax
              ? 'disabled text-metal-secondery-300 bg-jg-grey-50  button-minus h-9 w-9 p-2   border border-metal-secondery-300 rounded-r'
              : 'button-plus rounded-r h-9 w-9 p-2   border border-metal-secondery-300 text-metal-secondery-900 bg-jg-green-50'
          }
          data-field="quantity"
          onClick={() => {
            onChange(Number(value) + 1)
          }}
          disabled={disabledMax}
        >
          <PlusIcon className={disabledMax ? 'text-jg-metal-100 h-4 w-4' : ' text-jg-green-500 text-[12px] h-4 w-4'} />
        </button>
      </div>
    </div>
  )
}
export default QtyPicker
