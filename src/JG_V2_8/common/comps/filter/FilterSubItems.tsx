import { PlusIcon, MinusIcon } from '@heroicons/react/solid'

type FilterSubItemsProps = {
  subItems?: any[]
  checkBoxState?: number[]
  toggleContent?: number[]
  handleOnClick?: (title: string) => void
  handleOnChange?: (event: any, id: number) => void
  handleToggleContent?: (itemIndex: number) => void
}

function FilterSubItems(props: FilterSubItemsProps) {
  const { subItems, checkBoxState, toggleContent, handleOnClick, handleOnChange, handleToggleContent } = props

  const handleChange = (event: any, id: number): void => {
    handleOnChange && handleOnChange(event, id)
  }

  const handleClick = (title: string) => {
    handleOnClick && handleOnClick(title)
  }

  const setToggleContent = (itemIndex: number) => {
    handleToggleContent && handleToggleContent(itemIndex)
  }

  console.log(checkBoxState)

  return (
    <>
      {subItems &&
        subItems.map((item: any, itemIndex: number) => (
          <div
            key={itemIndex}
            className="w-full flex flex-col p-2 border-b border-gray-300 cursor-pointer"
            onClick={() => item.subItemContents && item.subItemContents.length === 0 && handleClick(item.title)}
          >
            <div className="w-full flex py-2">
              <div className="w-6/12 flex align-center text-sm text-jg-grey-700 font-bold">
                {toggleContent && !toggleContent.includes(itemIndex) && item.title}
              </div>
              <div className="w-6/12 ">
                {item.subItemContents &&
                  item.subItemContents.length > 0 &&
                  (toggleContent && !toggleContent.includes(itemIndex) ? (
                    <PlusIcon
                      className="block h-5 w-5 text-gray-500 cursor-pointer transform float-right"
                      aria-hidden="true"
                      onClick={() => setToggleContent(itemIndex)}
                    />
                  ) : (
                    <MinusIcon
                      className="block h-5 w-5 text-gray-500 cursor-pointer transform float-right"
                      aria-hidden="true"
                      onClick={() => setToggleContent(itemIndex)}
                    />
                  ))}
              </div>
            </div>
            {item.subItemContents &&
              item.subItemContents.map((content: any, contentIndex: number) => (
                <div
                  key={contentIndex}
                  className={
                    toggleContent && toggleContent.includes(itemIndex)
                      ? 'relative flex items-start py-4 h-auto translate-y-2 opacity-100 overflow-hidden transition duration-500 ease-in'
                      : 'relative flex items-start h-0 translate-y-0 opacity-0 overflow-hidden transition duration-500 ease-out'
                  }
                >
                  <div className="ml-3 flex items-center h-5">
                    <input
                      id={`content-${content.id}`}
                      name={`content-${content.id}`}
                      type="checkbox"
                      checked={checkBoxState?.includes(content.id)}
                      value={content.name}
                      onChange={(event) => handleChange(event, content.id)}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="min-w-0 flex-1 text-sm ml-4">
                    <label htmlFor={`content-${content.id}`} className="font-medium text-gray-700 select-none">
                      {content.name}
                    </label>
                    {content.count !== 0 && <div className="inline-block ml-4 lg:ml-8">{content.count}</div>}
                  </div>
                </div>
              ))}
          </div>
        ))}
    </>
  )
}

export default FilterSubItems
