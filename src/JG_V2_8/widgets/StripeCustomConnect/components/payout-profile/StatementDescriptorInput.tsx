import { TextInput } from '@comps/uiComps/forms'
import { Pen } from '@comps/uiComps/Icons'
import { useEffect, useState } from 'react'
import SimpleLink from './SimpleLink'

const StatementDescriptorInput = (props: { initialValue: string; onChange: (value: string) => void }) => {
  const { initialValue, onChange } = props
  const [isEditMode, setIsEditMode] = useState(false)
  const [inputValue, setInputValue] = useState<string>(initialValue)
  const [tooltipMessage, setTooltipMessage] = useState('')

  useEffect(() => setInputValue(initialValue), [initialValue])

  const validateAndSet = (value: string) => {
    if (value.match(/[^ A-Za-z_]/g)) {
      return OneSecMessage('No special character is allowed!')
    }
    if (value.match('  ')) return OneSecMessage('Too many space!')
    if (value.trim().length < 4) {
      setInputValue(value)
      return setTooltipMessage('At least 4 characters required')
    }
    if (value.trim().length > 23) {
      return OneSecMessage('No more than 22 characters are allowed')
    }

    setTooltipMessage('')
    setInputValue(value)
  }

  const OneSecMessage = (message: string) => {
    setTooltipMessage(message)
    setTimeout(() => setTooltipMessage(''), 1500)
  }

  return isEditMode ? (
    <div className="flex gap-2 items-center">
      <TextInput
        initialValue={inputValue}
        value={inputValue}
        onValueChange={(value) => validateAndSet(value as string)}
        hideLabel
        labelPosition="left"
        fieldsize="xs"
        className="mb-0 -mt-1 w-80"
        helpText={tooltipMessage}
        status={tooltipMessage ? 'error' : 'success'}
      />
      <button
        onClick={() => {
          initialValue !== inputValue && onChange(inputValue)
          setIsEditMode(false)
        }}
        className={'scale-[175%] -mt-0.5'}
        disabled={inputValue.trim().length < 4 || inputValue.trim().length > 22}
      >
        ✅
      </button>
    </div>
  ) : (
    <div
      onClick={(e) => {
        e.preventDefault()
        setIsEditMode(true)
      }}
    >
      <SimpleLink to="" text={inputValue} className="text-jg-green-500" RightIcon={<Pen className="w-3 h-3" />} />
    </div>
  )
}

export default StatementDescriptorInput
