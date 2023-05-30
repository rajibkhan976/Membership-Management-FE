import { Options, VirtualElement } from '@popperjs/core'
import React from 'react'
import { forwardRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { usePopper } from 'react-popper'
import './arrow.css'

interface IFloater {
  referenceElement: Element | VirtualElement | null
  isVisible?: boolean
  children: React.ReactNode
  className?: string
  position?: Options['placement']
  offset?: [number, number]
}

const Floater = forwardRef<HTMLElement | null, IFloater>((props, ref) => {
  const { referenceElement, isVisible = false, className = '', position = 'bottom', offset = [0, 0], children } = props
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null)
  const [arrowElement, setArrowElement] = useState<HTMLElement | null>(null)
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      { name: 'arrow', options: { element: arrowElement } },
      {
        name: 'offset',
        options: {
          offset,
        },
      },
    ],
    placement: position,
  })

  // warning: name export doesn't work. Don't know why, yet!
  React.useImperativeHandle<HTMLElement | null, HTMLElement | null>(
    ref,
    () => {
      return popperElement
    },
    [popperElement]
  )

  if (!isVisible) return <></>

  return (
    <>
      {createPortal(
        <div id="jg-tooltip" className={className} ref={setPopperElement} style={styles.popper} {...attributes.popper}>
          {children}
          <div id="jg-arrow" ref={setArrowElement} style={styles.arrow} />
        </div>,
        document.getElementById('justgo-app') || document.body
      )}
    </>
  )
})

export default Floater
