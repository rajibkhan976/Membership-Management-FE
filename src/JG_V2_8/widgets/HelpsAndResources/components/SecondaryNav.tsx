import { ArrowLeft } from '@comps/uiComps/Icons'
import { ArrowSmLeftIcon } from '@heroicons/react/solid'
import useStickyNav from '@jg/hooks/useStickyNav'
import classNames from 'classnames'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
type SecondaryNavProps = {
  title?: string
  className?: string
}

function SecondaryNav(props: SecondaryNavProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isSticky = useStickyNav(ref, 56)
  const navigate = useNavigate()

  const { title, className } = props

  return (
    <div
      ref={ref}
      className={`h-[72px] flex justify-between items-center bg-white sticky top-[56px] z-10 transition-all flex-col md:flex-row ${className} ${
        isSticky ? 'shadow-md' : ''
      }`}
    >
      <div
        className={`jg-hidden md:fixed h-[72px] bg-white top-[56px] left-0 right-0 -z-10 shadow-sm ${
          !isSticky ? 'jg-hidden md:hidden' : 'md:flex'
        }`}
      />
      {/* Actual content */}
      <div className="flex justify-start text-jg-metal-700 md:justify-center items-center md:space-x-2 py-2 px-4 md:py-3.5 md:px-5 border-b border-solid border-jg-metal-50 md:border-0">
        <ArrowSmLeftIcon className="w-7 cursor-pointer mr-3" onClick={() => navigate(-1)} />
        <div>
          <h2 className="text-xl font-semibold leading-6 mb-1">{title}</h2>
        </div>
      </div>
    </div>
  )
}

export default SecondaryNav
