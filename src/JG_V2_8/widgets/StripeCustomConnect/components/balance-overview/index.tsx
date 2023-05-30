import { Badge, Button } from '@comps/uiComps'
import { Download } from '@comps/uiComps/Icons'
import { JGTable, TD, TH, TR } from '@jg/common/comps'
import { useParams } from 'react-router-dom'
import { StripeAccountBalance } from '../../interfaces/StripeAccountBalanceInterface'
import { useMemo } from 'react'
import JGCurrencyList from '../helper/JGCurrencyList'
import { useQuery, useIsFetching } from 'react-query'

import { IndividualPayoutRecord } from './type'
import { LinkButton } from '@jg/common/comps'
import { StripeAccountLink } from '../../interfaces/StripeAccountLinkInterface'
import SkeletonTab from '@jg/common/comps/loader/placeholders/SkeletonTab'
import useStripeCustomConnectStore, { StripeCustomConnectStore } from '../../store/useStripeCustomConnectStore'
import JGFetch from '@jg/common/dataAPIs'

const useGetStripeBalance = (clubMerchantId: string | undefined) =>
  useQuery(
    ['GetStripeBalance', clubMerchantId],
    () =>
      JGFetch(['Payment/GetBalance'], [{ merchantId: clubMerchantId }]).then(
        (response) => response as StripeAccountBalance
      ),
    { refetchOnWindowFocus: false, enabled: !!clubMerchantId, cacheTime: 0 }
  )

const useGetStripeExpressLoginLink = (clubMerchantId: string | undefined) =>
  useQuery(
    ['GetStripeExpressLoginLink', clubMerchantId],
    () =>
      JGFetch(['Payment/GetExpressLoginLink'], [{ merchantId: clubMerchantId }]).then(
        (response: unknown) => response as StripeAccountLink
      ),
    { refetchOnWindowFocus: false, enabled: !!clubMerchantId, cacheTime: 0 }
  )

