import React from 'react'
import classNames from 'classnames'
import { UseFormRegister } from 'react-hook-form'
import { useComp } from '@comps/uiComps/_base/hooks'
import { CheckboxGroupProps } from '../types'

const BUTTON_SIZE = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
  xl: 'h-7 w-7',
}

const LABEL_SIZE = {
  xs: 'sm:text-xs',
  sm: 'sm:text-sm',
  md: 'text-base',
  lg: 'sm:text-lg',
  xl: 'sm:text-xl',
}

const CheckboxGroupNew = React.forwardRef<
  HTMLInputElement,
  CheckboxGroupProps & Partial<ReturnType<UseFormRegister<{ [x: string]: unknown }>>>
>((props, ref) => {
  const {
    type = 'checkbox',
    label, // This is actually group label
    name,
    onChange,
    onValueChange,
    value = '', // We are expecting value as a string with pipe(|) separated values
    // isIncluded,
    items = [],
    fieldsize = 'md',
    helpText,
    orientation = 'vertical',
    inputClass,
    itemContainerClass,
    labelClass,
    asterisk,
    disabled = false,
    status = 'normal',
  } = props
  const { withRootElId } = useComp()
  const inputName = withRootElId('input')

  const visualStatusForField = {
    normal: 'border-jg-grey-300',
    success: 'appearance-none outline-none border-jg-green-500',
    error: 'appearance-none outline-none border-jg-red-500',
  }[status]

  const valueRef: string[] = (value || '').split('|')
  const labelCls = classNames('inline-block text-gray-600 dark:text-white text-lg mb-2', labelClass)
  console.log(type)
  const checkBoxItems = items.map((option, i) => (
    <div key={i} className={classNames('relative flex items-center gap-2', itemContainerClass)}>
      <div className={classNames('flex items-center')}>
        <input
          ref={ref}
          id={`${inputName}-${i}`}
          aria-describedby={(option.value as string) || type}
          name={`${inputName}`}
          //value={option.value}
          checked={value.indexOf(option.value) > -1}
          type={type}
          className={classNames(
            'focus:ring-indigo-500 border cursor-pointer',
            type === 'radio' ? 'rounded-full' : 'rounded-sm',
            BUTTON_SIZE[fieldsize],
            visualStatusForField,
            inputClass,
            disabled && 'cursor-not-allowed opacity-30'
          )}
          // defaultChecked={selected[option.value]}
          onChange={(e) => {
            const index = Number(e.target.id.split('-').pop())
            if (type === 'checkbox') {
              if (e.target.checked) valueRef.push(items[index].value)
              else {
                const exisitingIndex = valueRef.indexOf(items[index].value)
                valueRef.splice(exisitingIndex, 1)
              }
              onValueChange?.(valueRef.join('|') as string)
            } else {
              valueRef.length = 0
              valueRef.push(items[index].value)
              onValueChange?.(valueRef.join('|') as string)
            }
          }}
          disabled={disabled}
        />
      </div>
      <label
        htmlFor={`${inputName}-${i}`}
        className={classNames(
          'font-medium text-gray-700',
          LABEL_SIZE[fieldsize],
          status && status === 'error' && 'text-jg-red-500'
        )}
      >
        {option.cap}
      </label>
    </div>
  ))
  const orientationCls = orientation == 'horizontal' ? 'flex space-x-2' : ''
  return (
    <fieldset id={withRootElId()}>
      <legend className={labelCls}>
        {label}
        {asterisk && <span className="text-jg-red-700">&nbsp;*</span>}
      </legend>
      <div className={classNames(CHECKBOX_SPACE[fieldsize], orientationCls)}>{checkBoxItems}</div>
      {typeof helpText === 'string' ? <small className="text-gray-600">{helpText}</small> : helpText}
    </fieldset>
  )
})

export default CheckboxGroupNew

const CHECKBOX_SPACE = {
  xs: 'space-y-0.5',
  sm: 'space-y-1',
  md: 'space-y-1.5',
  lg: 'space-y-2',
  xl: 'space-y-2.5',
}
