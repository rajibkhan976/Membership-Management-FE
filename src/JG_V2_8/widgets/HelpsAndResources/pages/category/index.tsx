import SecondaryNav from '../../components/SecondaryNav'
import ContentCard from '@jg/common/comps/contents/contentCard/ContentCard'
import ArticalCards from './components/ArticleCards'
import CatagoryCards from './components/CatagoryCards'
import RightSideBar from '../../components/RightSideBar/index'
import MobileSecondaryNav from '../../components/MobileSecondaryNav'
import FancyScroll from '@jg/common/comps/Scrollbar/FancyScroll'
const Category = () => {
  return (
    <div className='"w-full bg-[#fafafa] flex'>
      <div className="w-full flex justify-center flex-col">
        <div className="w-full max-w-[1170px] justify-center mx-auto my-0">
          <img
            className="w-full h-[300px] object-cover jg-hidden md:flex"
            src="https://images.unsplash.com/photo-1667845018782-9f5acae511c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
            alt="banner"
          />
          <SecondaryNav className="jg-hidden md:flex" title="Integration & Automation" />
          <MobileSecondaryNav className="flex md:jg-hidden" />
          <div className="flex flex-row gap-x-8 relative mt-4">
            <div className="flex lg:max-w-[770px] w-full flex-col flex-wrap justify-center ">
              <CatagoryCards />
              <FancyScroll className="max-h-[400px]">
                <div className="px-4 lg:px-0 pb-4">
                  <ContentCard
                    heading="Popular Articles "
                    headingClass="!text-[16px] font-semibold leading-5 text-jg-metal-900 mb-2"
                    underlineClass="mb-6 w-8 border-t-2"
                    className="mb-4 md:mb-6"
                  >
                    <ArticalCards />
                  </ContentCard>
                </div>
              </FancyScroll>
            </div>
            <RightSideBar />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Category
