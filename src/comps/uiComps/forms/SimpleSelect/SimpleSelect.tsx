import classNames from 'classnames'
import React, { useState } from 'react'
import { useComp } from '../../_base/hooks'
import { SimpleSelectProps } from './SimpleSelectProps'

const fieldTextSize = {
  xs: 'text-sm',
  sm: 'text-sm',
  md: 'text-sm',
  lg: 'text-sm',
  xl: 'text-sm',
}
function SimpleSelect(props: SimpleSelectProps) {
  const [currentValue, setCurrentValue] = useState(props.value)
  const { withRootElId } = useComp(props)

  const {
    className,
    label = 'Select',
    name,
    items = [],
    hideLabel,
    onSelect,
    fieldsize = 'md',
    labelPosition = 'top',
    labelWidth = 120,
    hideBorder = false,
    asterisk,
    placeholder,
    onValueChange,
    defaultValue,
    hidePlaceholderOption,
    status = 'normal',
    helpText,
    disabled,
    readOnly,
  } = props

  const visualStatusForField = {
    normal:
      'border-jg-metal-100 hover:border-jg-green-500 focus:outline-none focus:ring-2 focus:shadow-md focus:ring-jg-green-100 filled-input-normal placeholder-metal-300',
    success:
      'border-jg-metal-100 hover:border-jg-green-500 focus:outline-none focus:ring-2 focus:shadow-md focus:ring-jg-green-100 filled-input-success',
    error:
      'border-jg-red-500 hover:border-jg-red-300 focus:outline-none focus:ring-2 focus:shadow-md focus:ring-jg-red-100 filled-input-error',
  }[status]

  const containerClass = classNames(
    'jg-simple-select flex font-medium justify-center text-gray-700 text-sm gap-1.5',
    labelPosition === 'left' ? 'items-center' : 'flex-col',
    className
  )
  const fieldCls = classNames(
    'outline-none w-full p-1.5',
    'font-medium rounded-sm filled-text-color disabled:border-jg-metal-100 disabled:hover:border-jg-metal-100 disabled:opacity-50',
    hideBorder ? 'border-0' : 'border',
    fieldTextSize[fieldsize],
    visualStatusForField
  )
  // const labelPos= classNames(labelposition === 'left' ? 'flex items-center ': '', ' flex block text-sm font-medium text-gray-700',className);
  const labelCls = classNames(
    'inline-block mr-2 text-sm font-medium leading-4 text-jg-metal-900 dark:text-white',
    hideLabel && 'sr-only',
    labelPosition === 'left' && helpText && 'transform -translate-y-2.5'
  )

  // select function
  const handleClick = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let selectedItem
    let selectedIndex = -1
    for (let i = 0; i < items?.length; i++) {
      const item = items[i]
      if (item.value === e.target.value) {
        selectedIndex = i
        selectedItem = items[i]
        setCurrentValue(items[i].value)
        break
      }
    }

    onSelect?.({ evt: e, value: e.target.value, item: selectedItem, index: selectedIndex })
  }

  React.useEffect(() => setCurrentValue(props.value), [props.value])

  return (
    <div id={withRootElId()} className={containerClass}>
      <label htmlFor={withRootElId('select')} className={labelCls} style={{ width: labelWidth }}>
        {label}
        {asterisk && <span className="text-jg-red-500">&nbsp;*</span>}
      </label>
      <div className="w-full space-y-1">
        <select
          id={withRootElId('select')}
          name={name || withRootElId('select')}
          value={onValueChange ? props.value : currentValue}
          className={classNames(fieldCls, disabled && 'cursor-not-allowed opacity-30')}
          onChange={(e) => {
            if (onValueChange) onValueChange(e.target.value)
            else handleClick(e)
          }}
          defaultValue={defaultValue || ''}
          disabled={disabled}
        >
          {placeholder && (
            <option className={hidePlaceholderOption ? 'jg-hidden' : ''} value="" disabled>
              {placeholder}
            </option>
          )}
          {items?.map(({ name, value }, index) => (
            <option className="" key={index} value={value} disabled={readOnly}>
              {name}
            </option>
          ))}
        </select>
        {typeof helpText === 'string' ? (
          <small
            className={classNames(
              'text-xs',
              {
                normal: 'text-jg-metal-500',
                success: 'text-jg-green-500',
                error: 'text-jg-red-300',
              }[status]
            )}
          >
            {helpText}
          </small>
        ) : (
          helpText
        )}
      </div>
    </div>
  )
}
export default SimpleSelect
