/*
  This example requires Tailwind CSS v2.0+

  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { FolderIcon } from '@heroicons/react/outline'
import classNames from 'classnames'
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom'
import { Dropdown, DropdownItem } from '@comps/uiComps'
import logout from '../dataAPIs/authentications/Logout'
import { useAppStore } from '@jg/hooks'

/* const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
  { name: 'Team', href: '#', icon: UsersIcon, current: false },
  { name: 'Projects', href: '#', icon: FolderIcon, current: false },
  { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
  { name: 'Documents', href: '#', icon: InboxIcon, current: false },
  { name: 'Reports', href: '#', icon: ChartBarIcon, current: false },
] */
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

export default function SidebarLayout() {
  const { Views: views } = useAppStore()
  const protectedViews = views.Protected
  const navigate = useNavigate()
  const navigation = protectedViews.map((e: any) => ({
    name: e.name,
    path: e.path,
    icon: FolderIcon,
    title: e.title,
    current: false,
  }))
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div>
        {/* Static sidebar for desktop */}

        <div className="flex flex-col flex-1">
          <div className="sticky top-0 z-10 flex-shrink-0 flex h-[52px] bg-white shadow">
            <div className="flex-1 px-4 flex justify-between bg-[#008345]">
              <div className="flex-1 flex" />
              <div className="ml-4 flex items-center md:ml-6">
                {/* Profile dropdown */}
                <Dropdown
                  text="Navigate to"
                  fillType="solid"
                  onSelect={(value) => {
                    if (value === 'logout') {
                      logout(() => {
                        navigate('/')
                        location.reload()
                      })
                    } else navigate(value)
                  }}
                >
                  {navigation.map((item, i) => {
                    return <DropdownItem key={i} groupName="ql" value={item.path} name={item.title || item.name} />
                  })}
                  <DropdownItem groupName="auth" value="logout" name="Logout" />
                </Dropdown>
              </div>
            </div>
          </div>

          <main>
            <div className="mx-auto">
              {/* Replace with your content */}

              <Outlet />

              {/* /End replace */}
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
