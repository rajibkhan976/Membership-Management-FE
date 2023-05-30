import { GenericField } from '@comps/uiComps/forms'
import JGForm from '@comps/uiComps/forms/JG_Form/JGForm'
import { FIELD_TYPE } from '@comps/uiComps/forms/types'
import ReactCountryFlag from 'react-country-flag'
import { countryList } from '@jg/static-data/countryList'
import { BillingDetails } from '../types'
import { useMutation, useQueryClient } from 'react-query'
//import JGFetch from '../../helper/JGFetch'
import { isRequired, isValidEmail } from '@comps/uiComps/forms/form-validation'
import StatusDialog from '../../../../../common/comps/statusdialog/StatusDialog'
import { useState, useRef, useCallback, useReducer, useEffect } from 'react'
import statusReducer, { initState } from '../../helper/statusReducer'
import LoadingSpinner from '@jg/common/comps/loader/LoadingSpinner'
import JGFetch from '@jg/common/dataAPIs'

const countries = countryList.map((item, i) => ({
  id: i,
  name: item.name,
  icon: <ReactCountryFlag countryCode={item.code} svg style={{ width: '1.5em', height: '1.5em' }} />,
}))

const BillingDetailsForm = ({
  merchantId,
  initialValue,
  onComplete,
}: {
  merchantId?: string
  initialValue: BillingDetails
  onComplete: () => void
}) => {
  const {
    FirstName = '',
    LastName = '',
    EmailAddress = '',
    VatTaxRegistrationNo = '',
    Address1 = '',
    Address2 = '',
    County_State = '',
    Country = '',
    Town_City = '',
    PostCode = '',
  } = initialValue

  const [isOpen, setIsOpen] = useState(false)
  const [show, setShow] = useState<boolean>(false)
  const [state, dispatch] = useReducer(statusReducer, '', initState)
  const updatedBillingDetails = useRef<any>(null)
  const countryValue = useRef<any>(null)
  const updateBankDetailsTimeout = useRef<any>(null)

  const handleSetIsOpen = useCallback(
    (status: boolean) => {
      setIsOpen(status)
      if (!status && state?.actionStatus === 'successful' && onComplete) {
        onComplete()
      }
    },
    [state, onComplete]
  )

  const { mutate } = useUpdateBillingDetails(merchantId)

  const handleUpdateBillingDetails = useCallback(() => {
    setShow(true)
    handleSetIsOpen(false)
    updateBankDetailsTimeout.current = setTimeout(() => {
      mutate(
        { ...updatedBillingDetails.current, ...countryValue.current },
        {
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
        }
      )
    }, 500)
  }, [updatedBillingDetails, countryValue])

  useEffect(() => {
    return () => clearTimeout(updateBankDetailsTimeout.current)
  }, [updateBankDetailsTimeout])

  const onSubmit = (value: Record<string, string>) => {
    dispatch({ type: 'initiated', payload: 'initiated' })
    handleSetIsOpen(true)
    const updatedData = { ...initialValue, ...value }
    const SolveForCountryValue = { Country: value.Country || Country }
    updatedBillingDetails.current = Object.keys(updatedData).length > 0 ? updatedData : null
    countryValue.current = SolveForCountryValue
  }

  return (
    <>
      <JGForm onSubmit={onSubmit} className="p-4 space-y-4 w-full">
        <GenericField
          type={FIELD_TYPE.TextField}
          props={{
            placeholder: 'First Name',
            label: 'First Name',
            name: 'FirstName',
            asterisk: true,
            initialValue: FirstName,
          }}
          validation={{
            isRequired: isRequired('This field is required!'),
          }}
        />
        <GenericField
          type={FIELD_TYPE.TextField}
          props={{
            placeholder: 'Last Name',
            label: 'Last Name',
            name: 'LastName',
            asterisk: true,
            initialValue: LastName,
          }}
          validation={{
            isRequired: isRequired('This field is required!'),
          }}
        />
        <GenericField
          type={FIELD_TYPE.TextField}
          props={{
            label: 'Contact Email',
            name: 'EmailAddress',
            placeholder: 'abcdxyz@justgo.com',
            asterisk: true,
            initialValue: EmailAddress,
          }}
          validation={{
            isRequired: isRequired('This field is required!'),
            isValidEmail: isValidEmail('Enter a valid email address'),
          }}
        />
        <GenericField
          type={FIELD_TYPE.TextField}
          props={{
            label: 'Address Line 1',
            placeholder: 'Address Line 1',
            name: 'Address1',
            asterisk: true,
            initialValue: Address1,
          }}
          validation={{
            isRequired: isRequired('This field is required!'),
          }}
        />
        <GenericField
          type={FIELD_TYPE.TextField}
          props={{
            label: 'Address Line 2',
            placeholder: 'Address Line 2',
            name: 'Address2',
            initialValue: Address2,
          }}
        />

        <div className="inline-flex gap-2">
          <GenericField
            type={FIELD_TYPE.TextField}
            props={{
              label: 'City/Town',
              placeholder: 'City/Town',
              name: 'Town_City',
              asterisk: true,
              initialValue: Town_City,
              className: '!mb-0',
            }}
            validation={{
              isRequired: isRequired('This field is required!'),
            }}
          />
          <GenericField
            type={FIELD_TYPE.TextField}
            props={{
              label: 'County',
              placeholder: 'County',
              name: 'County_State',
              initialValue: County_State,
              className: '!mb-0',
            }}
          />
          <GenericField
            type={FIELD_TYPE.TextField}
            props={{
              label: 'Post Code',
              placeholder: 'Post Code',
              name: 'PostCode',
              asterisk: true,
              initialValue: PostCode,
              className: '!mb-0',
            }}
            validation={{
              isRequired: isRequired('This field is required!'),
            }}
          />
        </div>
        <GenericField
          type={FIELD_TYPE.ListBox}
          props={{
            items: countries,
            name: 'Country',
            label: 'Country',
            selected: countries.filter((i) => Country.toLowerCase().includes(i.name.toLowerCase()))[0] || countries[0],
            asterisk: true,
          }}
        />
        <GenericField
          type={FIELD_TYPE.TextField}
          props={{
            label: 'Tax or Vat Registration No.',
            placeholder: 'Tax or Vat Registration No.',
            name: 'VatTaxRegistrationNo',
            asterisk: true,
            initialValue: VatTaxRegistrationNo,
          }}
          validation={{
            isRequired: isRequired('This field is required!'),
          }}
        />
        <input type="submit" id="BillingDetailsForm" className="sr-only" />
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
        handleAction={handleUpdateBillingDetails}
        dialogStatus={state?.actionStatus === 'failed' ? 'error' : 'warning'}
      />
      <LoadingSpinner show={show} message={'Please wait. Loading...'} showCrossBtn={false} />
    </>
  )
}

export default BillingDetailsForm

const useUpdateBillingDetails = (merchantId?: string) => {
  const queryClient = useQueryClient()

  return useMutation(
    (updatedData: BillingDetails) => {
      return JGFetch(
        ['Payment/UpdateBillingDetails'],
        [
          {
            merchantId,
            detail: updatedData,
          },
        ]
      )
    },
    {
      onSuccess: (res) => {
        ;(
          res as {
            IsSuccess: boolean
          }
        ).IsSuccess && queryClient.invalidateQueries(['BillingDetails', merchantId])
      },
      mutationKey: ['stripe-update', 'billing-details'],
    }
  )
}
