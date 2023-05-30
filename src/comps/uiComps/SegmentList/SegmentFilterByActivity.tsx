import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import useEmailRecipientByActivityType from './store/emailRecipientByActivity'
import { ActivityType } from '../../../JG_V2_8/widgets/EmailAndCom/enum/index'

type activityFilterPropTypes = {
  numberOfRows: number
  pageNumber: number
  isRefreshed?: boolean
  setIsRefreshed?: (value: boolean) => void
}

const SegmentFilterByActivity = ({
  numberOfRows,
  pageNumber,
  isRefreshed,
  setIsRefreshed,
}: activityFilterPropTypes) => {
  const [searchParams] = useSearchParams()
  const emailId = searchParams.get('emailId')
  const [searchValue, setSearchValue] = useState<string>('0')

  const { getRecipientsByActivityType } = useEmailRecipientByActivityType((state) => state)

  useEffect(() => {
    if (emailId && searchValue) {
      getRecipientsByActivityType(+emailId, +searchValue, pageNumber, numberOfRows)
    }
  }, [searchValue, emailId, getRecipientsByActivityType, isRefreshed])

  return (
    <>
      <select
        className="h-[32px] leading-[32px] text-[#455A64] m-1 border border-[#CFD8DC] rounded-sm"
        id="activityfilter"
        name="activityfilter"
        onChange={(event) => {
          setIsRefreshed && setIsRefreshed(false)
          setSearchValue(event.target.value)
        }}
        value={searchValue}
      >
        <option value={ActivityType.ALL}>All</option>
        <option value={ActivityType.DELIVERY}>Sent</option>
        <option value={ActivityType.DROPPED}>Dropped</option>
      </select>
    </>
  )
}

export default SegmentFilterByActivity
