import { FC } from 'react'
import { Link } from 'react-router-dom'
import Button from '../Button/Button'
import H4 from '../Heading/H4'
import { ReactComponent as LogoIcon } from '@jg/assets/images/LogoIcon.svg'
import { useState } from 'react'
import { ReactComponent as StripeVideoPlayerIcon } from '@jg/assets/images/StripeVideoPlayerIcon.svg'

type HelpIntroProps = {
  title: string
  description: string
  iconSVG: React.ReactElement
  customLogo?: React.ReactElement
  routeLink?: string
  videoSrc?: string
  videoPlayerIcon?: React.ReactElement
  handleOnClick?: () => void
}

const HelpIntro: FC<HelpIntroProps> = ({
  title,
  description,
  iconSVG,
  routeLink,
  videoSrc,
  customLogo,
  videoPlayerIcon,
  handleOnClick,
}) => {
  const [playVideo, setPlayVideo] = useState<boolean>(false)

  return (
    <section>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          {iconSVG}
          <span className="text-[#455A64] mt-4">
            <H4>{title}</H4>
          </span>
          <div className="mt-2">
            <p className="text-[#607D8B] text-sm font-normal not-italic lg:w-[500px] md:w-auto sm:w-auto text-center transition-transform">
              {description}
            </p>
          </div>
          <div className="mt-4 flex">{customLogo ? customLogo : <LogoIcon />}</div>
        </div>

        {videoSrc && videoPlayerIcon && (
          <div
            onClick={() => {
              videoSrc && setPlayVideo(true)
            }}
            className="mt-4 w-11/12 flex justify-center cursor-pointer"
          >
            {playVideo ? (
              <iframe
                className="md:w-[525px] md:h-[260px] mb-10 md:mb-0"
                src={`https://www.youtube.com/embed/${videoSrc}?autoplay=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            ) : (
              videoPlayerIcon
            )}
          </div>
        )}

        {routeLink ? (
          <Link className="jg-btn text-left jg-btn-solid-primary jg-btn-md rounded-sm my-4" to={routeLink}>
            {'Get Started'}
          </Link>
        ) : (
          <Button className="my-4" text={'Get Started'} onClick={() => handleOnClick && handleOnClick()} />
        )}
      </div>
    </section>
  )
}

export default HelpIntro
