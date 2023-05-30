import Label from '@comps/uiComps/Label/Label'
import React from 'react'
import { useEventConfig } from '../../EventWidget'
import { useEventSettingsContext } from '../../providers/EventSettingsProvider'
import Banner from '../banner/Banner'

function BannerHome() {
  const { labelSettings: labels } = useEventSettingsContext()
  const { isEvent } = useEventConfig()
  return (
    <Banner
      className={`${isEvent ? 'h-[360px]' : 'h-[208px]'} lg:h-[216px]`}
      heading={labels?.labelSettings?.heroTitle || ''}
    >
      <div className="text-white text-center mx-4 md:mx-16 lg:w-[970px] lg:mx-auto !text-sm sm:!text-globalTextSizeLg pt-2 pb-4 sm:pb-6 ">
        {labels?.labelSettings?.heroCaption || ''}
      </div>
    </Banner>
  )
}

export default React.memo(BannerHome)
