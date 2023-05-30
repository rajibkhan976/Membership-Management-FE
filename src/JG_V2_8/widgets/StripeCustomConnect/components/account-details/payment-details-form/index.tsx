import { RadioSwitch } from '@jg/common/comps'
import BankDetailsForm from './BankDetailsForm'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CardDetailsForm from './CardDetailsForm'
import { useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from 'react-query'
import { AccountDetailsInterface } from '../types'
import JGFetch from '@jg/common/dataAPIs'

const useGetPublishableKey = (recurringCustomerId: string | null) =>
  useQuery(
    ['PublishableKey', recurringCustomerId],
    () =>
      JGFetch(
        ['GoMembership/ResolvePlatformPublishableKey'],
        [{ entityId: recurringCustomerId, selectionEntity: 'recurringcustomer', platform: 'central' }]
      ).then((response: unknown) => response),
    { refetchOnWindowFocus: false, refetchOnMount: false }
  )

type PaymentDetailsFormProps = {
  isBankDetails: boolean
  handleSetIsBankDetails: (status: boolean) => void
  onComplete?: () => void
}

const PaymentDetailsForm = (props: PaymentDetailsFormProps) => {
  const { isBankDetails, handleSetIsBankDetails, onComplete } = props
  const { clubMerchantId } = useParams()
  const queryClient = useQueryClient()

  const accountDetails = queryClient.getQueryData(['AccountDetails', clubMerchantId]) as AccountDetailsInterface
  const { RecurringCustomerId } = accountDetails

  const { data: publishableKey } = useGetPublishableKey(RecurringCustomerId)

  const stripePromise = loadStripe(publishableKey as string)

  const onSwitch = useCallback(
    (value: string) => (value === 'Bank' ? handleSetIsBankDetails(true) : handleSetIsBankDetails(false)),
    []
  )

  return (
    <div className="p-4 space-y-6 w-full">
      <div className="space-y-1">
        <label className="inline-block text-jg-metal-900 font-medium dark:text-white text-sm">
          Beneficiary Type<span className="text-jg-red-500">*</span>
        </label>
        <RadioSwitch
          options={[
            { name: 'Bank', value: 'Bank' },
            { name: 'Card', value: 'Card' },
          ]}
          curSelection={'Bank'}
          onSwitch={onSwitch}
        />
      </div>
      {isBankDetails ? (
        <BankDetailsForm onComplete={onComplete} />
      ) : (
        <Elements stripe={stripePromise}>
          <CardDetailsForm onComplete={onComplete} />
        </Elements>
      )}
    </div>
  )
}

export default PaymentDetailsForm
