import { useEffect } from 'react'
import { CompBaseProps } from '@comps/uiComps'
import { useRouter } from '@jg/hooks'
import { useWidgetContext } from 'jg-widget'
import useNavigateWithArgsMB from '../../hooks/useNavigateWithArgsMB'
import { useSessionUserContext } from '@jg/providers/SessionUserProvider'
import useFilterBarData from '../../hooks/useFilterBarData'
import { useEventsAndScheduleApi } from '@jg/common/dataAPIs'
import { GenericErrorResponse } from '@jg/common/types'
import { BookedMembersResponse } from '@jg/common/types/eventsAnsSchedules/BookedMembersResponse'
import { useAsync } from '@jg/hooks'
import FilterBar, { FilterBarItem } from '@jg/common/comps/filter/FilterBar'
import ListPlaceHolder from '@jg/common/comps/loader/placeholders/ListPlaceHolder'
import LabelForFamilyMember from './LabelForFamilyMember'
import LabelForClubMember from './LabelForClubMember'
import MyBookingFilterLabel from './MBFilterLabel'
import FilterByClubMember from './FilterByClubMember'
import FilterByFamilyMember from './FilterByFamilyMember'
import MyBookingOptionCategory from './MyBookingOptionCategory'

type MyBookingFilterProps = CompBaseProps & {
  onReady: () => void
}

export const getMyBookingItems = (): FilterBarItem[] => {
  const itemBuffer: FilterBarItem[] = [
    {
      title: 'Family Members',
      name: 'familyMembers',
      filterOptionComp: <FilterByFamilyMember />,
      group: 'one',
      formatedOptionValueComp: <LabelForFamilyMember />,
    },
    {
      title: 'Club Members',
      name: 'clubMembers',
      filterOptionComp: <FilterByClubMember />,
      group: 'one',
      formatedOptionValueComp: <LabelForClubMember />,
    },
    {
      title: 'Category',
      name: 'category',
      filterOptionComp: <MyBookingOptionCategory />,
      group: 'one',
      formatedOptionValueComp: <MyBookingFilterLabel name={'category'} determineActive={() => false} />,
    },
    {
      title: 'Online Events',
      name: 'isOnlyOnline',
      filterOptionComp: null,
      group: 'two',
      formatedOptionValueComp: <MyBookingFilterLabel name={'isOnlyOnline'} determineActive={(x) => !!x} isToggle />,
    },
    {
      title: 'Past Bookings',
      name: 'allowPastBooking',
      filterOptionComp: null,
      group: 'two',
      formatedOptionValueComp: <MyBookingFilterLabel name={'allowPastBooking'} determineActive={(x) => !!x} isToggle />,
    },
  ]
  return itemBuffer
}

const MyBookingFilter = ({ onReady, className }: MyBookingFilterProps) => {
  //const { onRenderFirst } = useWidgetComponent('MyBookingFilter')
  // const myBookingData = useEventStore((state) => state.myBookingData)
  const { getSearchPath, defaultArgs } = useNavigateWithArgsMB()
  const { filterBarData } = useFilterBarData()
  const { basePath } = useWidgetContext()
  const { navigate } = useRouter()
  const { loadFamilyInfo, familyInfo } = useSessionUserContext()
  const { Members } = familyInfo || {}

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
    if (filterBarData !== null) loadFamilyInfo()
  }, [filterBarData])

  useEffect(() => {
    // setCurrentArgs({ ...defaultArgs, ...getArgsFromUrl() })
    if (familyInfo !== null && status === 'success') onReady()
  }, [familyInfo, status])

  const renderFilterBarItems = (): FilterBarItem[] => {
    const filterBarItems = getMyBookingItems()
      ?.filter((item: any) => {
        if (Members?.length === 0) {
          return item?.name !== 'familyMembers'
        }
        return item
      })
      ?.filter((filteredItem: any) => {
        if (status === 'success' && value && value?.bookedMembersList?.length === 0) {
          return filteredItem?.name !== 'clubMembers'
        }
        return filteredItem
      })
    return filterBarItems
  }

  return (
    <div className={className}>
      {familyInfo ? (
        <FilterBar
          onReset={() => {
            navigate({
              pathname: `${basePath}${'my-bookings'}/`,
              search: getSearchPath(defaultArgs),
            })
          }}
          items={renderFilterBarItems()}
        />
      ) : (
        <ListPlaceHolder />
      )}
    </div>
  )
}

export default MyBookingFilter
