import ContentCard from '@jg/common/comps/contents/contentCard/ContentCard'
import useStickyNav from '@jg/hooks/useStickyNav'
import { useRef } from 'react'
import Catagories, { catagoryData } from './Catagories'
import SearchBox from './SearchBox'

const RightSideBar = () => {
  return (
    <div
      className={` sticky transition-all flex-col md:flex-col max-w-[370px] h-[calc(100vh-144px)] top-[144px] z-9 gap-y-4 w-full bg-transparent jg-hidden lg:flex `}
    >
      <ContentCard
        heading="Search"
        headingClass="!text-[16px] font-semibold leading-5 text-jg-metal-900 mb-2"
        underlineClass="mb-6 w-8 border-t-2"
        className="mb-4 md:mb-0  max-w-[370px] w-full "
      >
        <SearchBox />
      </ContentCard>
      <ContentCard
        heading="Catagories"
        headingClass="!text-[16px] font-semibold leading-5 text-jg-metal-900 mb-2"
        underlineClass="mb-6 w-8 border-t-2"
        className="mb-4 max-w-[370px] w-full min-h-[200px] max-h-[500px] overflow-y-auto object-contain"
      >
        <Catagories />
      </ContentCard>
    </div>
  )
}
export default RightSideBar
