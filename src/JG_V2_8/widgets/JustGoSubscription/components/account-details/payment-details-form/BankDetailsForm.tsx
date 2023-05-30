import { GenericField } from '@comps/uiComps/forms'
import { isRequired } from '@comps/uiComps/forms/form-validation'
import JGForm from '@comps/uiComps/forms/JG_Form/JGForm'
import { FIELD_TYPE } from '@comps/uiComps/forms/types'
import { gcCountryList } from '@jg/static-data/countryList'
import { useState, useRef, useCallback, useReducer } from 'react'
import ReactCountryFlag from 'react-country-flag'
import { useMutation, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'

import { AccountDetailsInterface, BankDetails, LegacyQueryResponse, PaymentDetailsRoot } from '../types'
import StatusDialog from '@jg/common/comps/statusdialog/StatusDialog'
import statusReducer, { initState } from '../../helper/statusReducer'
import LoadingSpinner from '@jg/common/comps/loader/LoadingSpinner'
import JGFetch from '@jg/common/dataAPIs'

const countries = gcCountryList.map((item, i) => ({
  id: i,
  name: item.name,
  icon: <ReactCountryFlag countryCode={item.code} svg style={{ width: '1.5em', height: '1.5em' }} />,
}))

const BankDetailsForm = ({ onComplete }: { onComplete?: () => void }) => {
  const [isLocalDetails, setIsLocalDetails] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [show, setShow] = useState<boolean>(false)
  const updatedBankDetails = useRef<any>(null)
  const [state, dispatch] = useReducer(statusReducer, '', initState)

  const { clubMerchantId } = useParams()
  const queryClient = useQueryClient()
  const accountDetails = queryClient.getQueryData(['AccountDetails', clubMerchantId]) as AccountDetailsInterface
  const customerId = +(accountDetails.RecurringCustomerId || 0)

  const paymentDetails = (queryClient.getQueryData(['PaymentDetails', customerId]) as PaymentDetailsRoot) || {}
  const { PaymentDetails } = paymentDetails || {}
  const { account_holder_name, country_code } = PaymentDetails
    ? (PaymentDetails[customerId] as BankDetails)
    : ({} as BankDetails)

  const { mutate } = useUpdateGCPaymentInfo()

  const handleSetIsOpen = useCallback(
    (status: boolean) => {
      setIsOpen(status)
      if (!status && state?.actionStatus === 'successful' && onComplete) {
        onComplete()
      }
    },
    [state, onComplete]
  )

  const handleUpdateBankDetails = useCallback(() => {
    setShow(true)
    handleSetIsOpen(false)
    mutate(updatedBankDetails.current, {
      onSuccess: () => {
        dispatch({ type: 'successful', payload: 'successful' })
        setShow(false)
        handleSetIsOpen(true)
      },
      onError: (err) => {
        dispatch({ type: 'failed', payload: 'failed' })
        setShow(false)
        handleSetIsOpen(true)
      },
    })
  }, [updatedBankDetails])

  const onSubmit = (value: Partial<BankUpdateFormData>) => {
    dispatch({ type: 'initiated', payload: 'initiated' })
    setIsOpen(true)

    const parseCountryCode = gcCountryList.filter((i) => i.name === value.CountryCode)[0]?.code || country_code
    const updatedBankValue = {
      ...value,
      CountryCode: parseCountryCode,
    }
    console.log(updatedBankValue)
    updatedBankDetails.current = updatedBankValue
  }

  return (
    <>
      <JGForm onSubmit={onSubmit}>
        <GenericField
          type={FIELD_TYPE.ListBox}
          props={{
            name: 'CountryCode',
            items: countries,
            selected: gcCountryList.filter(({ code }) => code === country_code)[0] || gcCountryList[0],
            label: 'Country',
            asterisk: true,
          }}
        />

        <GenericField
          type={FIELD_TYPE.TextField}
          props={{
            name: 'AccountHolderName',
            label: 'Account Holder Name',
            placeholder: 'Account Holder Name',
            initialValue: account_holder_name,
            asterisk: true,
          }}
          validation={{
            isRequired: isRequired('This field is required!'),
          }}
        />

        {isLocalDetails ? (
          <>
            <GenericField
              type={FIELD_TYPE.TextField}
              props={{
                name: 'AccountNumber',
                label: 'Account No.',
                placeholder: 'e.g. 1234 5678 9012 3493',
                asterisk: true,
              }}
              validation={{
                isRequired: isRequired('This field is required!'),
              }}
            />
            <GenericField
              type={FIELD_TYPE.TextField}
              props={{ name: 'SortCode', label: 'Sort Code', placeholder: 'eg: 40-40-21', asterisk: true }}
              validation={{
                isRequired: isRequired('This field is required!'),
              }}
            />
          </>
        ) : (
          <GenericField
            type={FIELD_TYPE.TextField}
            props={{ name: 'IBAN', label: 'IBAN', placeholder: 'e.g. 1234 5678 9012 3493', asterisk: true }}
            validation={{
              isRequired: isRequired('This field is required!'),
            }}
          />
        )}

        <div className="text-sm font-medium leading-4">
          or{' '}
          <span className="text-jg-green-500 cursor-pointer " onClick={() => setIsLocalDetails((cur) => !cur)}>
            {isLocalDetails ? 'Enter IBAN' : 'Enter Local Details'}
          </span>
        </div>
        <input type="submit" id="BankDetailsForm" className="sr-only" />
      </JGForm>
      <StatusDialog
        isOpen={isOpen}
        setIsOpen={handleSetIsOpen}
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
        showDefaultActionBtn={state?.actionStatus !== 'successful' && state?.actionStatus !== 'failed'}
        actionBtnText="Yes"
        closeBtnText={state?.actionStatus === 'successful' || state?.actionStatus === 'failed' ? 'OK' : 'No'}
        handleAction={handleUpdateBankDetails}
        dialogStatus={state?.actionStatus === 'failed' ? 'error' : 'warning'}
      />
      <LoadingSpinner show={show} message={'Please wait. Loading...'} showCrossBtn={false} />
    </>
  )
}

export default BankDetailsForm

const useUpdateGCPaymentInfo = () => {
  const queryClient = useQueryClient()

  const { clubMerchantId } = useParams()
  const accountDetails = queryClient.getQueryData(['AccountDetails', clubMerchantId]) as AccountDetailsInterface

  const {
    CustomerId: customerId,
    ProductId: productId,
    FirstName,
    LastName,
    UserId: userId,
    EmailAddress,
  } = accountDetails
  return useMutation(
    async (updatedData: unknown) => {
      const currentBankInfo = (await JGFetch(
        ['AzolveCentral/VerifyBankAccount'],
        [{ productId, bankAccount: updatedData }]
      )) as LegacyQueryResponse
      console.log('CurrentBankInfo', currentBankInfo)

      if (!currentBankInfo.IsSucess) {
        if (currentBankInfo.Message.toLowerCase().includes('invalid')) {
          throw new Error(currentBankInfo.Message)
        }

        throw new Error('There is an error!')
      }
      const customer = {
        GivenName: FirstName,
        FamilyName: LastName,
        EmailAddress: EmailAddress,
      }
      const mandate = await JGFetch(
        ['AzolveCentral/CreateMandate'],
        [{ userId, customer, bankAccount: updatedData, productId }]
      )
      console.log('Mandate', mandate)
      const successCustomerId = await JGFetch(
        ['AzolveCentral/CreateGCRecurringPaymentCustomer'],
        [{ userId, customerId, mandate }]
      )
      console.log(successCustomerId)
      return successCustomerId
    },
    {
      onSuccess: (res) => {
        if (res) {
          queryClient.invalidateQueries(['PaymentDetails', res])
          queryClient.invalidateQueries(['AccountDetails', clubMerchantId])
        }
      },
      mutationKey: ['stripe-update', 'bank-details'],
    }
  )
}

type BankUpdateFormData = {
  AccountHolderName: string
  SortCode?: string
  AccountNumber?: string
  IBAN?: string
  CountryCode: string
  Scheme?: string
  AccountType?: string
}
