import { AddressInfo, EntityInfo, ModalOld } from '@jg/common/comps'
import { useEffect, useRef, useState } from 'react'
import { MdGroups } from 'react-icons/md'
import useEventStore from '@jg/widgets/Events/store/useEventStore'
import { ContactCard } from './comps/ContactsInfoCard'
import { LocationMarkerIcon } from '@heroicons/react/outline'
import { SingleTag } from './comps/TagsInfoCard'
import { useEventConfig } from '@jg/widgets/Events/EventWidget'
import { PhoneIcon, TagIcon } from '@heroicons/react/solid'
import { MapMarker } from '@comps/uiComps/Icons'
import QRCodeSliderContent from '../QRCodeSliderContent'
import { EventInfo, GDEResponse } from '@jg/common/types'
import {
  BookedEventInfo,
  BookedEventMembersInfo,
  FailedReceiverInfo,
} from '@jg/common/types/eventsAnsSchedules/BookedEventInfo'
import JGFetch from '@jg/common/dataAPIs'
import StatusDialog from '@jg/common/comps/statusdialog/StatusDialog'
type BottomFloatMenuWithModalProps = {
  mode: 'current-event' | 'booked-event'
}
type QRCodeCardProps = {
  eventDocId: number
  eventDetails: EventInfo
}
const BottomFloatMenuWithModal = ({ mode }: BottomFloatMenuWithModalProps) => {
  // const isEvent = useIsEventMode()
  const details = useEventStore((state) => state.eventDetails)
  const docid = useEventStore((state) => state.eventDetails.docId)

  // const BottomFloatMenuWithModal = () => {
  const { isEvent } = useEventConfig()

  return (
    <div
      className="h-[52px] fixed flex bg-white bottom-0 w-full min-w-0  px-8 justify-between items-center md:hidden md:visible"
      style={{ boxShadow: '0px 0 10px rgb(0 ,0, 0,0.3)' }}
    >
      {isEvent && <AttendeeButtonWithModal />}
      {isEvent && <LocationButtonWithModal />}
      {!isEvent && <SellerButtonWithModal />}
      <ContactButtonWithModal />
      {mode === 'booked-event' && <QRButtonWithModal eventDetails={details} eventDocId={docid} />}
      <TagsButtonWithModal />
    </div>
  )
}

export default BottomFloatMenuWithModal

const AttendeeButtonWithModal = () => {
  const details = useEventStore((state) => state.eventDetails)
  const { publishAttendeeConfig, attendees, noOfBookings } = details
  const [open, setOpen] = useState(false)

  const Modal_Body = (
    <div className="flex flex-col px-4 justify-start w-full md:hidden md:visible">
      {publishAttendeeConfig &&
        attendees?.slice(0, 8).map((attendee, i) => {
          const [attendeeName, attendeeCity] = [
            publishAttendeeConfig?.includes('Name'),
            publishAttendeeConfig?.includes('Town'),
          ]
          return (
            <EntityInfo
              key={i}
              entityInfo={{ name: attendeeName ? `${attendee.FirstName} ${attendee.LastName}` : 'N/A' }}
              subTitle={attendeeCity ? attendee.Town : undefined}
              className="border-solid border-b border-jg-metal-50 py-4"
            />
          )
        })}
      {publishAttendeeConfig && attendees && (noOfBookings || 0) > attendees?.length && (
        <div className="text-jg-grey-700 text-sm font-semibold truncate mt-2">
          + {(noOfBookings || 0) - Math.min(attendees?.length, 8)} more
        </div>
      )}
    </div>
  )

  return (
    <>
      <button className="text-jg-metal-900 cursor-pointer" onClick={() => setOpen((s) => !s)}>
        <MdGroups className="h-6 w-6" />
      </button>
      <ModalOld
        open={open}
        setOpen={setOpen}
        titleSection={({}) => (
          <div className="w-full !text-[14px] font-semibold leading-5 text-jg-metal-900 p-4">
            {`Attendees(${noOfBookings || 0})`}
          </div>
        )}
        bodySection={() => Modal_Body}
      />
    </>
  )
}

