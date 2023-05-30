import Tabs from '@comps/uiComps/Tab/Tabs'
import { ReactComponent as FinanceOverviewIcon } from '@jg/assets/images/FinanceOverviewIcon.svg'
import { ReactComponent as StripeIntroIcon } from '@jg/assets/images/StripeIntroIcon.svg'
import { ReactComponent as JGStripeLogo } from '@jg/assets/images/JGStripeLogo.svg'
import { PlayIcon } from '@heroicons/react/solid'
import HelpIntro from '@comps/uiComps/HelpIntro/HelpIntro'
import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import OverviewTabContent from './OverviewTabContent'
import useStripeCustomConnectStore, { StripeCustomConnectStore } from '../store/useStripeCustomConnectStore'
import { useParams } from 'react-router-dom'
import { StripeAccountLink } from '../interfaces/StripeAccountLinkInterface'
import { PaymentAccountResult } from './payout-profile/type'
import { useRouter } from '@jg/hooks'
import SkeletonTab from '@jg/common/comps/loader/placeholders/SkeletonTab'
import { useQuery, useMutation } from 'react-query'
import { IsSessionUserAdminOfClub } from './balance-overview/type'
import StatusDialog from '../../../common/comps/statusdialog/StatusDialog'
import JGFetch from '@jg/common/dataAPIs'

type FinanceTabProps = {
  selectedTab?: number
}

const useGetStripeAccount = (clubMerchantId: string | undefined) =>
  useQuery(
    ['GetStripeAccount', clubMerchantId],
    () =>
      JGFetch(['Payment/GetAccount'], [{ merchantId: clubMerchantId }]).then(
        (response: unknown) => response as PaymentAccountResult
      ),
    { refetchOnWindowFocus: false, enabled: !!clubMerchantId, cacheTime: 0 }
  )

const useIsSessionUserAdminOfClub = (clubMerchantId: string | undefined) =>
  useQuery(
    ['IsSessionUserAdminOfClub', clubMerchantId],
    () =>
      JGFetch(['Payment/IsSessionUserAdminOfClub'], [{ merchantId: clubMerchantId }]).then(
        (response: unknown) => response as IsSessionUserAdminOfClub
      ),
    { refetchOnWindowFocus: false, enabled: !!clubMerchantId, cacheTime: 0 }
  )

const useCreateStripeAccount = () => {
  const { esc } = useRouter()
  return useMutation(
    async (clubMerchantId: string) => {
      const newStripeAccount =
        clubMerchantId &&
        ((await JGFetch(['Payment/CreateAccount'], [{ merchantId: clubMerchantId }])) as PaymentAccountResult)

      if (newStripeAccount && !newStripeAccount.id) {
        return newStripeAccount
      }

      const stripeAccountLink =
        newStripeAccount &&
        newStripeAccount.id &&
        ((await JGFetch(['Payment/GetAccountLink'], [{ merchantId: clubMerchantId }])) as StripeAccountLink)

      return stripeAccountLink
    },
    {
      onSuccess: (data: any) => {
        esc(data?.url)
      },
    }
  )
}

