type SortButtonProps = {
  label?: string
  optOne: string
  optTwo: string
  sortBy?: string
  handleToggleSortBy?: (sortBy: string) => void
}

function SortButton(props: SortButtonProps) {
  const { label, optOne, optTwo, sortBy, handleToggleSortBy } = props

  const setToggleSortBy = (sortBy: string): void => {
    handleToggleSortBy && handleToggleSortBy(sortBy)
  }

  return (
    <div className="flex">
      <div className="flex-grow text-sm font-medium text-gray-900 py-1.5">{label}</div>
      <div className="flex flex-grow justify-end ">
        <div
          className={
            sortBy && sortBy.includes(optOne)
              ? 'inline-flex bg-jg-green-600 p-2 rounded-l-sm text-xs text-white font-normal cursor-pointer'
              : 'inline-flex bg-jg-grey-200 p-2 rounded-l-sm text-xs text-gray-600 font-normal cursor-pointer'
          }
          onClick={() => setToggleSortBy(optOne)}
        >
          {optOne}
        </div>
        <div
          className={
            sortBy && sortBy.includes(optTwo)
              ? 'inline-flex bg-jg-green-600 p-2 rounded-r-sm text-xs text-white font-normal cursor-pointer'
              : 'inline-flex bg-jg-grey-200 p-2 rounded-r-sm text-xs text-gray-500 font-normal cursor-pointer'
          }
          onClick={() => setToggleSortBy(optTwo)}
        >
          {optTwo}
        </div>
      </div>
    </div>
  )
}

export default SortButton
