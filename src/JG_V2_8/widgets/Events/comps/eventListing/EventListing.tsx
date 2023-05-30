import classNames from 'classnames'
import { useWidgetContext } from 'jg-widget'
import { Link } from 'react-router-dom'
import shallow from 'zustand/shallow'
import useEventStore from '../../store/useEventStore'
import EventInfoCard from '../eventInfoCard/EventInfoCard'
import { EventListingProps } from './EventListingProps'
import { HeartIcon as TobeSavedIcon } from '@heroicons/react/outline'
import { HeartIcon as SavedIcon } from '@heroicons/react/solid'
import Tooltip from '@jg/common/comps/Tooltip'
import { useEffect, useState } from 'react'
import { useEventConfig } from '../../EventWidget'
import EmptyResult from '../finder/EmptyResult'

function EventListing(props: EventListingProps) {
  const { view, imageAlign = 'top', as = 'div', itemAs = 'div', ...rest } = props
  const { basePath } = useWidgetContext()
  const events = useEventStore(
    (state) => {
      switch (view) {
        case 'featured':
          return state.featuredEvents
        case 'nearby':
          return state.nearbyEvents
        case 'ownedByClubs':
          return state.clubEvents
        case 'ownedByProvider':
          return state.ownedByProviderEvents
        case 'searchResults':
          return state.searchResultsByPage
        case 'nearbyRelavant':
          return state.nearbyRelavantEvents
        case 'providerEvents':
          return state.providerEvents
        case 'ngbEvents':
          return state.ngbEvents
        case 'regionalEvents':
          return state.regionalEvents
        case 'subRegionalEvents':
          return state.subRegionalEvents
      }
    },
    view === 'searchResults' ? undefined : shallow
  )

  const Wrapper = as
  const ItemWrapper = itemAs
  const { isEvent } = useEventConfig()

  const isHomepageEventListing = [
    'featured',
    'nearby',
    'ownedByClubs',
    'ngbEvents',
    'regionalEvents',
    'subRegionalEvents',
  ].includes(view)

  return (
    <Wrapper {...rest}>
      {events?.map((item, index) => {
        const { eventDocIdHash, docId, isBookedByUser } = item
        if (!eventDocIdHash) {
          return <div key={docId}></div>
        }
        return (
          <ItemWrapper
            id={docId}
            key={docId}
            className={classNames(
              // 'relative',
              isHomepageEventListing && imageAlign === 'top'
                ? 'flex-[100%] md:max-w-[50%]'
                : imageAlign === 'top' && 'flex-[300px] sm:max-w-[50%]',
              // view === 'featured' && imageAlign === 'top'
              //   ? 'flex-[100%] md:max-w-[50%]'
              //   : imageAlign === 'top' && 'flex-[300px] sm:max-w-[50%]',
              imageAlign === 'left'
                ? 'py-4 block'
                : ' md:flex-[370px] flex-grow max-w-full jgxl:max-w-[33.333%] jgxl2:max-w-[25%] jgxl3:max-w-[16.67%]',
              ''
            )}
          >
            {/* <Link
              to={isBookedByUser && isEvent ? `${basePath}booking-details/${docId}` : `${basePath}details/${docId}`}
              className="w-full inline-flex px-1 pb-4 md:px-2 md:pb-4 jgxl2:px-3 min-w-0 h-full"
            > */}
            <div className={classNames('relative', imageAlign === 'top' && 'h-full')}>
              <Link
                to={
                  isBookedByUser && isEvent
                    ? `${eventDocIdHash ? basePath + 'booking-details/' + eventDocIdHash : '#'}`
                    : `${eventDocIdHash ? basePath + 'details/' + eventDocIdHash : '#'}`
                  // : `${basePath}details/${eventDocIdHash}`
                }
                className={`${
                  imageAlign === 'top'
                    ? 'pb-4 w-full inline-flex px-1  md:px-2  jgxl2:px-3 min-w-0 h-full'
                    : 'w-full inline-flex px-1  md:px-2  jgxl2:px-3 min-w-0 h-full'
                }`}
              >
                <EventInfoCard eventInfo={item} imageAlign={imageAlign} />
              </Link>
              {/* {view && (
                <SaveEventButton
                  id={item.docId}
                  isSaved={item.isSavedByUser}
                  className={classNames(
                    ' absolute  hover:text-jg-red-800 ',
                    imageAlign === 'top' ? 'right-7 bottom-8' : 'right-3 bottom-[0.8rem]',
                    isEvent &&
                      item.locationType &&
                      item.locationType != 'venue' &&
                      imageAlign === 'left' &&
                      'bottom-[1.2rem]',
                    isEvent && item.locationType === '' && imageAlign === 'left' && 'bottom-[1.7rem]',
                    isEvent && imageAlign === 'left' && item.locationType === 'venue' && 'sm:bottom-[0.4rem]',
                    !isEvent && imageAlign === 'left' && 'sm:!bottom-10'
                  )}
                />
              )} */}
            </div>
          </ItemWrapper>
        )
      })}
      {events?.length === 0 && <EmptyResult />}
    </Wrapper>
  )
}

export default EventListing

export const SaveEventButton = ({
  id,
  isSaved = false,
  className,
}: {
  id: number
  isSaved?: boolean
  className: string
}) => {
  const [isSavedEvent, setSavedEvent] = useState(isSaved)
  const saveEventForUser = useEventStore((state) => state.saveEventForUser)

  useEffect(() => {
    setSavedEvent(isSaved)
  }, [isSaved])
  return (
    <button
      onClick={async () => {
        try {
          setSavedEvent((s) => !s)
          await saveEventForUser(id, !isSavedEvent)
        } catch (err) {
          setSavedEvent((s) => !s)
        }
      }}
      className={className}
    >
      {!isSavedEvent && (
        <Tooltip content={'Save'}>
          <TobeSavedIcon className="w-6 h-6  text-jg-grey-500 hover:text-jg-red-800   " />
        </Tooltip>
      )}
      {isSavedEvent && (
        <Tooltip content={'Saved'}>
          <SavedIcon className="w-6 h-6  text-jg-red-600" />
        </Tooltip>
      )}
    </button>
  )
}
