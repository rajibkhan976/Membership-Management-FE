import { Fragment, memo, useRef, useEffect, useState, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { Popover, Transition } from '@headlessui/react'
import { CompBaseProps } from '@comps/uiComps'
import classNames from 'classnames'
import { usePopper } from 'react-popper'

type JGPopoverProps = CompBaseProps & {
  appearOnHover?: boolean
  btnChildComp?: React.ReactElement | null
  closeAfter?: number
  leaveSpaceHorizontally?: number
  leaveSpaceVertically?: number
  mainContainerHeight?: number
  mainContainerWidth?: number
  minHeight?: number
  mouseXPos?: number
  mouseYPos?: number
  panelChildComp?: React.ReactElement | null
  panelClassName?: string
  show?: boolean
  showAfter?: number
}

const JGPopover = (props: JGPopoverProps) => {
  const {
    appearOnHover = false,
    btnChildComp = <>{`Show`}</>,
    className,
    closeAfter = 0,
    leaveSpaceHorizontally = 0,
    leaveSpaceVertically = 0,
    mainContainerHeight = 0,
    mainContainerWidth = 0,
    minHeight,
    panelChildComp = <>{`Content`}</>,
    panelClassName,
    mouseXPos,
    mouseYPos,
    show,
    showAfter = 0,
  } = props

  const [buttonRef, setButtonRef] = useState<HTMLButtonElement | null>(null)
  const [panelRef, setPanelRef] = useState<HTMLDivElement | null>(null)
  const { styles, attributes } = usePopper(buttonRef, panelRef)
  let showingTimeout: any = null
  const closingTimeout = useRef<any | null>(null)

  const closePopover = () => {
    return buttonRef?.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
        cancelable: true,
      })
    )
  }

  const showPopover = () => {
    showingTimeout = setTimeout(() => buttonRef?.click(), showAfter)
  }

  const handleOnMouseEnter = (event: any, open: boolean) => {
    clearTimeout(closingTimeout.current)
    if (open) return
    return showPopover()
  }

  const handleOnMouseLeave = (event: any, open: boolean) => {
    clearTimeout(showingTimeout)
    if (!open) return
    closingTimeout.current = setTimeout(() => closePopover(), closeAfter)
  }

  const styleObj = { minHeight: `${minHeight}px` }

  const alignWithInWindow = useMemo((): any => {
    let spaceOnRight = 0

    if (mainContainerWidth && mouseXPos && panelRef?.offsetWidth) {
      spaceOnRight = mainContainerWidth - (mouseXPos + panelRef?.offsetWidth)
      spaceOnRight > leaveSpaceHorizontally
        ? Object.assign(styleObj, { left: mouseXPos })
        : Object.assign(styleObj, { right: 0 })
    }

    let spaceOnBottom = 0
    let spaceOnTop = 0

    if (mainContainerHeight && mouseYPos && panelRef?.clientHeight) {
      spaceOnBottom = mainContainerHeight - (mouseYPos + panelRef?.clientHeight)
      spaceOnTop = mainContainerHeight - (mainContainerHeight - mouseYPos + panelRef?.clientHeight)
      spaceOnBottom > leaveSpaceVertically
        ? Object.assign(styleObj, { top: mouseYPos })
        : spaceOnTop < 0
        ? Object.assign(styleObj, { top: Math.round(window.innerHeight / 10) })
        : spaceOnTop > 0 && spaceOnTop < leaveSpaceVertically
        ? Object.assign(styleObj, { top: Math.round(mouseYPos / 10) })
        : Object.assign(styleObj, { bottom: mainContainerHeight - mouseYPos })
    }

    return styleObj
  }, [
    leaveSpaceHorizontally,
    leaveSpaceVertically,
    mainContainerHeight,
    mainContainerWidth,
    mouseXPos,
    mouseYPos,
    panelRef,
  ])

  useEffect(() => {
    if (typeof show !== 'undefined' && show) {
      return showPopover()
    } else if (typeof show !== 'undefined' && !show) {
      closingTimeout.current = setTimeout(() => closePopover(), closeAfter)
    }
  }, [closeAfter, show])

  return (
    <Popover className="w-full h-full">
      {({ open }) => (
        <div className="w-full h-full" onMouseLeave={(event: any) => appearOnHover && handleOnMouseLeave(event, open)}>
          <Popover.Button
            ref={setButtonRef}
            className={classNames(`${open ? '' : 'text-opacity-90'}`, 'w-full h-full')}
            onMouseEnter={(event: any) => appearOnHover && handleOnMouseEnter(event, open)}
          >
            {btnChildComp}
          </Popover.Button>
          {createPortal(
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Popover.Panel
                ref={setPanelRef}
                className={classNames(
                  'fixed w-screen shadow-xl bg-jg-grey-50 z-50 max-w-lg p-2 rounded-sm text-xs',
                  panelClassName && panelClassName
                )}
                style={
                  typeof mouseXPos !== 'undefined' && typeof mouseYPos !== 'undefined'
                    ? alignWithInWindow
                    : styles.popper
                }
                {...attributes.popper}
              >
                {panelChildComp}
              </Popover.Panel>
            </Transition>,
            document.getElementById('justgo-app') || document.body
          )}
        </div>
      )}
    </Popover>
  )
}

export default memo(JGPopover)
