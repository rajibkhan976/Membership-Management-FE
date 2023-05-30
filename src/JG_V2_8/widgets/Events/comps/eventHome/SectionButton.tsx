import { RouteButton } from '@jg/common/comps'
import { useWidgetContext } from 'jg-widget'

function SectionButton() {
  const { basePath } = useWidgetContext()
  return <RouteButton to={`${basePath}browse/`} btnSize="md" text="See All" btnColor="primary" fillType="solid" />
}
export default SectionButton
