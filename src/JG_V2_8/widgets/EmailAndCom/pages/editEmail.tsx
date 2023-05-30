import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import EmailCompose from '../components/core/EmailCompose'
import { useEmailDetails } from '../store/EmailStore'
import SpinerLoader from '../components/spinerLoader'

const EditEmail = () => {
  const { emailId } = useParams()
  const emailDetails = useEmailDetails(({ emailDetails }) => emailDetails)
  const fetchDetails = useEmailDetails(({ fetch }) => fetch)
  const isLoading = useEmailDetails(({ isLoading }) => isLoading)

  useEffect(() => {
    emailId && fetchDetails(+emailId)
  }, [emailId])

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center">
          <SpinerLoader classes="w-12 h-12 border-4 border-dotted border-current" />
        </div>
      ) : (
        <>{emailDetails && <EmailCompose Title={'Edit an Email'} emailDetails={emailDetails} />}</>
      )}
    </>
  )
}

export default EditEmail
