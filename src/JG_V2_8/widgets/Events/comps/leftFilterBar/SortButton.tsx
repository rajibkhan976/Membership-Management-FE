type SortButtonProps = {
  distanceText: string
  dateText: string
  sortBy?: string
  onChange?: (sortBy: string) => void
}

function SortButton(props: SortButtonProps) {
  const { distanceText, dateText, sortBy, onChange } = props

  const setToggleSortBy = (sortBy: string): void => {
    onChange?.(sortBy)
  }

  return (
    <div className="flex">
      <div className="flex flex-grow justify-end  divide-x divide-jg-grey-50 ">
        <div
          className={
            sortBy && sortBy === 'date'
              ? 'inline-flex bg-jg-green-600 p-2 rounded-r-sm text-xs text-white font-normal cursor-pointer'
              : 'inline-flex bg-jg-grey-200 p-2 rounded-r-sm text-xs text-gray-500 font-normal cursor-pointer'
          }
          onClick={() => setToggleSortBy('date')}
        >
          {dateText}
        </div>
        <div
          className={
            sortBy && sortBy === 'distance'
              ? 'inline-flex bg-jg-green-600 p-2 rounded-l-sm text-xs text-white font-normal cursor-pointer'
              : 'inline-flex bg-jg-grey-200 p-2 rounded-l-sm text-xs text-gray-600 font-normal cursor-pointer'
          }
          onClick={() => setToggleSortBy('distance')}
        >
          {distanceText}
        </div>

        <div
          className={
            sortBy && sortBy === 'relevant'
              ? 'inline-flex bg-jg-green-600 p-2 rounded-r-sm text-xs text-white font-normal cursor-pointer'
              : 'inline-flex bg-jg-grey-200 p-2 rounded-r-sm text-xs text-gray-500 font-normal cursor-pointer'
          }
          onClick={() => setToggleSortBy('relevant')}
        >
          Name
        </div>
      </div>
    </div>
  )
}

export default SortButton
