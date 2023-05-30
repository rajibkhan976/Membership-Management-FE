import { Button } from '@comps/uiComps'
import useStripeCustomConnectStore from '../store/useStripeCustomConnectStore'
import { StripeCustomConnectStore } from '../store/useStripeCustomConnectStore'
import { useParams } from 'react-router-dom'
import { StripeAccountLink } from '../interfaces/StripeAccountLinkInterface'
import { useRouter } from '@jg/hooks'
import StatusDialog from '../../../common/comps/statusdialog/StatusDialog'
import { useState, useRef, useCallback } from 'react'
import { QueryClient, QueryClientProvider, useQuery, useMutation } from 'react-query'
import JGFetch from '@jg/common/dataAPIs'

interface DeleteStripeAccountResponse {
  IsDelete: boolean
}

const queryClient = new QueryClient()

const useGetStripeAccountLink = (clubMerchantId: string | undefined) =>
  useQuery(
    ['GetStripeAccountLink', clubMerchantId],
    () =>
      JGFetch(['Payment/GetAccountLink'], [{ merchantId: clubMerchantId }]).then(
        (response: unknown) => response as StripeAccountLink
      ),
    { refetchOnWindowFocus: false, enabled: !!clubMerchantId, cacheTime: 0 }
  )

const useDeleteStripeAccount = () => {
  return useMutation(async (clubMerchantId: string) => {
    const deleteStripeAccount =
      clubMerchantId &&
      ((await JGFetch(
        ['Payment/DeleteStripeAccount'],
        [{ merchantId: clubMerchantId }]
      )) as DeleteStripeAccountResponse)

    return deleteStripeAccount
  })
}

const UpdatePaymentProfile = () => {
  const { hasStripeAccount, isSessionUserAdminOfClub, stripeAccountInfo, setStripeAccountInfo, setHasStripeAccount } =
    useStripeCustomConnectStore((state: StripeCustomConnectStore) => state)
  const { clubMerchantId } = useParams()
  const { esc } = useRouter()
  const accountResetFlag = useRef<boolean>(false)

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { details_submitted } = stripeAccountInfo

  const handleSetIsOpen = useCallback((status: boolean) => {
    setIsOpen(status)
    setTimeout(() => {
      if (!status && accountResetFlag.current) {
        accountResetFlag.current = false
      }
    }, 500)
  }, [])

  const { data: stripeAccountLinkObj } = useGetStripeAccountLink(clubMerchantId)

  const getStripeAccountLink = useCallback(() => {
    if (
      clubMerchantId &&
      isSessionUserAdminOfClub &&
      isSessionUserAdminOfClub.IsAdmin &&
      stripeAccountLinkObj &&
      stripeAccountLinkObj.url
    ) {
      esc(stripeAccountLinkObj?.url)
    } else {
      handleSetIsOpen(true)
    }
  }, [clubMerchantId, isSessionUserAdminOfClub, stripeAccountLinkObj])

  const { mutate } = useDeleteStripeAccount()

  const handleAccountResetFlag = useCallback(
    (status: boolean): void => {
      if (isSessionUserAdminOfClub && isSessionUserAdminOfClub.IsAdmin) {
        accountResetFlag.current = status
        handleSetIsOpen(status)
      } else {
        handleSetIsOpen(status)
      }
    },
    [isSessionUserAdminOfClub]
  )

  const handleDeleteStripeAccount: any = useCallback(
    (status: boolean, clubMerchantId: string | undefined): void => {
      if (clubMerchantId && isSessionUserAdminOfClub && isSessionUserAdminOfClub.IsAdmin) {
        mutate(clubMerchantId, {
          onSuccess: () => {
            accountResetFlag.current = status
            handleSetIsOpen(status)
            setStripeAccountInfo({})
            setHasStripeAccount(status)
          },
          onError: () => {
            accountResetFlag.current = status
            handleSetIsOpen(status)
          },
        })
      } else {
        accountResetFlag.current = status
        handleSetIsOpen(status)
      }
    },
    [isSessionUserAdminOfClub]
  )

  return (
    <>
      {hasStripeAccount && (
        <div className="flex md:flex lg:flex flex-col md:flex-row lg:flex-row items-center justify-center md:justify-center ml-0 md:ml-0 lg:ml-2 lg:justify-start mt-4 md:mt-4 lg:mt-2.5 xl:inline-block xl:float-right">
          {details_submitted !== undefined && details_submitted === false && (
            <Button
              className="w-[398px] md:w-auto bg-jg-yellow-50 border border-yellow-500 px-4 text-sm ml-1 md:ml-0 mb-2 md:mb-0 mr-1 md:mr-4 rounded-sm font-semibold text-black"
              onClick={() => handleAccountResetFlag(true)}
              text="Restart Setup"
              btnSize="xs"
            />
          )}
          <Button
            className="w-[398px] md:w-auto"
            text={details_submitted ? 'Update Payment Profile' : 'Continue Setup'}
            btnColor="primary"
            btnSize="md"
            fillType="solid"
            onClick={getStripeAccountLink}
          />
          <StatusDialog
            isOpen={isOpen}
            setIsOpen={handleSetIsOpen}
            titleText={'Warning'}
            descriptionText={
              accountResetFlag.current
                ? 'This will delete your current payment setup progress and restart it. Are you sure you want to continue?'
                : 'Payment set-up or updating payments can only be completed by an administrator of this organisation. You do not have permission.'
            }
            closeBtnText={accountResetFlag.current ? 'Cancel' : 'OK'}
            showDefaultActionBtn={!!accountResetFlag.current}
            actionBtnText="Restart"
            handleAction={() => handleDeleteStripeAccount(false, clubMerchantId)}
          />
        </div>
      )}
    </>
  )
}

export default () => (
  <QueryClientProvider client={queryClient}>
    <UpdatePaymentProfile />
  </QueryClientProvider>
)
