import { FC } from 'react'
import { useQuery } from 'react-query'
import { useState, useEffect } from 'react'

import { ClubSwitcherInfo, GDEResponse } from '@jg/common/types'
import populateClubSwitcherInfo from '@jg/common/dataAPIs/_helpers/populateClubSwitcherInfo'
import JGFetch from '@jg/common/dataAPIs'

const getClubListArg = {
  Method: 'GetClubsForSwitcher',
  IsStripeMode: true,
}

const useGetClubSwitcherList = () =>
  useQuery(
    ['GetClubSwitcherList'],
    () =>
      JGFetch(['GDE/FetchObjects'], [{ provider: 'SwitcherCall', args: getClubListArg }]).then(
        (response: unknown) => response as GDEResponse
      ),
    { refetchOnWindowFocus: false }
  )

const subscribeClubSwitcher = (WrappedComponent: FC) => {
  return (props: any) => {
    const { data } = useGetClubSwitcherList()
    const [clubSwitcherList, setClubSwitcherList] = useState<ClubSwitcherInfo[]>([])

    useEffect(() => {
      if (data && data?.Success && Array.isArray(data?.Result)) {
        const items = data?.Result as any[]
        setClubSwitcherList(items.map((item) => populateClubSwitcherInfo(item)) as ClubSwitcherInfo[])
      }
    }, [data])

    return <WrappedComponent data={clubSwitcherList} {...props} />
  }
}

export default subscribeClubSwitcher
