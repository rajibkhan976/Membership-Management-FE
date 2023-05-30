const SegmentListPlaceholder = () => {
  return (
    <div className="animate-pulse flex gap-x-3 p-4">
      <div className="w-full">
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-1/2 mb-2.5" />
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-3/4 mb-2.5" />
      </div>
      <div className="w-full">
        <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-16 mb-2.5" />
      </div>
      <div className="w-full">
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-3/4 mb-2.5" />
      </div>
    </div>
  )
}

export default SegmentListPlaceholder
