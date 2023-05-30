import useHelpsAndResourcesStorage from '@jg/widgets/HelpsAndResources/store/useHelpsAndResources'
import ArticleCard from '../../../components/ArticleCard'
// import { ArticleData } from './Data/ArticleData'

function ArticalCards() {
  const ArticleCardInfo = useHelpsAndResourcesStorage((state) => state.ArticleCardsInfo)
  return (
    <div className="flex flex-wrap w-full  justify-center">
      {ArticleCardInfo.map((item, index) => (
        <ArticleCard
          catagoryName={item.catagoryName}
          src={item.src}
          title={item.title}
          description={item.description}
          //   learnMore={item.learnMore}
          key={index}
          className="w-full flex  border-b-[1px] border-jg-metal-50 last:border-b-0"
        />
      ))}
    </div>
  )
}
export default ArticalCards
