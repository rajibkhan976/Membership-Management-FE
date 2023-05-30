import NavigationButton from './NavigationButton'
import MenuButton from './MenuButton'
import { ReactComponent as ViewIcon } from '@jg/assets/images/ViewIcon.svg'
import { ViewBaseProps } from './ViewBaseProps'

type CalendarHeaderProps = ViewBaseProps & {
  selectedOption: string
  navNext: () => void
  navPrev: () => void
  items: string[]
  selectedItem: string
  selectItem: (item: string) => void
}

const CalendarHeader = (props: CalendarHeaderProps) => {
  const { selectedOption, navNext, navPrev, items, selectedItem, selectItem, onClickMenuBarIcon, onTodayBtnClick } =
    props

  return (
    <>
      {/* medium and large screen */}
      <header className="hidden visible ring-1 ring-gray-200 shadow md:shadow-none h-20 md:flex flex-wrap items-center justify-between border-b border-gray-200 px-4 py-4 lg:flex-none bg-white w-full">
        <div
          className="bg-jg-grey-100 py-1 px-5 cursor-pointer rounded-sm text-sm md:text-lg font-semibold text-jg-grey-900 inline-block"
          onClick={() => onTodayBtnClick && onTodayBtnClick()}
        >
          Today
        </div>
        {selectedItem && selectedItem !== 'List' && (
          <NavigationButton className="w-4/12" selectedOption={selectedOption} navNext={navNext} navPrev={navPrev} />
        )}
        <MenuButton items={items} selectedItem={selectedItem} selectItem={selectItem} />
      </header>
      {/* mobile screen */}
      <header className="md:hidden shadow h-20 flex items-center justify-between border-b border-gray-200 px-4 bg-white w-full">
        <div className="flex">
          <div
            className="flex items-center justify-center mr-3 bg-jg-grey-100 py-1 px-5 cursor-pointer rounded-sm text-sm md:text-lg font-semibold text-jg-grey-900"
            onClick={() => onTodayBtnClick && onTodayBtnClick()}
          >
            Today
          </div>
          <MenuButton items={items} selectedItem={selectedItem} selectItem={selectItem} />
        </div>
        <ViewIcon onClick={() => onClickMenuBarIcon && onClickMenuBarIcon(true)} />
      </header>
      {selectedItem && selectedItem !== 'List' && (
        <div className="md:hidden w-full flex justify-center items-center bg-white py-2">
          <NavigationButton className="w-8/12" selectedOption={selectedOption} navNext={navNext} navPrev={navPrev} />
        </div>
      )}
    </>
  )
}

export default CalendarHeader
