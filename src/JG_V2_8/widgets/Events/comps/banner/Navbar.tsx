import { CalendarMonth, TableAccount } from '@comps/uiComps/Icons'
import { AdjustmentsIcon, ArrowLeftIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import { useWidgetContext } from 'jg-widget'

import { Link, NavLink, useLocation, useMatch } from 'react-router-dom'
import useNavigateWithArgs from '../hooks/useNavigateWithArgs'
import useEventStore from '../../store/useEventStore'
import PostcodeDD from '../finder/PostcodeDD'
import { EventWidgetConfigType, useEventConfig } from '../../EventWidget'
import { useSgininContext } from '@jg/providers/Signin/SigninProvider'
import AppStore from '@jg/store/store'
import { useRouter } from '@jg/hooks'

const rightNavItems = [
  {
    to: 'my-bookings/',
    icon: <TableAccount className="inline w-6" />,
    text: 'My Bookings',
  },
  {
    to: 'calendar/',
    icon: <CalendarMonth className="inline w-6" />,
    text: 'Calendar',
  },
  {
    to: 'browse/',
    icon: <AdjustmentsIcon className="inline w-5" />,
    text: 'Find Event',
  },
]
function Navbar() {
  const { esc } = useRouter()
  const { basePath, config } = useWidgetContext()
  const isHome = useMatch(basePath)
  const BaseAppPath = AppStore((state) => state.BaseAppPath)
  const lcation = useLocation()
  const isFilterBarReady = useEventStore((state) => state.filterBarReadyStatus)

  // console.log('basePath',basePath);
  const { getSearchPath } = useNavigateWithArgs()
  const activeNav = rightNavItems.find((e) => e.to === lcation.pathname.split(basePath)[1])
  const { isEvent } = useEventConfig()
  const title = isEvent ? activeNav?.text : 'Find Items'

  const widgetConfig = config as EventWidgetConfigType
  const { isPublic, mode } = widgetConfig

  const { showSigninOrSginupModal } = useSgininContext()

  return (
    <>
      <div
        className={
          isHome
            ? 'jg-container py-4  text-jg-grey-50 mx-auto flex justify-center sm:justify-between items-center w-full'
            : 'jg-container py-4 text-jg-grey-50 mx-auto flex justify-between items-center w-full'
        }
      >
        <div
          className={classNames(
            'inline-flex items-center flex-none sm:w-64 font-medium text-globalTextSizeLg md:text-globalTextSizeXl'
          )}
        >
          <NavLink to={basePath} className={classNames(isHome ? 'jg-hidden' : '')}>
            <ArrowLeftIcon className="inline w-6" />
          </NavLink>
          {!isHome && <span className="ml-2">{title}</span>}
        </div>
        {!isHome && isEvent && (
          <div className="jg-hidden md:inline-block text-white min-w-0">{isFilterBarReady && <PostcodeDD />}</div>
        )}
        <div
          className={classNames(
            isHome
              ? 'flex-none w-[233px]  text-center md:w-96 sm:text-right justify-between md:justify-end'
              : 'flex-none text-center gap-7 sm:w-64 sm:text-right',
            'inline-flex items-center md:gap-7 justify-end'
          )}
        >
          {isEvent &&
            rightNavItems.map(({ icon, text, to }, i) => (
              <NavLink
                onClick={(e) => {
                  if (isPublic && to === 'my-bookings/') {
                    showSigninOrSginupModal(() => {
                      esc('Workbench/i/r/EventsAndBookings/my-bookings/')
                    })
                    e.preventDefault()
                  }
                }}
                key={i}
                className={({ isActive }) => {
                  const navCls = ' hover:text-gray-400'
                  return classNames(
                    navCls,
                    isActive ? 'jg-hidden' : '',
                    isHome && i === 2 ? 'jg-hidden' : '',
                    isHome && 'flex'
                  )
                }}
                to={
                  to === 'calendar/' || to === 'browse/' ? `${basePath}${to}${getSearchPath({})}` : `${basePath}${to}`
                }
              >
                {icon}
                <span
                  className={
                    isHome
                      ? 'flex md:inline text-globalTextSizeLg md:text-globalTextSizeMd font-medium ml-1 md:ml-2'
                      : 'jg-hidden md:inline text-globalTextSizeLg md:text-globalTextSizeMd font-medium ml-1 md:ml-2'
                  }
                >
                  {text}
                </span>
              </NavLink>
            ))}
        </div>
      </div>
      {!isHome && isEvent && (
        <div className="md:jg-hidden mt-1.5 text-white justify-self-center min-w-0">
          {isFilterBarReady && <PostcodeDD />}
        </div>
      )}
    </>
  )
}
export default Navbar
