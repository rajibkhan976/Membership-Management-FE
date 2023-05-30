function TitlePlaceholder() {
  return (
    <div className="flex justify-between bg-white sticky top-[52px] z-10 transition-all flex-col md:flex-row animate-pulse">
      <div className="jg-hidden md:fixed h-[84px] bg-white top-[52px] left-0 right-0 -z-10 shadow-sm jg-hidden md:hidden"></div>
      <div className="flex justify-start md:justify-center items-center md:space-x-2 py-2 px-4 md:py-3.5 md:px-5 border-b border-solid border-jg-metal-50 md:border-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          className="w-7 text-gray-200 cursor-pointer mr-3"
        >
          <path d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"></path>
        </svg>
        <div>
          <h2 className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-16 mb-2"></h2>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 py-1"></div>
        </div>
      </div>
      <div className="flex gap-4 justify-between md:items-center py-2 px-4 md:py-3.5 md:px-5  border-b border-solid border-jg-metal-50 md:border-0">
        <div className="flex gap-2 justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className="w-5 h-5 text-gray-200 rotate-y-180"
          >
            <path d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"></path>
          </svg>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-16"></div>
        </div>
        <div className="h-2.5 m-6 bg-gray-300 rounded-full dark:bg-gray-600 w-28"></div>
      </div>
    </div>
  )
}
export default TitlePlaceholder
