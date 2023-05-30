import Carousel, { ResponsiveType } from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import ArrowRight from '@jg/../icons/ArrowRight'
import ArrowLeft from '@jg/../icons/ArrowLeft'
import { CarouselProps, ArrowProps, CarouselInternalState } from 'react-multi-carousel/lib/types'

const responsiveStyle: ResponsiveType = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1110 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1110, min: 1000 },
    items: 2,
    partialVisibilityGutter: 100,
    slidesToSlide: 30,
  },
  tablet2: {
    breakpoint: { max: 1000, min: 900 },
    items: 2,
    partialVisibilityGutter: 60,
  },
  mobile: {
    breakpoint: { max: 900, min: 700 },
    items: 2,
    partialVisibilityGutter: 30,
  },
  mobile2: {
    breakpoint: { max: 700, min: 600 },
    items: 1,
    partialVisibilityGutter: 200,
  },
  smallMobile: {
    breakpoint: { max: 600, min: 440 },
    items: 1,
    partialVisibilityGutter: 100,
  },
  smallMobile2: {
    breakpoint: { max: 440, min: 0 },
    items: 1,
    partialVisibilityGutter: 40,
  },
}

export default function MultiCarousel(props: Partial<CarouselProps>) {
  const {
    children,
    className,
    containerClass,
    itemClass,
    customLeftArrow = <CustomArrow dir="left" />,
    customRightArrow = <CustomArrow dir="right" />,
    arrows = false,
    infinite = false,
    autoPlay = false,
    responsive = responsiveStyle,
    shouldResetAutoplay = false,
    renderArrowsWhenDisabled = true,
    ...carouselProps
  } = props
  return (
    <Carousel
      className={`my-0 ${className}`}
      containerClass={`!overflow-visible ${containerClass ? ` ${containerClass}` : ''}`}
      sliderClass=""
      itemClass={`flex md:block justify-start overflow-hidden min-w-0 sm:px-0 ${itemClass ? ` ${itemClass}` : ''}`}
      customLeftArrow={customLeftArrow}
      customRightArrow={customRightArrow}
      partialVisible={true}
      arrows={arrows}
      infinite={infinite}
      autoPlay={autoPlay}
      responsive={responsive}
      shouldResetAutoplay={shouldResetAutoplay}
      renderArrowsWhenDisabled={renderArrowsWhenDisabled}
      {...carouselProps}
    >
      {children}
    </Carousel>
  )
}

function CustomArrow({ onClick, dir, ...rest }: ArrowProps & { dir: 'left' | 'right' }) {
  const { carouselState } = rest
  const { currentSlide, totalItems, deviceType, slidesToShow } = carouselState as CarouselInternalState
  const buttonPositionGeneral = `absolute z-2 ${dir === 'left' ? '' : 'right-0'}`
  const buttonPositionMobile = `absolute z-2 bottom-[-3.5rem] sm:bottom-[-5rem] ${
    dir === 'left' ? 'left-4' : 'right-4'
  }`
  const className = deviceType !== 'mobile' ? buttonPositionGeneral : buttonPositionMobile
  const active =
    dir === 'right' ? currentSlide % totalItems !== totalItems - slidesToShow : currentSlide % totalItems !== 0
  const Arrow = dir === 'left' ? ArrowLeft : ArrowRight
  return <Arrow active={active} onClick={() => onClick && onClick()} className={className} />
}
