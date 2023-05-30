import Toggle from '@comps/uiComps/Toggle/Toggle'
import { useEffect, useState } from 'react'

type SingleAccordionWithToggleProps = {
  opened?: boolean
  title: string
  options: SingleAccordionItemProps[]
  onChange?: (items: SingleAccordionItemProps[]) => void
}

export type SingleAccordionItemProps = {
  id: string | number
  selected?: boolean
  text: string
  subText?: string
  count?: number
}

const SingleAccordionWithToggle = (props: SingleAccordionWithToggleProps) => {
  const { opened = false, title, options, onChange } = props
  const [open, setOpen] = useState(opened)
  // const [optionsState, setOptions] = useState<typeof options>(options)

  useEffect(() => {
    options.every((v) => v.selected) && setOpen(true)
  }, [options])
  useEffect(() => {
    setOpen(opened)
  }, [opened])

  return (
    <div>
      <div className="w-full flex gap-1 items-center p-4 pb-2 overflow-hidden text-jg-metal-700 font-semibold text-globalTextSizeSm">
        <div onClick={() => setOpen((c) => !c)}>
          <SingleArrowIcon className={`w-3 h-3 ${open ? '' : 'rotate-180'}`} />
        </div>
        <div className="font-semibold flex-grow">{title}</div>
        <div className=" z-10">
          {options.length > 0 && (
            <Toggle
              value={options.every((v) => v.selected)}
              onChange={(value) => {
                onChange?.(options.map((op) => ({ ...op, selected: value })))
              }}
            />
          )}
        </div>
      </div>
      {open && (
        <div className="">
          {options.map((item) => (
            <div
              className="my-2 mx-4 relative flex items-start font-medium text-jg-metal-500 text-globalTextSizeSm"
              key={item.id}
            >
              <div className="flex h-5 items-center">
                <input
                  type="checkbox"
                  id={String(item.id)}
                  checked={!!item.selected}
                  className="h-4 w-4"
                  onChange={(e) => onChange?.([{ ...item, selected: e.target.checked }])}
                />
              </div>

              <div className="ml-3 flex-grow">
                <label htmlFor={String(item.id)} className="mb-1">
                  {item.text}
                </label>
                {item.subText && <p className="text-jg-metal-300 font-normal">{item.subText}</p>}
              </div>

              {item.count && <span>({item.count})</span>}
            </div>
          ))}
          {options.length === 0 && (
            <div className="text-jg-metal-400 text-center mx-4 my-2">No Organizations or Sellers</div>
          )}
        </div>
      )}
    </div>
  )
}

export default SingleAccordionWithToggle

const SingleArrowIcon = (props: Partial<React.ComponentProps<'svg'>>) => {
  return (
    <svg width="8" height="4" viewBox="0 0 8 4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M0.666992 3.66683L4.00033 0.333496L7.33366 3.66683H0.666992Z" fill="currentColor" />
    </svg>
  )
}
