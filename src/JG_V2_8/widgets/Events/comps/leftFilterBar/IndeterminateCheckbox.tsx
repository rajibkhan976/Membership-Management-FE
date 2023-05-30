import { CompBaseProps } from '@comps/uiComps'
import { useComp } from '@comps/uiComps/_base/hooks'
import classNames from 'classnames'
import { useEffect } from 'react'

type IndeterminateCheckbox = CompBaseProps & {
  checked?: boolean
  title?: string
  indeterminate?: boolean
  children?: never
  caption?: string | JSX.Element
  labelClassName?: string
  onChange?: (isChecked: boolean) => void
}
const IndeterminateCheckbox = (props: IndeterminateCheckbox) => {
  const { withRootElId } = useComp(props)
  const { caption, title, checked, className, indeterminate = false, onChange, labelClassName } = props

  const fieldCls = classNames(
    'appearance-none flex-none bg-white border border-gray-500 rounded-sm checked:bg-blue-500 checked:bg-check  checked:border-gray-500 indeterminate:bg-gray-300 indeterminate:bg-minus indeterminate:bg-cover focus:outline-none dark:bg-black dark:border-white  h-4 w-4 ring-4 ring-transparent hover:ring-jg-grey-400 '
  )
  const inputContainerClass = classNames(className, 'flex ')
  const labelCls = classNames(
    'inline-block dark:text-white ml-2 text-gray-500 flex-1  text-sm leading-4',
    labelClassName
  )
  useEffect(() => {
    if (indeterminate) {
      const checkbox = document.getElementById(withRootElId('cb'))
      //@ts-ignore
      if (checkbox !== null) checkbox.indeterminate = indeterminate
    }
  }, [indeterminate])
  return (
    <div title={title} className={inputContainerClass}>
      {checked && (
        <input
          className={fieldCls}
          type="checkbox"
          id={withRootElId('cb')}
          checked
          onChange={(e) => {
            onChange?.(e.target.checked)
          }}
        />
      )}
      {!checked && (
        <input
          className={fieldCls}
          type="checkbox"
          id={withRootElId('cb')}
          onChange={(e) => {
            onChange?.(e.target.checked)
          }}
        />
      )}

      <label className={labelCls} htmlFor={withRootElId('cb')}>
        {caption}
      </label>
    </div>
  )
}
export default IndeterminateCheckbox
