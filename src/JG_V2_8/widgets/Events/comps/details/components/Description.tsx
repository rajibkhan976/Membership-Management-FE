import React from 'react'
import SeeMore from './SeeMore'

function Description({ htmlData }: { htmlData: string }) {
  const [showDetails, setShowDetails] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  const toggleShowMore = () => {
    if (showDetails && ref.current) {
      ref.current.scrollTo(0, 0)
    }
    setShowDetails(!showDetails)
  }

  const SeeMoreButton =
    htmlData.length > 800 ? (
      <SeeMore
        text={showDetails ? 'Show Less' : 'Show More'}
        dir={showDetails ? 'up' : 'down'}
        onClick={toggleShowMore}
        className={
          showDetails
            ? 'text-globalTextSizeSm gap-1 text-success-default'
            : 'pt-2 text-globalTextSizeSm gap-1 text-success-default'
        }
      />
    ) : undefined

  return (
    <div className="space-y-3 ">
      <div
        className={`space-y-3 transition-all ease-in-out h-full duration-1000 scrollbar-hide ${
          showDetails ? 'max-h-[2000px] overflow-auto' : ' max-h-80 overflow-hidden'
        } `}
        ref={ref}
        dangerouslySetInnerHTML={{ __html: htmlData }}
      ></div>
      {SeeMoreButton}
    </div>
  )
}

export default Description
