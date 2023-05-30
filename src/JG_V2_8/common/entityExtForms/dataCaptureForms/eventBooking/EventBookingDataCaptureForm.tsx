import { EntityExtDataCaptureItemDefinationType, EntityExtDataCaptureItemType } from '../../types'
import EntityExtGenericDataCaptureForm from '../genericDataCaptureForm/GenericDataCaptureForm'

type EventBookingDataCaptureFormProps = {
  index: number
  formTitle: string
  entityId: number
  fieldItems: EntityExtDataCaptureItemDefinationType[]
  allowedItems?: EntityExtDataCaptureItemType[]
  readOnly?: boolean
}

const EventBookingDataCaptureForm = ({
  formTitle,
  entityId,
  fieldItems,
  index,
  allowedItems,
  readOnly = false,
}: EventBookingDataCaptureFormProps) => {
  return (
    <EntityExtGenericDataCaptureForm
      entityId={entityId}
      index={index}
      readOnly={readOnly}
      items={allowedItems ? fieldItems.filter((e) => e.Type === allowedItems[0]) : fieldItems}
    />
  )
}

export default EventBookingDataCaptureForm
