import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { CompBaseProps } from '@comps/uiComps'
import classNames from 'classnames'

type NavigationButtonProps = CompBaseProps & {
  selectedOption: string
  navNext: () => void
  navPrev: () => void
}

const NavigationButton = (props: NavigationButtonProps) => {
  const { className, selectedOption, navNext, navPrev } = props

  return (
    <div className={classNames('flex items-center justify-center', className)}>
      <button
        type="button"
        className="flex items-center justify-between bg-white py-1.5 md:pl-3 md:pr-4 text-gray-900 text-xs md:text-sm font-medium focus:relative w-full md:px-2"
      >
        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" onClick={navPrev} />
        <div className="block">{selectedOption}</div>
        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" onClick={navNext} />
      </button>
    </div>
  )
}

export default NavigationButton
