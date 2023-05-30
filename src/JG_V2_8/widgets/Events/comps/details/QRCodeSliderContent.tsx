import { useCallback, useRef, useState } from 'react'
import { BookedEventInfo } from '@jg/common/types/eventsAnsSchedules/BookedEventInfo'
import { EventInfo } from '@jg/common/types'
import { Avatar } from '@comps/uiComps'
import { ReactComponent as DownloadQRIcon } from '@jg/assets/images/DownloadQRIcon.svg'
import { ReactComponent as SendQRGreenIcon } from '@jg/assets/images/SendQRGreenIcon.svg'
import { ReactComponent as SendQRWhiteIcon } from '@jg/assets/images/SendQRWhiteIcon.svg'
import { ReactComponent as ApplePayBtnIcon } from '@jg/assets/images/ApplePayBtnIcon.svg'
import { ReactComponent as GPayBtnIcon } from '@jg/assets/images/GPayBtnIcon.svg'
import { ReactComponent as CrossIcon } from '@jg/assets/images/CrossIcon.svg'
import { Currency } from '@jg/utils'
import AppStore from '@jg/store/store'
import { Button } from '@comps/uiComps'
import { useRouter } from '@jg/hooks'
import JGFetch from '@jg/common/dataAPIs'
import { GDEResponse } from '@jg/common/types'

type QRCodeSliderContentProps = {
  bookedEventInfo: BookedEventInfo[]
  eventDetails: EventInfo
  setDialogMsg: (message: string) => void
  setIsDialogOpen: (status: boolean) => void
  setDialogTitle: (title: string) => void
  setSentEmailResponse: (response: GDEResponse) => void
  setIsOpen: (status: boolean) => void
}

