import { useParams } from 'react-router-dom'
import ContentCard from '@jg/common/comps/contents/contentCard/ContentCard'
// import '@jg/common/comps/countDownTimer/CountDownTimer.css';
import { EntityInfo, PlaceholderImage } from '@jg/common/comps'
import SecondaryNav from './components/SecondaryNav'
import BookingTimeLeft from './components/BookingTimeLeft'
import Description from './components/Description'
import { useEffect } from 'react'
import { useEventsAndScheduleApi } from '@jg/common/dataAPIs'
import { GenericErrorResponse } from '@jg/common/types'
import { useAsync } from '@jg/hooks'
import { EventDetailsResponse } from '@jg/common/types/eventsAnsSchedules/EventDetailsResponse'
import { GetEventDetailsParams } from '@jg/common/dataAPIs/eventsAnsSchedules/GetEventDetailsRequest'
import ShoppingCartProvider from '../../../../providers/ShoppingCartProvider'
import useEventStore from '../../store/useEventStore'
import AppStore from '@jg/store/store'
import TitlePlaceholder from '@jg/common/comps/loader/placeholders/TitlePlaceholder'
import SkeletonText from '@jg/common/comps/loader/placeholders/SkeletonText'
import ListPlaceHolder from '@jg/common/comps/loader/placeholders/ListPlaceHolder'
import EntityInfoPlaceHolder from '@jg/common/comps/loader/placeholders/EntityInfoPlaceHolder'
import AdditionalInfo from './components/AdditionalInfo'
import { useEventSettingsContext } from '../../providers/EventSettingsProvider'
import EventTicketListProvider from '../../providers/EventTicketListStoreProvider'
import TicketList from './TicketList'
import LocationInfoCard from './components/comps/LocationInfoCard'
import ContactsInfoCard from './components/comps/ContactsInfoCard'
import SimilarEventsNearby from './components/comps/SimilarEventsNearby'
import EventsProvider from './components/comps/EventsProvider'
import TagsInfoCard from './components/comps/TagsInfoCard'
import { useEventConfig } from '../../EventWidget'
import QRCodeCard from './components/comps/QRCodeCard'
import JGShopCarousel from './components/comps/JGShopCarousel'
import BottomFloatMenuWithModal from './components/BottomFloatMenuWithModal'
import FixturesInfoSection from './components/comps/FixturesInfoSection'

type EventDetailsProps = {
  mode: 'current-event' | 'booked-event'
}

