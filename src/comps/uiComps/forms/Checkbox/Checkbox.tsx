import classNames from 'classnames'
import React, { useEffect } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { useComp } from '../../_base/hooks'
import { CheckboxProps } from '../types'

const sizeCls = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
  xl: 'h-7 w-7',
}

const fieldTextSize = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-md',
  lg: 'sm:text-lg',
  xl: 'text-xl',
}

const Checkbox = React.forwardRef<
  HTMLInputElement,
  CheckboxProps & Partial<ReturnType<UseFormRegister<{ [x: string]: unknown }>>>
>((props, ref) => {
  const {
    id,
    label,
    indeterminate = false,
    name,
    onChange,
    onValueChange = () => {},
    fieldsize = 'sm',
    className,
    value,
    helpText,
    labelClass,
    hideLabel,
    // inputClassName,
    asterisk,
    status = 'normal',
    ...rest
  } = props

  const { withRootElId } = useComp(props)

  const visualStatusForField = {
    normal:
      'appearance-none bg-white border border-gray-500 rounded-sm checked:bg-blue-500 checked:bg-check checked:border-gray-500 indeterminate:bg-gray-300 indeterminate:bg-minus indeterminate:bg-cover focus:outline-none dark:bg-black dark:border-white',
    success: 'appearance-none outline-none border-jg-green-500 rounded-sm',
    error: 'appearance-none outline-none border-jg-red-500 rounded-sm',
  }[status]

  const fieldCls = classNames(
    'border',
    // labelposition === 'left' ? 'ml-2' : '',
    sizeCls[fieldsize],
    rest.disabled && 'cursor-not-allowed opacity-30',
    visualStatusForField
    // inputClassName
  )
  const inputContainerClass = classNames(
    // labelposition === 'left' ? 'flex' : '',
    className,
    'mb-1'
  )
  const labelCls = classNames(
    'inline-block dark:text-white ml-2 text-gray-400 ',
    fieldTextSize[fieldsize],
    labelClass,
    status && status === 'error' && 'text-jg-red-500'
  )
  useEffect(() => {
    if (indeterminate) {
      const checkbox = document.getElementById(withRootElId('cb'))
      //@ts-ignore
      checkbox.indeterminate = true
    }
  }, [])
  return (
    <div className={inputContainerClass}>
      <div className="relative mt-1  flex items-center">
        <input
          ref={ref}
          id={id || withRootElId('cb')}
          name={name}
          //value={props.value}
          checked={props.value}
          type="checkbox"
          defaultChecked={value}
          className={fieldCls}
          aria-describedby={`${name || 'default-checkbox'}-input`}
          onChange={onChange || ((e) => onValueChange(e.target.checked))}
          {...rest}
        />
        {!hideLabel && (
          <label htmlFor={id || withRootElId('cb')} className={`${labelCls} dark:text-white`}>
            {label}
            {asterisk && <span className="text-jg-red-700">&nbsp;*</span>}
          </label>
        )}
      </div>
      {typeof helpText === 'string' ? <small className="text-gray-600">{helpText}</small> : helpText}
    </div>
  )
})
export default Checkbox