const QRCodeSliderContent = (props: QRCodeSliderContentProps) => {
  const {
    bookedEventInfo,
    eventDetails,
    setDialogMsg,
    setIsDialogOpen,
    setDialogTitle,
    setSentEmailResponse,
    setIsOpen,
  } = props
  const { esc } = useRouter()
  const BaseAppPath = AppStore.getState().BaseAppPath
  const IsDev = AppStore((state) => state.IsDev)
  const currencySymbol = Currency.getSymbol(eventDetails?.priceSettings?.currency ?? '')
  const [showPaymentMethods, setShowPaymentMethods] = useState<string[]>([])
  const dialogStatus = useRef<'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'>('warning')
  const googlePayUrlPrefix = 'https://pay.google.com/gp/v/save/'
  const applePayUrlPrefix = `${BaseAppPath}ApplePass/DownloadPKPass?Id=`

  const handleClickShowPaymentMethods = (id: string): void => {
    if (!showPaymentMethods?.includes(id)) {
      setShowPaymentMethods([id])
    } else {
      setShowPaymentMethods([])
    }
  }

  const handleSendEmail = (data: any[]) => {
    const args = {
      Method: 'SendEmail',
      Data: data,
    }
    if (data?.length > 0) {
      setIsOpen(false)
      JGFetch(['GDE/FetchObjects'], [{ provider: 'Event', args: args }])
        .then((res: any) => {
          setSentEmailResponse(res as GDEResponse)
        })
        .catch((error) => {
          if (error) {
            if (error) {
              setDialogTitle('Warning')
              setDialogMsg('Email sending failed.')
              dialogStatus.current = 'warning'
              setIsDialogOpen(true)
            }
          }
        })
    }
  }

  const handleSendEmailToMember = useCallback(
    (data: { ProductDocId: number; MemberId: number; EventQueueIds: number[] }) => {
      handleSendEmail([data])
    },
    [bookedEventInfo]
  )

  const handleSendEmailToAll = useCallback(() => {
    const data: any[] = []
    bookedEventInfo?.forEach((item) => {
      item?.Rows?.forEach((row) => {
        data.push({
          ProductDocId: item?.ProductDocId,
          MemberId: row?.MemberId,
          EventQueueIds: row?.EventQueueIds,
        })
      })
    })
    handleSendEmail(data)
  }, [bookedEventInfo])

  return (
    <div className="w-full h-full flex flex-col min-h-0">
      <div className="flex-1 overflow-y-auto">
        {bookedEventInfo?.map((item: BookedEventInfo, index: number) => (
          <div key={index} className="w-full flex flex-col shadow-sm">
            <div className="w-full flex p-2 text-sm bg-jg-grey-100">
              <div className="flex flex-col w-6/12 truncate">
                <div className="w-full flex-auto truncate text-jg-grey-700 font-medium">{eventDetails?.name}</div>
                <div className="w-[200px] h-5 flex-auto truncate text-jg-grey-500 font-medium">
                  {eventDetails?.details?.replaceAll(/(<([^>]+)>)/gi, '')}
                </div>
              </div>
              <div className="flex flex-col items-end w-6/12">
                <div className="flex-auto text-jg-grey-700 font-medium">{`${currencySymbol} ${item?.TotalAmount}`}</div>
                <div className="flex-auto text-jg-grey-500 font-medium">{`${item?.TotalTickets} ${
                  item?.TotalTickets > 1 ? 'tickets' : 'ticket'
                } booked`}</div>
              </div>
            </div>
            {item?.Rows?.map((row) => (
              <div key={item?.ProductDocId?.concat('', row?.MID)} className="flex w-full flex-col border-b">
                <div className="flex w-full p-2 text-sm">
                  <div className="flex w-1/3">
                    <div className="mr-2 mt-1">
                      <Avatar
                        src={`${BaseAppPath}store/download?f=${row?.ProfilePicURL}&t=user&p=${row?.UserId}&p1=&p2=2`}
                        name={row?.ProfilePicURL}
                        size="md"
                        bordered={true}
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex-auto text-jg-grey-700 font-medium">{`${row?.FirstName} ${row?.LastName}`}</div>
                      <div className="flex-auto text-jg-grey-500 font-medium">{row?.MID}</div>
                    </div>
                  </div>
                  <div className="flex flex-col font-medium w-1/3">
                    <div className="flex-auto text-jg-grey-600">{row?.EmailAddress}</div>
                    <div className="flex-auto text-jg-grey-500">{row?.Town}</div>
                  </div>
                  <div className="flex justify-end items-center text-jg-grey-500 font-medium w-1/3">
                    <div className="flex-auto mr-1.5">{`${row?.NoOfTickets} ${
                      row?.NoOfTickets > 1 ? 'tickets' : 'ticket'
                    } booked`}</div>
                    <div className="flex-auto mr-1.5">
                      <SendQRGreenIcon
                        className="cursor-pointer"
                        onClick={() =>
                          handleSendEmailToMember({
                            ProductDocId: +item?.ProductDocId,
                            MemberId: row?.MemberId,
                            EventQueueIds: row?.EventQueueIds,
                          })
                        }
                      />
                    </div>
                    <div className="flex-auto mr-1.5">
                      <DownloadQRIcon
                        className="cursor-pointer"
                        onClick={() => handleClickShowPaymentMethods(item?.ProductDocId?.concat('', row?.MID))}
                      />
                    </div>
                  </div>
                </div>
                {showPaymentMethods?.includes?.(item?.ProductDocId?.concat('', row?.MID)) &&
                  row?.PaymentMethods?.map((method, methodIndex) => (
                    <div
                      key={method?.AppleURL?.concat('', method?.GoogleURL)}
                      className="flex items-center p-2 border-t"
                    >
                      <div className="flex">Digital Ticket</div>
                      <ApplePayBtnIcon
                        className="cursor-pointer ml-2"
                        onClick={() => {
                          if (IsDev) location.href = `${applePayUrlPrefix}${method?.AppleURL}`
                          else esc(`${applePayUrlPrefix}${method?.AppleURL}`)
                        }}
                      />
                      <GPayBtnIcon
                        className="cursor-pointer ml-2"
                        onClick={() => {
                          if (IsDev) location.href = `${googlePayUrlPrefix}${method?.GoogleURL}`
                          else esc(`${googlePayUrlPrefix}${method?.GoogleURL}`)
                        }}
                      />
                      {methodIndex === 0 && (
                        <div className="absolute right-2">
                          <CrossIcon className="cursor-pointer ml-2" onClick={() => setShowPaymentMethods([])} />
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="w-full border-t px-2 py-8">
        <Button
          text="Send Email To All"
          icon={<SendQRWhiteIcon />}
          iconPosition="left"
          fillType="outline"
          className="bg-jg-green-600 !ring-0 !text-white absolute bottom-3 py-2.5 right-2"
          btnColor="primary"
          onClick={handleSendEmailToAll}
        />
      </div>
    </div>
  )
}

export default QRCodeSliderContent
