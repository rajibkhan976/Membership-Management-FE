import classNames from 'classnames'
import React from 'react'
import { UseFormRegister } from 'react-hook-form'
//import { FieldBaseProps } from '../../_base/types/CompBaseProps';
import { TextAreaProps } from '../types'

const fieldTextSize = {
  xs: 'text-inputSizeXs px-[8px] py-[5px]',
  sm: 'text-inputSizeSm px-[8px] py-[7px]',
  md: 'text-inputSizeMd px-[12px] py-[8px]',
  lg: 'text-inputSizeLg px-[12px] py-[10px]',
  xl: 'text-inputSizeXl p-[12px]',
}

const TextArea = React.forwardRef<
  HTMLTextAreaElement,
  TextAreaProps & Partial<ReturnType<UseFormRegister<{ [x: string]: unknown }>>>
>((props, ref) => {
  const {
    // value= "text",
    label,
    initialValue,
    fieldsize = 'md',
    labelPosition = 'top',
    labelWidth = 125,
    status = 'normal',
    placeholder = 'Enter text',
    isReadOnly,
    onChange,
    onValueChange,
    labelClass,
    textAreaClass,
    containerClass,
    hideLabel,
    helpText,
    asterisk,
    ...rest
  } = props

  const visualStatusForField = {
    normal:
      'border-jg-metal-100 hover:border-jg-green-500 focus:outline-none focus:ring-2 focus:shadow-md focus:ring-jg-green-100 filled-input-normal',
    success:
      'border-jg-metal-100 hover:border-jg-green-500 focus:outline-none focus:ring-2 focus:shadow-md focus:ring-jg-green-100 filled-input-success',
    error:
      '!border-jg-red-500 hover:border-jg-red-300 focus:outline-none focus:ring-2 focus:shadow-md focus:ring-jg-red-100 filled-input-error',
  }[status]

  const fieldCls = classNames(
    'rounded-sm w-full border border-gray-400 p-3 mt-1 focus:outline-none focus:ring focus:primary-pressed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 xs:px-2 xs:py-1.5 placeholder-jg-metal-300 disabled:border-jg-metal-100 disabled:hover:border-jg-metal-100 disabled:opacity-50',
    //(false ? 'h-32': ''),
    fieldTextSize[fieldsize],
    textAreaClass,
    visualStatusForField,
    rest?.disabled && 'cursor-not-allowed'
  )

  const containerClassName = classNames(
    labelPosition === 'left' ? 'flex items-center' : 'block',
    'mb-5',
    containerClass
  )
  const labelClassName = classNames(
    'inline-block text-gray-700 dark:text-white font-medium',
    labelClass,
    hideLabel ? 'sr-only' : '',
    helpText && labelPosition === 'left' && '-translate-y-4'
  )

  return (
    <div className={containerClassName}>
      <label className={labelClassName} style={{ width: labelWidth }}>
        {label}
        {asterisk && <span className="text-jg-red-700">&nbsp;*</span>}
      </label>
      <div className="flex-grow space-y-1 text ">
        <textarea
          ref={ref}
          defaultValue={initialValue}
          className={fieldCls}
          placeholder={placeholder}
          onChange={onChange || ((e) => onValueChange && onValueChange(e.target.value))}
          readOnly={isReadOnly}
          {...rest}
        />
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
export default TextArea
