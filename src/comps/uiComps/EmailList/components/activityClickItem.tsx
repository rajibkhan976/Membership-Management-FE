import { ActivityClickItemProps } from '@jg/widgets/EmailAndCom/interfaces/interfaces'
import { Link } from 'react-router-dom'

export const ActivityClickItem = ({
  activityType,
  segmentName,
  emailId,
  deliveryCount,
  icon,
  title,
  segmentId,
}: ActivityClickItemProps) => {
  return (
    <Link
      to={`?activityType=${activityType}&segmentTitle=${segmentName}&emailId=${emailId}&segmentId=${segmentId}&title=${deliveryCount} ${title}`}
    >
      <div className={'mr-1 text-[#455A64] text-center'}>{deliveryCount}</div>
      <div className="flex item-center gap-x-1">
        {icon}
        <p className="text-xs text-[#455A64] font-medium w-max">{title}</p>
      </div>
    </Link>
  )
}
