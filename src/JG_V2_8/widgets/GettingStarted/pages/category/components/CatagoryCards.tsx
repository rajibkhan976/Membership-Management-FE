import CatagoryCard from '../../../components/CatagoryCard'

type CatagoryCardsProps = {
  CatagoryCardsItems: any
}

const CatagoryCards = ({ CatagoryCardsItems }: CatagoryCardsProps) => {
  return (
    <div className="lg:pb-[30px] grid grid-cols-1 lg:grid-cols-2 gap-[30px] px-4 lg:px-0 pb-4">
      {CatagoryCardsItems &&
        CatagoryCardsItems.length > 0 &&
        CatagoryCardsItems.map((item: any, i: number) => (
          <CatagoryCard
            src={item.thumbnail}
            catagoryName={item.type}
            title={item.title}
            description={item.description}
            key={i}
            className="bg-white"
            url={`../article/${item.contentId}`}
          />
        ))}
    </div>
  )
}
export default CatagoryCards
