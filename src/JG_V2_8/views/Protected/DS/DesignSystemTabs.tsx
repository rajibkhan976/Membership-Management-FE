import Tabs from '@comps/uiComps/Tab/Tabs'
import { ColorPalette } from '@comps/designSystem'
import Components from '../DS/Components'

function DesignSystemTabs() {
  return (
    <div className="m-10">
      <h1 className="mb-8 text-center text-xl font-bold">Design System</h1>
      <Tabs
        activeItem={0}
        items={[
          {
            content: <ColorPalette />,
            title: 'Color Palette',
          },
          {
            content: <Components />,
            title: 'Components',
          },
        ]}
        orientation="horizontal"
      />
    </div>
  )
}

export default DesignSystemTabs
