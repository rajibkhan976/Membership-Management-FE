import { Avatar, Dropdown, DropdownItem, FadeIn } from '@comps/uiComps'
import { MapMarker } from '@comps/uiComps/Icons'
import { Transition } from '@headlessui/react'
import { PencilAltIcon, UserCircleIcon, UserIcon } from '@heroicons/react/solid'
import { PostcodeField } from '@jg/common/comps'
import { useGeoLocationContext } from '@jg/providers/GeoLocationProvider'
import { useEffect, useState } from 'react'
import useNavigateWithArgs from '../hooks/useNavigateWithArgs'

const PostcodeDD = () => {
  const { currentArgs, setCurrentArgs, getArgsFromUrl } = useNavigateWithArgs()
  const { defaultGeoLocation, userPreferredGeoLocation } = useGeoLocationContext()

  const [showPostCodeField, setShowPostCodeField] = useState(false)
  const summaryCaption = `Suggested events near `
  useEffect(() => {
    // console.log('PostcodeDD', getArgsFromUrl(), userPreferredGeoLocation, defaultGeoLocation)
    const defaultLatLng = userPreferredGeoLocation
      ? `${userPreferredGeoLocation.lat}|${userPreferredGeoLocation.lng}`
      : `${defaultGeoLocation.lat}|${defaultGeoLocation.lng}`
    if (getArgsFromUrl().latlng !== defaultLatLng) {
      // console.log('PostcodeDD setCurrentArgs', getArgsFromUrl().latlng, defaultLatLng)
      setCurrentArgs({ ...currentArgs, ...{ latlng: `${defaultLatLng}` } })
    }
    setShowPostCodeField(false)
  }, [userPreferredGeoLocation])
  return (
    <div className="flex justify-center px-2 items-center">
      {!showPostCodeField && (
        <>
          <MapMarker className="text-jg-green-500 w-4 h-5 my-0.5 mx-1 " />
          <a
            onClick={() => {
              setShowPostCodeField(true)
            }}
            // className="leading-[30px] drop-shadow-md bg-jg-grey-200 hover:bg-white ring-1 ring-jg-grey-100 rounded px-1.5 cursor-pointer truncate"
            className="px-2 cursor-pointer truncate"
          >
            <span className="text-jg-grey-100 text-globalTextSizeLg font-medium">{summaryCaption}</span>
            <span className="text-jg-green-500 font-medium text-globalTextSizeLg">
              {userPreferredGeoLocation ? userPreferredGeoLocation.locationName : defaultGeoLocation.locationName}
            </span>
            <PencilAltIcon className="inline w-5 ml-2 text-jg-grey-600" />
          </a>
        </>
      )}
      {showPostCodeField && (
        <div className="bg-white rounded">
          <PostcodeField
            autoFocus={true}
            plain={true}
            onBlur={() => {
              setTimeout(() => {
                setShowPostCodeField(false)
              }, 500)
            }}
          />
        </div>
      )}
    </div>
  )
}
export default PostcodeDD
