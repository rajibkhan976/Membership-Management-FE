const ListPlaceHolder = () => {
  const count: number[] = [1, 2, 3, 4, 5]
  return (
    <div
      role="status"
      className=" space-y-4 max-w-full    divide-y divide-gray-200 animate-pulse dark:divide-gray-700 dark:border-gray-700"
    >
      {count.map((i, index) => {
        return (
          <div key={index} className="px-4 pt-3  flex justify-between items-center">
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
              <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
          </div>
        )
      })}
      <span className="sr-only">Loading...</span>
    </div>
  )
}
export default ListPlaceHolder
