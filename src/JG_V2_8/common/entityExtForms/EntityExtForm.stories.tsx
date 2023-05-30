import { createSBItem, createSBTpl } from 'src/sb/JGStoryBook'
import EntityExtSchemaProvider, { useEntityExtSchemaStore } from './providers/EntityExtensionSchemaProvider'
import _ from 'lodash'
import { useEffect } from 'react'
import EventBookingDataCaptureForm from './dataCaptureForms/eventBooking/EventBookingDataCaptureForm'
const demodata =
  '[{"ProductId":127912,"Id":213,"Sequence":1,"Type":"form","Config":"{\\"tabName\\":\\"Personal Information\\",\\"icon\\":\\"\\",\\"IsPublic\\":true,\\"DefaultFormInCategory\\":\\"Sports Coach UK\\",\\"DefaultFormInSubCategory\\":\\"Welsh Coach\\",\\"$dataFieldInfo\\":{\\"compId\\":1093,\\"$class\\":\\"MA_TabItem\\"},\\"items\\":[{\\"ExId\\":1022,\\"ItemId\\":1094,\\"ParentId\\":1093,\\"Name\\":null,\\"Class\\":\\"MA_TextField\\",\\"Config\\":\\"{\\\\\\"label\\\\\\":\\\\\\"How many years have you been coaching?\\\\\\",\\\\\\"tooltip\\\\\\":\\\\\\"\\\\\\",\\\\\\"placeholder\\\\\\":\\\\\\"2 years\\\\\\",\\\\\\"isRequired\\\\\\":true}\\",\\"FieldId\\":1052,\\"Sequence\\":1,\\"SyncGuid\\":\\"23469623-D33D-45D5-B8FF-E946834FBF8E\\",\\"$ownerType\\":\\"Ngb\\",\\"$name\\":\\"How many years have you been coaching?\\"}]}"},{"ProductId":127912,"Id":214,"Sequence":2,"Type":"sectionHeader","Config":"{\\"heading\\":\\"React test heading\\",\\"subHeading\\":\\"Sub heading text sdsadasdsadsdsadsdsd\\"}"},{"ProductId":127912,"Id":215,"Sequence":3,"Type":"declaration","Config":"{\\"content\\":\\"<p fr-original-style=\\\\\\"\\\\\\" style=\\\\\\"margin-top: 0px; margin-bottom: 1rem; box-sizing: border-box;\\\\\\">Caption text sadas sad asdas dasdsdsadasd</p>\\"}"}]'
const ExtForm = () => {
  return (
    <div className="w-[400px]">
      <EntityExtSchemaProvider clubEntityExtOwnerId={127177} extensionArea="Event">
        <EventBookingDataCaptureForm
          index={0}
          entityId={127912}
          formTitle="Ticket 1 - Catering Manager"
          fieldItems={JSON.parse(demodata)}
        />
      </EntityExtSchemaProvider>
    </div>
  )
}

export default createSBItem(ExtForm, { section: 'EntityExtension', title: 'Booking Form' })

const tplBasic = createSBTpl<typeof ExtForm>((args) => {
  return <ExtForm />
})
export const CardBasic = tplBasic.bind({})
