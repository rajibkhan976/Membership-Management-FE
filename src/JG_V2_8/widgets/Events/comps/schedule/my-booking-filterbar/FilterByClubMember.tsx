import { useState, useEffect } from 'react'
import { SimpleSelect } from '@comps/uiComps'
import { TextField } from '@comps/uiComps'
import useFilterBarData from '../../hooks/useFilterBarData'
import { Search } from '@comps/uiComps/Icons'
import { useEventsAndScheduleApi } from '@jg/common/dataAPIs'
import { GenericErrorResponse } from '@jg/common/types'
import { BookedMembersResponse } from '@jg/common/types/eventsAnsSchedules/BookedMembersResponse'
import { useAsync } from '@jg/hooks'
import { BookedMembersInfo } from '@jg/common/types'
import classNames from 'classnames'
import useNavigateWithArgsMB from '../../hooks/useNavigateWithArgsMB'

const FilterByClubMember = () => {
  const { filterBarData } = useFilterBarData()
  const [clubDocId, setClubDocId] = useState<number>(-1)
  const [searchKey, setSearchKey] = useState<string>('')
  const [bookedClubMembersList, setBookedClubMembersList] = useState<BookedMembersInfo[]>([])
  const [selectedBookedClubMembersId, setSelectedBookedClubMembersId] = useState<number[]>([])
  const { currentArgs, setCurrentArgs, getArgsFromUrl } = useNavigateWithArgsMB()

  const clubList: any[] | undefined = [{ name: 'All', value: -1 }]
  filterBarData?.Clubs?.forEach((item) => {
    clubList?.push({ name: item?.Name, value: item?.DocId })
  })

  const { GetBookedMembersRequest } = useEventsAndScheduleApi()
  const { execute, value, status } = useAsync<BookedMembersResponse, GenericErrorResponse, Record<string, unknown>>(
    GetBookedMembersRequest,
    {},
    false
  )

  useEffect(() => {
    execute()
  }, [])

  useEffect(() => {
    if (status === 'success' && value) {
      setBookedClubMembersList(value?.bookedMembersList)
    }
  }, [status, value])

  const handleOnChange = (bookedMemberId: number): void => {
    if (!selectedBookedClubMembersId?.includes(bookedMemberId)) {
      setSelectedBookedClubMembersId([...selectedBookedClubMembersId, bookedMemberId])
    } else {
      setSelectedBookedClubMembersId(selectedBookedClubMembersId?.filter((item) => item !== bookedMemberId))
    }
  }

  useEffect(() => {
    if (clubDocId && clubDocId > -1) {
      setBookedClubMembersList(
        bookedClubMembersList?.filter((item) => item?.clubDocIds?.split(',')?.includes(clubDocId.toString()))
      )
    } else if (clubDocId && status === 'success' && value) {
      setBookedClubMembersList(value?.bookedMembersList)
    }
  }, [clubDocId, status, value])

  useEffect(() => {
    if (getArgsFromUrl()?.clubMembers?.length > 0) {
      const selectedBookedMembersIdArr: number[] = []
      bookedClubMembersList?.forEach(
        (item) =>
          getArgsFromUrl()?.clubMembers?.includes(item?.memberDocId?.toString()) &&
          selectedBookedMembersIdArr.push(item?.memberDocId)
      )
      setSelectedBookedClubMembersId(selectedBookedMembersIdArr)
    }
  }, [bookedClubMembersList])

  useEffect(() => {
    const clubMembers = selectedBookedClubMembersId?.length > 0 ? selectedBookedClubMembersId : []
    setCurrentArgs({ ...currentArgs, clubMembers })
  }, [selectedBookedClubMembersId])

  return (
    <div className="flex flex-col">
      <div className="w-full shadow-sm pb-1 px-1">
        <SimpleSelect
          fieldsize="md"
          items={clubList}
          label=""
          onValueChange={(value: any) => setClubDocId(value)}
          hideBorder
        />
      </div>
      <div className="px-2 shadow-sm mt-6">
        <TextField
          className="!mb-2 !-mt-4"
          leftIcon={<Search className="w-4" />}
          placeholder="Type to search"
          fieldsize="md"
          onValueChange={(value: any) => setSearchKey(value)}
          type="text"
          hideBorder
        />
      </div>
      {bookedClubMembersList?.map((item, index) => (
        <div
          key={index}
          className={classNames(
            'inline-flex gap-2 items-center p-3 text-sm bg-jg-grey-50',
            searchKey &&
              item?.firstName
                ?.toLowerCase()
                ?.concat(' ', item?.lastName?.toLowerCase())
                ?.search(searchKey?.trim()?.toLowerCase()) === -1 &&
              'hidden'
          )}
        >
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 cursor-pointer"
            checked={selectedBookedClubMembersId?.includes(item?.memberDocId)}
            onChange={() => handleOnChange(item?.memberDocId)}
            id={`booked-member-${item?.memberDocId}`}
          />
          <label
            className="cursor-pointer"
            htmlFor={`booked-member-${item?.memberDocId}`}
          >{`${item?.firstName} ${item.lastName}`}</label>
        </div>
      ))}
    </div>
  )
}

export default FilterByClubMember
