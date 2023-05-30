import ChevronLeft from '@comps/uiComps/Icons/SVG/ChevronLeft'
import ChevronRight from '@comps/uiComps/Icons/SVG/ChevronRight'

const Pagination = () => {
  return (
    <div className="bg-white px-6 pb-6 pt-10">
      <div className="flex justify-between">
        <a href="" className="flex flex-col">
          <div className="text-globalTextSizeMd font-medium text-jg-green-500 flex flex-nowrap items-center justify-start">
            <ChevronLeft className="h-6 w-6 px-2 py-1.5" />
            Previous Article
          </div>
          <div className="text-globalTextSizeLg font-semibold text-jg-metal-700 mt-1">What happened to Club+?</div>
        </a>
        <a href="" className="flex flex-col">
          <div className="text-globalTextSizeMd font-medium text-jg-green-500 flex flex-nowrap items-center justify-end">
            Next Article
            <ChevronRight className="h-6 w-6 px-2 py-1.5" />
          </div>
          <div className="text-globalTextSizeLg font-semibold text-jg-metal-700 mt-1">
            What methods of online payments can Ju...
          </div>
        </a>
      </div>
    </div>
  )
}
export default Pagination