const LocationButtonWithModal = () => {
  const details = useEventStore((state) => state.eventDetails)
  const { name: eventName, imgSrc, locationType, address } = details
  const [open, setOpen] = useState(false)

  const Modal_Body = (
    <div className="md:hidden md:visible w-full p-4">
      {locationType && locationType === 'venue' ? (
        <>
          <EntityInfo
            entityInfo={{
              imgSrc: imgSrc || '',
              name: eventName || '',
            }}
            size="xs"
            className="text-[14px] leading-4 mb-2"
          />

          <AddressInfo address={address} className="text-sm text-jg-metal-300 mb-4 break-words" />
          <div className="flex items-center gap-2 text-jg-green-900">
            <LocationMarkerIcon className="w-6" />
            <span className="font-semibold text-sm text-jg-green-900">View Map</span>
          </div>
        </>
      ) : locationType === 'online' ? (
        <div className="text-sm text-jg-metal-300">Online Event</div>
      ) : locationType === 'tba' ? (
        <div className="text-sm text-jg-metal-300">Location to be Confirmed</div>
      ) : (
        <></>
      )}
    </div>
  )

  return (
    <>
      <button className=" text-jg-metal-900 cursor-pointer" onClick={() => setOpen((s) => !s)}>
        <MapMarker className="h-6 w-6" />
      </button>
      <ModalOld
        open={open}
        setOpen={setOpen}
        titleSection={({}) => (
          <div className="w-full !text-[14px] font-semibold leading-5 text-jg-metal-900 p-4">Location</div>
        )}
        bodySection={() => Modal_Body}
      />
    </>
  )
}

const ContactButtonWithModal = () => {
  const details = useEventStore((state) => state.eventDetails)
  const { contacts } = details
  const [open, setOpen] = useState(false)

  const Modal_Body =
    contacts && contacts.length > 0 ? (
      <div className="w-full p-4">
        <div className="space-y-7">
          {contacts?.map((item, i) => (
            <ContactCard item={item} key={i} />
          ))}
        </div>
      </div>
    ) : (
      <></>
    )

  return (
    <>
      <button className=" text-jg-metal-900 cursor-pointer" onClick={() => setOpen((s) => !s)}>
        <PhoneIcon className="h-6 w-6" />
      </button>
      <ModalOld
        open={open}
        setOpen={setOpen}
        titleSection={({}) => (
          <div className="w-full !text-[14px] font-semibold leading-5 text-jg-metal-900 p-4">Contact</div>
        )}
        bodySection={() => Modal_Body}
      />
    </>
  )
}

