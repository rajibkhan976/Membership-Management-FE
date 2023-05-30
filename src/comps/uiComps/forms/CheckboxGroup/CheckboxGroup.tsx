import React, { useEffect, useState } from 'react'
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

const CheckboxGroup = React.forwardRef<
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
  } = props
  const { withRootElId } = useComp()
  const inputName = withRootElId('input')

  console.log('CheckboxGroupProps', props)

  // const [checkedList, setCheckedList] = useState(items);

  // 1) created a object of key value pair where key is a string and value is a boolean. The keys are the values of the items
  // 2) We are looping through the items and checking if the value is present in the value string. If it is present we are setting the value to true
  // 3) If the value is not present we are setting the value to false
  const [selected, setSelected] = useState(() => {
    const checkedValue = value.split('|').map((item: string) => item.trim())
    const trackerObj: Record<string, boolean> = {}
    items.forEach((item) => {
      trackerObj[item.value] = checkedValue.includes(item.value)
    })
    return trackerObj
  })

  const labelCls = classNames('inline-block text-gray-600 dark:text-white text-lg mb-2', labelClass)

  const handleChange = (changedItem: { id: string; value: string | number; isChecked: boolean }) => {
    //console.log(changedItem)
    if (type === 'radio') {
      // We are setting the value to true for the selected item and setting the value to false for all the other items
      setSelected(() => {
        const newState: Record<string, boolean> = {}
        items.forEach((item) => {
          if (item.name === changedItem.id) {
            newState[item.value] = changedItem.isChecked
            return
          }
          newState[item.value] = false
        })
        return newState
      })
      return
    }

    // Preserving previous selection and only changing the value of the selected item
    setSelected((prevState) => {
      const newState = { ...prevState }
      newState[changedItem.value] = changedItem.isChecked
      return newState
    })
  }

  // For dynamic type changes
  useEffect(() => {
    if (type === 'radio') {
      // For radio, select only 1 item
      setSelected(() => {
        const checkedValue = value.split('|').slice(-1)
        const newState: Record<string, boolean> = {}
        items.forEach((item) => {
          newState[item.value] = checkedValue.includes(item.value)
        })
        return newState
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type])

  // This is causing too many renders when used with combined state
  // }, [type, items, value]);

  // // Output the changes with every render
  // onChange(
  //   Object.keys(selected)
  //     .filter((item) => selected[item])
  //     .join('|')
  // );

  useEffect(() => {
    onValueChange &&
      onValueChange(
        Object.keys(selected)
          .filter((item) => selected[item])
          .join('|')
      )
    // onChange()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected])
  // console.log('selected', selected)
  // console.log('items', items)

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
            'focus:ring-indigo-500 text-indigo-600 border-gray-300 rounded',
            BUTTON_SIZE[fieldsize],
            inputClass,
            disabled && 'cursor-not-allowed opacity-30'
          )}
          defaultChecked={selected[option.value]}
          onChange={
            onChange ||
            ((e) =>
              handleChange({
                id: option.name as string,
                value: option.value,
                isChecked: e.target.checked,
              }))
          }
          disabled={disabled}
        />
      </div>
      <label htmlFor={`${inputName}-${i}`} className={classNames('font-medium text-gray-700', LABEL_SIZE[fieldsize])}>
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

export default CheckboxGroup

const CHECKBOX_SPACE = {
  xs: 'space-y-0.5',
  sm: 'space-y-1',
  md: 'space-y-1.5',
  lg: 'space-y-2',
  xl: 'space-y-2.5',
}
