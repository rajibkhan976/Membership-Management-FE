import Card from '@comps/uiComps/Card/Card'
import CardImage from '@comps/uiComps/Card/CardImage'
import { ClubSummary } from '@jg/common/types'
import { memo } from 'react'
export type ClubSummaryCardProps = {
  eventCategory?: ClubSummary
  subItemCount?: number
}
function ClubSummaryCard(props: ClubSummaryCardProps) {
  const { eventCategory, subItemCount } = props

  return (
    <Card className="max-w-[270px] max-h-[395px] h-full overflow-hidden rounded relative event-info-card w-full">
      <CardImage src={eventCategory?.clubImg} zoomIn={true} haveGradient={true} isCovered={false}></CardImage>
      <div className="p-4">
        <div className="text-jg-metal-700 text-sm leading-4 font-semibold mb-1">{eventCategory?.clubName}</div>
        <div className="text-jg-metal-500 text-inputSizeMd font-normal line-clamp-3">
          {eventCategory?.eventCount} Events
        </div>
      </div>
    </Card>
  )
}
export default memo(ClubSummaryCard)
