import ContentCard from '@jg/common/comps/contents/contentCard/ContentCard'
import { FixturesInfo } from '@jg/common/types/eventsAnsSchedules/EventInfo'
import React from 'react'
import SeeMore from '../SeeMore'
export type FixturesInfoProps = {
  fixtures?: FixturesInfo[]
}
const FixturesInfoSection = ({ fixtures }: FixturesInfoProps) => {
  const [showDetails, setShowDetails] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  const toggleShowMore = () => {
    if (showDetails && ref.current) {
      ref.current.scrollTo(0, 0)
    }
    setShowDetails(!showDetails)
  }

  const SeeMoreButton =
    ref.current && ref.current?.clientHeight > 208 ? (
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
  const FixtureDate = (item: string) => {
    const fixtureDateCal = new Date(item).toDateString().split(' ')
    return `${fixtureDateCal[0]} ${fixtureDateCal[2]} ${fixtureDateCal[1]} ${fixtureDateCal[3]}`
  }
  return (
    <ContentCard
      heading={'Rounds and stages'}
      headingClass="!text-[16px] font-semibold leading-5 text-jg-metal-900 mb-2"
      className="mb-4 md:mb-0"
    >
      <div ref={ref}>
        <div
          className={`flex flex-col divide-y divide-jg-metal-50  transition-all ease-in-out h-full duration-1000 scrollbar-hide  ${
            showDetails ? 'max-h-[2000px] overflow-auto border-b border-jg-metal-50' : 'max-h-52 overflow-hidden '
          }`}
        >
          {fixtures?.map((item) => (
            <div className="flex py-4">
              <div className="w-1/2 font-medium text-globalTextSizeSm text-jg-metal-900">{item.fixtureName}</div>
              <div className="flex justify-between w-1/2">
                <span className="text-globalTextSizeSm text-jg-metal-700 ">
                  {`${item.fixtureDate.date && FixtureDate(item.fixtureDate.date)}, ${item.fixtureDate.time} ${
                    item.fixtureDate.timezone
                  }`}
                </span>
                <span className="text-globalTextSizeSm text-jg-metal-700">{item.fixtureCategory}</span>
              </div>
            </div>
          ))}
        </div>
        <div className={`flex justify-start text-left ${showDetails ? 'mt-4 ' : 'pt-2'}`}>{SeeMoreButton}</div>
      </div>
    </ContentCard>
  )
}
export default FixturesInfoSection
