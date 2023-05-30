import { useState } from 'react'
import { JGTable, RouteButton, TD, TH, TR } from '@jg/common/comps'
import DateTimeInfo from '@jg/common/comps/labels/DateTimeInfo/DateTimeInfo'
import { EventInfo } from '@jg/common/types'
import AppStore from '@jg/store/store'
import { Currency } from '@jg/utils'
import { useWidgetContext } from 'jg-widget'
import { useEventTicketListStoreContext } from '../../providers/EventTicketListStoreProvider'
import NotifyMeButton from './components/NotifyMeButton'
import BookingCountDisplay from './BookingCountDisplay'
import SaveWaitlistButton from './components/SaveWaitlistButton'
import { useEventConfig } from '../../EventWidget'
import Drawer from '@jg/common/comps/drawer/Drawer'
import JGFetch from '@jg/common/dataAPIs'
import { Button } from '@comps/uiComps'
import BookedTicketSlider from './BookedTicketSlider'
import { useSgininContext } from '@jg/providers/Signin/SigninProvider'
import { useRouter } from '@jg/hooks'
import TicketValidationSummary from './TicketValidationSummary'

type TicketItemProps = { eventData: EventInfo; index: number; isBooked: boolean }

const TicketItem = ({ eventData, index, isBooked }: TicketItemProps) => {
  const { basePath } = useWidgetContext()
  const BaseAppPath = AppStore((state) => state.BaseAppPath)
  const { notifyMeEnabled, waitListEnabled, docId, eventDocIdHash } = eventData

  const {
    availability,
    awaitable,
    name,
    maxPurchase,
    minPurchase,
    unitPrice,
    description,
    ends,
    starts,
    priceSettings,
    docId: ticketDocId,
    noOfBooking,
    isInstallmentEnabled,
    displayPrice,
    dataCaptureItems,
  } = eventData.tickets[index]
  const isTicketYetToStart = !availability
  const awaitWhenStockAvailable = !!awaitable
  const currencySymbol = Currency.getSymbol(priceSettings?.Currency || '')
  const endDate = new Date(ends?.date || Date.now()).toDateString().slice(4).split(' ')
  const endDateTime = new Date(`${ends?.date} ${ends?.time}`)
  const { getAllBookingForByTicket } = useEventTicketListStoreContext((state) => ({
    getAllBookingForByTicket: state.getAllBookingForByTicket,
  }))
  const bookingSummaryByTicket = getAllBookingForByTicket(ticketDocId)
  let ticketCount = 0
  bookingSummaryByTicket.forEach((e) => {
    ticketCount += e.qty
  })
  const detailsPath = isBooked ? 'booking-details' : 'details'
  //const isNotifyMe = notifyMeEnabled && boo
  const { isEvent, isPublic } = useEventConfig()
  const { showSigninOrSginupModal } = useSgininContext()
  const { esc } = useRouter()

  return (
    <>
      <div className="flex items-center justify-between flex-col md:flex-row pt-4 pb-4 ">
        <div className="space-y-2 mb-4 sm:mb-0 pr-6 w-full md:w-6/12">
          <div className="text-globalTextSizeMd text-jg-metal-900 font-medium break-all">{name}</div>
          <div className="text-globalTextSizeSm text-jg-metal-500 font-normal break-all">{description}</div>
          <div className="text-globalTextSizeSm text-jg-metal-200 font-normal">
            {isTicketYetToStart ? (
              <span className="text-jg-blue-500 ">
                Available from <DateTimeInfo dateTimeInfo={starts} />
              </span>
            ) : isEvent === true ? (
              <> Booking Closes on {` ${endDate[1]} ${endDate[0]} ${endDate[2]}, ${ends?.time} ${ends?.timezone}`}</>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="flex w-full md:w-6/12 justify-between md:justify-end items-center">
          <div className="flex flex-col text-left sm:text-right mr-6">
            <div className="text-globalTextSizeMd text-jg-metal-700 font-semibold">
              {`${displayPrice && currencySymbol} ${displayPrice}`}
            </div>
            {awaitWhenStockAvailable && <div className="text-globalTextSizeSm text-jg-metal-400 ">All Sold Out</div>}

            {/* {noOfBooking && isBooked && noOfBooking > 0 && (
              <BookedTicketSlider {...{ eventData, noOfBooking, ticketDocId, dataCaptureItems }} />
            )} */}

            {!!isInstallmentEnabled && (
              <InstallmentView
                eventId={docId}
                ticketId={ticketDocId}
                className="inline-flex items-center gap-1 justify-end cursor-pointer font-medium text-[13px] leading-4 text-jg-green-700"
              />
            )}
          </div>

          {
            <>
              {isTicketYetToStart && notifyMeEnabled && eventDocIdHash ? (
                <NotifyMeButton ticketDocId={ticketDocId} eventDocIdHash={eventDocIdHash} detailsPath={detailsPath} />
              ) : (
                <>
                  {awaitWhenStockAvailable && eventDocIdHash ? (
                    <SaveWaitlistButton
                      detailsPath={detailsPath}
                      index={index}
                      docId={docId}
                      eventDocIdHash={eventDocIdHash}
                    />
                  ) : isTicketYetToStart && !notifyMeEnabled ? (
                    <Button
                      text={ticketCount < 1 ? (isBooked ? 'Add More' : 'Add') : 'Update'}
                      fillType="outline"
                      btnColor="secondary"
                      disabled={isTicketYetToStart && !notifyMeEnabled ? true : false}
                    />
                  ) : isPublic && eventDocIdHash ? (
                    <Button
                      text={ticketCount < 1 ? (isBooked ? 'Add More' : 'Add') : 'Update'}
                      fillType="outline"
                      btnColor="primary"
                      className="!bg-jg-green-50 !rounded-sm border border-jg-green-500 !ring-0"
                      onClick={() => {
                        showSigninOrSginupModal(() => {
                          esc(`Workbench/i/r/EventsAndBookings/${detailsPath}/${eventDocIdHash}/book/${index}`)
                          // esc('Workbench/i/r/EventsAndBookings/my-bookings/')
                        })
                      }}
                    ></Button>
                  ) : (
                    <RouteButton
                      text={ticketCount < 1 ? (isBooked ? 'Add More' : 'Add') : 'Update'}
                      to={eventDocIdHash && `${basePath}${detailsPath}/${eventDocIdHash}/book/${index}`}
                      fillType="outline"
                      btnColor="primary"
                      className="!bg-jg-green-50 !rounded-sm border border-jg-green-500 !ring-0"
                    />
                  )}
                </>
              )}
            </>
          }
        </div>
      </div>
      {/* <Link to={`${basePath}details/${docId}/book/${index}`}></Link> */}
      <div className="flex flex-col md:flex-row  lg:flex-col xl:flex-row gap-y-4 md:gap-y-0 ">
        <div className="w-full md:w-1/2 lg:w-full xl:w-1/2">
          {noOfBooking && isBooked && noOfBooking > 0 && (
            <BookedTicketSlider {...{ eventData, noOfBooking, ticketDocId, dataCaptureItems }} />
          )}
        </div>
        <div className="w-full md:w-1/2 lg:w-full xl:w-1/2 flex justify-start md:justify-end lg:justify-start xl:justify-end md:items-center mb-4 flex-col md:flex-row mr-auto md:mr-0">
          <BookingCountDisplay ticketDocId={ticketDocId} ticketCount={ticketCount} />
          <TicketValidationSummary ticketDocId={ticketDocId} />
        </div>
      </div>
    </>
  )
}
export default TicketItem

const InstallmentView = ({
  className,
  eventId,
  ticketId,
}: {
  className?: string
  eventId: number
  ticketId: number
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [installmentResult, setInstallmentResult] = useState<InstallmetResult>()

  const args = {
    Method: 'GetInstallmentDetails',
    EventDocId: eventId,
    ProductDocId: ticketId,
  }

  const FetchData = async () => {
    JGFetch(['GDE/FetchObjects'], [{ provider: 'Event', args: args }]).then((res) =>
      setInstallmentResult((res as any).Result as InstallmetResult)
    )
  }

  return (
    <>
      <div
        className={className}
        onClick={() => {
          FetchData()
          setIsOpen(true)
        }}
      >
        <InstallmentIcon className="3.5 3.5 text-jg-metal-500" />{' '}
        <span className="text-jg-metal-500 text-globalTextSizeSm">Installment Available</span>
      </div>
      <Drawer
        isOpen={isOpen}
        openDrawer={() => setIsOpen(true)}
        closeDrawer={() => setIsOpen(false)}
        title="Installment Details"
        shouldCloseOnBodyClick
        showCrossButton
        drawerContent={<InstallmentDetailsBody installmentResult={installmentResult} />}
        showFrom="Right"
      />
    </>
  )
}

const InstallmentDetailsBody = ({ installmentResult }: { installmentResult?: InstallmetResult }) => {
  if (!installmentResult) {
    return <div className="flex justify-center items-center text-jg-metal-500">Loading...</div>
  }

  const { InitialPayment, NumberOfInstallment, Plans } = installmentResult

  return (
    <div>
      <div className="p-4 font-medium text-sm leading-4 text-jg-metal-700">
        <h4 className="mb-2">Initial Payment - ${InitialPayment}</h4>
        <p className="text-[13px] text-jg-metal-500">
          Followed by <span className="text-jg-metal-900">{NumberOfInstallment} monthly</span> installments
        </p>
      </div>
      {/* <JGTable className="border">
        <TR className="bg-jg-grey-50">
          <TH>Installment Date</TH>
          <TH>Amount</TH>
        </TR>
        {Plans.map((plan) => (
          <TR key={plan.Id}>
            <TD>{new Date(plan.ScheduleDate).toLocaleDateString('en')}</TD>
            <TD>${plan.Amount}</TD>
          </TR>
        ))}
      </JGTable> */}
      <div className="border">
        <div className="bg-jg-grey-50 flex flex-row border-b border-jg-metal-50">
          <div className="whitespace-nowrap px-3 py-2 text-[13px] leading-4  text-jg-metal-700 truncate w-3/5  font-medium">
            Installment Date
          </div>
          <div className="whitespace-nowrap px-3 py-2 text-[13px] leading-4 font-medium text-jg-metal-700 truncate w-2/5">
            Amount
          </div>
        </div>
        {Plans.map((plan) => (
          <div
            key={plan.Id}
            className="text-left text-[13px] leading-4 font-medium text-jg-metal-700 whitespace-nowrap truncate flex flex-row border-b border-jg-metal-50 "
          >
            <div className="whitespace-nowrap px-3 py-2 text-[13px] leading-4 font-normal text-jg-metal-500 truncate  w-3/5">
              {new Date(plan.ScheduleDate).toLocaleDateString('en')}
            </div>
            <div className="whitespace-nowrap px-3 py-2 text-[13px] leading-4 font-normal text-jg-metal-500 truncate w-2/5">
              ${plan.Amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const InstallmentIcon = (props: React.ComponentProps<'svg'>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path
        d="M9.33398 8.66699H10.334V10.547L11.9607 11.487L11.4607 12.3537L9.33398 11.127V8.66699ZM12.0007 5.33366H2.66732V12.667H5.78065C5.49398 12.0603 5.33398 11.3803 5.33398 10.667C5.33398 9.42931 5.82565 8.24233 6.70082 7.36716C7.57599 6.49199 8.76297 6.00033 10.0007 6.00033C10.714 6.00033 11.394 6.16033 12.0007 6.44699V5.33366ZM2.66732 14.0003C1.92732 14.0003 1.33398 13.4003 1.33398 12.667V3.33366C1.33398 2.59366 1.92732 2.00033 2.66732 2.00033H3.33398V0.666992H4.66732V2.00033H10.0007V0.666992H11.334V2.00033H12.0007C12.3543 2.00033 12.6934 2.1408 12.9435 2.39085C13.1935 2.6409 13.334 2.98004 13.334 3.33366V7.40033C14.1607 8.24033 14.6673 9.39366 14.6673 10.667C14.6673 11.9047 14.1757 13.0917 13.3005 13.9668C12.4253 14.842 11.2383 15.3337 10.0007 15.3337C8.72732 15.3337 7.57398 14.827 6.73398 14.0003H2.66732ZM10.0007 7.43366C9.14312 7.43366 8.32071 7.77431 7.71434 8.38068C7.10797 8.98705 6.76732 9.80946 6.76732 10.667C6.76732 12.4537 8.21398 13.9003 10.0007 13.9003C10.4253 13.9003 10.8457 13.8167 11.238 13.6542C11.6303 13.4917 11.9867 13.2535 12.287 12.9533C12.5872 12.6531 12.8254 12.2966 12.9879 11.9043C13.1504 11.512 13.234 11.0916 13.234 10.667C13.234 8.88033 11.7873 7.43366 10.0007 7.43366Z"
        fill="currentColor"
      />
    </svg>
  )
}

export interface Plan {
  Id: number
  ScheduleDate: Date
  Amount: number
}

export interface InstallmetResult {
  InitialPayment: number
  Currency: string
  RecurringConfig: string
  NumberOfInstallment: string
  InstallmentAmount: string
  PaymentTrigger: number
  PaymentDayType: number
  PeriodPaymentDay?: any
  Plans: Plan[]
}
