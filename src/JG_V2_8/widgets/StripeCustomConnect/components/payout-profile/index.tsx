import { Button } from '@comps/uiComps'
import { JGTable, TD, TH, TR } from '@jg/common/comps'
import React from 'react'
import { useEffect, useState } from 'react'
import ReactCountryFlag from 'react-country-flag'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'

import ScheduleSelection from './ScheduleSelection'
import StatementDescriptorInput from './StatementDescriptorInput'
import { AdditionalClubSetting, PaymentAccountResult } from './type'
import SkeletonTab from '@jg/common/comps/loader/placeholders/SkeletonTab'
import JGFetch from '@jg/common/dataAPIs'

interface UpdateProfileData {
  Schedule: 'daily' | 'monthly' | 'weekly'
  MonthlyAnchor?: number
  StatementDescriptor: string
  WeeklyAnchor?: string
}

const TableDataHeading = '!text-jg-metal-900 w-52 lg:w-72 pl-4 '

const PayoutProfile = () => {
  const { clubMerchantId } = useParams()
  const [profileData, setProfileData] = useState<PaymentAccountResult | Record<string, any>>({})

  const { data, isLoading } = useFetchingAccountInfo(clubMerchantId)
  const { data: additionalSettingData } = useFetchingAdditionalSettings(clubMerchantId)
  const { mutate } = useUpdateAccountProfile(clubMerchantId, setProfileData)

  const { id, type, business_profile, email, country, default_currency, settings } = profileData
  const { name = '', url = '' } = business_profile || {}
  const { payouts } = settings || {}
  const { statement_descriptor = '', schedule } = payouts || {}
  const { interval = 'daily', monthly_anchor = 0, weekly_anchor = 'sunday' } = schedule || {}

  const { ClubJoinDirectLink, EventDirectLink } = additionalSettingData || {}

  const getCountryNames = new Intl.DisplayNames(['en'], { type: 'region' })
  const countryName = country && getCountryNames.of(country.toUpperCase())

  const isClub = ClubJoinDirectLink && EventDirectLink

  const handleScheduleSelect = (interval: 'daily' | 'monthly' | 'weekly', anchor?: string) => {
    const scheduleData = {
      Schedule: interval,
      MonthlyAnchor: monthly_anchor,
      WeeklyAnchor: weekly_anchor,
      StatementDescriptor: statement_descriptor,
    }

    if (interval === 'daily') {
      return mutate(scheduleData)
    }
    const decideAnchor = interval === 'weekly' ? { WeeklyAnchor: anchor } : { MonthlyAnchor: +(anchor || '') }
    return mutate({ ...scheduleData, ...decideAnchor })
  }

  useEffect(() => {
    setProfileData({ ...(data || {}) })
  }, [data])

  if (!clubMerchantId) return <h1>Invalid MerchantID</h1>

  if (isLoading) {
    return <SkeletonTab contentOnly />
  }

  return (
    <>
      <div className="p-4">
        <h3 className="font-semibold text-sm leading-4 text-jg-metal-900">Account Summary</h3>
      </div>
      <div className="-my-2 overflow-x-auto">
        <div className="inline-block min-w-full py-2">
          <div className="overflow-hidden ring-1 ring-black ring-opacity-5">
            <JGTable>
              <tbody className="divide-y divide-gray-200 bg-white">
                <TR className="bg-jg-grey-50">
                  <TH colSpan={2} scope={'colgroup'} className={'pl-4'}>
                    Account Information
                  </TH>
                </TR>
                <TR>
                  <TD scope="row" className={TableDataHeading}>
                    ID
                  </TD>
                  <TD>{id}</TD>
                </TR>
                <TR>
                  <TD scope="row" className={TableDataHeading}>
                    Type
                  </TD>
                  <TD>{type}</TD>
                </TR>
                <TR className="bg-jg-grey-50">
                  <TH colSpan={2} scope={'colgroup'} className={'pl-4'}>
                    Contact Information
                  </TH>
                </TR>
                <TR>
                  <TD scope="row" className={TableDataHeading}>
                    Doing Business As
                  </TD>
                  <TD>{name}</TD>
                </TR>
                <TR>
                  <TD scope="row" className={TableDataHeading}>
                    Email
                  </TD>
                  <TD>
                    <a href={`mailto:${email}`} className="text-jg-blue-500">
                      {email}
                    </a>
                  </TD>
                </TR>
                <TR>
                  <TD scope="row" className={TableDataHeading}>
                    Website
                  </TD>
                  <TD>
                    <a href={url || ''} className="text-jg-green-500">
                      {url || 'None'}
                    </a>
                  </TD>
                </TR>
                <TR className="bg-jg-grey-50">
                  <TH colSpan={2} scope={'colgroup'} className={'pl-4'}>
                    Business Details
                  </TH>
                </TR>
                <TR>
                  <TD scope="row" className={TableDataHeading}>
                    Country
                  </TD>
                  <TD>
                    <div className="inline-flex gap-2 items-center">
                      <ReactCountryFlag countryCode={country} svg style={{ width: '1.5em', height: '1.5em' }} />
                      <span>{countryName}</span>
                    </div>
                  </TD>
                </TR>
                <TR className="bg-jg-grey-50">
                  <TH colSpan={2} scope={'colgroup'} className={'pl-4'}>
                    Payment Information
                  </TH>
                </TR>
                <TR>
                  <TD scope="row" className={TableDataHeading}>
                    Schedule
                  </TD>
                  <TD>
                    <ScheduleSelection {...{ interval, monthly_anchor, weekly_anchor, handleScheduleSelect }} />
                  </TD>
                </TR>
                <TR>
                  <TD scope="row" className={TableDataHeading}>
                    Payout Statement Descriptor
                  </TD>
                  <TD>
                    <StatementDescriptorInput
                      initialValue={statement_descriptor}
                      onChange={(value) =>
                        mutate({
                          StatementDescriptor: value,
                          Schedule: interval,
                          MonthlyAnchor: monthly_anchor,
                          WeeklyAnchor: weekly_anchor,
                        })
                      }
                    />
                  </TD>
                </TR>
                <TR>
                  <TD scope="row" className={TableDataHeading}>
                    Default Currency
                  </TD>
                  <TD>{(default_currency || 'usd').toUpperCase()}</TD>
                </TR>
              </tbody>
            </JGTable>
          </div>
        </div>
      </div>
      {isClub && (
        <div className=" overflow-x-auto border-t border-jg-grey-200">
          <div className="inline-block min-w-full divide-y divide-jg-grey-100">
            <div className="px-4 py-2 flex justify-between items-center gap-16">
              <div className="space-y-1">
                <p className="text-inputSizeMd font-normal text-jg-metal-700">Club Join Link</p>
                <div className="text-jg-green-500 text-inputSizeMd font-medium break-all">{ClubJoinDirectLink}</div>
              </div>
              <CopyLink link={ClubJoinDirectLink} />
            </div>
            <div className="px-4 py-2 flex justify-between items-center gap-16">
              <div className="space-y-1">
                <p className="text-inputSizeMd font-normal text-jg-metal-700">Event Direct Link</p>
                <div className="text-jg-green-500 text-inputSizeMd font-medium break-all">{EventDirectLink}</div>
              </div>
              <CopyLink link={EventDirectLink} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PayoutProfile

const useFetchingAccountInfo = (merchantId: string | undefined) =>
  useQuery(
    ['AccountSummary', merchantId],
    () => JGFetch(['Payment/GetAccount'], [{ merchantId }]).then((res: unknown) => res as PaymentAccountResult),
    { refetchOnWindowFocus: false, refetchOnMount: false }
  )

const useFetchingAdditionalSettings = (merchantId: string | undefined) =>
  useQuery(
    ['Additional Settings', merchantId],
    () =>
      JGFetch(['Payment/GetAdditionalSetting'], [{ merchantId }]).then((res: unknown) => res as AdditionalClubSetting),
    { refetchOnWindowFocus: false, refetchOnMount: false }
  )

const useUpdateAccountProfile = (
  merchantId: string | undefined,
  setReturnedData: (obj: PaymentAccountResult | Record<string, unknown>) => void
) => {
  const queryClient = useQueryClient()

  return useMutation(
    (updatedData: UpdateProfileData) =>
      JGFetch(
        ['Payment/UpdateAccount'],
        [
          {
            merchantId,
            accountDetais: updatedData,
          },
        ]
      ),
    {
      onSuccess: (res) => {
        queryClient.setQueryData(['AccountSummary', merchantId], { ...(res || {}) })
        setReturnedData({ ...(res || {}) })
      },
    }
  )
}
const CopyLink = ({ link }: { link: string }) => {
  const [text, setText] = useState('Copy Link')

  const copyAction = () => {
    navigator.clipboard.writeText(link)
    setText('Copied!')
    setTimeout(() => setText('Copy Link'), 1500)
  }
  return (
    <Button
      btnColor="secondary"
      fillType="outline"
      className="bg-jg-grey-50 whitespace-nowrap"
      text={text}
      onClick={copyAction}
      disabled={text === 'Copied!'}
      icon={text !== 'Copied!' && <CopyIcon className={'w-4 h-4 text-jg-green-500 '} />}
      btnSize="sm"
    />
  )
}

const CopyIcon = React.forwardRef((props: React.ComponentProps<'svg'>, ref) => {
  return (
    <svg
      viewBox="0 0 13 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref as React.LegacyRef<SVGSVGElement>}
      {...props}
    >
      <path
        d="M11.6666 14H4.33325V4.66666H11.6666M11.6666 3.33332H4.33325C3.97963 3.33332 3.64049 3.4738 3.39044 3.72385C3.14039 3.9739 2.99992 4.31303 2.99992 4.66666V14C2.99992 14.3536 3.14039 14.6928 3.39044 14.9428C3.64049 15.1928 3.97963 15.3333 4.33325 15.3333H11.6666C12.0202 15.3333 12.3593 15.1928 12.6094 14.9428C12.8594 14.6928 12.9999 14.3536 12.9999 14V4.66666C12.9999 4.31303 12.8594 3.9739 12.6094 3.72385C12.3593 3.4738 12.0202 3.33332 11.6666 3.33332ZM9.66659 0.666656H1.66659C1.31296 0.666656 0.973825 0.807132 0.723776 1.05718C0.473728 1.30723 0.333252 1.64637 0.333252 1.99999V11.3333H1.66659V1.99999H9.66659V0.666656Z"
        fill="#263238"
      />
    </svg>
  )
})
