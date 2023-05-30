import ContentCard from '@jg/common/comps/contents/contentCard/ContentCard'
import ArticlesContent from './ArticlesContent'
import SearchBox from './../RightSideBar/SearchBox'

const ArticleRightSideBar = () => {
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
        heading="In this articles"
        headingClass="!text-[16px] font-semibold leading-5 text-jg-metal-900 mb-2"
        underlineClass="mb-6 w-8 border-t-2"
        className="mb-4 max-w-[370px] w-full min-h-[200px] max-h-[500px] object-contain"
      >
        <ArticlesContent />
      </ContentCard>
    </div>
  )
}
export default ArticleRightSideBar
