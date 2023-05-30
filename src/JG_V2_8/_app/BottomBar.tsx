import { FadeIn } from '@comps/uiComps'
import { Transition } from '@headlessui/react'
import { Footer } from '@jg/common/comps'
import HelperButton from '@jg/common/comps/float-helper-button/HelperButton'
import { Fragment, useState } from 'react'

import LogoButton from './footer/LogoButton'
import AppStore from '@jg/store/store'
import classNames from 'classnames'

const BottomBar = () => {
  const [toggleFooter, setTogoleFooter] = useState(false)
  const [toggleNavbar, setTogoleNavbar] = useState(true)
  const BBarOffsetSize = AppStore((state) => state.BBarOffsetSize)
  const CurrentView = AppStore((state) => state.CurrentView)
  const bottomStyleValue = BBarOffsetSize === 0 ? '12px' : `${BBarOffsetSize}px`

  const viewConfig: any = CurrentView ? CurrentView.config : {}
  if (viewConfig.hideFooter) {
    return <></>
  } else
    return (
      <>
        <Transition
          show={toggleNavbar}
          onClick={() => {
            setTogoleNavbar(!toggleNavbar)
          }}
          afterLeave={() => {
            setTogoleFooter(!toggleFooter)
          }}
          style={{ bottom: bottomStyleValue }}
          className={classNames(
            ' rounded-r-full shadow-md ring-1 ring-jg-grey-300 bg-white fixed left-0 cursor-pointer'
          )}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <LogoButton />
        </Transition>
        {viewConfig.onScreenHelpPath && (
          <Transition
            show={toggleNavbar}
            style={{ bottom: bottomStyleValue }}
            className={classNames('fixed right-0')}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <HelperButton />
          </Transition>
        )}

        <div className="fixed bottom-0 w-full">
          <Transition as="div" show={toggleFooter}>
            <Transition.Child
              afterLeave={() => {
                setTogoleNavbar(!toggleNavbar)
              }}
              appear={true}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-y-full"
              enterTo="translate-y-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-y-0"
              leaveTo="translate-y-full"
            >
              {
                <Footer
                  onClose={() => {
                    setTogoleFooter(!toggleFooter)
                  }}
                />
              }
            </Transition.Child>
          </Transition>
        </div>
      </>
    )
}
export default BottomBar
