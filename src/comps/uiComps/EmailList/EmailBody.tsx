import type { EmailBodyProps } from './Interfaces'

const EmailBody = ({ emailBody }: EmailBodyProps) => {

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: emailBody }} />
    </>
  )
}

export default EmailBody
