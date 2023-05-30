import { JGTable, TD, TH, TR } from '@jg/common/comps'
import SkeletonTab from '@jg/common/comps/loader/placeholders/SkeletonTab'
import JGFetch from '@jg/common/dataAPIs'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

interface IAccountHistory {
  PaymentId: string
  PaymentDate: string
  GrossAmount: string
  Description: string
}
const AccountHistory = () => {
  const { clubMerchantId } = useParams()

  const { data, isLoading } = useFetchingAccountHistory(clubMerchantId)
  console.log('Account History', data)

  if (isLoading || !data) {
    return <SkeletonTab contentOnly />
  }

  return (
    <div>
      <div className="p-4">
        <h3 className="font-semibold text-sm leading-4 text-jg-metal-900">Payment</h3>
      </div>

      <div className="-my-2 overflow-x-auto">
        <div className="inline-block min-w-full py-2">
          <div className="overflow-hidden ring-1 ring-black ring-opacity-5">
            <JGTable>
              <thead className="bg-jg-grey-50">
                <TR>
                  <TH scope="col" className="pl-4">
                    ID
                  </TH>
                  <TH scope="col">Description</TH>
                  <TH scope="col">Date</TH>
                  <TH scope="col" className="pr-4">
                    Gross Amount
                  </TH>
                </TR>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {Array.isArray(data) &&
                  data.map((sub, i) => (
                    <TR key={i}>
                      <TD className="pl-4">{sub.PaymentId}</TD>
                      <TD>{sub.Description}</TD>
                      <TD>{sub.PaymentDate}</TD>
                      <TD className="pr-4">€ {sub.GrossAmount}</TD>
                    </TR>
                  ))}
              </tbody>
            </JGTable>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountHistory

const useFetchingAccountHistory = (merchantId: string | undefined) =>
  useQuery(
    ['StripeAccountHistory', merchantId],
    () => JGFetch(['Payment/GetAccountHistory'], [{ merchantId }]).then((res: unknown) => res as IAccountHistory[]),
    { refetchOnWindowFocus: false, refetchOnMount: false }
  )

const Account_HISTORY = [
  {
    ID: 'PR000250',
    Descriptions: 'po_1LkIkZEiXaoq5X21eqrewjE3',
    Date: '21 Sep, 2022',
    'Gross Amount': 120,
  },
  {
    ID: 'PR000250',
    Descriptions: 'po_1LkIkZEiXaoq5X21eqrewjE3',
    Date: '21 Sep, 2022',
    'Gross Amount': 120,
  },
  {
    ID: 'PR000250',
    Descriptions: 'po_1LkIkZEiXaoq5X21eqrewjE3',
    Date: '21 Sep, 2022',
    'Gross Amount': 120,
  },
  {
    ID: 'PR000250',
    Descriptions: 'po_1LkIkZEiXaoq5X21eqrewjE3',
    Date: '21 Sep, 2022',
    'Gross Amount': 120,
  },
  {
    ID: 'PR000250',
    Descriptions: 'po_1LkIkZEiXaoq5X21eqrewjE3',
    Date: '21 Sep, 2022',
    'Gross Amount': 120,
  },
]
