import { Fragment } from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { Menu, Transition } from '@headlessui/react'

type MenuButtonProps = {
  items: string[]
  selectedItem: string
  selectItem: (item: string) => void
}

const MenuButton = (props: MenuButtonProps) => {
  const { items, selectedItem, selectItem } = props

  return (
    <div className="md:ml-4 flex items-center">
      <Menu as="div" className="relative w-24">
        <Menu.Button
          type="button"
          className="flex items-center text-justify rounded-sm w-full border border-jg-grey-300 bg-white py-2 pl-3 pr-2 text-sm md:text-md font-medium text-gray-900"
        >
          <span className="w-2/3">{selectedItem}</span>
          <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="focus:outline-none absolute right-0 w-32 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50">
            {items &&
              items.length > 0 &&
              items.map((element: string, index: number) => (
                <div className="py-1" key={index}>
                  <Menu.Item
                    as="div"
                    className="cursor-pointer px-3 py-2 text-sm md:text-md font-medium text-gray-900"
                    onClick={() => selectItem(element)}
                  >
                    {element}
                  </Menu.Item>
                </div>
              ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default MenuButton
