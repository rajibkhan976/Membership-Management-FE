import classNames from 'classnames'
import React from 'react'
import { UseFormRegister } from 'react-hook-form'
import { TextFieldProps } from '../types'

const sizeCls = {
  xs: 'h-6',
  sm: 'h-7',
  md: 'h-8',
  lg: 'h-9',
  xl: 'h-10',
}

const fieldTextSize = {
  xs: 'text-inputSizeXs px-[8px] py-[5px]',
  sm: 'text-inputSizeSm px-[8px] py-[7px]',
  md: 'text-inputSizeMd px-[12px] py-[8px]',
  lg: 'text-inputSizeLg px-[12px] py-[10px]',
  xl: 'text-inputSizeXl p-[12px]',
}

const iconSize = {
  xs: 'h-3.5 w-3.5',
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-5 w-5',
  xl: 'h-6 w-6',
}

const iconLeftPadding = {
  xs: 'pl-8',
  sm: 'pl-8',
  md: 'pl-9',
  lg: 'pl-10',
  xl: 'pl-11',
}
const iconRightPadding = {
  xs: 'pr-8',
  sm: 'pr-8',
  md: 'pr-9',
  lg: 'pr-10',
  xl: 'pr-11',
}

const TextField = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithRef<'input'> & TextFieldProps & Partial<ReturnType<UseFormRegister<{ [x: string]: any }>>>
>((props, ref) => {
  const {
    initialValue,
    placeholder,
    name,
    id,
    label,
    type,
    disabled,
    onChange,
    onValueChange,
    fieldsize = 'md',
    labelPosition = 'top',
    labelWidth,
    status = 'normal',
    helpText,
    hideLabel,
    leftIcon,
    rightIcon,
    hideBorder,
    className,
    labelClassName,
    inputClassName,
    asterisk,
    ...rest
  } = props

  const visualStatusForField = {
    normal:
      'border-jg-metal-100 hover:border-jg-green-500 focus:outline-none focus:ring-2 focus:shadow-md focus:ring-jg-green-100 filled-input-normal placeholder-metal-300',
    success:
      'border-jg-metal-100 hover:border-jg-green-500 focus:outline-none focus:ring-2 focus:shadow-md focus:ring-jg-green-100 filled-input-success',
    error:
      'border-jg-red-500 hover:border-jg-red-300 focus:outline-none focus:ring-2 focus:shadow-md focus:ring-jg-red-100 filled-input-error',
  }[status]

  const fieldCls = classNames(
    'w-full font-medium rounded-sm filled-text-color disabled:border-jg-metal-100 disabled:hover:border-jg-metal-100 disabled:opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
    sizeCls[fieldsize],
    fieldTextSize[fieldsize],
    inputClassName,
    visualStatusForField,
    leftIcon ? iconLeftPadding[fieldsize] : '',
    rightIcon ? iconRightPadding[fieldsize] : '',
    hideBorder ? 'border-0' : 'border',
    disabled && 'cursor-not-allowed'
  )

  const inputContainerClass = classNames(labelPosition === 'left' ? 'flex items-center' : '', 'mb-5 gap-4', className)
  const labelCls = classNames(
    'inline-block text-jg-metal-900 font-medium text-sm leading-4 dark:text-white',
    (hideLabel || !label) && 'sr-only',
    labelPosition === 'left' && helpText && 'transform -translate-y-2.5',
    labelClassName
  )

  const LeftIcon = leftIcon ? (
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none filled-icon-color">
      {React.cloneElement(leftIcon, {
        className: `${iconSize[fieldsize]}`,
        'aria-hidden': 'true',
      })}
    </div>
  ) : undefined

  const RightIcon = rightIcon ? (
    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none filled-icon-color">
      {React.cloneElement(rightIcon, {
        className: `${iconSize[fieldsize]}`,
        'aria-hidden': 'true',
      })}
    </div>
  ) : undefined

  return (
    <div className={inputContainerClass}>
      <label htmlFor={id} className={labelCls} style={{ width: labelWidth || 'auto' }}>
        {label}
        {asterisk && <span className="text-jg-red-700">&nbsp;*</span>}
      </label>
      <div className="flex-grow space-y-1 ">
        <div className={`relative text-jg-metal-300 ${!hideLabel && labelPosition === 'top' ? 'mt-1' : ''}`}>
          <input
            ref={ref}
            type={type}
            id={id}
            name={name}
            defaultValue={initialValue}
            placeholder={placeholder}
            className={fieldCls}
            aria-describedby={`${name}-input`}
            disabled={disabled}
            onChange={onChange || ((e) => onValueChange && onValueChange(e.target.value))}
            {...rest}
          />
          {LeftIcon}
          {RightIcon}
        </div>
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
})
export default TextField
