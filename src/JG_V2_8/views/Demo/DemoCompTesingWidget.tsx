import { createWidget } from 'jg-widget'
import { Outlet, useNavigate } from 'react-router-dom'

function JGWidgetCompDemoLayout({ items = [] }: { items?: any[] }) {
  const navigate = useNavigate()

  return (
    <>
      <div className="pb-3">
        <label htmlFor="complist" className="inline text-sm font-medium text-gray-700 mr-2">
          Components
        </label>
        <select
          onChange={(e) => {
            console.log(e.target.value)
            navigate(e.target.value)
          }}
          id="complist"
          name="complist"
          className=" inline w-auto px-1  py-2 text-base border focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          defaultValue={items[0].path}
        >
          {items.map((e: any, index) => (
            <option key={index} value={e.path}>
              {e.name}
            </option>
          ))}
        </select>
      </div>
      <Outlet />
    </>
  )
}
const DemoCompTesingWidget = createWidget(({ config, routePath }) => {
  const children = []
  const navItems = []
  // const _config:{ items:{}[] } = config;
  const { items } = config as {
    items: { name: string; element: JSX.Element }[]
  }

  for (let i = 0; i < items.length; i++) {
    if (i == 0) {
      navItems.push({ name: items[i].name, path: `${routePath}/` })
      children.push({
        index: true,
        path: `${routePath}/`,
        element: items[i].element,
      })
    } else {
      navItems.push({
        name: items[i].name,
        path: `${routePath}/${items[i].name}`,
      })
      children.push({
        path: `${routePath}/${items[i].name}`,
        element: items[i].element,
      })
    }
  }

  return {
    path: routePath,
    element: <JGWidgetCompDemoLayout items={navItems} />,
    children,
  }
})

export default DemoCompTesingWidget
