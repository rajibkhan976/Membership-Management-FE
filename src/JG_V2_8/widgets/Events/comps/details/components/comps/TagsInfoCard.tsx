import Badge from '@comps/uiComps/Badges/Badge'
import ContentCard from '@jg/common/comps/contents/contentCard/ContentCard'
import CommonPlaceholder from '@jg/common/comps/loader/placeholders/CommonPlaceholder'
import { AsyncStatus } from '@jg/common/types/responses/AsyncStatus'
export type TagsInfoCardProps = {
  tag?: string
  status?: AsyncStatus
}
const TagsInfoCard = ({ tag, status }: TagsInfoCardProps) => {
  return (
    <ContentCard
      heading="Tags"
      className="hidden visible md:block"
      headingClass="!text-jg-metal-700  !text-globalTextSizeLg"
    >
      <div className="my-3 flex flex-wrap gap-2">
        {status === 'success' ? (
          tag?.split('|').map((item, i) => item.trim() && <SingleTag tag={item} key={i} />)
        ) : (
          <CommonPlaceholder />
        )}
      </div>
    </ContentCard>
  )
}
export default TagsInfoCard

export const SingleTag = ({ tag }: { tag?: string }) => {
  return (
    <Badge
      variant="secondary"
      fillType="faded"
      size="lg"
      label={tag}
      rounded
      className="break-all border border-jg-metal-100 bg-jg-grey-50 !font-semibold !font-[13px] !text-jg-metal-700 h-8"
    />
  )
}
