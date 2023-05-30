import { ChevronRightIcon, XIcon } from '@heroicons/react/outline'
import { useFilterBarContext } from './FilterBar'
import { CompBaseProps } from '@comps/uiComps'
import classNames from 'classnames'
type FilterBarItemProps = CompBaseProps & {
  name: string
  filterValueDispplayText: string | JSX.Element
  isActive: boolean
  reset: (() => void) | null
}
const FilterBarLabelItem = ({ name, filterValueDispplayText, isActive, reset }: FilterBarItemProps) => {
  const { setFilterActive, items } = useFilterBarContext()

  return (
    <div className={classNames('relative', isActive ? 'bg-white' : 'bg-jg-grey-50')}>
      <div
        onClick={() => {
          setFilterActive(name)
        }}
        className="w-full flex px-3.5 py-2.5  hover:bg-white cursor-pointer "
      >
        <div className="flex-grow text-[13px] leading-4 font-semibold text-jg-metal-300 flex flex-col pr-3">
          <span className="inline-block align-baseline py-1">{items.find((item) => item.name === name)?.title}</span>
          {isActive && (
            <span className="flex-none w-full text-[13px] leading-4 font-medium text-jg-metal-700 bg-white ">
              {filterValueDispplayText}
            </span>
          )}
        </div>
        {(!isActive || !reset) && (
          <div className="w-6/12 flex justify-end align-center">
            <span className="p-1.5 ">
              <ChevronRightIcon className="h-4 w-4 text-jg-metal-300 " aria-hidden="true" />
            </span>
          </div>
        )}
      </div>
      {isActive && reset && (
        <span onClick={reset} className="p-1.5 absolute right-3 top-[30px] cursor-pointer hover:bg-jg-grey-100">
          <XIcon className="h-4 w-4 text-jg-green-500 " aria-hidden="true" />
        </span>
      )}
    </div>
  )
}

export default FilterBarLabelItem
