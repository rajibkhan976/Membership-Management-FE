import { TextField } from '@comps/uiComps'
import React from 'react'
import Calendar from 'react-calendar'
import Floater from '../JGFloater/Floater'
import './CalendarCustomStyle.css'

type OmittedField = 'onChange' | 'onValueChange' | 'type' | 'value' | 'initialValue'

type IDatePickerField = Omit<React.ComponentProps<typeof TextField>, OmittedField> & {
  value?: Date
  format?: Intl.LocalesArgument
  initialDummyString?: string
  onChange?: (v: Date) => void
}

const DatePickerField = (props: IDatePickerField) => {
  const { initialDummyString, value, format, readOnly, onChange, ...rest } = props

  const isControlled = Boolean(value)

  const [show, setShow] = React.useState(false)
  const [referenceElement, setReferenceElement] = React.useState<Element | null>(null)

  const floaterRef = React.useRef<HTMLDivElement>(null)

  const [date, setDate] = React.useState<Date | undefined>(value)

  const handleClickOutside = React.useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (
        referenceElement &&
        e.target &&
        !referenceElement.contains(e.target as Node) &&
        floaterRef.current &&
        !floaterRef.current.contains(e.target as Node)
      ) {
        setShow(false)
      }
    },
    [referenceElement]
  )

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside, true)
    document.addEventListener('touchstart', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true)
      document.removeEventListener('touchstart', handleClickOutside, true)
    }
  }, [handleClickOutside])

  // React.useEffect(() => {
  //   if (value) setDate(value)
  // }, [value])

  // React.useEffect(() => {
  //   date && onChange?.(date)
  // }, [date, onChange])

  const appliedDate = isControlled ? value : date

  return (
    <>
      <TextField
        type="text"
        readOnly
        value={appliedDate?.toLocaleDateString(format) || initialDummyString || new Date().toLocaleDateString(format)}
        onFocus={() => setShow(true)}
        ref={setReferenceElement}
        {...rest}
      />
      <Floater
        referenceElement={referenceElement}
        isVisible={!readOnly && show}
        className="max-w-xs bg-black shadow-lg rounded-sm overflow-hidden z-[99999]"
        ref={floaterRef}
      >
        <Calendar
          next2Label={null}
          prev2Label={null}
          className={'w-full border-0 p-2'}
          onChange={(value: Date) => {
            const hoursDiff = value.getHours() - value.getTimezoneOffset() / 60
            const minutesDiff = (value.getHours() - value.getTimezoneOffset()) % 60
            value.setHours(hoursDiff)
            value.setMinutes(minutesDiff)

            setDate(value)
            setShow(false)
            onChange?.(value)
          }}
          value={appliedDate || new Date()}
        />
      </Floater>
    </>
  )
}

export default DatePickerField
