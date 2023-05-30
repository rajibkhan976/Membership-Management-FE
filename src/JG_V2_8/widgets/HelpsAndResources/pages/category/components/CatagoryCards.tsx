import useHelpsAndResourcesStorage from '@jg/widgets/HelpsAndResources/store/useHelpsAndResources'
import CatagoryCard from '../../../components/CatagoryCard'
function CatagoryCards() {
  const CatagoryData = useHelpsAndResourcesStorage((state) => state.CategoryCardsInfo)
  return (
    <div className="lg:pb-[30px] grid grid-cols-1 lg:grid-cols-2 gap-[30px] px-4 lg:px-0 pb-4">
      {CatagoryData.map((item, index) => (
        <CatagoryCard
          src={item.src}
          title={item.title}
          description={item.description}
          //   learnMore={item.learnMore}
          key={index}
          className="bg-white"
          url={'../article'}
        />
      ))}
    </div>
  )
}
export default CatagoryCards
