import { EntityExtDataCaptureItemDefinationType } from '../../types'
import DataCaptureFormComponent from '../DataCaptureFormComponent'

type GenericDataCaptureFormProps = {
  items: EntityExtDataCaptureItemDefinationType[]
  index: number
  entityId: number
  readOnly?: boolean
}

const EntityExtGenericDataCaptureForm = ({ items, index, entityId, readOnly }: GenericDataCaptureFormProps) => {
  items.sort(function (a, b) {
    return a.Sequence > b.Sequence ? 1 : -1
  })
  return (
    <>
      {items.map((e, i) => {
        return (
          <DataCaptureFormComponent readOnly={readOnly} entityId={entityId} index={index} key={i} compDefination={e} />
        )
      })}
    </>
  )
}
export default EntityExtGenericDataCaptureForm
