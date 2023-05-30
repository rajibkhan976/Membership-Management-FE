import { Avatar, Badge, StackedAvatars } from '@comps/uiComps'
import { AddressInfo, EntityInfo } from '@jg/common/comps'
import DateTimeInfo from '@jg/common/comps/labels/DateTimeInfo/DateTimeInfo'
import { EventInfoCardProps } from './EventInfoCardProps'
import { Currency } from '@jg/utils'
import { MapMarkerOutline } from '@comps/uiComps/Icons'
import React from 'react'
import { useContext } from 'react'
import { useGeoLocationContext } from '@jg/providers/GeoLocationProvider'
import { withTooltip } from '@jg/utils/withTooltip'
import { EventSettingsContext } from '../../providers/EventSettingsProvider'
import AppStore from '@jg/store/store'
import { useEventSettingsContext } from '@jg/widgets/Events/providers/EventSettingsProvider'
import 'font-awesome/css/font-awesome.css'
import { EventWidgetConfigType, useEventConfig } from '../../EventWidget'
import { useWidgetContext } from 'jg-widget'
import Tooltip from '@jg/common/comps/Tooltip'
import { SaveEventButton } from '../eventListing/EventListing'

function EventInfoCard(props: EventInfoCardProps) {
  const { eventInfo, imageAlign = 'top' } = props

  return imageAlign === 'left' ? <HorizontalAlignedCard {...eventInfo} /> : <VerticalAlignedCard {...eventInfo} />
}
export default React.memo(EventInfoCard)

