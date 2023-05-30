import { CalendarMonth, EmoticonHappyOutline, Eye } from '@comps/uiComps/Icons'
import { ClockIcon } from '@heroicons/react/outline'
import { DotsCircleHorizontalIcon } from '@heroicons/react/solid'

const ArticalBodyTopInfo = () => {
  return (
    <div className="flex gap-x-2 text-jg-metal-300 text-globalTextSizeSm font-medium items-center pb-4 flex-wrap">
      <div className="flex items-center">
        <CalendarMonth className="h-4 mr-1.5 px-[2px] py-[1.5px]" />
        <div>Sun, 22 May 2022</div>
      </div>
      <DotsCircleHorizontalIcon className="h-1" />
      <div className="flex items-center">
        <ClockIcon className="h-3.5 mr-1.5 px-[2px] py-[1.5px]" />
        <div>Sun, 22 May 2022</div>
      </div>
      <DotsCircleHorizontalIcon className="h-1" />
      <div className="flex items-center">
        <Eye className="mr-1.5 px-[2px] py-[1.5px]" />
        <div>Sun, 22 May 2022</div>
      </div>
      <DotsCircleHorizontalIcon className="h-1" />
      <div className="flex items-center">
        <EmoticonHappyOutline className="mr-1.5 px-[2px] py-[1.5px]" />
        <div>Sun, 22 May 2022</div>
      </div>
    </div>
  )
}
export default ArticalBodyTopInfo
