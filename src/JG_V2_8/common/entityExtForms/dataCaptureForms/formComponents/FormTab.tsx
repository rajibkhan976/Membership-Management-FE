import { DataCaptureComponentBase } from './MA_Heading'
import { useEntityExtSchemaStore } from '../../providers/EntityExtensionSchemaProvider'
import { UiComp } from '@jg/common/dataAPIs/entityExtensions/schemas/EntityExtSchema'
import _ from 'lodash'

import FormTabInner from './FormTabInner'

type FormTabProps = DataCaptureComponentBase & {
  tabName?: string
  icon?: string
  IsPublic?: boolean
  DefaultFormInCategory?: string
  DefaultFormInSubCategory?: string
  items: UiComp[]
  $dataFieldInfo?: { compId: number; $class: string }
}
export default ({ tabName, $dataFieldInfo, $index, $entityId, $readOnly }: FormTabProps) => {
  const { getUiCompByItemId, getUiCompsByParentId } = useEntityExtSchemaStore((state) => ({
    getUiCompByItemId: state.getUiCompByItemId,
    getUiCompsByParentId: state.getUiCompsByParentId,
  }))
  const tab = getUiCompByItemId?.($dataFieldInfo?.compId || -1)
  if (tab) {
    const items = getUiCompsByParentId?.(tab.ItemId) || []
    items.sort(function (a, b) {
      return a.Sequence > b.Sequence ? 1 : -1
    })
    return <FormTabInner readOnly={$readOnly} entityId={$entityId} index={$index} tab={tab} items={items} />
  } else return <>No form found</>
}
