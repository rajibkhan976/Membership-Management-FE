import { Avatar, Button, Dropdown, DropdownItem } from '@comps/uiComps'
import { ContentCopy, MenuUp, MoreVertical, TextBoxOutline } from '@comps/uiComps/Icons'

import { Disclosure } from '@headlessui/react'

const BookingModalRightSideContent = () => {
  return (
    <div className="w-full bg-white overflow-y-scroll border-l border-jg-metal-50">
      <Disclosure as="div" className="" defaultOpen>
        {({ open }) => (
          <>
            <div className="flex bg-jg-grey-50 px-4 py-2 border-t border-b border-jg-metal-50">
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
              <div className="flex items-center">
                <Button
                  btnColor="secondary"
                  btnSize="md"
                  fillType="outline"
                  icon={<TextBoxOutline width={12} height={12} className="flex justify-center items-center" />}
                  iconPosition="left"
                  onClick={() => {}}
                  text="Save as Default"
                  className="w-36 text-globalTextSizeSm px-2 py-1 font-normal flex justify-center !ring-0 border border-jg-metal-100 bg-jg-grey-50"
                />
                <Dropdown
                  btnColor="secondary"
                  btnSize="md"
                  fillType="plain"
                  icon={<MoreVertical width={12} height={12} />}
                  onSelect={() => {}}
                  className="bg-transparent font-normal flex justify-center"
                >
                  <DropdownItem name="Copy From Default" value={1} />
                  <DropdownItem name="Set As Default" value={2} />
                  <DropdownItem name="Clear Form" value={3} />
                </Dropdown>
              </div>
            </div>

            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">Lorem</Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Disclosure as="div" className="" defaultOpen>
        {({ open }) => (
          <>
            <div className="flex bg-jg-grey-50 px-4 py-2 border-t border-b border-jg-metal-50">
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
              <div className="flex items-center">
                <Button
                  btnColor="secondary"
                  btnSize="md"
                  fillType="outline"
                  icon={<ContentCopy width={12} height={12} className="flex justify-center items-center" />}
                  iconPosition="left"
                  onClick={() => {}}
                  text="Copy from Previous"
                  className="w-40  text-globalTextSizeSm px-2 py-1 font-normal flex justify-center  !ring-0 border border-jg-metal-100 bg-jg-grey-50"
                />
                {/* <Dropdown
                    btnColor="secondary"
                    btnSize="md"
                    fillType="plain"
                    icon={<MoreVertical width={5} height={12} className="flex justify-center self-center" />}
                    onSelect={() => {}}
                    className="ml-4 bg-transparent p-0 font-normal flex justify-center"
                  >
                    <DropdownItem name="Copy From Default" value={1} />
                    <DropdownItem name="Set As Default" value={2} />
                    <DropdownItem name="Clear Form" value={3} />
                  </Dropdown> */}
                <Dropdown
                  btnColor="secondary"
                  btnSize="md"
                  fillType="plain"
                  icon={<MoreVertical width={12} height={12} />}
                  onSelect={() => {}}
                  className="bg-transparent font-normal flex justify-center"
                >
                  <DropdownItem name="Copy From Default" value={1} />
                  <DropdownItem name="Set As Default" value={2} />
                  <DropdownItem name="Clear Form" value={3} />
                </Dropdown>
              </div>
            </div>
            <Disclosure.Panel className=" px-4 pt-4 pb-2 text-sm text-gray-500">Lorem</Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  )
}

export default BookingModalRightSideContent
