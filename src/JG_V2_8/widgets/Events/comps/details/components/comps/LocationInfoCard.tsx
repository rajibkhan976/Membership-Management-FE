import { AddressInfo } from '@jg/common/comps'
import ContentCard from '@jg/common/comps/contents/contentCard/ContentCard'
import { AddressInfoProps } from '@jg/common/comps/labels/addressInfo/AddressInfoProps'
import { LocationMarkerIcon } from '@heroicons/react/solid'
import { addressInfo } from '@jg/common/types'
import { LatLngInfo } from '@jg/common/types/common/LatLngInfo'
import { AsyncStatus } from '@jg/common/types/responses/AsyncStatus'
import CommonPlaceholder from '@jg/common/comps/loader/placeholders/CommonPlaceholder'

export type LocationInfoCardProps = {
  locationType?: string
  address?: addressInfo
  eventLocation?: string
  eventName?: string
  latlng?: LatLngInfo
  status?: AsyncStatus
}
const formatAddress = (address?: addressInfo) => {
  return (
    <div>
      <div>
        {address?.address1 ? address.address1 + ', ' : <></>}
        {address?.address2 ? address.address2 + ', ' : <></>}
        {address?.address3 ? address.address3 + ', ' : <></>}
      </div>
      <div>{address?.town ? address.town + ', ' : <></>}</div>
      <div>{address?.postCode ? address.postCode + ', ' : <></>}</div>
      <div>{address?.county ? address.county + ', ' : <></>}</div>
      <div>{address?.country ? address.country : <></>}</div>
    </div>
  )
}
const LocationInfoCard = ({
  locationType,
  address,
  eventLocation,
  eventName,
  latlng,
  status,
}: LocationInfoCardProps) => {
  return (
    <ContentCard
      heading="Location"
      underlineClass="border-t mb-4 mt-2"
      className="hidden visible md:block"
      headingClass="mb-1 !text-jg-metal-700  !text-globalTextSizeLg"
    >
      <div className="space-y-3">
        {status === 'success' ? (
          locationType === 'venue' ? (
            <>
              <div className="text-sm text-jg-metal-300 font-bold break-words">{eventLocation}</div>
              <AddressInfo
                address={address}
                format={formatAddress}
                className="text-sm text-jg-metal-300 !mt-0 break-words"
              />
              <a
                className="flex items-center gap-2 text-jg-green-500 cursor-pointer"
                // href={`https://www.bing.com/maps?where1=${latlng?.lat},${latlng?.lng}&lvl=14`}
                href={`https://www.bing.com/maps?rtp=~pos.${latlng?.lat}_${latlng?.lng}_${Object.values(
                  address || { name: eventName }
                )
                  .filter(Boolean)
                  .join(',')}&lvl=14`}
                target="_blank"
                rel="noreferrer"
              >
                <LocationMarkerIcon className="w-6" />
                <span className="font-semibold text-sm !leading-4">View On Map</span>
              </a>
            </>
          ) : locationType === 'online' ? (
            <div className="text-sm text-jg-metal-300">Online Event</div>
          ) : locationType === 'tba' ? (
            <div className="text-sm text-jg-metal-300">Location to be Confirmed</div>
          ) : (
            <></>
          )
        ) : (
          <CommonPlaceholder />
        )}
      </div>
    </ContentCard>
    //  {locationType === 'venue' ? (
    //   <>
    //     <div className="text-sm text-jg-metal-300 font-bold break-words">{eventLocation}</div>
    //     <AddressInfo
    //       address={address}
    //       format={formatAddress}
    //       className="text-sm text-jg-metal-300 !mt-0 break-words"
    //     />
    //     <a
    //       className="flex items-center gap-2 text-jg-green-500 cursor-pointer"
    //       // href={`https://www.bing.com/maps?where1=${latlng?.lat},${latlng?.lng}&lvl=14`}
    //       href={`https://www.bing.com/maps?rtp=~pos.${latlng?.lat}_${latlng?.lng}_${Object.values(
    //         address || { name: eventName }
    //       )
    //         .filter(Boolean)
    //         .join(',')}&lvl=14`}
    //       target="_blank"
    //       rel="noreferrer"
    //     >
    //       <LocationMarkerIcon className="w-6" />
    //       <span className="font-semibold text-sm !leading-4">View On Map</span>
    //     </a>
    //   </>
    // ) : locationType === 'online' ? (
    //   <div className="text-sm text-jg-metal-300">Online Event</div>
    // ) : locationType === 'tba' ? (
    //   <div className="text-sm text-jg-metal-300">Location to be Confirmed</div>
    // ) : (
    //   <></>
    // )}
  )
}
export default LocationInfoCard
