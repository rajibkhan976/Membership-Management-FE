import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { Switch } from '@headlessui/react'

export type ToggleProps = {
  className?: string
  value?: boolean
  onChange?: (value: boolean) => void
}

export default function Toggle({ value, ...props }: ToggleProps) {
  // const [enabled, setEnabled] = useState(value)

  const { className, onChange } = props

  const btnCls = classNames(
    `${value ? 'bg-jg-green-500 dark:bg-jg-green-800' : 'bg-jg-grey-300 dark:bg-black'} 
    relative inline-flex flex-shrink-0 h-5 w-10 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`,
    className
  )

  const circleCls = classNames(
    `${value ? 'translate-x-5 bg-white' : 'translate-x-0 bg-jg-grey-600'}
     pointer-events-none inline-block h-4 w-4 rounded-full  shadow-lg transform ring-0 transition ease-in-out duration-200`
  )
  return (
    <Switch checked={value} onChange={onChange} className={btnCls}>
      <span className="sr-only"></span>
      <span aria-hidden="true" className={circleCls} />
    </Switch>
  )
}
