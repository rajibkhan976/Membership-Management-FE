import React from 'react'
import { useEffect, useRef, useState } from 'react'
import Carousel from 'react-multi-carousel'

const JGShopCarousel = ({ children }: { children: React.ReactNode }) => {
  const [nextSlide, setNextSlide] = useState(0)
  const buttonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    buttonRef?.current?.click()
  }, [nextSlide])
  return (
    <div className="flex flex-col md:flex-row p-2 pl-0 gap-4 overflow-hidden">
      <Carousel
        responsive={{
          superLargeDesktop: {
            breakpoint: { max: 4000, min: 0 },
            items: 1,
          },
        }}
        showDots
        arrows
        beforeChange={(nextSlide, state) => setNextSlide(nextSlide)}
        containerClass={'flex-[0.75] h-[380px] '}
        customButtonGroup={<ButtonGroup ref={buttonRef} to={nextSlide} />}
      >
        {children}
      </Carousel>
      <div className="md:flex-[0.25] flex md:block overflow-auto">
        {React.Children.map(children, (child, index) => (
          <div
            onClick={() => setNextSlide(index)}
            className={`my-2 p-1 rounded-md w-36 h-[72px] md:w-full md:h-[92px] overflow-hidden cursor-pointer ${
              nextSlide === index ? 'border-2 border-jg-green-500' : ''
            }`}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}
export default JGShopCarousel

const ButtonGroup = React.forwardRef<HTMLDivElement, any>(({ goToSlide, to }, ref) => {
  return <div className="jg-hidden" onClick={() => goToSlide(to)} ref={ref}></div>
})
