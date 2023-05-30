import call from '@jg/_core/services/data/LegacyDataService'
import EventBookingDataCaptureForm from '@jg/common/entityExtForms/dataCaptureForms/eventBooking/EventBookingDataCaptureForm'
import EntityExtGenericDataCaptureProvider from '@jg/common/entityExtForms/providers/EntityExtGenericDataCaptureProvider'
import EntityExtSchemaProvider from '@jg/common/entityExtForms/providers/EntityExtensionSchemaProvider'
import { DataCaptureItem } from '@jg/common/types/eventsAnsSchedules/TicketInfo'
import { useEffect } from 'react'
import RegistrationFormDataWrapper from './RegistrationFormDataWrapper'

type ViewRegistrationFormDataProps = {
  dataCaptureItems?: DataCaptureItem[]
  bookingId: number
  ticketDocId: number
  noOfBooking: number
  ownerId: number
  ownerType: string
}
const ViewRegistrationFormData = ({
  dataCaptureItems,
  ownerId,
  ownerType,
  bookingId,
  ticketDocId,
  noOfBooking,
}: ViewRegistrationFormDataProps) => {
  return (
    <>
      <EntityExtSchemaProvider clubEntityExtOwnerId={null} extensionArea="Event">
        <RegistrationFormDataWrapper
          ownerId={ownerId}
          ownerType={ownerType}
          ticketDocId={ticketDocId}
          entityId={bookingId}
          dataCaptureItems={dataCaptureItems}
          noOfBooking={noOfBooking}
        />
      </EntityExtSchemaProvider>
    </>
  )
}

export default ViewRegistrationFormData
