function EntityInfoPlaceHolder() {
  const count: number[] = [1, 2, 3, 4, 5, 6, 7, 8]
  return (
    <div role="status" className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
      {count.map((i, index) => {
        return (
          <div key={index} className="flex items-center space-x-3 animate-pulse">
            <svg
              className="w-9 h-9 text-gray-200 dark:text-gray-700"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"></path>
            </svg>

            <div className="space-y-1">
              <h4 className="h-1.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-2"></h4>
              <p className="w-32 h-1.5 bg-gray-200 rounded-full dark:bg-gray-700"></p>
            </div>
          </div>
        )
      })}
      <span className="sr-only">Loading...</span>
    </div>
  )
}
export default EntityInfoPlaceHolder
