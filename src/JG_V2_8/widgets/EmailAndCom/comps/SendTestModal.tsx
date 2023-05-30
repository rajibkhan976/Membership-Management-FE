import { Button, TextField } from '@comps/uiComps'
import { EmailStatus } from '@comps/uiComps/EmailList/status.enum'
import { useState } from 'react'
import { SendTestModalProps } from '../interfaces/interfaces'

const SendTestModal = ({ changeTestSendStatus, changeTestRecipient, handleSubmit }: SendTestModalProps) => {
  enum ErrorTypes {
    NO_ERROR = 0,
    NO_INPUT = 1,
    INVALID = 2,
  }
  const [error, setError] = useState<number>(ErrorTypes.NO_INPUT)
  const handleEmailField = (input: any) => {
    // const newValue = e.target.value
    if (input) {
      if (input.toLocaleLowerCase().match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)) {
        changeTestSendStatus(true)
        changeTestRecipient(input)
        setError(ErrorTypes.NO_ERROR)
      } else {
        changeTestSendStatus(false)
        setError(ErrorTypes.INVALID)
      }
    } else {
      changeTestSendStatus(false)
      changeTestRecipient(null)
      setError(ErrorTypes.NO_INPUT)
    }
  }
  console.log('error', error)
  return (
    <div className="h-[190px] w-[356px] mt-auto">
      <TextField
        fieldsize="lg"
        id="send test"
        label="Receiver email address"
        asterisk={true}
        labelPosition="top"
        onValueChange={(input) => handleEmailField(input)}
        placeholder="Reciever email"
        type="text"
      />
      <div>{error === ErrorTypes.INVALID && <p className="text-jg-red-500">Invalid email address</p>}</div>
      <Button
        className={error === ErrorTypes.NO_ERROR ? `cursor-pointer` : `cursor-not-allowed`}
        text="Send"
        fillType="solid"
        disabled={error === ErrorTypes.NO_ERROR ? false : true}
        onClick={() => handleSubmit(EmailStatus.DRAFTS)}
      ></Button>
    </div>
  )
}

export default SendTestModal
