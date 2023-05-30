import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import RootNavItem from '../comps/RootNavItem'

function RootLayout({
  routePath = '',
  navItems: items = [],
}: {
  routePath?: string
  navItems?: { to?: string; text: string }[]
}) {
  const location = useLocation()
  useEffect(() => {
    console.log('location')
  }, [])
  return (
    <>
      <div className="max-w-3xl mx-auto p-4">
        <ul className="flex border-b border-gray-100">
          {items.map((item) => (
            <li className="flex-1">
              <RootNavItem routePath={item.to} text={item.text} />
            </li>
          ))}
        </ul>
      </div>
      <Outlet />
    </>
  )
}
export default RootLayout