function HorizontalAlignedCard({
  imgSrc,
  ownerEntity,
  starts,
  name,
  address,
  priceSettings,
  latlng,
  locationType,
  eventImage,
  isFeatured,
  isBookedByUser,
  category,
  subCategories,
  isInstallmentEnabled,
  docId,
  isSavedByUser,
}: Partial<EventInfoCardProps['eventInfo']>) {
  const { getDistanceTo } = useGeoLocationContext()
  const { sysDistanceUnit } = useEventSettingsContext()
  const distance = latlng
    ? getDistanceTo({ lat: latlng.lat, lng: latlng.lng }).toFixed(1) +
      ` ${sysDistanceUnit.toLowerCase() === 'kilometer' ? 'km' : sysDistanceUnit.toLowerCase() === 'mile' ? 'mi' : ''}`
    : '...'
  //const { }= priceSettings;
  const currencySymbol = Currency.getSymbol(priceSettings?.currency || '')
  const subCategoriesArray = subCategories && subCategories?.length > 0 ? subCategories?.split(',') : []
  // const [toggle, setToggle] = useState(true)
  // const priceFigure =
  //   priceSettings?.min === priceSettings?.max
  //     ? priceSettings?.min === 0
  //       ? 'Free'
  //       : `${currencySymbol}${Number(priceSettings?.min).toFixed(2)}`
  //     : `${currencySymbol}${Number(priceSettings?.min).toFixed(2)} - ${currencySymbol}${Number(
  //         priceSettings?.max
  //       ).toFixed(2)}`
  // const priceLabel = `${priceFigure}`
  const priceFigure = priceSettings?.displayPrice
  const priceCalculate = (price?: string) => {
    if (priceFigure?.toLowerCase() === 'free') {
      price = priceFigure
      return price
    } else if (priceFigure?.includes('-') === true) {
      price = priceFigure
        ?.split('-')
        .map((item) => `${currencySymbol}${Number(item).toFixed(2)}`)
        .join(' - ')

      return price
    } else if (priceFigure === '' || priceFigure === null) {
      return priceFigure
    } else {
      price = `${currencySymbol}${Number(priceFigure).toFixed(2)}`
      return price
    }
  }

  const priceLabel = priceCalculate(priceFigure)
  const { systemSettings } = useContext(EventSettingsContext)

  const BaseAppPath = AppStore.getState().BaseAppPath

  const { isEvent, isPublic } = useEventConfig()
  const isPrivate = !isPublic
  const cardImageUrl =
    (!eventImage || eventImage?.toLocaleLowerCase() === 'virtual') && imgSrc === ''
      ? `${BaseAppPath}Store/Download?f=${
          systemSettings[`${isEvent ? 'EVENT' : 'SHOP'}.DEFAULT_IMAGE`]
        }&t=Organization${isEvent ? 'Event' : 'Shop'}DefaultImage`
      : imgSrc

  return (
    <div className="flex flex-col sm:flex-row max-w-full sm:max-w-none items-start sm:items-center sm:justify-start mx-auto sm:mx-0 overflow-hidden w-full border border-jg-metal-50 sm:border-none rounded sm:rounded-none">
      {/* <div className="relative w-full max-w-[320px] sm:w-[220px] sm:h-[110px] flex-shrink-0"> */}
      <div className="relative w-full max-w-full md:max-w-[320px] sm:w-[192px] sm:h-[192px] flex-shrink-0 ">
        <div className="aspect-w-2 aspect-h-1 sm:aspect-w-1 sm:aspect-h-1">
          {/* {eventImage && eventImage.toLowerCase() === 'virtual' ? ( */}
          <img
            className="object-cover w-full h-full text-xs text-jg-metal-500 rounded-t sm:rounded"
            src={cardImageUrl}
            alt={name}
          />
        </div>
        {/* {priceLabel.substring(1).toLowerCase() === 'null' ? (
          <></>
        ) : ( */}
        {!priceLabel || priceLabel === '' ? (
          <></>
        ) : (
          <Badge
            label={priceLabel}
            className="absolute left-4 bottom-4 rounded-[100px] text-globalTextSizeSm !font-semibold"
          />
        )}
        {/* )} */}
      </div>
      <div className="sm:my-0 sm:w-auto min-w-0 !w-full">
        <div className="px-4  border-b border-jg-metal-50 sm:border-none py-2">
          <EntityInfo entityInfo={ownerEntity} size="md" className="" nameClass="text-jg-metal-500" />
        </div>
        <div className="flex-1 flex flex-col px-4 py-4 sm:py-1 gap-1">
          {isEvent && (
            <DateTimeInfo
              dateTimeInfo={starts}
              className="text-jg-green-500 text-[12px] leading-3.5 font-medium truncate"
            />
          )}

          <div className="font-semibold text-globalTextSizeLg text-jg-metal-900 truncate">{name}</div>
          {isEvent &&
            (locationType && locationType === 'venue' ? (
              <>
                <div className="text-globalTextSizeSm text-jg-metal-500 truncate">
                  <AddressInfo className="truncate" address={address} />
                </div>
              </>
            ) : locationType === 'online' ? (
              <div className="text-globalTextSizeSm text-jg-metal-500 truncate">Online Event</div>
            ) : locationType === 'tba' ? (
              <div className="text-globalTextSizeSm text-jg-metal-500 truncate">Location to be Confirmed</div>
            ) : (
              <></>
            ))}
        </div>
        <div className="flex justify-between sm:pl-4 pl-0 w-full mt-2 flex-col space-y-4">
          <div className="flex items-center w-full justify-between px-4 sm:px-0">
            {isEvent &&
              (locationType && locationType === 'venue' ? (
                <div className="flex space-x-2 pt-2">
                  <MapMarkerOutline className="w-4 h-4 text-jg-metal-500" />
                  <span className="text-globalTextSizeMd text-jg-metal-500 font-medium">{distance} away</span>
                </div>
              ) : (
                <></>
              ))}
            {isInstallmentEnabled && <InstallmentAvailableMark />}
          </div>
          <div className="flex justify-between items-center py-2 px-4 sm:p-0 bg-jg-grey-50 border-t border-t-jg-metal-50 sm:bg-transparent sm:border-none">
            <div className="flex justify-end items-center">
              {/* Temporary Data */}
              <StackedAvatars negativeSpace={2} size="md" numOfAvatar={4}>
                {category && <AvatarWithTooltip content={category} bordered={false} name={category} withNameInitials />}

                {subCategoriesArray.slice(0, 2).map((e, i) => {
                  return <AvatarWithTooltip key={i} content={e} bordered={false} name={e} withNameInitials />
                })}
                {subCategoriesArray?.length > 2 && (
                  <AvatarWithTooltip
                    content={`+${subCategoriesArray.length - 2} More`}
                    bordered={false}
                    name={`${subCategoriesArray.length - 2}+`}
                    withNameInitials
                  />
                )}
              </StackedAvatars>
            </div>
            <div
              className={`space-x-[18px] flex ml-2 items-center justify-end ${
                locationType !== 'venue' ? 'w-full' : ''
              }`}
            >
              {isEvent && isPrivate && isBookedByUser && (
                <Badge
                  fillType="faded"
                  rounded
                  variant="primary"
                  label="Booked"
                  size="md"
                  className="border border-jg-green-500 text-globalTextSizeSm max-h-6 px-2 py-1"
                />
              )}
              {isFeatured && <FeaturedMark />}
              {isPrivate && (
                <span className="w-6 h-6 inline-block " onClick={(e) => e.preventDefault()}>
                  <SaveEventButton id={docId || 0} className={''} isSaved={isSavedByUser} />
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const AvatarWithTooltip = withTooltip(Avatar)

function VerticalAlignedCard({
  imgSrc,
  ownerEntity,
  starts,
  name,
  address,
  subCategories,
  category,
  priceSettings,
  latlng,
  locationType,
  eventImage,
  isFeatured,
  isBookedByUser,
  isInstallmentEnabled,
  docId,
  isSavedByUser,
}: Partial<EventInfoCardProps['eventInfo']>) {
  const { getDistanceTo } = useGeoLocationContext()
  const { sysDistanceUnit } = useEventSettingsContext()

  const distance = latlng
    ? getDistanceTo({ lat: latlng.lat, lng: latlng.lng }).toFixed(1) +
      ` ${sysDistanceUnit.toLowerCase() === 'kilometer' ? 'km' : sysDistanceUnit.toLowerCase() === 'mile' ? 'mi' : ''}`
    : '...'
  const currencySymbol = Currency.getSymbol(priceSettings?.currency || '')
  // const priceFigure =
  //   priceSettings?.min === priceSettings?.max
  //     ? priceSettings?.min === 0
  //       ? 'Free'
  //       : `${currencySymbol}${Number(priceSettings?.min).toFixed(2)}`
  //     : `${currencySymbol}${Number(priceSettings?.min).toFixed(2)} - ${currencySymbol}${Number(
  //         priceSettings?.max
  //       ).toFixed(2)}`
  // const priceLabel = `${priceFigure}`
  const priceFigure = priceSettings?.displayPrice
  const priceCalculate = (price?: string) => {
    if (priceFigure?.toLowerCase() === 'free') {
      price = priceFigure
      return price
    } else if (priceFigure?.includes('-') === true) {
      price = priceFigure
        ?.split('-')
        .map((item) => `${currencySymbol}${Number(item).toFixed(2)}`)
        .join(' - ')

      return price
    } else if (priceFigure === '' || priceFigure === null) {
      return priceFigure
    } else {
      price = `${currencySymbol}${Number(priceFigure).toFixed(2)}`
      return price
    }
  }
  const priceLabel = priceCalculate(priceFigure)
  const { systemSettings } = useContext(EventSettingsContext)
  const BaseAppPath = AppStore.getState().BaseAppPath
  const subCategoriesArray = subCategories && subCategories?.length > 0 ? subCategories?.split(',') : []

  const { isEvent, isPublic } = useEventConfig()
  const isPrivate = !isPublic
  const cardImageUrl =
    (!eventImage || eventImage?.toLocaleLowerCase() === 'virtual') && imgSrc === ''
      ? `${BaseAppPath}Store/Download?f=${
          systemSettings[`${isEvent ? 'EVENT' : 'SHOP'}.DEFAULT_IMAGE`]
        }&t=Organization${isEvent ? 'Event' : 'Shop'}DefaultImage`
      : imgSrc

  return (
    <div className="event-info-card flex flex-col bg-white">
      {/* <div className="block bg-[#fafafa] rounded-md shadow overflow-hidden max-w-sm min-w-[19rem] sm:w-[370px]"> */}
      <div className="divide-y divide-gray-100 flex-grow">
        <div className="relative">
          <div className="aspect-w-2 aspect-h-1 overflow-hidden">
            <img
              className="flex-shrink-0 mx-auto object-cover transition-all delay-150 duration-500 ease-in-out hover:scale-125 text-xs text-jg-metal-500"
              src={cardImageUrl}
              alt={name}
            />
          </div>

          {/* {priceLabel.substring(1).toLowerCase() === 'null' ? ( */}
          {!priceLabel || priceLabel === '' ? (
            <></>
          ) : (
            <Badge
              size="md"
              rounded={true}
              label={priceLabel}
              className="absolute left-4 bottom-4 !font-semibold !text-globalTextSizeSm"
            />
          )}
        </div>
        <div className="px-4 py-2">
          <EntityInfo entityInfo={ownerEntity} size="md" nameClass="text-jg-metal-500" />
        </div>
        <div className="flex-1 flex flex-col px-4 py-2 gap-2 min-h-[81px] justify-around">
          {isEvent && (
            <DateTimeInfo
              className="font-medium text-[13px] leading-4 text-[#008345] uppercase truncate"
              dateTimeInfo={starts}
            />
          )}

          <div className="font-semibold text-globalTextSizeLg text-jg-metal-900 truncate">{name}</div>
          {isEvent &&
            (locationType && locationType === 'venue' ? (
              <AddressInfo className="text-globalTextSizeSm text-jg-metal-500 truncate" address={address} />
            ) : locationType === 'online' ? (
              <div className="text-globalTextSizeSm text-jg-metal-500 truncate ">Online Event</div>
            ) : locationType === 'tba' ? (
              <div className="text-globalTextSizeSm text-jg-metal-500 truncate">Location to be Confirmed</div>
            ) : (
              <></>
            ))}

          <div className="flex justify-between mt-4 mb-2">
            {isEvent &&
              (locationType && locationType === 'venue' ? (
                <div className="flex items-center space-x-1 !leading-4">
                  <MapMarkerOutline className="w-4 h-4 text-jg-metal-700" />
                  <span className="text-globalTextSizeMd text-jg-metal-700 font-medium truncate">{distance} away</span>
                </div>
              ) : (
                <></>
              ))}
            {isInstallmentEnabled && <InstallmentAvailableMark />}
          </div>
        </div>
      </div>
      <div className="flex justify-between py-2.5 px-[15px] bg-jg-grey-50 border-t border-t-jg-metal-50">
        {/* {locationType && locationType === 'venue' ? (
          <div className="flex items-center space-x-1 !leading-4">
            <MapMarkerOutline className="w-4 h-4 text-jg-metal-700" />
            <span className="text-globalTextSizeMd text-jg-metal-700 font-medium truncate">{distance} away</span>{' '}
          </div>
        ) : (
          <></>
        )} */}

        <div className="flex justify-end items-center">
          {/* Temporary Data */}
          <StackedAvatars negativeSpace={2} size="md" numOfAvatar={4}>
            {category && <AvatarWithTooltip content={category} bordered={false} name={category} withNameInitials />}

            {subCategoriesArray.slice(0, 2).map((e, i) => {
              return <AvatarWithTooltip key={i} content={e} bordered={false} name={e} withNameInitials />
            })}
            {subCategoriesArray?.length > 2 && (
              <AvatarWithTooltip
                content={`+${subCategoriesArray.length - 2} More`}
                bordered={false}
                name={`${subCategoriesArray.length - 2}+`}
                withNameInitials
              />
            )}
          </StackedAvatars>
        </div>
        {/* <div
          className={`space-x-[18px] flex ml-2 items-center justify-end 
          ${
            locationType !== 'venue' ? 'w-full self-end' : ''
          }
          `}
        > */}
        <div
          className={`space-x-[18px] flex ml-2 items-center justify-end 
          `}
        >
          {isEvent && isPrivate && isBookedByUser && (
            <Badge
              fillType="faded"
              rounded
              variant="primary"
              label="Booked"
              size="md"
              className="border border-jg-green-500 text-globalTextSizeSm max-h-6 px-2 py-1"
            />
          )}

          {/* {isFeatured && <StarIcon className="text-[20px] text-jg-yellow-700" />} */}
          {isFeatured && <FeaturedMark />}
          {isPrivate && (
            <span className="w-6 h-6 inline-block " onClick={(e) => e.preventDefault()}>
              <SaveEventButton id={docId || 0} className={''} isSaved={isSavedByUser} />
            </span>
          )}
          {/* <TobeSavedIcon className="w-6 h-6  text-jg-grey-500 hover:text-jg-red-800   " /> */}
        </div>
      </div>
    </div>
  )
}

const FeaturedMark = () => {
  return (
    <Tooltip content="Featured">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 17.77L18.18 21.5L16.54 14.47L22 9.74L14.81 9.12L12 2.5L9.19 9.12L2 9.74L7.45 14.47L5.82 21.5L12 17.77Z"
          fill="#FBC02D"
        />
      </svg>
    </Tooltip>
  )
}

const InstallmentAvailableMark = () => {
  return (
    <div className="inline-flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M9.33398 8.66699H10.334V10.547L11.9607 11.487L11.4607 12.3537L9.33398 11.127V8.66699ZM12.0007 5.33366H2.66732V12.667H5.78065C5.49398 12.0603 5.33398 11.3803 5.33398 10.667C5.33398 9.42931 5.82565 8.24233 6.70082 7.36716C7.57599 6.49199 8.76297 6.00033 10.0007 6.00033C10.714 6.00033 11.394 6.16033 12.0007 6.44699V5.33366ZM2.66732 14.0003C1.92732 14.0003 1.33398 13.4003 1.33398 12.667V3.33366C1.33398 2.59366 1.92732 2.00033 2.66732 2.00033H3.33398V0.666992H4.66732V2.00033H10.0007V0.666992H11.334V2.00033H12.0007C12.3543 2.00033 12.6934 2.1408 12.9435 2.39085C13.1935 2.6409 13.334 2.98004 13.334 3.33366V7.40033C14.1607 8.24033 14.6673 9.39366 14.6673 10.667C14.6673 11.9047 14.1757 13.0917 13.3005 13.9668C12.4253 14.842 11.2383 15.3337 10.0007 15.3337C8.72732 15.3337 7.57398 14.827 6.73398 14.0003H2.66732ZM10.0007 7.43366C9.14312 7.43366 8.32071 7.77431 7.71434 8.38068C7.10797 8.98705 6.76732 9.80946 6.76732 10.667C6.76732 12.4537 8.21398 13.9003 10.0007 13.9003C10.4253 13.9003 10.8457 13.8167 11.238 13.6542C11.6303 13.4917 11.9867 13.2535 12.287 12.9533C12.5872 12.6531 12.8254 12.2966 12.9879 11.9043C13.1504 11.512 13.234 11.0916 13.234 10.667C13.234 8.88033 11.7873 7.43366 10.0007 7.43366Z"
          fill="#607D8B"
        />
      </svg>
      <span className="text-jg-metal-500 text-globalTextSizeSm font-medium pl-1">Installment Available</span>
    </div>
  )
}
