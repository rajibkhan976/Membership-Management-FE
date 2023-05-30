import { Disclosure } from '@headlessui/react'
import { useBookATicketStoreContext } from '../../providers/BookATicketProvider'
import { MenuUp } from '@comps/uiComps/Icons'
import { JGListbox } from '@comps/uiComps'
import JGListboxItem from '@comps/uiComps/JGListbox/JGListboxItem'
import { SearchBox } from '@jg/common/comps/searchBar'
import { memo, useRef, useState } from 'react'
import BookingEntityList from './BookingEntityList'
const FastBookingEntityList = memo(BookingEntityList)
export const sortFilterOptions = [
  { name: 'First Name', value: 'FirstName' },
  { name: 'Last Name', value: 'Surname' },
  { name: 'Member Id', value: 'MID' },
  // { name: 'Town', value: 'Town' },
]
const GroupBookingEntityListClubMembers = ({
  isWaitlist,
  onCollapseAction,
}: {
  isWaitlist?: boolean
  onCollapseAction: (elRef: HTMLDivElement | null, elBtn: HTMLButtonElement | null) => void
}) => {
  const [SearchValue, setSearchValue] = useState<string>('')
  const [sortType, setSortType] = useState<any>()
  const {
    ticketInfo,
    clubs,
    clubMembers,
    familyMembers,
    asyncStatusForClubMembers,
    selectedClub,
    setSelectedClub,
    //setHideBookingEntityWhenQtyIsZero,
    //  hideBookingEntityWhenQtyIsZero,
  } = useBookATicketStoreContext((state) => ({
    ticketInfo: state.ticketInfo,
    clubs: state.clubs,
    clubMembers: state.clubMembers,
    familyMembers: state.familyMembers,
    asyncStatusForClubMembers: state.asyncStatusForClubMembers,
    selectedClub: state.selectedClub,

    setSelectedClub: state.setSelectedClub,
    // setHideBookingEntityWhenQtyIsZero: state.setHideBookingEntityWhenQtyIsZero,
    // hideBookingEntityWhenQtyIsZero: state.hideBookingEntityWhenQtyIsZero,
  }))
  const hasRegistrationForm = ticketInfo.dataCaptureItems && ticketInfo.dataCaptureItems.length > 0
  const collapssiblePanelRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  console.log('clubmembers', clubMembers)
  return (
    <>
      {clubs.length > 0 && (
        <div className="">
          <>
            <div className="flex flex-col md:flex-row bg-jg-grey-50 border-b border-jg-metal-50">
              <button
                ref={buttonRef}
                onClick={() => {
                  onCollapseAction(collapssiblePanelRef.current, buttonRef.current)
                }}
                className="flex w-full rounded-lg items-center border-r border-jg-metal-50 px-4 py-3 "
              >
                <MenuUp className={` rotate-180  w-[9px] text-jg-metal-900 mr-[13px]`} />
                <span className="text-globalTextSizeMd text-jg-metal-900">{clubMembers.length} Members</span>
              </button>
              <div className="text-globalTextSizeSm bg-white text-jg-metal-700 w-full  pl-5 border-l border-jg-metal-50 pr-4 py-1">
                <JGListbox
                  size="md"
                  type="input"
                  className="text-jg-metal-700 !border-none w-full !p-0 bg-jg-metal-50"
                  onChange={(listOption, selectedIndex) => {
                    setSelectedClub(selectedIndex)
                  }}
                >
                  {clubs?.map((item, index) => (
                    <JGListboxItem
                      key={index}
                      name={item.Name as string}
                      value={item.PostCode ? item.PostCode : (item.Name as string)}
                      className="text-jg-metal-700  !border-0 !p-0"
                    >
                      {item.Name}
                    </JGListboxItem>
                  ))}
                </JGListbox>
              </div>
            </div>
            <div ref={collapssiblePanelRef} className="text-sm text-gray-500">
              <div className="border-b border-jg-metal-50">
                <div className="flex justify-between">
                  <SearchBox
                    placeholder="Search member"
                    className="border-r border-jg-metal-50"
                    onChange={(value: string) => {
                      setSearchValue(value)
                    }}
                  />
                  <div className="flex flex-row items-center max-w-[196px] w-full">
                    <div>Sortby:</div>
                    <JGListbox
                      size="md"
                      type="input"
                      className="text-jg-metal-700 !border-none w-full  !p-0 bg-jg-metal-50"
                      onChange={(e) => {
                        setSortType(e.value as string)
                        // console.log('value:', e.value, 'sortType:', sortType)
                      }}
                      selectedValue={sortFilterOptions[0].value}
                    >
                      {sortFilterOptions.map((item, index) => (
                        <JGListboxItem
                          key={index}
                          name={item.name}
                          value={item.value}
                          className="text-jg-metal-700  !border-0 !p-0"
                        >
                          {item.name}
                        </JGListboxItem>
                      ))}
                    </JGListbox>
                  </div>
                </div>
              </div>
              <div>
                {asyncStatusForClubMembers && asyncStatusForClubMembers === 'success' ? (
                  clubMembers.length > 0 ? (
                    <FastBookingEntityList
                      hasDatacaptureForm={!!hasRegistrationForm}
                      isWaitlist={!!isWaitlist}
                      list={bookingSort(
                        clubMembers.filter((cm) => !familyMembers.find((fm) => fm.DocId === cm.DocId)),
                        sortType
                      )}
                      group="club"
                      parentEntityId={selectedClub?.DocId || 0}
                      searchKey={SearchValue}
                    />
                  ) : (
                    <div className="text-jg-metal-700 text-globalTextSizeSm font-medium p-4">
                      Sorry! No member found in this selected club.
                    </div>
                  )
                ) : asyncStatusForClubMembers === 'pending' ? (
                  <div className="text-jg-metal-700 text-globalTextSizeSm font-medium p-4">Loading...</div>
                ) : (
                  <>Loadding</>
                )}
              </div>
            </div>
          </>
        </div>
      )}
    </>
  )
}
export default GroupBookingEntityListClubMembers
const bookingSort = (items: any[], fieldName: string) => {
  //@ts-ignore
  // if (!items[fieldName]) {
  //   return items
  // }
  return [...items].sort((a, b) => {
    if (typeof a === 'number' && typeof b === 'number') {
      return a - b
    }

    const item1 = a[fieldName].toUpperCase() // ignore upper and lowercase
    const item2 = b[fieldName].toUpperCase() // ignore upper and lowercase

    if (item1 < item2) {
      return -1
    }
    if (item1 > item2) {
      return 1
    }

    // names must be equal
    return 0
  })
}
