import { SkeletonCard } from '@jg/common/comps'

const EventInforCardPlaceholder = () => {
  return (
    <div className="flex flex-wrap justify-center -mx-1 md:-mx-2 jgxl2:-mx-3 jgxl3:-mx-4">
      <div className="flex-[100%] md:max-w-[50%]  md:flex-[370px] flex-grow max-w-full jgxl:max-w-[33.333%] jgxl2:max-w-[25%] jgxl3:max-w-[16.67%]">
        <div className="relative h-full">
          <div className="pb-4 w-full inline-flex px-1  md:px-2  jgxl2:px-3 min-w-0 h-full">
            <SkeletonCard className="w-full max-h-[440px] h-full" />
          </div>
        </div>
      </div>
      <div className="flex-[100%] md:max-w-[50%]  md:flex-[370px] flex-grow max-w-full jgxl:max-w-[33.333%] jgxl2:max-w-[25%] jgxl3:max-w-[16.67%] jg-hidden sm:block">
        <div className="relative h-full">
          <div className="pb-4 w-full inline-flex px-1  md:px-2  jgxl2:px-3 min-w-0 h-full">
            <SkeletonCard className="w-full max-h-[440px] h-full" />
          </div>
        </div>
      </div>
      <div className="flex-[100%] md:max-w-[50%]  md:flex-[370px] flex-grow max-w-full jgxl:max-w-[33.333%] jgxl2:max-w-[25%] jgxl3:max-w-[16.67%] jg-hidden jgxl:block">
        <div className="relative h-full">
          <div className="pb-4 w-full inline-flex px-1  md:px-2  jgxl2:px-3 min-w-0 h-full">
            <SkeletonCard className="hidden visible md:block w-full max-h-[440px] h-full" />
          </div>
        </div>
      </div>
      <div className="flex-[100%] md:max-w-[50%]  md:flex-[370px] flex-grow max-w-full jgxl:max-w-[33.333%] jgxl2:max-w-[25%] jgxl3:max-w-[16.67%] jg-hidden jgxl2:block">
        <div className="relative h-full">
          <div className="pb-4 w-full inline-flex px-1  md:px-2  jgxl2:px-3 min-w-0 h-full">
            <SkeletonCard className="hidden visible md:block w-full max-h-[440px] h-full" />
          </div>
        </div>
      </div>
      <div className="flex-[100%] md:max-w-[50%]  md:flex-[370px] flex-grow max-w-full jgxl:max-w-[33.333%] jgxl2:max-w-[25%] jgxl3:max-w-[16.67%] jg-hidden jgxl3:block">
        <div className="relative h-full">
          <div className="pb-4 w-full inline-flex px-1  md:px-2  jgxl2:px-3 min-w-0 h-full">
            <SkeletonCard className="hidden visible md:block w-full max-h-[440px] h-full" />
          </div>
        </div>
      </div>
      <div className="flex-[100%] md:max-w-[50%]  md:flex-[370px] flex-grow max-w-full jgxl:max-w-[33.333%] jgxl2:max-w-[25%] jgxl3:max-w-[16.67%] jg-hidden jgxl3:block">
        <div className="relative h-full">
          <div className="pb-4 w-full inline-flex px-1  md:px-2  jgxl2:px-3 min-w-0 h-full">
            <SkeletonCard className="hidden visible md:block w-full max-h-[440px] h-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
export default EventInforCardPlaceholder