const TagsButtonWithModal = () => {
  const details = useEventStore((state) => state.eventDetails)
  const { tag } = details
  const [open, setOpen] = useState(false)

  const Modal_Body = (
    <div className="w-full p-4 flex flex-wrap gap-2">
      {tag ? (
        tag?.split('|').map((item, i) => (
          <div key={i} className="max-h-8 inline-block">
            <SingleTag tag={item} key={i} />
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  )

  return (
    <>
      <button className=" text-jg-metal-900 cursor-pointer" onClick={() => setOpen((s) => !s)}>
        <TagIcon className="h-6 w-6" />
      </button>
      <ModalOld
        open={open}
        setOpen={setOpen}
        titleSection={({}) => (
          <div className="w-full !text-[14px] font-semibold leading-5 text-jg-metal-900 p-4">Tags</div>
        )}
        bodySection={() => Modal_Body}
      />
    </>
  )
}

const SellerButtonWithModal = () => {
  const details = useEventStore((state) => state.eventDetails)
  const { ownerEntity } = details
  const [open, setOpen] = useState(false)

  const Modal_Body = (
    <div className="w-full p-4 space-y-3">
      <EntityInfo
        entityInfo={{
          imgSrc: `${ownerEntity?.imgSrc}`,
          name: `${ownerEntity?.name}`,
        }}
        subTitle={ownerEntity?.addressString}
        size="lg"
        subTitleClass="truncate max-w-[280px]"
      />
    </div>
  )

  return (
    <>
      <button className=" text-jg-green-200 cursor-pointer" onClick={() => setOpen((s) => !s)}>
        <div className="h-6 w-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M21.3103 6.51632H19.2413V7.99218C19.0206 7.93356 18.7896 7.87839 18.5517 7.82667C18.5517 4.46409 18.5336 4.41143 18.5482 4.37047C18.5492 4.36766 18.5503 4.36491 18.5517 4.36115C18.5654 4.29979 18.5957 4.24337 18.6392 4.19798C18.6827 4.15259 18.7378 4.11997 18.7986 4.10363C18.8593 4.0873 18.9233 4.08788 18.9837 4.10531C19.0441 4.12274 19.0986 4.15636 19.1413 4.20253L21.5103 5.89218C21.5692 5.9348 21.6131 5.99494 21.6357 6.064C21.6584 6.13306 21.6586 6.20751 21.6365 6.27673C21.6143 6.34594 21.5708 6.40638 21.5122 6.44941C21.4537 6.49244 21.383 6.51586 21.3103 6.51632Z"
              fill="#4CAF4F"
            />
            <path
              d="M2.68954 6.51645H4.75851V7.99232C4.9792 7.9337 5.21023 7.87852 5.44816 7.8268C5.44816 6.96338 5.44959 6.31595 5.45065 5.82895C5.45368 4.45226 5.45388 4.35756 5.41123 4.28989C5.40807 4.28489 5.40469 4.28003 5.40105 4.27482C5.39956 4.27268 5.39802 4.27048 5.39644 4.26818C5.3658 4.21784 5.32277 4.1762 5.27146 4.14723C5.22015 4.11825 5.16226 4.10291 5.10334 4.10266C5.09642 4.10266 5.09015 4.10249 5.08425 4.10233C5.0765 4.10212 5.06939 4.10192 5.06229 4.10216C4.98436 4.10477 4.90816 4.15945 3.99516 4.8148C3.63804 5.07113 3.1529 5.41936 2.48954 5.89232C2.43067 5.93494 2.38677 5.99507 2.36411 6.06413C2.34145 6.13319 2.34119 6.20765 2.36337 6.27686C2.38555 6.34608 2.42903 6.40651 2.48761 6.44954C2.54619 6.49257 2.61686 6.51599 2.68954 6.51645Z"
              fill="#4CAF4F"
            />
            <path
              d="M9.93111 6.51623H9.58628C9.49483 6.51623 9.40712 6.4799 9.34245 6.41523C9.27778 6.35057 9.24146 6.26286 9.24146 6.1714V4.79209C9.24146 4.70064 9.27778 4.61293 9.34245 4.54826C9.40712 4.4836 9.49483 4.44727 9.58628 4.44727H14.4139C14.5053 4.44727 14.593 4.4836 14.6577 4.54826C14.7224 4.61293 14.7587 4.70064 14.7587 4.79209V6.1714C14.7587 6.26286 14.7224 6.35057 14.6577 6.41523C14.593 6.4799 14.5053 6.51623 14.4139 6.51623H14.069V7.26451L13.3794 7.23002V6.51623H10.6208V7.23002L9.93111 7.26451V6.51623Z"
              fill="#4CAF4F"
            />
            <path
              d="M7.02069 11.3438C6.16852 11.4589 5.32435 11.6271 4.4931 11.8472C3.78276 11.661 2 11.0231 2 10.3093C2 9.3024 5.7931 7.89551 12 7.89551C18.2069 7.89551 22 9.3024 22 10.3093C22 10.9127 20.7 11.4576 20.1241 11.661C20.0383 11.6907 19.9661 11.7165 19.9044 11.7386C19.7042 11.81 19.6132 11.8425 19.522 11.8432C19.4461 11.8438 19.3701 11.8223 19.2307 11.7829C18.9413 11.7012 18.3792 11.5424 16.9793 11.3438L18.4517 9.86103C18.4839 9.82887 18.5094 9.7907 18.5268 9.7487C18.5442 9.70669 18.5531 9.66167 18.5531 9.6162C18.5531 9.57073 18.5442 9.52571 18.5268 9.4837C18.5094 9.44169 18.4839 9.40352 18.4517 9.37137C18.4196 9.33922 18.3814 9.31371 18.3394 9.29631C18.2974 9.27891 18.2524 9.26996 18.2069 9.26996C18.1614 9.26996 18.1164 9.27891 18.0744 9.29631C18.0324 9.31371 17.9942 9.33922 17.9621 9.37137L16.1138 11.2196C14.8623 11.0785 13.6042 11.0048 12.3448 10.999V8.92999C12.3448 8.83854 12.3085 8.75083 12.2438 8.68616C12.1792 8.62149 12.0915 8.58516 12 8.58516C11.9085 8.58516 11.8208 8.62149 11.7562 8.68616C11.6915 8.75083 11.6552 8.83854 11.6552 8.92999V10.999C10.3956 11.0083 9.13747 11.0854 7.88621 11.23L6.03793 9.38171C6.00578 9.34956 5.96761 9.32406 5.9256 9.30666C5.8836 9.28926 5.83857 9.2803 5.7931 9.2803C5.70128 9.2803 5.61321 9.31678 5.54828 9.38171C5.51612 9.41387 5.49062 9.45203 5.47322 9.49404C5.45582 9.53605 5.44687 9.58107 5.44687 9.62654C5.44687 9.67201 5.45582 9.71703 5.47322 9.75904C5.49062 9.80105 5.51612 9.83922 5.54828 9.87137L7.02069 11.3438Z"
              fill="#4CAF4F"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2 14.1027V11.4717C5.13793 14.0372 18.8448 14.0544 22 11.4717V14.1027C22 16.0958 10.3897 17.6131 4.03448 15.482C2.75862 15.0751 2 14.5544 2 14.1027ZM3.27831 14.3465C3.34298 14.2819 3.37931 14.1942 3.37931 14.1027V13.0682C3.37931 12.9768 3.34298 12.8891 3.27831 12.8244C3.21364 12.7597 3.12594 12.7234 3.03448 12.7234C2.94303 12.7234 2.85532 12.7597 2.79065 12.8244C2.72599 12.8891 2.68966 12.9768 2.68966 13.0682V14.1027C2.68966 14.1942 2.72599 14.2819 2.79065 14.3465C2.85532 14.4112 2.94303 14.4475 3.03448 14.4475C3.12594 14.4475 3.21364 14.4112 3.27831 14.3465ZM5.69211 15.0362C5.75677 14.9715 5.7931 14.8838 5.7931 14.7924V13.7579C5.7931 13.6664 5.75677 13.5787 5.69211 13.5141C5.62744 13.4494 5.53973 13.4131 5.44828 13.4131C5.35682 13.4131 5.26911 13.4494 5.20445 13.5141C5.13978 13.5787 5.10345 13.6664 5.10345 13.7579V14.7924C5.10345 14.8838 5.13978 14.9715 5.20445 15.0362C5.26911 15.1009 5.35682 15.1372 5.44828 15.1372C5.53973 15.1372 5.62744 15.1009 5.69211 15.0362ZM8.79555 15.7259C8.86022 15.6612 8.89655 15.5735 8.89655 15.482V14.4475C8.89655 14.3561 8.86022 14.2684 8.79555 14.2037C8.73089 14.139 8.64318 14.1027 8.55172 14.1027C8.46027 14.1027 8.37256 14.139 8.30789 14.2037C8.24323 14.2684 8.2069 14.3561 8.2069 14.4475V15.482C8.2069 15.5735 8.24323 15.6612 8.30789 15.7259C8.37256 15.7905 8.46027 15.8269 8.55172 15.8269C8.64318 15.8269 8.73089 15.7905 8.79555 15.7259ZM12.2438 15.8983C12.3085 15.8336 12.3448 15.7459 12.3448 15.6544V14.62C12.3448 14.5285 12.3085 14.4408 12.2438 14.3761C12.1792 14.3115 12.0915 14.2751 12 14.2751C11.9085 14.2751 11.8208 14.3115 11.7562 14.3761C11.6915 14.4408 11.6552 14.5285 11.6552 14.62V15.6544C11.6552 15.7459 11.6915 15.8336 11.7562 15.8983C11.8208 15.9629 11.9085 15.9993 12 15.9993C12.0915 15.9993 12.1792 15.9629 12.2438 15.8983ZM15.6921 15.7259C15.7568 15.6612 15.7931 15.5735 15.7931 15.482V14.4475C15.7931 14.3561 15.7568 14.2684 15.6921 14.2037C15.6274 14.139 15.5397 14.1027 15.4483 14.1027C15.3568 14.1027 15.2691 14.139 15.2044 14.2037C15.1398 14.2684 15.1034 14.3561 15.1034 14.4475V15.482C15.1034 15.5735 15.1398 15.6612 15.2044 15.7259C15.2691 15.7905 15.3568 15.8269 15.4483 15.8269C15.5397 15.8269 15.6274 15.7905 15.6921 15.7259ZM18.7956 15.0362C18.8602 14.9715 18.8966 14.8838 18.8966 14.7924V13.7579C18.8966 13.6664 18.8602 13.5787 18.7956 13.5141C18.7309 13.4494 18.6432 13.4131 18.5517 13.4131C18.4603 13.4131 18.3726 13.4494 18.3079 13.5141C18.2432 13.5787 18.2069 13.6664 18.2069 13.7579V14.7924C18.2069 14.8838 18.2432 14.9715 18.3079 15.0362C18.3726 15.1009 18.4603 15.1372 18.5517 15.1372C18.6432 15.1372 18.7309 15.1009 18.7956 15.0362ZM21.2093 14.3465C21.274 14.2819 21.3103 14.1942 21.3103 14.1027V13.0682C21.3103 12.9768 21.274 12.8891 21.2093 12.8244C21.1447 12.7597 21.057 12.7234 20.9655 12.7234C20.8741 12.7234 20.7864 12.7597 20.7217 12.8244C20.657 12.8891 20.6207 12.9768 20.6207 13.0682V14.1027C20.6207 14.1942 20.657 14.2819 20.7217 14.3465C20.7864 14.4112 20.8741 14.4475 20.9655 14.4475C21.057 14.4475 21.1447 14.4112 21.2093 14.3465Z"
              fill="#4CAF4F"
            />
            <path
              d="M2 15.2715V17.5508C2 18.4784 5.03103 19.6405 9.93103 19.9094V18.5853C9.93103 18.4938 9.96736 18.4061 10.032 18.3414C10.0967 18.2768 10.1844 18.2405 10.2759 18.2405H13.7241C13.8156 18.2405 13.9033 18.2768 13.968 18.3414C14.0326 18.4061 14.069 18.4938 14.069 18.5853V19.9094C18.969 19.6405 22 18.4784 22 17.5508V15.2715C18.6207 17.8956 5.23448 17.7853 2 15.2715Z"
              fill="#4CAF4F"
            />
          </svg>
        </div>
      </button>
      <ModalOld
        open={open}
        setOpen={setOpen}
        titleSection={({}) => (
          <div className="w-full !text-[14px] font-semibold leading-5 text-jg-metal-900 p-4">Seller</div>
        )}
        bodySection={() => Modal_Body}
      />
    </>
  )
}

const QRButtonWithModal = ({ eventDetails, eventDocId }: QRCodeCardProps) => {
  const [dialogTitle, setDialogTitle] = useState<string>('')
  const [dialogMsg, setDialogMsg] = useState<string>('')
  const dialogStatus = useRef<'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'>('warning')
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [sentEmailResponse, setSentEmailResponse] = useState<GDEResponse | null>(null)

  const [bookedEventResponse, setBookedEventResponse] = useState<GDEResponse | null>(null)

  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (eventDocId > 0 && window.innerWidth <= 768) {
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

  const Modal_Body = (
    <div className="w-full flex flex-wrap gap-2">
      <QRCodeSliderContent
        {...{
          bookedEventInfo,
          eventDetails,
          setDialogMsg,
          setIsDialogOpen,
          setDialogTitle,
          setSentEmailResponse,
          setIsOpen: setOpen,
        }}
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
  )

  return (
    <>
      <button className=" text-jg-green-500 cursor-pointer" onClick={() => setOpen((s) => !s)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="h-6 w-6"
        >
          <path
            d="M4 4H10V10H4V4ZM20 4V10H14V4H20ZM14 15H16V13H14V11H16V13H18V11H20V13H18V15H20V18H18V20H16V18H13V20H11V16H14V15ZM16 15V18H18V15H16ZM4 20V14H10V20H4ZM6 6V8H8V6H6ZM16 6V8H18V6H16ZM6 16V18H8V16H6ZM4 11H6V13H4V11ZM9 11H13V15H11V13H9V11ZM11 6H13V10H11V6ZM2 2V6H0V2C0 1.46957 0.210714 0.960859 0.585786 0.585786C0.960859 0.210714 1.46957 0 2 0L6 0V2H2ZM22 0C22.5304 0 23.0391 0.210714 23.4142 0.585786C23.7893 0.960859 24 1.46957 24 2V6H22V2H18V0H22ZM2 18V22H6V24H2C1.46957 24 0.960859 23.7893 0.585786 23.4142C0.210714 23.0391 0 22.5304 0 22V18H2ZM22 22V18H24V22C24 22.5304 23.7893 23.0391 23.4142 23.4142C23.0391 23.7893 22.5304 24 22 24H18V22H22Z"
            fill="#263238"
          />
        </svg>
      </button>
      <ModalOld
        open={open}
        setOpen={setOpen}
        titleSection={({}) => (
          <div className="w-full !text-[14px] font-semibold leading-5 text-jg-metal-900 p-4">Download QR Code</div>
        )}
        bodySection={() => Modal_Body}
      />
    </>
  )
}
