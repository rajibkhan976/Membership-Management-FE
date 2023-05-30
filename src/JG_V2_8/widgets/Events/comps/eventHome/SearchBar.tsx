import { CompBaseProps } from '@comps/uiComps'
import { AdjustmentsIcon } from '@heroicons/react/outline'
import { SearchField } from '@jg/common/comps'
import PostcodeField from '@jg/common/comps/searchBar/PostcodeField'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { SearchRequestArg } from '../../store/useEventStore'
import DateValuePicker from '../EventDateValuePicker'
import useNavigateWithArgs from '../hooks/useNavigateWithArgs'
import SearchButton from '../SearchButton'
import { useGeoLocationContext } from '@jg/providers/GeoLocationProvider'
import { useEventSettingsContext } from '../../providers/EventSettingsProvider'
import { useEventConfig } from '../../EventWidget'

const SearchBar = (props: CompBaseProps) => {
  const { systemSettings } = useEventSettingsContext()
  const defaultDistance = systemSettings['EVENT.DEFAULT_RADIUS_LENGTH'] || 'all'
  const { userPreferredGeoLocation, defaultGeoLocation } = useGeoLocationContext()
  const { className = 'mx-4 md:mx-16 lg:w-[1000px] lg:mx-auto mb-[40px]', as = 'div', ...rest } = props
  //const locationData = useEventStore((state) => state.locationData)
  const { currentArgs, setCurrentArgs } = useNavigateWithArgs()
  const { isEvent } = useEventConfig()
  const [tempKeys, setTempKeys] = useState<SearchRequestArg>(isEvent ? { distance: defaultDistance } : {})

  const Wrapper = as
  useEffect(() => {
    if (userPreferredGeoLocation) {
      setTempKeys({ ...tempKeys, ...{ latlng: `${userPreferredGeoLocation.lat}|${userPreferredGeoLocation.lng}` } })
    } else {
      setTempKeys({ ...tempKeys, ...{ latlng: `${defaultGeoLocation.lat}|${defaultGeoLocation.lng}` } })
    }
  }, [userPreferredGeoLocation])
  return (
    <Wrapper {...{ className }} {...rest}>
      <div className="flex flex-col divide-y bg-white rounded-sm lg:divide-none lg:bg-transparent lg:flex-row lg:justify-between lg:rounded-0">
        <div className=" flex flex-row  lg:bg-white lg:rounded-sm  lg:w-full lg:mr-2.5">
          <div className="flex flex-col flex-grow  divide-y lg:divide-x lg:justify-between lg:flex-row rounded-sm">
            <div className="flex-grow pl-1 pt-1 pb-1  pr-1 ">
              <SearchField
                onClear={() => {
                  setTempKeys({ ...tempKeys, ...{ key: '' } })
                }}
                onChange={(value) => {
                  setTempKeys({ ...tempKeys, ...{ key: value } })
                }}
                onEnter={(value) => {
                  setCurrentArgs({ ...currentArgs, ...tempKeys })
                }}
                className="inline-block"
                placeholder={'Search...'}
              />
            </div>
            {isEvent && (
              <>
                <div className="flex-none min-w-[200px] pl-0 pt-1 pb-1 pr-0">
                  {/*<SimpleSelect hideBorder={true} hideLabel items={filterOptions} />*/}
                  <DateValuePicker
                    type="input"
                    onChange={(value) => {
                      setTempKeys({ ...tempKeys, ...{ date: value } })
                    }}
                  />
                </div>

                <div className="flex-none min-w-[200px] pl-0 pt-1 pb-1 pr-0 items-center justify-center">
                  <PostcodeField
                    onChange={(selected) => {
                      // setTempKeys({ ...tempKeys, ...{ latlng: selected.value } })
                    }}
                  />
                </div>
              </>
            )}
          </div>

          <div className="hidden visible lg:flex pt-1 pb-1 pr-1">
            <SearchButton
              searchRequestArg={tempKeys}
              btnSize="md"
              text={isEvent ? 'Find Events' : 'Search'}
              btnColor="primary"
              fillType="solid"
            />
          </div>
        </div>
        <div className="flex pt-0 pb-0 lg:bg-transparent lg:pb-0 lg:pt-0 ">
          <div className="flex-grow flex lg:hidden lg:visible pt-1 pb-1 pr-2 pl-1">
            <SearchButton
              searchRequestArg={tempKeys}
              block
              btnSize="md"
              text={isEvent ? 'Find Events' : 'Search'}
              btnColor="primary"
              fillType="solid"
              textAllign="center"
            />
          </div>
          <div className="flex-none flex  pt-1 pb-1 pr-1 lg:p-0">
            <SearchButton
              searchRequestArg={{}}
              btnSize="md"
              text=""
              btnColor="primary"
              fillType="outline"
              icon={<AdjustmentsIcon />}
            />
          </div>
        </div>
      </div>
    </Wrapper>
  )
}
export default SearchBar
