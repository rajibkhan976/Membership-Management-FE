import React, { useEffect, useRef, useState } from 'react'

const useStickyNav = (nodeRef: React.RefObject<HTMLDivElement>, top = 52) => {
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const topPosition = top
    const cachedRef = nodeRef.current
    const observer = new IntersectionObserver(
      ([e]) => {
        setIsSticky(e.intersectionRatio < 1)
      },
      {
        threshold: [1],
        rootMargin: `-${topPosition + 1}px 0px 0px 0px`, // alternativly, use this and set `top:0` in the CSS
      }
    )

    cachedRef && observer.observe(cachedRef)

    // unmount
    return function () {
      cachedRef && observer.unobserve(cachedRef)
    }
  }, [])

  return isSticky
}

export default useStickyNav