const FinanceTab = (props: FinanceTabProps) => {
  const { stripeAccountInfo, setHasStripeAccount, setIsSessionUserAdminOfClub, setStripeAccountInfo } =
    useStripeCustomConnectStore((state: StripeCustomConnectStore) => state)
  const { clubMerchantId } = useParams()
  const { selectedTab = 0 } = props

  const [activeItem, setActiveItem] = useState<number>(selectedTab)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const isCreatingStripeAccount = useRef<boolean>(false)
  const serverErrorMessage = useRef<string>('')

  const handleSetIsOpen = useCallback((status: boolean) => {
    setIsOpen(status)
  }, [])

  const handleTabItemSelection = useCallback((activeItem: number): void => {
    setActiveItem(activeItem)
  }, [])

  const { data: accountInfo, isFetching: isFetchingAccountInfo } = useGetStripeAccount(clubMerchantId)

  const { data: isSessionUserAdminOfClubResponse } = useIsSessionUserAdminOfClub(clubMerchantId)

  useEffect(() => {
    if (accountInfo && accountInfo.id) {
      setStripeAccountInfo(accountInfo)
      setHasStripeAccount(true)
    } else {
      setStripeAccountInfo({})
      setHasStripeAccount(false)
    }
  }, [accountInfo])

  useEffect(() => {
    if (isSessionUserAdminOfClubResponse) {
      setIsSessionUserAdminOfClub(isSessionUserAdminOfClubResponse)
    }
  }, [isSessionUserAdminOfClubResponse])

  const { data, mutate } = useCreateStripeAccount()

  const createStripeAccountSuccessTimeout = useRef<any>(null)
  const createStripeAccountErrorTimeout = useRef<any>(null)

  const createStripeAccount = useCallback(() => {
    if (clubMerchantId && isSessionUserAdminOfClubResponse && isSessionUserAdminOfClubResponse.IsAdmin) {
      isCreatingStripeAccount.current = true
      mutate(clubMerchantId, {
        onSuccess: () => {
          createStripeAccountSuccessTimeout.current = setTimeout(() => {
            isCreatingStripeAccount.current = false
          }, 500)
        },
        onError: () => {
          createStripeAccountErrorTimeout.current = setTimeout(() => {
            isCreatingStripeAccount.current = false
          }, 500)
          handleSetIsOpen(true)
        },
      })
    } else {
      handleSetIsOpen(true)
    }
  }, [clubMerchantId, isSessionUserAdminOfClubResponse])

  useEffect(() => {
    return () => {
      clearTimeout(createStripeAccountSuccessTimeout.current)
      clearTimeout(createStripeAccountErrorTimeout.current)
    }
  }, [createStripeAccountSuccessTimeout, createStripeAccountErrorTimeout])

  const tabItems = useMemo(
    () => [
      {
        title: 'OVERVIEW',
        content: isFetchingAccountInfo ? (
          <SkeletonTab contentOnly />
        ) : stripeAccountInfo && stripeAccountInfo.id ? (
          <OverviewTabContent />
        ) : isCreatingStripeAccount.current ? (
          <SkeletonTab contentOnly />
        ) : (
          <HelpIntro
            iconSVG={<StripeIntroIcon className="mt-4" />}
            title="Secure Online Payment"
            description={
              "With our integrated and secure online payment portal your members can make online payments 24/7. It's easier to collect payment through"
            }
            customLogo={<JGStripeLogo />}
            videoPlayerIcon={<PlayIcon className="h-24" />}
            handleOnClick={createStripeAccount}
            videoSrc={'IQlJby3OJRk'}
          />
        ),
        icon: <FinanceOverviewIcon fill={activeItem === 0 ? '#4CAF4F' : ''} />,
      },
    ],
    [
      clubMerchantId,
      isSessionUserAdminOfClubResponse,
      isFetchingAccountInfo,
      isCreatingStripeAccount.current,
      stripeAccountInfo,
      activeItem,
    ]
  )

  useEffect(() => {
    if (
      data &&
      Array.isArray(Object.keys(data)) &&
      Object.keys(data).length > 0 &&
      Object.keys(data).includes('error') &&
      Array.isArray(Object.values(data)) &&
      Object.values(data).length > 0 &&
      Object.values(data)[0]
    ) {
      serverErrorMessage.current = (Object.values(data)[0] as any)?.message
      handleSetIsOpen(true)
    } else {
      serverErrorMessage.current = ''
    }
  }, [data])

  return (
    <div className="jg-container mt-14 md:mt-6">
      <Tabs
        items={tabItems}
        activeItem={activeItem}
        orientation="horizontal"
        border
        enableTabBarControl={false}
        tabBarControl={null}
        tabItemAlignment={'left'}
        showTabItemTxt
        onSelect={handleTabItemSelection}
      />
      <StatusDialog
        isOpen={isOpen}
        setIsOpen={handleSetIsOpen}
        titleText={'Warning'}
        descriptionText={
          serverErrorMessage && serverErrorMessage.current
            ? serverErrorMessage.current
            : isSessionUserAdminOfClubResponse && !isSessionUserAdminOfClubResponse.IsAdmin
            ? 'Payment set-up or updating payments can only be completed by an administrator of this organisation. You do not have permission.'
            : 'Payment set-up or updating payments can not be completed.'
        }
        closeBtnText={'OK'}
        showDefaultActionBtn={false}
      />
    </div>
  )
}

export default FinanceTab
