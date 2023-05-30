import { Avatar, Badge, JGListbox } from '@comps/uiComps'
import Checkbox from '@comps/uiComps/formControls/checkbox'
import ListBox from '@comps/uiComps/forms/ListBox/ListBox'
import QtyPicker from '@comps/uiComps/forms/QtyPicker/QtyPicker'
import FAQ from '@jg/common/comps/float-helper-button/FAQ'
import { SearchBar, SearchBox } from '@jg/common/comps/searchBar'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/outline'
import { MenuUp } from '@comps/uiComps/Icons'
import JGListboxItem from '@comps/uiComps/JGListbox/JGListboxItem'
import ToggleButton from '@jg/common/comps/filter/ToggleButton'
import Toggle from '@comps/uiComps/Toggle/Toggle'
export type BookingMemberNewProps = {
  members?: { imgSrc?: string; memberId?: string; name?: string; memberLocation?: string; memberEmail?: string }[]
  clubMembers?: { imgSrc?: string; memberId?: string; name?: string; memberLocation?: string; memberEmail?: string }[]
}

export const sortFilterOptions = [
  { name: 'First Name', value: 'fname' },
  { name: 'Last Name', value: 'lname' },
]

const BookingMemberNew = ({ members, clubMembers }: BookingMemberNewProps) => {
  return (
    <>
      <div className="w-full flex flex-row h-screen">
        <div className="w-full bg-white overflow-y-scroll">
          <Disclosure as="div" className="">
            {({ open }) => (
              <>
                <div className="flex bg-jg-metal-50 px-4 py-2">
                  <Disclosure.Button className="flex w-full rounded-lg items-center">
                    <MenuUp className={`${open ? 'rotate-180 transform' : ''}  w-[9px] text-jg-metal-900 mr-[13px]`} />
                    <span className="text-globalTextSizeMd text-jg-metal-900">My Family</span>
                  </Disclosure.Button>
                  <div className="flex max-w-[250px] w-full justify-end items-center">
                    <span className="text-globalTextSizeSm font-medium text-jg-metal-500 mr-4">
                      Show Selected Member
                    </span>
                    <ToggleButton />
                  </div>
                </div>

                <Disclosure.Panel className="text-sm text-gray-500">
                  <div>
                    {members?.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-row items-center w-full justify-between p-4 border-b border-jg-metal-50"
                      >
                        <div className="flex flex-row max-w-[216px] w-full">
                          <div className="w-10 block">
                            <Avatar src={item.imgSrc} size={'xl'} />
                          </div>

                          <div className="ml-2 space-y-1">
                            <div
                              className="text-jg-metal-700 text-globalTextSizeSm font-medium
"
                            >
                              {item.name}
                            </div>
                            <div className="text-inputSizeSm text-jg-metal-300">{item.memberId}</div>
                          </div>
                        </div>

                        <div className="ml-4 max-w-[174px] w-full  space-y-1">
                          <div className="text-inputSizeSm text-jg-green-300">{item.memberEmail}</div>
                          <div
                            className="text-jg-metal-500 text-globalTextSizeSm
"
                          >
                            {item.memberLocation}
                          </div>
                        </div>
                        <div className="flex justify-center items-center max-w-[132px]">
                          <QtyPicker hideLabel onChange={() => {}} value={0} className="!mb-0" />
                        </div>
                      </div>
                    ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure as="div" className="">
            {({ open }) => (
              <>
                <div className="flex bg-jg-metal-50 px-4 py-2 ">
                  <Disclosure.Button className="flex w-full rounded-lg items-center">
                    <MenuUp className={`${open ? 'rotate-180 transform' : ''}  w-[9px] text-jg-metal-900 mr-[13px]`} />
                    <span className="text-globalTextSizeMd text-jg-metal-900">45 Members</span>
                  </Disclosure.Button>
                  <div className="text-globalTextSizeSm text-jg-metal-700 max-w-[250px] w-full">
                    Pony Club WA Direct Membership
                  </div>
                </div>
                <Disclosure.Panel className="text-sm text-gray-500">
                  <div className="border-b border-jg-metal-50">
                    <div className="flex justify-between">
                      <SearchBox placeholder="Search member" className="border-r border-jg-metal-50" />
                      <div className="flex flex-row items-center max-w-[196px] w-full">
                        {' '}
                        <div>Sortby:</div>
                        <JGListbox
                          size="md"
                          type="input"
                          className="text-jg-metal-700 !border-none w-full  !p-0 bg-jg-metal-50"
                        >
                          {sortFilterOptions.map((item, index) => (
                            // <Link
                            //   key={index}
                            //   className="flex flex-row items-center text-jg-metal-500 font-medium capitalize !leading-4 text-sm"
                            //   to={`${basePath}${item.name}`}
                            // >
                            <JGListboxItem
                              key={index}
                              name={item.name}
                              value={item.value}
                              className="text-jg-metal-700  !border-0 !p-0"
                            >
                              {item.name}
                            </JGListboxItem>
                            // </Link>
                          ))}
                        </JGListbox>
                      </div>
                    </div>
                  </div>
                  <div>
                    {clubMembers?.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-row items-center w-full justify-between p-4 border-b border-jg-metal-50"
                      >
                        <div className="flex flex-row max-w-[216px] w-full">
                          <div className="w-10 block">
                            <Avatar src={item.imgSrc} size={'xl'} />
                          </div>

                          <div className="ml-2 space-y-1">
                            <div
                              className="text-jg-metal-700 text-globalTextSizeSm font-medium
"
                            >
                              {item.name}
                            </div>
                            <div className="text-inputSizeSm text-jg-metal-300">{item.memberId}</div>
                          </div>
                        </div>

                        <div className="ml-4 max-w-[174px] w-full  space-y-1">
                          <div className="text-inputSizeSm text-jg-green-300">{item.memberEmail}</div>
                          <div
                            className="text-jg-metal-500 text-globalTextSizeSm
"
                          >
                            {item.memberLocation}
                          </div>
                        </div>
                        <div className="flex justify-center items-center max-w-[132px]">
                          <QtyPicker hideLabel onChange={() => {}} value={0} className="!mb-0" />
                        </div>
                      </div>
                    ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
        <div className="w-full bg-white overflow-y-scroll border-l border-jg-metal-50">
          <Disclosure as="div" className="">
            {({ open }) => (
              <>
                <div className="flex bg-jg-grey-50 px-4 py-2">
                  <Disclosure.Button className="flex w-full rounded-lg items-center">
                    <MenuUp className={`${open ? 'rotate-180 transform' : ''}  w-[9px] text-jg-metal-900 mr-[13px]`} />
                    {/* <span className="text-globalTextSizeMd text-jg-metal-900">My Family</span> */}
                    <div className="flex flex-row max-w-[216px] w-full items-center">
                      <div className="w-10 block">
                        <Avatar
                          src="https://media.istockphoto.com/id/1338134319/photo/portrait-of-young-indian-businesswoman-or-school-teacher-pose-indoors.jpg?b=1&s=170667a&w=0&k=20&c=7wzo05o8oXxE8K7LxzFqWYZu9HbNlGev0f1Lt-Q1_6Q="
                          size={'xl'}
                        />
                      </div>

                      <div className="ml-2 space-y-1 flex flex-col items-start">
                        <div
                          className="text-jg-metal-700 text-globalTextSizeSm font-medium
"
                        >
                          Nawrin Sultana
                        </div>
                        <span className="text-inputSizeSm text-jg-metal-300">ME000001</span>
                      </div>
                    </div>
                  </Disclosure.Button>
                </div>

                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">Lorem</Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure as="div" className="">
            {({ open }) => (
              <>
                <div className="flex bg-jg-grey-50 px-4 py-2">
                  <Disclosure.Button className="flex w-full rounded-lg items-center">
                    <MenuUp className={`${open ? 'rotate-180 transform' : ''}  w-[9px] text-jg-metal-900 mr-[13px]`} />
                    {/* <span className="text-globalTextSizeMd text-jg-metal-900">My Family</span> */}
                    <div className="flex flex-row max-w-[216px] w-full items-center">
                      <div className="w-10 block">
                        <Avatar
                          src="https://media.istockphoto.com/id/1338134319/photo/portrait-of-young-indian-businesswoman-or-school-teacher-pose-indoors.jpg?b=1&s=170667a&w=0&k=20&c=7wzo05o8oXxE8K7LxzFqWYZu9HbNlGev0f1Lt-Q1_6Q="
                          size={'xl'}
                        />
                      </div>

                      <div className="ml-2 space-y-1 flex flex-col items-start">
                        <div
                          className="text-jg-metal-700 text-globalTextSizeSm font-medium
"
                        >
                          Nawrin Sultana
                        </div>
                        <span className="text-inputSizeSm text-jg-metal-300">ME000001</span>
                      </div>
                    </div>
                  </Disclosure.Button>
                </div>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">Lorem</Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </div>
    </>
  )
}
export default BookingMemberNew
