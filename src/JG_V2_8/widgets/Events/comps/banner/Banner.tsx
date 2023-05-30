import { CompBaseProps, H1 } from '@comps/uiComps'
import classNames from 'classnames'
import Navbar from './Navbar'
import AppStore from '@jg/store/store'
import { useContext } from 'react'
import { EventSettingsContext } from '../../providers/EventSettingsProvider'
import { useEventConfig } from '../../EventWidget'

export type BannerProps = CompBaseProps & {
  heading?: string
  caption?: string
}

function Banner(props: BannerProps) {
  const { heading, children, className } = props
  const BaseAppPath = AppStore.getState().BaseAppPath
  const { systemSettings } = useContext(EventSettingsContext)
  const { isEvent } = useEventConfig()

  const clsNames = classNames(className, 'bg-eventsHomeLayoutBgOverlay bg-no-repeat bg-cover')
  const backgroundImage = `url('${BaseAppPath}Store/DownloadPublic?f=${
    systemSettings[`${isEvent ? 'EVENT' : 'SHOP'}.HERO_IMAGE`]
  }&t=Organization${isEvent ? 'Event' : 'Shop'}HeroImage')`
  return (
    <div
      className="bg-no-repeat bg-cover"
      style={{
        backgroundImage,
        backgroundPosition: 'center',
      }}
    >
      <div className={clsNames}>
        <Navbar />
        {heading && (
          <H1 className="text-white text-center text-globalTextSizeLg sm:text-globalTextSizeXl">{heading}</H1>
        )}
        {children}
      </div>
    </div>
  )
}
export default Banner
