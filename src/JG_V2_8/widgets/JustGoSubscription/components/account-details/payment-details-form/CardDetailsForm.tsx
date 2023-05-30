import { useState, useReducer, useCallback } from 'react'
import { CardNumberElement, CardCvcElement, CardExpiryElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { logEvent } from '../../helper/util'
import { useMutation, useQueryClient, useIsMutating } from 'react-query'
import { useParams } from 'react-router-dom'
import { AccountDetailsInterface } from '../types'
import { BillingDetails } from '../types'
import StatusDialog from '@jg/common/comps/statusdialog/StatusDialog'
import statusReducer, { initState } from '../../helper/statusReducer'
import classNames from 'classnames'
import LoadingSpinner from '@jg/common/comps/loader/LoadingSpinner'
import JGFetch from '@jg/common/dataAPIs'

const styleObj = {
  base: {
    fontSize: '18px',
    color: '#424770',
    letterSpacing: '0.025em',
    '::placeholder': {
      color: '#aab7c4',
      fontSize: '1rem',
    },
  },
  invalid: {
    color: '#9e2146',
  },
}

const CARD_NUMBER_ELEMENT_OPTIONS = {
  style: styleObj,
  showIcon: true,
  placeholder: 'eg: 1234 1234 1234 1234',
}

const CARD_EXPIRY_ELEMENT_OPTIONS = {
  style: styleObj,
  placeholder: 'MM/YY',
}

const CARD_CVC_ELEMENT_OPTIONS = {
  style: styleObj,
  placeholder: 'eg: 023',
}

const useUpdateCardDetails = () => {
  const { clubMerchantId } = useParams()
  const queryClient = useQueryClient()

  const accountDetails = queryClient.getQueryData(['AccountDetails', clubMerchantId]) as AccountDetailsInterface
  const { UserId, CustomerId, RecurringCustomerId } = accountDetails

  return useMutation(
    async (paymentMethodId: string) => {
      const recurringCustomerId = await JGFetch(
        ['AzolveCentral/CreateStripeRecurringPaymentCustomer'],
        [{ userId: UserId, customerId: CustomerId || 0, paymentMethodId: paymentMethodId }]
      )

      const paymentResponse = await JGFetch(
        ['AzolveCentral/SetupPaymentIntentForFutureUseIfApplicable'],
        [{ mode: '', customerId: recurringCustomerId, paymentMethodOrIntentId: paymentMethodId }]
      )

      return paymentResponse
    },
    {
      onSuccess: (response) => {
        if (response) {
          queryClient.invalidateQueries(['AccountDetails', clubMerchantId])
          queryClient.invalidateQueries(['PaymentDetails', CustomerId])
        }
      },
      mutationKey: ['UpdateCardDetails'],
    }
  )
}

const CardDetailsForm = ({ onComplete }: { onComplete?: () => void }) => {
  const { clubMerchantId } = useParams()
  const queryClient = useQueryClient()
  const isMutatingCardDetails = useIsMutating(['UpdateCardDetails'])

  const billingDetails = queryClient.getQueryData(['BillingDetails', clubMerchantId]) as BillingDetails
  const { EmailAddress } = billingDetails ?? ''

  const elements = useElements()
  const stripe = useStripe()

  const [name, setName] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [paymentMethodId, setPaymentMethodId] = useState<string>('')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [show, setShow] = useState<boolean>(false)
  const [state, dispatch] = useReducer(statusReducer, '', initState)

  const { mutate } = useUpdateCardDetails()

  const handleSetIsOpen = useCallback(
    (status: boolean) => {
      setIsOpen(status)
      if (state && state.actionStatus === 'successful' && onComplete) {
        onComplete()
      }
    },
    [state]
  )

  const handleUpdateCardDetails = useCallback(() => {
    handleSetIsOpen(false)
    setShow(true)
    mutate(paymentMethodId, {
      onSuccess: () => {
        dispatch({ type: 'successful', payload: 'successful' })
        setShow(false)
        handleSetIsOpen(true)
      },
      onError: () => {
        dispatch({ type: 'failed', payload: 'failed' })
        setShow(false)
        handleSetIsOpen(true)
      },
    })
  }, [paymentMethodId])

  let cardExpiryField: any = null

  const handleCardExpiryOnReady = useCallback((event: any) => {
    cardExpiryField = event
  }, [])

  const handleCardNumberOnChange = useCallback((event: any) => {
    if (event.complete) {
      cardExpiryField?.focus()
    }
  }, [])

  let cardCvcField: any = null

  const handleCardCvcOnReady = useCallback((event: any) => {
    cardCvcField = event
  }, [])

  const handleCardExpiryOnChange = useCallback((event: any) => {
    if (event.complete) {
      cardCvcField?.focus()
    }
  }, [])

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return
    }

    const card = elements.getElement(CardNumberElement)

    if (card === null) {
      return
    }

    const payload = await stripe.createPaymentMethod({
      type: 'card',
      card,
      billing_details: {
        name: name,
        email: EmailAddress,
      },
    })

    if (payload.error) {
      console.log('[error]', payload.error)
      setErrorMessage(payload.error.message ?? '')
      setPaymentMethodId('')
      dispatch({ type: 'failed', payload: 'failed' })
      handleSetIsOpen(true)
    } else {
      console.log('[PaymentMethod]', payload.paymentMethod)
      setPaymentMethodId(payload.paymentMethod.id)
      setErrorMessage('')
      dispatch({ type: 'initiated', payload: 'initiated' })
      handleSetIsOpen(true)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 dark:text-white">
          Card No.&nbsp;<span className="text-jg-red-500">*</span>
        </label>
        <CardNumberElement
          id="cardNumber"
          className="block border rounded-sm w-full pl-2 py-1 mt-1"
          onBlur={() => logEvent('blur')}
          onChange={(event) => handleCardNumberOnChange(event)}
          onFocus={() => logEvent('focus')}
          onReady={(event) => event.focus()}
          options={CARD_NUMBER_ELEMENT_OPTIONS}
        />
        <div className="flex justify-between mt-3">
          <div className="w-[50%] flex flex-col">
            <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 dark:text-white">
              Valid Thru&nbsp;<span className="text-jg-red-500">*</span>
            </label>
            <CardExpiryElement
              id="expiry"
              className="block border rounded-sm w-full pl-2 py-1 mt-1"
              onBlur={() => logEvent('blur')}
              onChange={(event) => handleCardExpiryOnChange(event)}
              onFocus={() => logEvent('focus')}
              onReady={(event) => handleCardExpiryOnReady(event)}
              options={CARD_EXPIRY_ELEMENT_OPTIONS}
            />
          </div>
          <div className="w-[45%] flex flex-col">
            <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 dark:text-white">
              CVC&nbsp;<span className="text-jg-red-500">*</span>
            </label>
            <CardCvcElement
              id="cvc"
              className="block border rounded-sm w-full pl-2 py-1 mt-1"
              onBlur={() => logEvent('blur')}
              onChange={() => logEvent('change')}
              onFocus={() => logEvent('focus')}
              onReady={(event) => handleCardCvcOnReady(event)}
              options={CARD_CVC_ELEMENT_OPTIONS}
            />
          </div>
        </div>
        <label htmlFor="name" className="block mt-3 text-sm font-medium text-gray-700 dark:text-white">
          Name on Card&nbsp;<span className="text-jg-red-500">*</span>
        </label>
        <input
          id="name"
          className="block border rounded-sm w-full pl-2 py-1 mt-1 outline-white custom-placeholder"
          type={'text'}
          required
          placeholder="Write name on card"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
          }}
          autoComplete="off"
        />
        {/* {errorMessage && <ErrorResult>{errorMessage}</ErrorResult>}
      {paymentMethod && <Result>Got PaymentMethod: {paymentMethod.id}</Result>} */}
        <div className="absolute bottom-12 right-2">
          <input
            className={classNames(
              'mt-6 rounded-sm px-4 py-1.5 font-semibold text-sm cursor-pointer',
              !stripe || Boolean(isMutatingCardDetails) ? 'jg-btn-disabled' : 'jg-btn-solid-primary'
            )}
            type="submit"
            value={'Update'}
            disabled={!stripe || Boolean(isMutatingCardDetails)}
          />
        </div>
      </form>
      <StatusDialog
        isOpen={isOpen}
        setIsOpen={handleSetIsOpen}
        handleAction={handleUpdateCardDetails}
        titleText={
          state?.actionStatus === 'initiated'
            ? 'Confirmation'
            : state?.actionStatus === 'successful'
            ? 'Success'
            : 'Error'
        }
        descriptionText={
          state?.actionStatus === 'initiated'
            ? 'Are you sure?'
            : state?.actionStatus === 'successful'
            ? 'Payment details successfully updated.'
            : 'Payment details update failed.'
        }
        actionBtnText={'Yes'}
        dialogStatus={state?.actionStatus === 'failed' ? 'error' : 'warning'}
        closeBtnText={state?.actionStatus === 'initiated' ? 'No' : 'Ok'}
        showDefaultActionBtn={state?.actionStatus === 'initiated'}
      />
      <LoadingSpinner show={show} message={'Please wait. Loading...'} showCrossBtn={false} />
    </>
  )
}

export default CardDetailsForm
