import { Button } from '@comps/uiComps'
import { Pen } from '@comps/uiComps/Icons'
import { JGTable, TD, TH, TR } from '@jg/common/comps'
import { useState, useEffect, useCallback, useReducer, useRef } from 'react'
import { useMutation, useIsMutating, useQuery, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'

import BillingDetailsForm from './billing-details-form'
import PaymentDetailsForm from './payment-details-form'
import {
  AccountDetailsInterface,
  BankDetails,
  BillingDetails,
  CardDetails,
  PaymentDetailsRoot,
  PlanCancelQueue,
} from './types'
import Drawer from '@jg/common/comps/drawer/Drawer'
import SkeletonTab from '@jg/common/comps/loader/placeholders/SkeletonTab'
import { useRouter } from '@jg/hooks'
import AppStore from '@jg/store/store'
import StatusDialog from '@jg/common/comps/statusdialog/StatusDialog'
import moment from 'moment'
import statusReducer, { initState } from '../helper/statusReducer'
import LoadingSpinner from '@jg/common/comps/loader/LoadingSpinner'
import JGFetch from '@jg/common/dataAPIs'

const TableDataHeadingClass = '!text-jg-metal-900 w-52 lg:w-72 pl-4'

const BILLING_DRAWER_TITLE = 'Edit Billing Information'
const PAYMENT_DRAWER_TITLE = 'Edit Payment Information'

const useGetPlanCancelQueue = (clubMerchantId: string | undefined) =>
  useQuery(
    ['GetPlanCancelQueue', clubMerchantId],
    () =>
      JGFetch(['Payment/PlanCancelQueue'], [{ merchantId: clubMerchantId }]).then(
        (response: unknown) => response as PlanCancelQueue
      ),
    { refetchOnWindowFocus: false, enabled: !!clubMerchantId, cacheTime: 0 }
  )

const useCancelPlan = () => {
  const { clubMerchantId } = useParams()

  return useMutation(
    async (args: any) => {
      const { MemberDocId, RecurringPlanId } = args
      const cancelResponse = await JGFetch(
        ['Payment/CancelPlan'],
        [
          {
            merchantId: clubMerchantId,
            contactId: MemberDocId,
            planId: RecurringPlanId,
          },
        ]
      )
      return cancelResponse
    },
    {
      onSuccess: (data: any) => {
        console.log(data)
      },
      mutationKey: 'CancelClubPlusPlan',
    }
  )
}

const useRevertPlanCancellation = () => {
  const { clubMerchantId } = useParams()

  return useMutation(
    async (args: any) => {
      const { ContactId, PlanId, RequestBy } = args
      const cancelResponse = await JGFetch(
        ['Payment/RevertPlanCancellation'],
        [
          {
            merchantId: clubMerchantId,
            contactId: ContactId,
            planId: PlanId,
            requestedBy: RequestBy,
          },
        ]
      )
      return cancelResponse
    },
    {
      onSuccess: (data: any) => {
        console.log(data)
      },
      mutationKey: 'RevertCancelClubPlusPlan',
    }
  )
}

const AccountDetails = () => {
  const { clubMerchantId } = useParams()
  const { esc } = useRouter()
  const { BaseAppPath } = AppStore()
  const queryClient = useQueryClient()

  const [open, setOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [show, setShow] = useState<boolean>(false)
  const [drawerTitle, setDrawerTitle] = useState('')
  const [isBankDetails, setIsBankDetails] = useState(true)
  const [state, dispatch] = useReducer(statusReducer, '', initState)
  const confirmCancelPlanDialogTimeout = useRef<any>(null)
  const cancelPlanDialogTimeout = useRef<any>(null)
  const revertPlanCancellationTimeout = useRef<any>(null)

  const { data: accountData } = useFetchingAccountDetails(clubMerchantId)

  const { License, PaymentDate, RecurringCustomerId, SubscriptionAmount, PaymentMethod, MemberDocId, RecurringPlanId } =
    accountData || {}
  SUBSCRIPTION_INFORMATION['Club+ Package'] = License || ''
  SUBSCRIPTION_INFORMATION['Next Payment'] = PaymentDate || ''
  SUBSCRIPTION_INFORMATION['Subscription Fee'] = SubscriptionAmount || ''

  const { data: paymentDetailsRoot, isLoading: isPaymentLoading } = useFetchingPaymentDetails(
    RecurringCustomerId ? +RecurringCustomerId : undefined
  )

  const { PaymentDetails } = paymentDetailsRoot || {}
  const paymentDetailsObj = (PaymentDetails || {})[RecurringCustomerId ? +RecurringCustomerId : 0] || {}

  if (PaymentMethod === 'GoCardless') {
    const { account_type, account_holder_name, account_number_ending, bank_name } =
      (paymentDetailsObj as BankDetails) || {}
    PAYMENT_INFORMATION_BANK['Account Holder Name'] = account_holder_name
    PAYMENT_INFORMATION_BANK['Account No.'] = '**** **** **** **' + account_number_ending || '**'
    PAYMENT_INFORMATION_BANK['Bank Name'] = bank_name
    PAYMENT_INFORMATION_BANK['Payment Type'] = account_type
  } else {
    const { card } = (paymentDetailsObj as CardDetails) || {}
    const { funding, brand, exp_month, exp_year, last4 } = card || {}
    PAYMENT_INFORMATION_CARD['Payment Type'] = funding
    PAYMENT_INFORMATION_CARD['Card Type'] = brand
    PAYMENT_INFORMATION_CARD['Expiry Date'] = `${exp_month || '∞'}/${exp_year || '∞'}`
    PAYMENT_INFORMATION_CARD['Card No.'] = `**** **** **** ${last4 || '****'}`
  }
  const isBankPayment = PaymentMethod === 'GoCardless'

  const { data: billingDetailsData, isLoading: isBillingsLoading } = useFetchingBillingDetails(clubMerchantId)

  // if (billingDetailsData) {
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
  } = billingDetailsData || {}
  BILIING_DETAILS['Contact Name'] = `${FirstName} ${LastName}`
  BILIING_DETAILS['Contact Email'] = EmailAddress
  BILIING_DETAILS['Address'] = [Address1, Address2, Town_City, PostCode, County_State, Country]
    .filter(Boolean)
    .join(', ')
  BILIING_DETAILS['Tax or Vat Registration No.'] = VatTaxRegistrationNo
  // }

  const PAYMENT_INFORMATION = isBankPayment ? PAYMENT_INFORMATION_BANK : PAYMENT_INFORMATION_CARD

  const { data: planCancelQueue } = useGetPlanCancelQueue(clubMerchantId)

  const { mutate: mutateCancelPlan } = useCancelPlan()
  const { mutate: mutateRevertPlanCancellation } = useRevertPlanCancellation()

  const handleToggleCancelPlanDialog = useCallback((status: boolean): void => {
    setIsOpen(status)
    if (status) {
      dispatch({ type: 'initiated', payload: 'initiated' })
    } else {
      dispatch({ type: 'canceled', payload: 'canceled' })
    }
  }, [])

  const handleConfirmCancelPlan = useCallback(() => {
    setIsOpen(false)
    confirmCancelPlanDialogTimeout.current = setTimeout(() => {
      dispatch({ type: 'confirmed', payload: 'confirmed' })
      setIsOpen(true)
    }, 500)
  }, [state])

  const handleRevertPlanCancellation = useCallback(() => {
    if (Array.isArray(planCancelQueue) && planCancelQueue.length > 0) {
      setShow(true)
      revertPlanCancellationTimeout.current = setTimeout(() => {
        mutateRevertPlanCancellation(planCancelQueue[0], {
          onSuccess: () => {
            setShow(false)
            queryClient.invalidateQueries(['GetPlanCancelQueue', clubMerchantId])
          },
          onError: () => {
            setShow(false)
          },
        })
      }, 500)
    }
  }, [planCancelQueue])

  const handleCancelPlan = useCallback(() => {
    setShow(true)
    setIsOpen(false)
    cancelPlanDialogTimeout.current = setTimeout(() => {
      if (accountData && accountData.MemberDocId && accountData.RecurringPlanId) {
        mutateCancelPlan(accountData, {
          onSuccess: () => {
            dispatch({ type: 'successful', payload: 'successful' })
            setShow(false)
            setIsOpen(true)
            queryClient.invalidateQueries(['GetPlanCancelQueue', clubMerchantId])
          },
          onError: () => {
            dispatch({ type: 'failed', payload: 'failed' })
            setShow(false)
            setIsOpen(true)
          },
        })
      }
    }, 500)
  }, [accountData])

  useEffect(() => {
    return () => {
      clearTimeout(confirmCancelPlanDialogTimeout.current)
      clearTimeout(cancelPlanDialogTimeout.current)
      clearTimeout(revertPlanCancellationTimeout.current)
    }
  }, [confirmCancelPlanDialogTimeout, cancelPlanDialogTimeout, revertPlanCancellationTimeout])

  if (isPaymentLoading || isBillingsLoading) {
    return <SkeletonTab contentOnly />
  }

  return (
    <div>
      <div className="p-2 flex justify-between items-center">
        <h3 className="pl-2 font-semibold text-sm leading-4 text-jg-metal-900">Account Details</h3>
        <div className="inline-flex gap-2">
          {Array.isArray(planCancelQueue) && planCancelQueue.length > 0 ? (
            <div className="custom-popover-container relative">
              <Button text="Revert cancellation" fillType="outline" onClick={() => handleRevertPlanCancellation()} />
              <div className="custom-popover absolute top-9 w-96 h-auto bg-jg-grey-50 z-50 rounded-sm p-2 flex-col">
                <p className="text-sm bg-jg-yellow-100 p-2 font-semibold">
                  We can see a plan cancellation request is submitted. Details below :
                </p>
                <div className="flex flex-col w-full p-2">
                  <div className="flex justify-between p-1">
                    <div className="">Cancelled By :</div>
                    <div className="">
                      {Array.isArray(planCancelQueue) &&
                        planCancelQueue[0]?.RequestBy?.substring(0, planCancelQueue[0]?.RequestBy?.indexOf('#'))}
                    </div>
                  </div>
                  <div className="flex justify-between p-1">
                    <div className="">Cancelled Date :</div>
                    <div className="">
                      {Array.isArray(planCancelQueue) && moment(planCancelQueue[0]?.RequestDate)?.format('DD/MM/YYYY')}
                    </div>
                  </div>
                  <div className="flex justify-between p-1">
                    <div className="">Cancellation Effective From :</div>
                    <div className="">{PaymentDate && moment(PaymentDate)?.format('DD/MM/YYYY')}</div>
                  </div>
                </div>
                <p className="text-sm p-2">Do you want to revert your cancellation request?</p>
              </div>
            </div>
          ) : (
            <Button text="Cancel" fillType="outline" onClick={() => handleToggleCancelPlanDialog(true)} />
          )}
          <Button text="Upgrade" onClick={() => esc(`${BaseAppPath}Workbench/ClubPlusUpgrade`)} />
        </div>
      </div>

      <div className="-my-2 overflow-x-auto">
        <div className="inline-block min-w-full py-2">
          <div className="overflow-hidden ring-1 ring-black ring-opacity-5">
            <JGTable>
              <tbody className="divide-y divide-gray-200 bg-white">
                <TR className="bg-jg-grey-50">
                  <TH colSpan={2} scope={'colgroup'} className={'pl-4'}>
                    Subscription Information
                  </TH>
                </TR>
                {Object.keys(SUBSCRIPTION_INFORMATION).map((title) => {
                  return (
                    <TR key={title}>
                      <TD scope="row" className={TableDataHeadingClass}>
                        {title}
                      </TD>
                      <TD>{SUBSCRIPTION_INFORMATION[title as keyof typeof SUBSCRIPTION_INFORMATION]}</TD>
                    </TR>
                  )
                })}
                <TR className="bg-jg-grey-50">
                  <TH colSpan={2} scope={'colgroup'} className={'pl-4'}>
                    <div className="flex itmes-center justify-between">
                      <span>Payment Information</span>
                      <EditButton
                        onClick={() => {
                          setDrawerTitle(PAYMENT_DRAWER_TITLE)
                          setOpen(true)
                        }}
                      />
                    </div>
                  </TH>
                </TR>
                {Object.keys(PAYMENT_INFORMATION).map((title) => {
                  return (
                    <TR key={title}>
                      <TD scope="row" className={TableDataHeadingClass}>
                        {title}
                      </TD>
                      <TD>{PAYMENT_INFORMATION[title as keyof typeof PAYMENT_INFORMATION]}</TD>
                    </TR>
                  )
                })}
                <TR className="bg-jg-grey-50">
                  <TH colSpan={2} scope={'colgroup'} className={'pl-4'}>
                    <div className="flex itmes-center justify-between">
                      <span>Billing Details</span>
                      <EditButton
                        onClick={() => {
                          setDrawerTitle(BILLING_DRAWER_TITLE)
                          setOpen(true)
                        }}
                      />
                    </div>
                  </TH>
                </TR>
                {Object.keys(BILIING_DETAILS).map((title) => {
                  return (
                    <TR key={title}>
                      <TD scope="row" className={TableDataHeadingClass}>
                        {title}
                      </TD>
                      <TD>{BILIING_DETAILS[title as keyof typeof BILIING_DETAILS]}</TD>
                    </TR>
                  )
                })}
              </tbody>
            </JGTable>
          </div>
        </div>
      </div>

      <Drawer
        isOpen={open}
        openDrawer={() => setOpen(true)}
        closeDrawer={() => setOpen(false)}
        title={drawerTitle}
        shouldCloseOnBodyClick
        showCrossButton
        drawerContent={
          drawerTitle === PAYMENT_DRAWER_TITLE ? (
            <PaymentDetailsForm
              isBankDetails={isBankDetails}
              handleSetIsBankDetails={setIsBankDetails}
              onComplete={() => setOpen(false)}
            />
          ) : (
            billingDetailsData && (
              <BillingDetailsForm
                merchantId={clubMerchantId}
                initialValue={billingDetailsData}
                onComplete={() => setOpen(false)}
              />
            )
          )
        }
        drawerAction={
          drawerTitle !== PAYMENT_DRAWER_TITLE || isBankDetails ? (
            <ActionButton
              targetInputId={drawerTitle === BILLING_DRAWER_TITLE ? 'BillingDetailsForm' : 'BankDetailsForm'}
            />
          ) : (
            <></>
          )
        }
        showFrom="Right"
      />
      <StatusDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        titleText={state?.actionStatus !== 'successful' ? 'Plan Cancellation' : 'Success'}
        descriptionText={
          state?.actionStatus === 'initiated'
            ? 'Are you sure you want to cancel your plan?'
            : state?.actionStatus === 'confirmed'
            ? `Your plan is valid till ${moment(PaymentDate).format(
                'DD/MM/YYYY'
              )}. Still do you want to cancel your plan?`
            : state?.actionStatus === 'successful'
            ? 'Your plan has been canceled successfully.'
            : 'Cancelation of your plan has been failed.'
        }
        actionBtnText="Yes"
        closeBtnText={state?.actionStatus !== 'successful' ? 'Cancel' : 'Ok'}
        showDefaultActionBtn={state?.actionStatus !== 'successful'}
        handleAction={
          state?.actionStatus === 'initiated'
            ? handleConfirmCancelPlan
            : state?.actionStatus === 'confirmed'
            ? handleCancelPlan
            : () => {}
        }
        dialogStatus={state?.actionStatus === 'failed' ? 'error' : 'warning'}
      />
      <LoadingSpinner show={show} message={'Please wait. Loading...'} showCrossBtn={false} />
    </div>
  )
}

const useFetchingAccountDetails = (merchantId: string | undefined) =>
  useQuery(
    ['AccountDetails', merchantId],
    () =>
      JGFetch(['Payment/GetAccountDetails'], [{ merchantId }]).then((res: unknown) => res as AccountDetailsInterface),
    { refetchOnWindowFocus: false, refetchOnMount: false, enabled: merchantId ? true : false }
  )

const useFetchingPaymentDetails = (customerId: number | undefined) =>
  useQuery(
    ['PaymentDetails', customerId],
    () =>
      JGFetch(['AzolveCentral/GetExistingCustomerPaymentDetails'], [{ customerIds: [customerId] }]).then(
        (res: unknown) => res as PaymentDetailsRoot
      ),
    { refetchOnWindowFocus: false, refetchOnMount: false, enabled: customerId ? true : false }
  )

const useFetchingBillingDetails = (merchantId: string | undefined) =>
  useQuery(
    ['BillingDetails', merchantId],
    () => JGFetch(['Payment/GetBillingDetails'], [{ merchantId }]).then((res: unknown) => res as BillingDetails),
    { refetchOnWindowFocus: false, refetchOnMount: false, enabled: merchantId ? true : false }
  )

const EditButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <button className={'inline-flex gap-1 items-center text-jg-green-500 cursor-pointer'} onClick={onClick}>
      <Pen className="w-3 h-3" />
      <span className="whitespace-nowrap font-medium text-[13px] leading-4">{'Edit'}</span>
    </button>
  )
}

const ActionButton = ({ targetInputId }: { targetInputId: string }) => {
  const isMutating = useIsMutating(['stripe-update'])

  return (
    <div className="p-2 absolute bottom-10 right-0">
      {/* @ts-ignore */}
      <Button as="label" htmlFor={targetInputId} text={'Update'} disabled={Boolean(isMutating)} />
    </div>
  )
}

const SUBSCRIPTION_INFORMATION = {
  'Club+ Package': 'JustGo Essentials',
  'Next Payment': '21 Jan, 2023',
  'Subscription Fee': 'N/A',
}
const PAYMENT_INFORMATION_BANK = {
  'Payment Type': 'Direct Debit',
  'Account Holder Name': 'BRCMAC',
  'Bank Name': 'HSBC UK Bank PLC',
  'Account No.': '**** **** **** **93',
}
const PAYMENT_INFORMATION_CARD = {
  'Payment Type': 'Credit or Debit Card',
  'Card Type': 'Master Card',
  'Expiry Date': '02/2025',
  'Card No.': '**** **** **** 3893',
}
const BILIING_DETAILS = {
  'Contact Name': '',
  'Contact Email': '',
  Address: '',
  'Tax or Vat Registration No.': '',
}

export default AccountDetails
