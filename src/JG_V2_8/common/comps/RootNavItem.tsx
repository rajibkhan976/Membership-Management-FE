import { NavLink } from 'react-router-dom'

function RootNavItem({ routePath = '', text }: { routePath?: string; text?: string }) {
  return (
    <NavLink
      to={routePath}
      className="relative block p-4"
      // eslint-disable-next-line react/no-children-prop
      children={(e) => {
        const activeDom = e.isActive ? <span className="absolute inset-x-0 w-full h-px bg-pink-600 -bottom-px" /> : ''
        return (
          <>
            {activeDom}
            <div className="flex items-center justify-center">
              <span className="ml-3 text-sm font-medium text-gray-900"> {text} </span>
            </div>
          </>
        )
      }}
    />
  )
}

export default RootNavItem
