import { CompBaseProps } from '@comps/uiComps'
import Toggle from '@comps/uiComps/Toggle/Toggle'
import { ChevronRightIcon, XIcon } from '@heroicons/react/outline'
import { useFilterBarContext } from '@jg/common/comps/filter/FilterBar'
import classNames from 'classnames'
import useNavigateWithArgsMB, { MyBookingParams } from '../../hooks/useNavigateWithArgsMB'

type FilterItemProps<T = MyBookingParams> = CompBaseProps & {
  name: keyof T
  ActiveContent?: string | JSX.Element
  determineActive?: <K = T[keyof T]>(x: K) => boolean
  isToggle?: boolean
}

const MyBookingFilterLabel = ({
  name,
  ActiveContent,
  determineActive = () => false,
  isToggle = false,
}: FilterItemProps) => {
  const { setFilterActive, items } = useFilterBarContext()
  const { currentArgs, defaultArgs, setCurrentArgs, getArgsFromUrl } = useNavigateWithArgsMB()

  const args = getArgsFromUrl()
  const isActive = determineActive(args[name])
  const reset = () => {
    setCurrentArgs({ ...currentArgs, [name]: defaultArgs[name] })
  }

  if (isToggle) {
    return (
      <div
        className={classNames(
          'flex justify-between px-3.5 py-2.5 text-[13px] leading-4 font-semibold text-jg-metal-300 hover:bg-white',
          isActive ? 'bg-white' : 'bg-jg-grey-50'
        )}
      >
        <span className="flex-grow align-baseline py-1">{items.find((item) => item.name === name)?.title}</span>

        <Toggle value={Boolean(args[name])} onChange={(value) => setCurrentArgs({ ...currentArgs, [name]: value })} />
      </div>
    )
  }

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
            <div className="flex-none w-full text-[13px] leading-4 font-medium text-jg-metal-700 bg-white">
              {ActiveContent || (args[name] as []).join(', ')}
            </div>
          )}
        </div>
        {!isActive && (
          <div className="w-6/12 flex justify-end align-center">
            <span className="p-1.5 ">
              <ChevronRightIcon className="h-4 w-4 text-jg-metal-300 " aria-hidden="true" />
            </span>
          </div>
        )}
      </div>
      {isActive && (
        <span onClick={reset} className="p-1.5 absolute right-3 top-[30px] cursor-pointer hover:bg-jg-grey-100">
          <XIcon className="h-4 w-4 text-jg-green-500 " aria-hidden="true" />
        </span>
      )}
    </div>
  )
}

export default MyBookingFilterLabel
