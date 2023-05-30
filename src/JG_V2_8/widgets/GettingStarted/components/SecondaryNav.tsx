import { ArrowSmLeftIcon } from '@heroicons/react/solid'
import { IsBlended } from '@jg/_core/Authorization'
import useStickyNav from '@jg/hooks/useStickyNav'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
type SecondaryNavProps = {
  title?: string
  className?: string
  navigateValue?: number //'../' | -1
}

function SecondaryNav(props: SecondaryNavProps) {
  const top = IsBlended() ? 0 : 52
  const ref = useRef<HTMLDivElement>(null)
  const isSticky = useStickyNav(ref, top)
  const navigate = useNavigate()

  const { title, className, navigateValue = -1 } = props

  return (
    <div
      style={{ top: top + 'px' }}
      ref={ref}
      className={`h-[72px] flex justify-between items-center bg-white sticky z-10 transition-all flex-col md:flex-row ${className} ${
        isSticky ? 'shadow-md' : ''
      }`}
    >
      <div
        style={{ top: top + 'px' }}
        className={`jg-hidden md:fixed h-[72px] bg-white left-0 right-0 -z-10 shadow-sm ${
          !isSticky ? 'jg-hidden md:hidden' : 'md:flex'
        }`}
      />
      {/* Actual content */}
      {/* @ts-ignore */}
      <div
        className="flex justify-start text-jg-metal-700 md:justify-center items-center md:space-x-2 py-2 px-4 md:py-3.5 md:px-5 border-b border-solid border-jg-metal-50 md:border-0"
        onClick={() => navigate(navigateValue)}
      >
        <ArrowSmLeftIcon className="w-7 cursor-pointer mr-3" />
        <div>
          <h2 className="text-xl font-semibold leading-6 mb-1">{title}</h2>
        </div>
      </div>
    </div>
  )
}

export default SecondaryNav
