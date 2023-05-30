import { Switch } from '@headlessui/react'

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

type ToggleButtonProps = {
  label?: string
  enabled?: boolean
  handleChange?: (enabled?: boolean) => void
}

function ToggleButton(props: ToggleButtonProps) {
  const { label, enabled = false, handleChange } = props

  const setOnChange = (): void => {
    handleChange && handleChange(enabled)
  }

  return (
    <Switch.Group as="div" className="flex items-center justify-between ">
      <span className="flex-grow flex flex-col">
        <Switch.Label as="span" className="text-sm font-extrabold text-gray-600" passive>
          {label}
        </Switch.Label>
      </span>
      <Switch
        checked={enabled}
        onChange={setOnChange}
        className={classNames(
          enabled ? 'bg-jg-green-500' : 'bg-gray-200',
          'relative inline-flex flex-shrink-0 h-5 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-jg-green-500'
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? 'translate-x-6' : 'translate-x-0',
            'pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
          )}
        />
      </Switch>
    </Switch.Group>
  )
}

export default ToggleButton