const BalanceOverView = () => {
  const { clubMerchantId } = useParams()
  const isFetching = useIsFetching()
  const { isSessionUserAdminOfClub } = useStripeCustomConnectStore((state: StripeCustomConnectStore) => state)

  const { data: stripeDashboardUrlObj } = useGetStripeExpressLoginLink(clubMerchantId)

  const { data: balance } = useGetStripeBalance(clubMerchantId)

  const { data: payoutRecord } = useIndividualPayoutRecord(clubMerchantId, 1, 10)
  const hideExportButton = true

  const groupAmountByCurrency = (balance: StripeAccountBalance): any[] => {
    const currencyArr: string[] = []
    const accountBalanceArr: any[] = []

    Array.isArray(balance.available) &&
      balance.available.forEach(
        (item) => item.currency && !currencyArr.includes(item.currency) && currencyArr.push(item.currency)
      )

    Array.isArray(balance.pending) &&
      balance.pending.forEach(
        (item) => item.currency && !currencyArr.includes(item.currency) && currencyArr.push(item.currency)
      )

    Array.isArray(balance.in_transit) &&
      balance.in_transit.forEach(
        (item) => item.currency && !currencyArr.includes(item.currency) && currencyArr.push(item.currency)
      )

    Array.isArray(balance.total) &&
      balance.total.forEach(
        (item) => item.currency && !currencyArr.includes(item.currency) && currencyArr.push(item.currency)
      )

    currencyArr.forEach((currencyItem) => {
      const currency = currencyItem.toUpperCase() as keyof typeof JGCurrencyList
      accountBalanceArr.push({
        total:
          Array.isArray(balance.total) && balance.total.some((item) => item.currency === currencyItem)
            ? balance.total.find((item) => item.currency === currencyItem)?.amount
            : '0.00',
        available:
          Array.isArray(balance.available) && balance.available.some((item) => item.currency === currencyItem)
            ? balance.available.find((item) => item.currency === currencyItem)?.amount
            : '0.00',
        pending:
          Array.isArray(balance.pending) && balance.pending.some((item) => item.currency === currencyItem)
            ? balance.pending.find((item) => item.currency === currencyItem)?.amount
            : '0.00',
        intransit:
          Array.isArray(balance.in_transit) && balance.in_transit.some((item) => item.currency === currencyItem)
            ? balance.in_transit.find((item) => item.currency === currencyItem)?.amount
            : '0.00',
        symbol: Object.keys(JGCurrencyList)?.includes(currency) && JGCurrencyList[`${currency}`]?.symbol_native,
      })
    })

    return accountBalanceArr
  }

  const accountBalance = useMemo(() => {
    if (balance && Object.keys(balance).length > 0) {
      return groupAmountByCurrency(balance)
    }
    return null
  }, [balance])

  return (
    <>
      {isFetching === 0 ? (
        <div className="mb-2">
          <div className="p-4">
            <h3 className="font-semibold text-sm leading-4 text-jg-metal-900">Summary</h3>
          </div>
          <div className="p-4 flex flex-col gap-4 bg-jg-grey-50 border-t border-b">
            {Array.isArray(accountBalance) ? (
              accountBalance.map((item, index) => {
                return (
                  <div className="flex flex-col md:flex-row justify-between" key={index}>
                    <div className="space-y-1 py-1 md:py-0">
                      <h4 className="text-sm leading-4 font-medium text-jg-metal-500">{'Total balance'}</h4>
                      <p className="text-xl leading-6 font-semibold text-jg-metal-700">
                        {item.symbol} {item.total}
                      </p>
                    </div>
                    <div className="space-y-1 py-1 md:py-0">
                      <h4 className="text-sm leading-4 font-medium text-jg-metal-500">{'Available to payout'}</h4>
                      <p className="text-xl leading-6 font-semibold text-jg-metal-700">
                        {item.symbol} {item.available}
                      </p>
                    </div>
                    <div className="space-y-1 py-1 md:py-0">
                      <h4 className="text-sm leading-4 font-medium text-jg-metal-500">{'Available soon'}</h4>
                      <p className="text-xl leading-6 font-semibold text-jg-metal-700">
                        {item.symbol} {item.pending}
                      </p>
                    </div>
                    <div className="space-y-1 py-1 md:py-0">
                      <h4 className="text-sm leading-4 font-medium text-jg-metal-500">{'In transit to bank'}</h4>
                      <p className="text-xl leading-6 font-semibold text-jg-metal-700">
                        {item.symbol} {item.intransit}
                      </p>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="flex flex-col md:flex-row justify-between">
                <div className="space-y-1 py-1 md:py-0">
                  <h4 className="text-sm leading-4 font-medium text-jg-metal-500">{'Loading balance ...'}</h4>
                </div>
              </div>
            )}
          </div>
          <div className="p-2 flex justify-between items-center">
            <h3 className="pl-2 font-semibold text-sm leading-4 text-jg-metal-900">&nbsp;</h3>
            <div className={'inline-flex gap-2'}>
              {stripeDashboardUrlObj &&
                stripeDashboardUrlObj.url &&
                isSessionUserAdminOfClub &&
                isSessionUserAdminOfClub.IsAdmin && (
                  <LinkButton
                    href={stripeDashboardUrlObj.url}
                    btnColor="primary"
                    fillType="outline"
                    text="View Stripe Dashboard"
                  />
                )}
              {!hideExportButton && <Button text="Export" icon={<Download className="w-4 h-4" />} />}
            </div>
          </div>
          {!hideExportButton && (
            <div className="-my-2 overflow-x-auto">
              <div className="inline-block min-w-full py-2">
                <div className="overflow-hidden ring-1 ring-black ring-opacity-5">
                  <JGTable>
                    <thead className="bg-jg-grey-50">
                      <TR>
                        {PAYOUT_HISTORY_TH.map((title, i) => {
                          return (
                            <TH
                              scope="col"
                              key={title}
                              className={`max-w-[240px] ${i === 0 && 'pl-4'} ${
                                i === PAYOUT_HISTORY_TH.length - 1 && 'pr-4'
                              }`}
                            >
                              {title}
                            </TH>
                          )
                        })}
                      </TR>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {payoutRecord && payoutRecord.length === 0 && (
                        <TR>
                          <TD></TD>
                          <TD></TD>
                          <TD></TD>
                          <TD className="block text-lg text-jg-grey-400 mx-auto py-8">No Record</TD>
                          <TD></TD>
                          <TD></TD>
                          <TD></TD>
                        </TR>
                      )}
                      {(payoutRecord || []).map((payout, i) => (
                        <TR key={i}>
                          <TD className={'!pl-4 max-w-[240px]'}>
                            {new Intl.NumberFormat('en-US', { style: 'currency', currency: payout.Currency }).format(
                              payout.Amount / 100
                            )}
                          </TD>
                          <TD className={'max-w-[240px]'}>
                            <Badge
                              fillType="faded"
                              variant={payout.Status === 'paid' ? 'success' : 'info'}
                              label={payout.Status[0].toUpperCase() + payout.Status.slice(1).split('_').join(' ')}
                              className="!font-medium"
                            />
                          </TD>
                          <TD className={'max-w-[240px]'}>{payout.Destination}</TD>
                          <TD className={'max-w-[240px]'}>{payout.PayoutId}</TD>
                          <TD className={'max-w-[240px]'}>{payout.StatementDescriptor}</TD>
                          <TD className={'max-w-[240px]'}>
                            {payout.Initiated && cheapDateFormatter(payout.Initiated)}
                          </TD>
                          <TD className={'!pr-4 max-w-[240px]'}>
                            {new Date(payout.ArrivalDate).toUTCString().slice(5, 11)}
                          </TD>
                        </TR>
                      ))}
                    </tbody>
                  </JGTable>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <SkeletonTab contentOnly />
      )}
    </>
  )
}

export default BalanceOverView

const useIndividualPayoutRecord = (merchantId: string | undefined, page: number, limit: number) =>
  useQuery(
    ['IndividualPayoutRecord', merchantId],
    () =>
      JGFetch(['Payment/GetPayOutByOwner'], [{ merchantId, pageNo: page, numberOfRows: limit }]).then(
        (res) => res as IndividualPayoutRecord[]
      ),
    { refetchOnWindowFocus: false, refetchOnMount: false }
  )

const cheapDateFormatter = (dateString: string) => {
  const date = new Date(dateString).toUTCString().slice(5, 11)
  const time = new Date(dateString).toLocaleTimeString()

  return `${date}, ${time}`
}

const PAYOUT_HISTORY_TH = [
  'Amount',
  'Status',
  'External Account',
  'Description',
  'Statement Desc.',
  'Initiated',
  'Est. Arrival',
]
