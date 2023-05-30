import classNames from 'classnames'
import { Tab } from '@headlessui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { useEffect, useRef, useState } from 'react'
import { CompBaseProps } from '../_base/types/CompBaseProps'

export type TabItemProps = CompBaseProps & {
  title?: string
  icon?: React.ReactNode
  content?: JSX.Element
}

export type TabsProps = CompBaseProps & {
  activeItem?: number
  tabItemAlignment?: 'right' | 'left'
  orientation?: 'horizontal' | 'vertical'
  border?: boolean
  validateBeforeSelect?: (currentIndex: number, targetIndex: number) => boolean
  onSelect?: (activeItem: number) => void
  items?: TabItemProps[]
  enableTabBarControl?: boolean
  tabBarControl?: string | React.ReactNode
  showTabItemTxt?: boolean
  tabPanelClass?: string
  hasBorder?: boolean
}

const Tabs = (props: TabsProps): React.ReactElement => {
  const {
    activeItem = 0,
    orientation = 'horizontal',
    border = true,
    items = [],
    enableTabBarControl = false,
    tabBarControl = null,
    tabItemAlignment = 'left',
    onSelect = () => {},
    // validateBeforeSelect = () => true,
    validateBeforeSelect,
    showTabItemTxt = true,
    hasBorder = true,
    className,
  } = props

  const tabItemsContainerRef = useRef<HTMLDivElement>(null)

  const tabListAlignCls = classNames(tabItemAlignment === 'left' ? '' : 'flex-row-reverse')

  const tabBoxCls = classNames(
    `w-full ${border ? 'ring-1 ring-jg-metal-50' : ''}`,
    orientation === 'vertical' ? `md:flex flex rounded-[3px] ${tabListAlignCls}` : 'rounded-t-[3px]'
  )

  const tabListCls = classNames(
    'bg-white dark:bg-gray-700',
    orientation === 'vertical'
      ? 'md:block flex flex-col md:space-x-0 border-none space-x-1'
      : 'h-10 flex overflow-x-auto overflow-y-hidden no-scrollbar relative z-0'
  )

  const width = classNames(orientation === 'vertical' ? 'sm:w-full' : '')

  const tabLastItemAlignCls = classNames(
    'inline-flex items-center h-10  active:text-green-500 text-sm',
    tabItemAlignment === 'left' && orientation === 'horizontal' ? 'md:ml-auto md:mr-2' : '',
    tabItemAlignment === 'right' && orientation === 'horizontal' ? 'md:mr-auto md:ml-2' : '',
    (tabItemAlignment === 'left' || tabItemAlignment === 'right') && orientation === 'vertical'
      ? 'mr-0 ml-2 md:ml-0'
      : ''
  )

  const tabPanelCls = classNames(
    'bg-white dark:bg-gray-900',
    orientation === 'vertical' ? 'border-l md:flex-auto w-[90%]' : 'border-t-0',
    orientation === 'vertical' && tabItemAlignment === 'right' ? 'border-solid border-r' : '',
    orientation === 'horizontal' && 'w-full'
  )

  const [isScrollable, setIsScrollable] = useState<boolean>(false)
  const [scrollTo, setScrollTo] = useState<number>(0)
  const [tabContainerWidth, setTabContainerWidth] = useState<number>(0)
  const [tabContainerScrollWidth, setTabContainerScrollWidth] = useState<number>(0)
  const [selectedIndex, setSelectedIndex] = useState(activeItem)
  useEffect(() => {
    const handleResize = () => {
      if (tabItemsContainerRef && tabItemsContainerRef.current) {
        setTabContainerWidth(tabItemsContainerRef.current?.offsetWidth)
        setTabContainerScrollWidth(tabItemsContainerRef.current?.scrollWidth)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  })

  useEffect(() => {
    if (orientation && tabItemsContainerRef && tabItemsContainerRef.current) {
      setTabContainerWidth(tabItemsContainerRef.current?.offsetWidth)
      setTabContainerScrollWidth(tabItemsContainerRef.current?.scrollWidth)
    }
  }, [orientation, tabItemsContainerRef])

  useEffect(() => {
    if (tabContainerWidth && tabContainerScrollWidth && tabContainerScrollWidth > tabContainerWidth) {
      setIsScrollable(true)
    } else {
      setIsScrollable(false)
    }
  }, [tabContainerWidth, tabContainerScrollWidth])

  const navToLeft = (): void => {
    if (tabItemsContainerRef.current) {
      tabItemsContainerRef.current.scrollLeft = scrollTo - tabContainerWidth / 2
      setScrollTo(scrollTo - tabContainerWidth / 2)
    }
  }

  const navToRight = (): void => {
    if (tabItemsContainerRef.current) {
      tabItemsContainerRef.current.scrollLeft = scrollTo + tabContainerWidth / 2
      setScrollTo(scrollTo + tabContainerWidth / 2)
    }
  }

  return (
    <div className={`${tabBoxCls} ${className}`}>
      <Tab.Group
        selectedIndex={validateBeforeSelect ? activeItem : selectedIndex}
        onChange={(targetIndex) => {
          /* if (validateBeforeSelect(selectedIndex, targetIndex)) {
            setSelectedIndex(targetIndex)
            onSelect(targetIndex)
          }*/

          if (validateBeforeSelect) {
            onSelect(targetIndex)
            const valid = validateBeforeSelect?.(selectedIndex, targetIndex)
            if (valid) setSelectedIndex(targetIndex)
          } else {
            setSelectedIndex(targetIndex)
            onSelect(targetIndex)
          }
        }}
      >
        <div
          className={
            orientation && orientation === 'horizontal'
              ? `w-full flex border-solid border-b ${tabListAlignCls}`
              : 'min-w-[50px] md:min-w-[100px] w-[10%]'
          }
        >
          <div
            className={
              orientation && orientation === 'vertical'
                ? 'w-full flex flex-col'
                : `${enableTabBarControl ? 'w-9/12' : 'w-full'} h-10 flex overflow-hidden ${
                    tabItemAlignment === 'right' ? 'justify-end' : ''
                  }`
            }
          >
            {orientation && orientation !== 'vertical' && (
              <div
                className={`h-10 flex justify-center items-center cursor-pointer relative z-10 ${
                  tabItemAlignment && tabItemAlignment === 'right' && enableTabBarControl ? 'border-solid border-l' : ''
                }`}
                onClick={navToLeft}
              >
                {isScrollable && scrollTo >= tabContainerWidth / 2 && <ChevronLeftIcon className="w-10 h-5" />}
              </div>
            )}
            <Tab.List className={tabListCls + width} ref={tabItemsContainerRef}>
              {items.map((tab, index) => (
                <Tab
                  key={index}
                  className={({ selected }) =>
                    classNames(
                      'inline-flex justtify-center items-center p-2 uppercase  text-sm leading-5 font-medium text-gray dark:text-white outline-none',
                      orientation && orientation === 'vertical'
                        ? hasBorder
                          ? ' border-r-2 border-transparent md:w-full '
                          : ' border-none '
                        : ' border-b-2 border-transparent ',
                      selected
                        ? 'bg-white uppercase dark:text-gray-700 dark:border-gray-700 text-jg-green-500 border-jg-green-500 '
                        : 'text-gray-700 hover:bg-white/[0.12]'
                    )
                  }
                  onClick={() => onSelect(index)}
                >
                  <span className={orientation === 'vertical' ? 'ml-2 md:ml-0 w-5' : 'inline-block align-middle w-5'}>
                    {tab.icon}
                  </span>
                  <p
                    className={classNames(
                      orientation === 'vertical'
                        ? 'hidden visible md:block'
                        : `ml-2 align-middle ${showTabItemTxt ? 'inline-block' : 'hidden visible md:inline-block'}`
                    )}
                  >
                    {tab.title}
                  </p>
                </Tab>
              ))}
            </Tab.List>
            {orientation && orientation !== 'vertical' && (
              <div
                className={`h-10 inline-flex justify-center items-center cursor-pointer relative z-10 ${
                  tabItemAlignment && tabItemAlignment === 'left' && enableTabBarControl ? 'border-solid border-r' : ''
                }`}
                onClick={navToRight}
              >
                {isScrollable && scrollTo + tabContainerWidth < tabContainerScrollWidth && (
                  <ChevronRightIcon className="w-10 h-5" />
                )}
              </div>
            )}
            {orientation && orientation === 'vertical' && (
              <div className={tabLastItemAlignCls}>{!enableTabBarControl ? null : <div>{tabBarControl}</div>}</div>
            )}
          </div>
          {orientation && orientation !== 'vertical' && enableTabBarControl && (
            <div className={tabLastItemAlignCls}>
              <div>{tabBarControl}</div>
            </div>
          )}
        </div>
        <Tab.Panels className={tabPanelCls}>
          {items.map((tab, index) => (
            <Tab.Panel key={index}>
              <div className="text-sm dark:text-white font-medium leading-5">{tab.content}</div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default Tabs
