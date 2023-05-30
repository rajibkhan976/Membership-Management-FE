import { useState, useEffect } from 'react'
import { useAsync } from '@jg/hooks'
import { GenericErrorResponse } from '@jg/common/types'
import { GetMyBookingsDetailsParams } from '@jg/common/dataAPIs/eventsAnsSchedules'
import { MyBookingsDetailsResponse } from '@jg/common/types/eventsAnsSchedules/MyBookingsDetailsResponse'
import Drawer from '@jg/common/comps/drawer/Drawer'
import TicketBookingSliderContent from './TicketBookingSliderContent'
import { useEventsAndScheduleApi } from '@jg/common/dataAPIs'
import { EventInfo } from '@jg/common/types'
import { DataCaptureItem } from '@jg/common/types/eventsAnsSchedules/TicketInfo'
import StatusDialog from '@jg/common/comps/statusdialog/StatusDialog'
import StackedAvatars from '@comps/uiComps/Avatars/StackedAvatar'
import Avatars from '@comps/uiComps/Avatars'
import useEventStore from '../../store/useEventStore'

type BookedTicketSliderProps = {
  eventData: EventInfo
  noOfBooking: number
  ticketDocId: number
  dataCaptureItems?: DataCaptureItem[]
}

const BookedTicketSlider = (props: BookedTicketSliderProps) => {
  const { eventData, noOfBooking, ticketDocId, dataCaptureItems } = props
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const { GetMyBookingsDetailsRequest } = useEventsAndScheduleApi()
  const setMyBookingsDetails = useEventStore((state) => state.setMyBookingsDetails)
  const { execute, value, status } = useAsync<
    MyBookingsDetailsResponse,
    GenericErrorResponse,
    GetMyBookingsDetailsParams
  >(GetMyBookingsDetailsRequest, { ProductDocId: ticketDocId }, false)

  useEffect(() => {
    if (ticketDocId) {
      execute()
    }
  }, [ticketDocId])

  useEffect(() => {
    if (status === 'success' && value?.myBookingsDetails && value?.myBookingsDetails?.length > 0) {
      setMyBookingsDetails(value?.myBookingsDetails)
    }
  }, [status, value])

  const handleOnClickViewDetails = () => {
    if (status === 'success' && value?.myBookingsDetails && value?.myBookingsDetails?.length > 0) {
      setIsOpen(true)
    } else {
      setIsDialogOpen(true)
    }
  }

  return (
    <div className="flex text-sm mt-1 items-center">
      <div className="inline-flex">
        <div className="flex gap-x-1 items-center justify-start sm:justify-end -space-x-2 overflow-hidden">
          <StackedAvatars size="xs" negativeSpace={2} numOfAvatar={2}>
            {value?.myBookingsDetails.map((row) =>
              row.rows.map((item, index) =>
                item.image ? (
                  <Avatars key={index} src={`${item.image}`} size={'xs'} bordered={false} />
                ) : (
                  <Avatars shape="circular" size="md" />
                )
              )
            )}
          </StackedAvatars>
          {noOfBooking && noOfBooking > 2 ? (
            <div className="flex items-center justify-center bg-jg-grey-50 border-jg-metal-100 text-jg-metal-500 border h-6 rounded-full min-w-[26px] text-globalTextSizeSm font-medium">
              {noOfBooking - 2}+
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="inline-flex px-1">{`${noOfBooking} Booked.`}</div>
      <div
        className="inline-flex font-semibold text-jg-green-600 cursor-pointer"
        onClick={handleOnClickViewDetails}
      >{`View Details`}</div>
      <Drawer
        isOpen={isOpen}
        openDrawer={() => setIsOpen(true)}
        closeDrawer={() => setIsOpen(false)}
        title="Booking Details"
        shouldCloseOnBodyClick
        showCrossButton
        drawerContent={
          <TicketBookingSliderContent
            ticketDocId={ticketDocId}
            dataCaptureItems={dataCaptureItems}
            eventDetails={eventData}
            ticketBookingInfoList={value?.myBookingsDetails}
          />
        }
        showFrom="Right"
      />
      <StatusDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        titleText={'Alert'}
        descriptionText={'No data found.'}
        closeBtnText="Ok"
        showDefaultActionBtn={false}
        dialogStatus={'warning'}
      />
    </div>
  )
}

export default BookedTicketSlider
