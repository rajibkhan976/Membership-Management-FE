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
  //   learnMore?: boolean
  className?: string
  url?: string
}

const CatagoryCard = ({ src, catagoryName, title, description, className, url }: CatagoryCardProps) => {
  return (
    <Link
      to={url || '#'}
      className="mx-auto max-w-[328px] lg:max-w-[370px] max-h-[395px] h-full overflow-hidden rounded relative event-info-card w-full"
    >
      <Card className={` ${className}`}>
        <CardImage
          src={src}
          // className="cover h-full w-full"
          zoomIn={true}
          haveGradient={true}
          isCovered={false}
        ></CardImage>
        <div className="p-4">
          {catagoryName && (
            <Badge fillType="faded" label={catagoryName} rounded size="md" variant="primary" className="mb-4" />
          )}
          <div className="text-jg-metal-700 text-base leading-5 font-semibold mb-4">{title}</div>
          <div className="text-jg-metal-500 text-sm font-normal line-clamp-3">{description}</div>
          <a className="mt-4 flex items-center text-jg-green-500 text-inputSizeXl font-medium" href="#">
            Learn More <ChevronDoubleRight className="ml-2" />
          </a>
          {/* {learnMore ? (
          <div className="mt-4 flex items-center text-jg-green-500 text-inputSizeXl font-medium">
            Learn More <ChevronDoubleRight className="ml-2" />
          </div>
        ) : (
          <></>
        )} */}
        </div>
      </Card>
    </Link>
  )
}
export default CatagoryCard
