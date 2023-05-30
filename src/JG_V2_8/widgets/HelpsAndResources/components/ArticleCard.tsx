import { Badge } from '@comps/uiComps'
import Card from '@comps/uiComps/Card/Card'
import CardImage from '@comps/uiComps/Card/CardImage'
import { ChevronDoubleRight } from '@comps/uiComps/Icons'
import { Link } from 'react-router-dom'

export type ArticleCardProps = {
  src?: string
  catagoryName?: string
  title?: string
  description?: string
  //learnMore?: boolean
  className?: string
  url?: string
}

const ArticleCard = ({ src, catagoryName, title, description, className, url }: ArticleCardProps) => {
  return (
    <Link
      to={url || '#'}
      className="flex flex-col lg:flex-row max-w-[332px] lg:max-w-[722px] w-full items-start sm:items-center sm:justify-start mx-auto overflow-hidden py-4"
    >
      <Card className={`flex flex-col lg:flex-row ${className}`}>
        <CardImage
          src={src}
          className="cover sm:h-full w-full max-w-[332px] sm:max-h-[166px] flex-shrink-0 rounded-sm"
          isCovered={false}
          zoomIn={true}
          haveGradient={true}
        ></CardImage>
        <div className="md:px-4 py-2 max-w-[328px] lg:max-w-[414px]">
          {catagoryName && (
            <Badge fillType="faded" label={catagoryName} rounded size="md" variant="primary" className="mb-4" />
          )}
          <div className="text-jg-metal-700 text-base leading-5 font-semibold mb-4">{title}</div>
          <div className="text-jg-metal-500 text-sm font-normal line-clamp-2">{description}</div>
          <a className="mt-4 flex items-center text-jg-green-500 text-inputSizeXl font-medium" href="#">
            Learn More <ChevronDoubleRight className="ml-2" />
          </a>
        </div>
      </Card>
    </Link>
  )
}
export default ArticleCard
