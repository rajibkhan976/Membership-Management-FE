import Badge from '@comps/uiComps/Badges/Badge'
import Card from '@comps/uiComps/Card/Card'
import CardImage from '@comps/uiComps/Card/CardImage'
import FancyScroll from '@jg/common/comps/Scrollbar/FancyScroll'
import ContentCard from '@jg/common/comps/contents/contentCard/ContentCard'
import { Link, useParams } from 'react-router-dom'
import useGettingStartedStore from '../../store/useGettingStarted'
import Catagories from './Catagories'
import SearchBox from './SearchBox'

export type RightSideBarProps = {
  hideData?: boolean
}
const RightSideBar = (props: RightSideBarProps) => {
  const { hideData } = props
  const categories = useGettingStartedStore((state) => state.categories)
  const getContentsByIds = useGettingStartedStore((state) => state.getContentsByIds)
  const { category } = useParams()

  const categoryItem = categories.find((e) => e.name == category)
  const contentsData = getContentsByIds(categoryItem?.articles || [])

  return (
    <div
      className={` sticky transition-all flex-col md:flex-col max-w-[370px] top-[144px] z-9 gap-y-4 w-full bg-transparent jg-hidden lg:flex  overflow-y-auto`}
    >
      {hideData === true ? (
        ''
      ) : (
        <ContentCard
          heading="Search"
          headingClass="!text-[16px] font-semibold leading-5 text-jg-metal-900 mb-2"
          underlineClass="mb-6 w-8 border-t-2"
          className="mb-4 md:mb-0  max-w-[370px] w-full "
        >
          <SearchBox />
        </ContentCard>
      )}

      <ContentCard
        heading="Categories"
        headingClass="!text-[16px] font-semibold leading-5 text-jg-metal-900 mb-2"
        underlineClass="mb-6 w-8 border-t-2"
        className="pr-0"
      >
        <FancyScroll className="max-w-[370px] w-full min-h-[200px] max-h-[300px] object-contain">
          <Catagories />
        </FancyScroll>
      </ContentCard>
      {contentsData && contentsData.length > 0 && (
        <ContentCard
          heading="Popular Articles "
          headingClass="!text-[16px] font-semibold leading-5 text-jg-metal-900 mb-2"
          underlineClass="mb-6 w-8 border-t-2"
          className="mb-4 md:mb-6 max-h-[600px] overflow-hidden pr-0"
        >
          <FancyScroll className="max-w-[370px] w-full min-h-[100px] max-h-[300px] object-contain">
            {contentsData.length > 0 &&
              contentsData.map((item, index) => (
                <div className="mb-4">
                  <Link to={`../article/${item.contentId}`} className="block">
                    <Card
                      className="flex flex-col sm:flex-row max-w-[722px] items-start sm:items-center sm:justify-start mx-auto sm:mx-0 overflow-hidden"
                      key={index}
                    >
                      <CardImage
                        className="cover h-full w-full max-w-[170px] max-h-[166px] flex-shrink-0 rounded-sm"
                        haveGradient
                        src={item.thumbnail}
                        zoomIn
                      />
                      <div className="px-4 py-2 max-w-[414px]">
                        <Badge
                          className="mb-1 capitalize"
                          fillType="faded"
                          label={item.type}
                          rounded
                          size="md"
                          variant="primary"
                        />
                        <div className="text-jg-metal-700 text-sm leading-5 font-semib">{item.title}</div>
                      </div>
                    </Card>
                  </Link>
                </div>
              ))}
          </FancyScroll>
        </ContentCard>
      )}
    </div>
  )
}
export default RightSideBar
function getContentsByIds(arg0: any) {
  throw new Error('Function not implemented.')
}
