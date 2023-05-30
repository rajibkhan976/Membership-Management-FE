import { useState } from 'react'
import Modal from './Modal'
import { TextField, Button } from '..'

function ModalTest({ ...args }) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const openModal = () => {
    setIsOpen(true)
  }

  const handleSubmit = (event: any) => {
    const name = event.target[0]
    alert(`A name was submitted: ${name.value}`)

    event.preventDefault()
    setIsOpen(false)
  }

  return (
    <>
      <Modal {...args} isOpen={isOpen} setIsOpen={setIsOpen} isConfirmBtn={false} title="Submit Form">
        {/* <p>Hello test</p> */}
        <form onSubmit={handleSubmit}>
          <TextField label="Your Name" value="mehedi" type="text" fieldsize="md" labelPosition="top" labelWidth={120} />
          <div className="flex">
            <Button
              text="Send"
              btnSize="sm"
              btnColor="success"
              fillType="solid"
              rounded
              // type="submit"
            />
            <Button
              text="Cancel"
              btnSize="sm"
              btnColor="error"
              fillType="solid"
              rounded
              // type='button'
              className="ml-1"
            />
          </div>
        </form>
      </Modal>
      <button
        onClick={openModal}
        className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        Open Dialog
      </button>
    </>
  )
}

export default ModalTest
