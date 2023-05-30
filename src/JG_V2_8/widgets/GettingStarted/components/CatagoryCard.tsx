import { Badge } from '@comps/uiComps'
import Card from '@comps/uiComps/Card/Card'
import CardImage from '@comps/uiComps/Card/CardImage'
import { ChevronDoubleRight } from '@comps/uiComps/Icons'
import { Link } from 'react-router-dom'

export type CatagoryCardProps = {
  src?: string
  catagoryName?: string
  title?: string
  description?: string
  className?: string
  url?: string
}

const CatagoryCard = ({ src, catagoryName, title, description, className, url }: CatagoryCardProps) => {
  return (
    <Link
      to={url || '#'}
      className="mx-auto max-w-[328px] lg:max-w-[370px] max-h-[395px] h-full overflow-hidden rounded-lg relative event-info-card w-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group bg-white"
    >
      <Card className={` ${className}`}>
        <CardImage src={src} zoomIn={true} haveGradient={true} isCovered={false} zoomInOut={'hover:scale-110'} />
        <div className="p-4">
          {catagoryName && (
            <Badge
              fillType="faded"
              label={catagoryName}
              rounded
              size="md"
              variant="primary"
              className="mb-4 capitalize"
            />
          )}
          <div className="text-jg-metal-700 text-base font-semibold mb-4 group-hover:text-jg-green-500 transition-all">
            {title}
          </div>
          <div className="text-jg-metal-500 text-sm font-normal line-clamp-2">{description}</div>
          <span className="mt-4 flex items-center text-jg-green-500 text-inputSizeXl font-medium">
            Learn More <ChevronDoubleRight className="ml-2" />
          </span>
        </div>
      </Card>
    </Link>
  )
}
export default CatagoryCard
