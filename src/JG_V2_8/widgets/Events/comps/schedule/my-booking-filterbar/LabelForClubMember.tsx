import { useEffect } from 'react'
import useNavigateWithArgsMB from '../../hooks/useNavigateWithArgsMB'
import { useEventsAndScheduleApi } from '@jg/common/dataAPIs'
import { useAsync } from '@jg/hooks'
import { BookedMembersResponse } from '@jg/common/types/eventsAnsSchedules/BookedMembersResponse'
import { GenericErrorResponse } from '@jg/common/types'
import MyBookingFilterLabel from './MBFilterLabel'

const LabelForClubMember = () => {
  const { getArgsFromUrl } = useNavigateWithArgsMB()
  const { clubMembers } = getArgsFromUrl()
  const { GetBookedMembersRequest } = useEventsAndScheduleApi()
  const { execute, value } = useAsync<BookedMembersResponse, GenericErrorResponse, Record<string, unknown>>(
    GetBookedMembersRequest,
    {},
    false
  )

  useEffect(() => {
    execute()
  }, [])

  const ActiveContent =
    value?.bookedMembersList
      ?.filter((item: any) => clubMembers.includes(item?.memberDocId.toString()))
      .slice(0, 3)
      .map((clubMember: any) => `${clubMember?.firstName} ${clubMember?.lastName}`)
      .join(', ') + `${clubMembers.length > 3 ? ` + ${clubMembers.length - 3} more` : ''}`

  return (
    <MyBookingFilterLabel
      ActiveContent={ActiveContent}
      name={'clubMembers'}
      determineActive={(p) => (p as string[])?.length > 0}
    />
  )
}

export default LabelForClubMember
