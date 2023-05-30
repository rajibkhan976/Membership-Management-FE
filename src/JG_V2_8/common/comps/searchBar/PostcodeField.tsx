import { MutableRefObject, SyntheticEvent, useEffect, useRef, useState } from 'react'
import { Combobox } from '@headlessui/react'
import { MapMarker } from '@comps/uiComps/Icons'
import { CgSpinner } from 'react-icons/cg'
import { findAddres } from '@jg/_core/services/location/location'
import { useGeoLocationContext } from '@jg/providers/GeoLocationProvider'
import { GeoLocationType } from '@jg/hooks/useGeoLocation'
import classNames from 'classnames'

export type PostcodeFieldProps = {
  onChange?: (e: PostCodeFieldOptionType) => void
  onBlur?: () => void
  plain?: boolean
  autoFocus?: boolean
}

export type PostCodeFieldOptionType = {
  name: string
  value: string
}

export default function PostcodeField(props: PostcodeFieldProps) {
  const { defaultGeoLocation, setUserPreferredGeoLocation, userPreferredGeoLocation } = useGeoLocationContext()
  const { onBlur, plain = false, autoFocus = false } = props
  const [optionData, setOptionData] = useState<PostCodeFieldOptionType[]>([])
  const [query, setQuery] = useState('')
  const defaultLocation = {
    name: defaultGeoLocation.locationName,
    value: `${defaultGeoLocation.lat}|${defaultGeoLocation.lng}`,
  }
  const userPreferredGeolocationFieldOptionValue = userPreferredGeoLocation
    ? {
        name: userPreferredGeoLocation.locationName,
        value: `${userPreferredGeoLocation.lat}|${userPreferredGeoLocation.lng}`,
      }
    : defaultLocation

  const [isFetch, setIsFetch] = useState<boolean>(false)
  const inputRef = useRef<any>()

  async function fetchData() {
    try {
      if (query.length > 2) {
        const result = await findAddres({ query })
        setIsFetch(true)
        return await result.json()
      } else {
        setIsFetch(false)
      }
    } catch (err) {
      return null
    }
  }

  useEffect(() => {
    fetchData().then((data) => {
      if (query.length === 0) {
        setOptionData([])
        //setIsFetch(false)
        // setSelectedAddress(defaultLocation)
        return
      }

      const result: PostCodeFieldOptionType[] = []
      for (let i = 0; i < data?.results?.length; i++) {
        result.push({
          name: data.results[i].address.freeformAddress + '|' + data.results[i].address.country,
          value: data.results[i].position.lat + '|' + data.results[i].position.lon,
        })
      }
      setOptionData(result)
      setIsFetch(false)
    })
  }, [query])

  const stringManupulation = (str: string) => {
    const subStr = str.split('|')
    return (
      <>
        <div className="text-[14px]">{subStr[0]}</div>
        <div className="font-bold text-[10px]">{subStr[1]}</div>
      </>
    )
  }

  /*useEffect(() => {
    console.log('console', selectedAddress, query.length)
    if (selectedAddress) {
      onChange?.(selectedAddress)
      const subStr = selectedAddress.value.split('|')
      setUserPreferredGeoLocation?.({
        lat: subStr[0],
        lng: subStr[1],
        locationName: selectedAddress.name.split('|').join(', '),
      })
    }
  }, [selectedAddress])*/
  useEffect(() => {
    if (autoFocus) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [])
  return (
    <Combobox
      value={userPreferredGeolocationFieldOptionValue}
      onChange={(value) => {
        //setSelectedAddress(value || defaultLocation)
        if (value) {
          const parts = value.value.split('|')
          setUserPreferredGeoLocation?.({ lat: parts[0], lng: parts[1], locationName: value.name })
        } // else setUserPreferredGeoLocation?.(defaultGeoLocation)
      }}
      nullable
    >
      <div>
        <div className="flex h-[32px] items-center">
          {/* <MapMarker className="text-jg-grey-400 w-3 m-1" /> */}
          <div className="pl-3">
            <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.5007 10.0003C10.959 10.0003 11.3515 9.83699 11.6782 9.51033C12.0043 9.18421 12.1673 8.79199 12.1673 8.33366C12.1673 7.87533 12.0043 7.48283 11.6782 7.15616C11.3515 6.83005 10.959 6.66699 10.5007 6.66699C10.0423 6.66699 9.6501 6.83005 9.32398 7.15616C8.99732 7.48283 8.83398 7.87533 8.83398 8.33366C8.83398 8.79199 8.99732 9.18421 9.32398 9.51033C9.6501 9.83699 10.0423 10.0003 10.5007 10.0003ZM10.5007 18.3337C8.26454 16.4309 6.59454 14.6634 5.49065 13.0312C4.38621 11.3995 3.83398 9.88921 3.83398 8.50033C3.83398 6.41699 4.50426 4.75727 5.84482 3.52116C7.18482 2.28505 8.73676 1.66699 10.5007 1.66699C12.2645 1.66699 13.8165 2.28505 15.1565 3.52116C16.497 4.75727 17.1673 6.41699 17.1673 8.50033C17.1673 9.88921 16.6154 11.3995 15.5115 13.0312C14.407 14.6634 12.7368 16.4309 10.5007 18.3337Z"
                fill="#90A4AE"
              />
            </svg>
          </div>

          <Combobox.Input
            ref={inputRef}
            onBlur={() => {
              onBlur?.()
            }}
            onChange={(event) => {
              setQuery(event.target.value)
            }}
            className={classNames(
              'flex py-2 px-2 text-sm font-medium   leading-4  outline-none',
              plain ? 'bg-transparent text-jg-metal-900  rounded outline-none' : 'bg-white text-jg-metal-700 '
            )}
            placeholder="City or Zip code"
            displayValue={(item: PostCodeFieldOptionType) => item?.name.split('|').join(', ') || ''}
          />
          {!plain && (
            <div className="flex items-center h-[32px] w-[32px]">
              {
                query.length > 2 && isFetch && <CgSpinner className="animate-spin w-4  m-1 fill-['#F5F5F5']" />
                //  : (
                //   <MapMarker className="text-jg-grey-400 w-3 m-1" />
                // )
              }
            </div>
          )}
        </div>
        {optionData.length === 0 && query !== '' ? (
          <div className="!relative">
            <div className="absolute left-0 top-[5px] z-[1] w-full border-t-[1px]">
              <p className=" bg-white !px-4 !py-[10px] overflow-y-auto min-w-[238px] max-w-full shadow-md">
                No Results found!
              </p>
            </div>
          </div>
        ) : (
          <Combobox.Options className="relative ">
            <div
              className={`absolute bg-white max-h-[300px] overflow-y-auto min-w-[235px] w-full left-0 z-[1] shadow-md top-[5px]  rounded-sm ${
                query !== '' && 'py-1 border-t-[1px]'
              }`}
            >
              {optionData?.map((item, index) => (
                <Combobox.Option
                  value={item}
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none !px-4 !py-[10px] border-b-[1px] transition duration-200 ease-out hover:ease-in ${
                      active ? 'bg-jg-grey-200 !text-jg-green-500' : 'text-jg-metal-700'
                    }`
                  }
                  aria-label={item.value}
                >
                  {({ active, selected }) => (
                    <>
                      <span className={`block ${selected ? 'font-medium' : 'font-normal'}`}>
                        {stringManupulation(item.name)}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? 'text-white' : 'text-teal-600'
                          }`}
                        ></span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </div>
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  )
}
