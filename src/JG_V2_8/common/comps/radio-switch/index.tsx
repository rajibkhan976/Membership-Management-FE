import classNames from 'classnames'
import { useState } from 'react'

interface RadioSwitchProps<V extends string> {
  options: { name: string; value: V }[]
  curSelection: V
  onSwitch?: (v: V) => void
  wrapperClass?: string
  buttonClass?: string
  activeButtonBgClass?: string
}

// Had some fun with typescript generics 😉
const RadioSwitch = <V extends string>(props: RadioSwitchProps<V>) => {
  const { options, curSelection, onSwitch = (v) => v, wrapperClass, buttonClass, activeButtonBgClass } = props
  const [value, setValue] = useState(curSelection || options[0].value)

  return (
    <div className={classNames("bg-jg-grey-100 rounded-sm overflow-hidden text-jg-metal-700 w-max", wrapperClass)}>
      {options.map((opt, i) => {
        return (
          <button
            key={i}
            className={classNames(
              'inline-flex px-4 py-2 select-none text-[13px] leading-4 font-medium ',
              value.toLowerCase() === opt.value.toLowerCase() ? `inline-flex ${activeButtonBgClass ? activeButtonBgClass:'bg-jg-green-500' } text-white` : '',
              buttonClass
            )}
            onClick={() => {
              onSwitch(opt.value)
              setValue(opt.value)
            }}
          >
            {opt.name}
          </button>
        )
      })}
    </div>
  )
}

export default RadioSwitch


// className={classNames(
//   'inline-flex px-4 py-2 select-none text-[13px] leading-4 font-medium ',
//   i === 0 ? "!bg-jg-green-800 text-white font-bold inline-flex" : i === 1 ? "!bg-jg-blue-500 !text-white font-bold inline-flex" : i === 2 ? "!bg-jg-green-800 text-white font-bold inline-flex" : "!bg-jg-violet-700 text-white font-bold inline-flex"
//   // value.toLowerCase() === opt.value.toLowerCase() ? 'inline-flex bg-jg-green-500 text-white' : ''
// )}