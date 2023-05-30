import { useState } from 'react'
import { MyBookingsDetails } from '@jg/common/types/eventsAnsSchedules/MyBookingsDetailsResponse'
import { EventInfo } from '@jg/common/types'
import { Currency } from '@jg/utils'
import { Avatar } from '@comps/uiComps'
import { ReactComponent as DownloadIcon } from '@jg/assets/images/DownloadIcon.svg'
import { ReactComponent as RegistrationFormIcon } from '@jg/assets/images/RegistrationFormIcon.svg'
import { useEventSettingsContext } from '../../providers/EventSettingsProvider'
import AppStore from '@jg/store/store'
import ViewRegistrationFormData from './components/comps/viewRegistrationFormData/ViewRegistrationFormData'
import { DataCaptureItem } from '@jg/common/types/eventsAnsSchedules/TicketInfo'
import { report } from '@jg/utils/ParentalServices'

type TicketBookingSliderContentProps = {
  ticketBookingInfoList: MyBookingsDetails[] | undefined
  eventDetails: EventInfo
  dataCaptureItems?: DataCaptureItem[]
  ticketDocId: number
}

const TicketBookingSliderContent = (props: TicketBookingSliderContentProps) => {
  const { ticketBookingInfoList, eventDetails, dataCaptureItems, ticketDocId } = props
  const { systemSettings } = useEventSettingsContext()
  const BaseAppPath = AppStore.getState().BaseAppPath
  const [showRegistrationForm, setShowRegistrationForm] = useState<string[]>([])
  const currencySymbol = Currency.getSymbol(eventDetails?.priceSettings?.currency ?? '')
  const reportModule = 'Report.mvc/GetStandardOutputReport?reportModule=Finance'
  const reportType = `&format=PDF&reportType=${systemSettings['ORGANISATION.PAYMENTOUTPUTVERSION']}`

  const handleClickDownloadInvoice = (reportUrl: string): void => {
    report.download(reportUrl)
  }

  const handleClickShowRegistrationForm = (id: string): void => {
    if (!showRegistrationForm?.includes(id)) {
      setShowRegistrationForm([id])
    } else {
      setShowRegistrationForm([])
    }
  }

  return (
    <div className="overflow-y-auto w-full h-full">
      {ticketBookingInfoList?.map((item: MyBookingsDetails, index: number) => (
        <div key={index} className="w-full flex flex-col shadow-sm">
          <div className="w-full flex px-2 py-2.5 text-sm bg-jg-grey-100">
            <div className="flex flex-col w-6/12 truncate">
              <div className="w-full flex-auto truncate text-jg-grey-700 font-medium">{eventDetails?.name}</div>
              <div className="w-[200px] h-5 flex-auto truncate text-jg-grey-500 font-medium">
                {eventDetails?.details?.replaceAll(/(<([^>]+)>)/gi, '')}
              </div>
              <div className="flex-auto text-jg-grey-700 font-medium">{`Invoice ID #${item?.paymentReceiptDocId}`}</div>
            </div>
            <div className="flex flex-col items-end w-6/12">
              <div className="flex-auto text-jg-grey-700 font-medium">{`${currencySymbol} ${item?.totalAmount}`}</div>
              <div className="flex-auto text-jg-grey-500 font-medium">{`${item?.totalTickets} ${
                item?.totalTickets > 1 ? 'tickets' : 'ticket'
              } booked`}</div>
              <div className="flex-auto text-jg-green-600 font-medium">
                <div
                  className="flex cursor-pointer"
                  onClick={() =>
                    handleClickDownloadInvoice(
                      `${BaseAppPath}${reportModule}${reportType}&reportParameters=DocId|${item?.paymentReceiptDocId};MerchantID|0;`
                    )
                  }
                >
                  <DownloadIcon className="mr-2" />
                  {`Invoice Download`}
                </div>
              </div>
            </div>
          </div>
          {item?.rows?.map((row) => (
            <div key={row?.docId} className="flex w-full flex-col border-b">
              <div className="flex w-full p-2 text-sm">
                <div className="flex w-1/3">
                  <div className="mr-2 mt-1">
                    <>{console.log('row', row)}</>
                    <Avatar src={row?.image} name={row?.profilePicURL} size="md" bordered={true} />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex-auto text-jg-grey-700 font-medium">{`${row?.firstName} ${row?.lastName}`}</div>
                    <div className="flex-auto text-jg-grey-500 font-medium">{row?.MID}</div>
                  </div>
                </div>
                <div className="flex flex-col font-medium w-1/3">
                  <div className="flex-auto text-jg-grey-600">{row?.emailAddress}</div>
                  <div className="flex-auto text-jg-grey-500">{row?.town}</div>
                </div>
                <div className="flex justify-end items-center text-jg-grey-500 font-medium w-1/3">
                  <div className="flex justify-end mr-1.5">{`${row?.noOfBooking} ${
                    row?.noOfBooking > 1 ? 'tickets' : 'ticket'
                  } booked`}</div>
                  {row?.isFormAvailable ? (
                    <RegistrationFormIcon
                      className="cursor-pointer"
                      onClick={() => handleClickShowRegistrationForm(row?.docId)}
                    />
                  ) : null}
                </div>
              </div>
              {showRegistrationForm?.includes?.(row?.docId) && (
                <div className="p-2 border-t">
                  <ViewRegistrationFormData
                    ownerId={eventDetails.ownerEntity?.id || -1}
                    ownerType={eventDetails.ownerEntity?.type || 'Ngb'}
                    ticketDocId={ticketDocId}
                    noOfBooking={row?.noOfBooking}
                    bookingId={Number(row.docId)}
                    dataCaptureItems={dataCaptureItems}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default TicketBookingSliderContent
