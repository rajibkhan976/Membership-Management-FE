import { Options, VirtualElement } from '@popperjs/core'
import React, { useRef, useState } from 'react'
import Floater from '../JGFloater'

interface TooltipProps {
  content: string
  position?: Options['placement']
  offset?: [number, number]
  children: React.ReactElement
}

export const Tooltip: React.FC<TooltipProps> = ({ content, position = 'bottom', offset, children }) => {
  // const [mousePosition, setMousePosition] = useState([100, 100])
  const [isVisible, setIsVisible] = useState(false)
  const timerRef = useRef<NodeJS.Timeout>()

  const [referenceElement, setReferenceElement] = useState<Element | VirtualElement | null>(null)

  function visibilityTrue() {
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      // setMousePosition([e.clientX, e.clientY])
      setIsVisible(true)
    }, 500)
  }
  function visibilityFalse() {
    clearTimeout(timerRef.current)
    setIsVisible(false)
  }

  return (
    <>
      <div onMouseEnter={visibilityTrue} onMouseLeave={visibilityFalse} ref={setReferenceElement}>
        {children}
      </div>
      <Floater
        referenceElement={referenceElement}
        isVisible={isVisible}
        offset={offset}
        position={position}
        className="rounded-md bg-gray-700 p-2 mt-1 z-50 w-max mx-auto text-white font-semibold text-sm"
      >
        {content}
      </Floater>
    </>
  )
  // return (
  //   <div onMouseEnter={visibilityTrue} onMouseLeave={visibilityFalse}>
  //     {children}
  //     {isVisible &&
  //       createPortal(
  //         <div
  //           className={`fixed rounded-md bg-gray-700 p-2 mt-1 z-50 w-max mx-auto text-white font-semibold text-sm transform translate-x-[-50%]`}
  //           style={{
  //             top: mousePosition[1] + (offset || 0),
  //             left: mousePosition[0],
  //           }}
  //         >
  //           {content}
  //         </div>,
  //         document.body
  //       )}
  //   </div>
  // )
}
