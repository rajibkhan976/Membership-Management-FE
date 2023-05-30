import { RoutableTab, RoutableTabs } from '@jg/common/comps'
import { useLocation, useParams } from 'react-router-dom'

const RoutableTabsTesting = () => {
  const location = useLocation()
  console.log(location)
  return (
    <RoutableTabs basePath={location.pathname}>
      <RoutableTab path="tab1" title="Tab 1">
        <>Tab 1 content</>
      </RoutableTab>
      <RoutableTab path="tab2" title="Tab 2">
        <>Tab 2 content</>
      </RoutableTab>
    </RoutableTabs>
  )
}
export default RoutableTabsTesting