function Details({ mode = 'current-event' }: EventDetailsProps) {
  const BaseAppPath = AppStore((state) => state.BaseAppPath)
  const { systemSettings } = useEventSettingsContext()
  const { isEvent, isPublic } = useEventConfig()
  // const widgetConfig = config as EventWidgetConfigType
  // const { isPublic, mode } = widgetConfig
  const SetBBarOffsetSize = AppStore((state) => state.SetBBarOffsetSize)
  const { docId: eventDocIdHash } = useParams()
  console.log(eventDocIdHash)
  const { GetEventDetailsRequest } = useEventsAndScheduleApi()
  //let eventDocId = -1

  //if (eventDocIdHash) eventDocId = eventDocIdHash
  const { execute, value, status } = useAsync<EventDetailsResponse, GenericErrorResponse, GetEventDetailsParams>(
    GetEventDetailsRequest,
    { IsShop: !isEvent, EventDocIdHash: eventDocIdHash },
    false
  )

  const setEventDetails = useEventStore((state) => {
    return state.setEventDetails
  })

  useEffect(() => {
    if (eventDocIdHash) execute()
  }, [eventDocIdHash])
  const { width: screenWidth } = { width: window.innerWidth } // useWindowSize()
  const {
    imgSrc,
    name: eventName,
    priceSettings,
    starts,
    details,
    bookingEnds,
    address,
    contacts,
    ends,
    locationType,
    eventLocation,
    ownerEntity,
    hideDateTime,
    calendarInviteEnabled,
    isPublishAttendee,
    attendees,
    publishAttendeeConfig,
    noOfBookings,
    latlng,
    additionalInfo,
    tag,
    eventImage,
    fixtures,
    docId,
  } = value?.eventDetails || {}
  if (hideDateTime && starts) starts['hideDateTime'] = hideDateTime
  // const saveEventForUser = useEventStore((state) => state.saveEventForUser)

  const attendeeInfo = {
    attendees,
    isPublishAttendee,
    publishAttendeeConfig,
    noOfBookings,
  }

  useEffect(() => {
    if (status === 'success') {
      // console.log('setEventDetails', value)
      setEventDetails(
        value?.eventDetails || { docId: -1, category: '', tickets: [] },
        value?.nearByEvents || [],
        value?.providerEvents || []
      )
      // console.log('setEventDetails', value?.eventDetails)
      window.scrollTo(0, 0)
    }
  }, [status])

  useEffect(() => {
    if (screenWidth && screenWidth < 768) {
      SetBBarOffsetSize(64)
    } else {
      SetBBarOffsetSize(0)
    }
    return () => {
      SetBBarOffsetSize(0)
    }
  }, [screenWidth])

  const addToCalender = (calender: string) => {
    let link = ''

    const startDate = `${starts?.date?.replaceAll('-', '')}T${starts?.time?.replaceAll(':', '')}Z`
    const endDate = `${ends?.date?.replaceAll('-', '')}T${ends?.time?.replaceAll(':', '')}Z`

    switch (calender) {
      case 'gc':
        link = `https://calendar.google.com/calendar/u/0/r/eventedit?text=${eventName}&dates=${startDate}/${endDate}&details=${details}&location=${address?.address1}&sf=true`
        break
      case 'ic':
        link = `${BaseAppPath}store/download?f=calendar.ics&t=repo&p=${docId}&p1=31&p2=5`
        break
      case 'yc':
        link = `https://calendar.yahoo.com/?v=60&view=d&type=20&title=${eventName}&st=${startDate}&desc=${details}&in_loc=${address?.address1}`
        break
      case 'oc':
        link = `${BaseAppPath}store/download?f=calendar.ics&t=repo&p=${docId}&p1=31&p2=5`
        break
      default:
        return
    }
    window.parent.location.href = link
  }

  const HeroImageSrc =
    eventImage?.toLowerCase() === 'virtual' || !imgSrc
      ? `${BaseAppPath}Store/Download?f=${
          systemSettings[`${isEvent ? 'EVENT' : 'SHOP'}.DEFAULT_IMAGE`]
        }&t=Organization${isEvent ? 'Event' : 'Shop'}DefaultImage`
      : imgSrc

  const eventDetails = useEventStore((state) => {
    return state.eventDetails
  })

  return (
    <ShoppingCartProvider>
      <div className="bg-[#fafafa] flex justify-center">
        <div className="w-full lg:w-[1000px]  xl:w-[1400px] lg:mx-auto ">
          {isEvent && status === 'success' && eventImage?.toLowerCase() !== 'virtual' ? (
            <img className="w-full h-[300px] object-cover" src={HeroImageSrc} alt="banner" />
          ) : (
            isEvent && (
              <div className="w-full h-[300px] ">
                <PlaceholderImage className="h-[300px] min-w-full w-full object-fill text-gray-200 dark:text-gray-600" />
              </div>
            )
          )}
          {status === 'success' ? (
            <SecondaryNav
              isBooked={mode === 'booked-event'}
              eventName={eventName}
              startingFrom={starts}
              priceOptions={priceSettings}
            />
          ) : (
            <TitlePlaceholder />
          )}

          <div className="jg-container flex lg:gap-x-[30px] py-4 px-4 lg:px-0 flex-col-reverse lg:flex-row lg:flex-wrap-reverse">
            {/* Body Left Side */}

            {/* Specifically for Shop */}
            <div className="flex-[1] md:space-y-4 md:flex-grow min-w-0">
              {!isEvent && HeroImageSrc && (
                <JGShopCarousel>
                  <img className="w-full h-full object-cover object-center" src={HeroImageSrc} />
                  {/* <img
                    className="w-full h-full object-cover object-center"
                    src="https://images.unsplash.com/photo-1678005215861-8b75b89aea1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                  /> */}
                </JGShopCarousel>
              )}
              <ContentCard
                heading="Overview"
                headingClass="font-semibold mb-2 !text-jg-metal-700  !text-globalTextSizeLg"
                underlineClass="mb-6 w-8 border-t-2"
                className="mb-4 md:mb-0"
              >
                {status === 'success' ? <Description htmlData={details || '<p></p>'} /> : <SkeletonText />}
              </ContentCard>
              {/* Tickets */}
              <div className="!relative">
                <ContentCard
                  id="buy-tickets"
                  heading={isEvent ? 'Tickets' : 'Items'}
                  headingClass="font-semibold mb-2 !text-jg-metal-700  !text-globalTextSizeLg"
                  className="mb-4 md:mb-0"
                >
                  {status === 'success' ? (
                    <>
                      <EventTicketListProvider eventData={value?.eventDetails}>
                        <TicketList isBooked={mode === 'booked-event'} />
                      </EventTicketListProvider>
                      {/** <Tickets docId={docId} tickets={tickets} />*/}
                    </>
                  ) : (
                    <ListPlaceHolder />
                  )}
                </ContentCard>
              </div>
              {/* Fixtures */}
              {isEvent && fixtures && fixtures?.length > 0 && <FixturesInfoSection fixtures={fixtures} />}

              {/* Attendees */}
              {isEvent &&
                !isPublic &&
                (status === 'success' || isPublishAttendee) &&
                // attendeeInfo.noOfBookings &&
                // attendeeInfo.noOfBookings > 0 && (
                attendees &&
                attendees?.length > 0 && (
                  <ContentCard
                    heading={`Attendees(${attendees?.length || 0})`}
                    headingClass="font-semibold mb-2 !text-jg-metal-700  !text-globalTextSizeLg"
                    className="hidden visible md:block"
                  >
                    {status === 'success' && attendees ? (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                        {publishAttendeeConfig &&
                          attendees?.slice(0, 8).map((attendee, i) => {
                            const [attendeeName, attendeeCity] = [
                              publishAttendeeConfig?.includes('Name'),
                              publishAttendeeConfig?.includes('Town'),
                            ]
                            return (
                              <EntityInfo
                                key={i}
                                entityInfo={{
                                  name: attendeeName ? `${attendee.FirstName} ${attendee.LastName}` : 'N/A',
                                }}
                                subTitle={attendeeCity ? attendee.Town : undefined}
                                size="xxl"
                              />
                            )
                          })}
                        {publishAttendeeConfig &&
                          // (attendeeInfo?.noOfBookings || 0) > attendeeInfo?.attendees?.length && (
                          attendees?.length > 8 && (
                            <div className="text-jg-grey-700 text-sm font-semibold truncate">
                              +
                              {/* {(attendeeInfo?.noOfBookings || 0) - Math.min(attendeeInfo?.attendees?.length, 8)} */}
                              {attendees?.length - 8}
                              more
                            </div>
                          )}
                      </div>
                    ) : (
                      <EntityInfoPlaceHolder />
                    )}
                  </ContentCard>
                )}
              {/* Covid 19 safety */}
              {isEvent &&
                (additionalInfo && additionalInfo?.sections?.length > 0 ? (
                  <AdditionalInfo additionalInfo={additionalInfo} />
                ) : (
                  <></>
                ))}
              {/* Similar Events Nearby */}
              {isEvent && value?.nearByEvents && value.nearByEvents.length > 0 && (
                <SimilarEventsNearby latlng={latlng} status={status} />
              )}

              {/* Events From This Provider */}

              {value?.providerEvents && value.providerEvents.length > 0 && (
                <EventsProvider ownerEntity={ownerEntity} status={status} />
              )}
            </div>

            {/* Right Side Body */}
            <div className="flex-[1] lg:max-w-[370px] space-y-4 mb-4 md:mb:0">
              {/* {bookingEnds ? ( */}
              {mode === 'current-event' && (
                <BookingTimeLeft
                  endDateObj={bookingEnds}
                  addToCalender={addToCalender}
                  calendarInviteEnabled={calendarInviteEnabled}
                  EventDetails={value?.eventDetails}
                />
              )}
              {/* ) : (
                <CommonPlaceholder />
              )} */}
              {/* Location */}
              {isEvent && locationType && (
                <LocationInfoCard
                  address={address}
                  eventLocation={eventLocation}
                  eventName={eventName}
                  latlng={latlng}
                  locationType={locationType}
                  status={status}
                />
              )}
              {/* static section */}
              {!isEvent && (
                <ContentCard heading="Seller" headingClass="!text-jg-metal-700  !text-globalTextSizeLg">
                  <EntityInfo
                    entityInfo={{
                      imgSrc: `${ownerEntity?.imgSrc}`,
                      name: `${ownerEntity?.name}`,
                    }}
                    subTitle={ownerEntity?.addressString}
                    size="lg"
                    subTitleClass="truncate max-w-[280px] "
                  />
                </ContentCard>
              )}

              {/* Contact */}
              {contacts && contacts.length > 0 && (
                <ContactsInfoCard contacts={contacts} status={status} docId={Number(docId)} />
              )}
              {/* QR Code Section */}
              {mode === 'booked-event' && (
                <div className="jg-hidden md:block">
                  <QRCodeCard {...{ eventDetails, eventDocId: docId || -1 }} />
                </div>
              )}
              {/* Tags */}
              {tag ? <TagsInfoCard tag={tag} status={status} /> : <></>}
            </div>
          </div>
        </div>
      </div>
      <BottomFloatMenuWithModal mode={mode} />
    </ShoppingCartProvider>
  )
}

export default Details
