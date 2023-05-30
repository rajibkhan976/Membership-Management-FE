import { useCallback, useEffect, useState, useRef } from 'react'
import ContentCard from '@jg/common/comps/contents/contentCard/ContentCard'
import { Button } from '@comps/uiComps'
import SendNow from '@comps/uiComps/Icons/SVG/SendNow'
import { Download } from '@comps/uiComps/Icons'
import Drawer from '@jg/common/comps/drawer/Drawer'
import JGFetch from '@jg/common/dataAPIs'
import {
  BookedEventInfo,
  BookedEventMembersInfo,
  FailedReceiverInfo,
} from '@jg/common/types/eventsAnsSchedules/BookedEventInfo'
import QRCodeSliderContent from '../../QRCodeSliderContent'
import { EventInfo } from '@jg/common/types'
import StatusDialog from '@jg/common/comps/statusdialog/StatusDialog'
import { GDEResponse } from '@jg/common/types'

type QRCodeCardProps = {
  eventDocId: number
  eventDetails: EventInfo
}

const QRCodeCard = (props: QRCodeCardProps) => {
  const { eventDetails, eventDocId } = props
  const [bookedEventResponse, setBookedEventResponse] = useState<GDEResponse | null>(null)
  const [dialogTitle, setDialogTitle] = useState<string>('')
  const [dialogMsg, setDialogMsg] = useState<string>('')
  const dialogStatus = useRef<'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'>('warning')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [sentEmailResponse, setSentEmailResponse] = useState<GDEResponse | null>(null)

  const handleClickDownloadQRCodeBtn = useCallback(() => {
    if (bookedEventResponse?.Success && (bookedEventResponse?.Result as BookedEventInfo[])?.length > 0) {
      setIsOpen(true)
    }
    if (bookedEventResponse?.Success && (bookedEventResponse?.Result as BookedEventInfo[])?.length === 0) {
      setDialogTitle('Alert')
      setDialogMsg('No Data Found')
      dialogStatus.current = 'warning'
      setIsDialogOpen(true)
    }
  }, [bookedEventResponse])

  useEffect(() => {
    if (eventDocId > 0 && window.innerWidth > 768) {
      const args = {
        Method: 'GetBookingDetailsByEvent',
        EventDocId: eventDocId,
      }
      JGFetch(['GDE/FetchObjects'], [{ provider: 'Event', args: args }])
        .then((res: any) => {
          setBookedEventResponse(res as GDEResponse)
        })
        .catch((error) => {
          if (error) {
            setDialogTitle('Alert')
            setDialogMsg('No Data Found')
            dialogStatus.current = 'warning'
            setIsDialogOpen(true)
          }
        })
    }
  }, [eventDocId])

  const handleSendEmail = useCallback(() => {
    const data: any[] = []
    if ((bookedEventResponse?.Result as BookedEventInfo[])?.length > 0) {
      ;(bookedEventResponse?.Result as BookedEventInfo[])?.forEach((item: BookedEventInfo) => {
        item?.Rows?.forEach((row: BookedEventMembersInfo) => {
          data.push({
            ProductDocId: item?.ProductDocId,
            MemberId: row?.MemberId,
            EventQueueIds: row?.EventQueueIds,
          })
        })
      })
    }
    const args = {
      Method: 'SendEmail',
      Data: data,
    }
    if (data.length > 0) {
      JGFetch(['GDE/FetchObjects'], [{ provider: 'Event', args: args }])
        .then((res: any) => {
          setSentEmailResponse(res as GDEResponse)
        })
        .catch((error) => {
          if (error) {
            setDialogTitle('Alert')
            setDialogMsg('Email sending failed.')
            dialogStatus.current = 'warning'
            setIsDialogOpen(true)
          }
        })
    } else {
      setDialogTitle('Alert')
      setDialogMsg('No Data Found')
      dialogStatus.current = 'warning'
      setIsDialogOpen(true)
    }
  }, [bookedEventResponse])

  useEffect(() => {
    if (
      sentEmailResponse &&
      sentEmailResponse.Success &&
      (sentEmailResponse?.Result as any)?.FailedList?.length === 0
    ) {
      setDialogTitle('Success')
      setDialogMsg('Email sent successfully.')
      dialogStatus.current = 'success'
      setIsDialogOpen(true)
    }
    if (
      sentEmailResponse &&
      sentEmailResponse.Success &&
      (sentEmailResponse?.Result as any)?.FailedList?.length > 0 &&
      bookedEventResponse?.Success &&
      (bookedEventResponse?.Result as BookedEventInfo[])?.length > 0
    ) {
      const errorMsgArr: string[] = []
      ;(sentEmailResponse?.Result as any)?.FailedList?.forEach((failedItem: FailedReceiverInfo) => {
        ;(bookedEventResponse?.Result as BookedEventInfo[])?.forEach((bookedEvent: BookedEventInfo) => {
          if (failedItem?.ProductDocId === bookedEvent?.ProductDocId) {
            bookedEvent?.Rows?.forEach((row: BookedEventMembersInfo) => {
              if (row?.MemberId === +failedItem?.MemberId) {
                errorMsgArr.push(
                  `Member: ${row?.FirstName} ${row?.LastName} with Corresponding Event Queue ID:  ${failedItem?.EventQueueId}`
                )
              }
            })
          }
        })
      })
      setDialogTitle('Alert')
      setDialogMsg(`Email sending failed for ${errorMsgArr?.join(', ')}`)
      dialogStatus.current = 'warning'
      setIsDialogOpen(true)
    }
  }, [bookedEventResponse, sentEmailResponse])

  const bookedEventInfo = bookedEventResponse?.Result as BookedEventInfo[]

  return (
    <ContentCard heading="QR code" headingClass="!text-jg-metal-700  !text-globalTextSizeLg">
      <div className="flex flex-col gap-y-4">
        <p className="text-sm text-jg-metal-500 text-center">
          Download or send QR codes by email for all event tickets
        </p>
        <div className="flex flex-row justify-between">
          <Button
            text="Send Email"
            icon={<SendNow />}
            iconPosition="left"
            fillType="outline"
            className="bg-jg-green-50 border !border-jg-green-200 !ring-0"
            btnColor="primary"
            onClick={() => handleSendEmail()}
          />
          <Button
            text="Download QR"
            icon={<Download height={16} width={16} />}
            iconPosition="left"
            fillType="solid"
            className=""
            btnColor="primary"
            onClick={() => handleClickDownloadQRCodeBtn()}
          />
          <Drawer
            isOpen={isOpen}
            openDrawer={() => setIsOpen(true)}
            closeDrawer={() => setIsOpen(false)}
            title="Download QR Code"
            shouldCloseOnBodyClick
            showCrossButton
            drawerContent={
              <QRCodeSliderContent
                {...{
                  bookedEventInfo,
                  eventDetails,
                  setDialogMsg,
                  setIsDialogOpen,
                  setDialogTitle,
                  setSentEmailResponse,
                  setIsOpen,
                }}
              />
            }
            showFrom="Right"
          />
          <StatusDialog
            isOpen={isDialogOpen}
            setIsOpen={setIsDialogOpen}
            titleText={dialogTitle}
            descriptionText={dialogMsg}
            closeBtnText="Ok"
            showDefaultActionBtn={false}
            dialogStatus={dialogStatus.current}
          />
        </div>
      </div>
    </ContentCard>
  )
}

export default QRCodeCard
