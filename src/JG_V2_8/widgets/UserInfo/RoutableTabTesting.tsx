import { CsvOutline } from '@comps/uiComps/Icons'
import { RoutableTab, RoutableTabs } from '@jg/common/comps'

const RoutableTabTesting = () => {
  return (
    <RoutableTabs basePath={''}>
      <RoutableTab icon={<CsvOutline />} path="tab1" title="Tab 1">
        <>Tab 1 content</>
      </RoutableTab>
      <RoutableTab icon={<CsvOutline />} path="tab2" title="Tab 2">
        <>Tab 2 content</>
      </RoutableTab>
    </RoutableTabs>
  )
}
export default RoutableTabTesting
