import SegmentAdd from '@comps/uiComps/Icons/SVG/SegmentAdd'
import CloseIcon from '@comps/uiComps/Icons/SVG/closeIcon'
import { Link } from 'react-router-dom'
import H1 from '../../../Heading/H1'
import type { ReportItemType } from '../../Interfaces'
import { ActivityType } from '@jg/widgets/EmailAndCom/enum'

const ReportCardItems = ({
  icon,
  title,
  reportItem,
  activityType,
  segmentTitle,
  emailId,
  createSegmentSectionOpen,
  setCreateSegmentSectionOpen,
}: ReportItemType) => {
  return (
    <div className="w-6/12 lg:w-1/4">
      <div
        className={`flex flex-row justify-around md:justify-between items-center border rounded ${
          createSegmentSectionOpen ? 'bg-jg-green-500' : 'bg-[#FFFFFF]'
        } h-[80px] p-0 md:p-[16px] m-2`}
      >
        <div className="flex gap-x-2">
          {icon && (
            <div className="">
              <div className="flex items-center justify-center rounded-[50%] w-10 md:w-[48px] h-10 md:h-[48px] bg-[#FAFAFA]">
                {icon}
              </div>
            </div>
          )}
          <div className="ml-0 md:ml-[6%] flex flex-col">
            <H1
              className={`text-left text-lg md:text-[20px] ${
                createSegmentSectionOpen ? 'text-white' : 'text-jg-metal-700'
              }  font-semibold`}
            >
              {reportItem || '0'}
            </H1>
            <p
              className={`text-left text-[14px] min-w-max ${
                createSegmentSectionOpen ? 'text-white' : 'text-jg-metal-500'
              } font-medium`}
            >
              <Link
                to={`?activityType=${activityType}&segmentTitle=${segmentTitle}&emailId=${emailId}&title=${reportItem} ${title}`}
              >
                {title}
              </Link>
            </p>
          </div>
        </div>
        {(activityType === ActivityType.OPEN || activityType === ActivityType.CLICK) &&
          (createSegmentSectionOpen ? (
            <div
              className="cursor-pointer"
              onClick={() => setCreateSegmentSectionOpen && setCreateSegmentSectionOpen(0)}
            >
              <CloseIcon fill="#fff" />
            </div>
          ) : (
            <div
              className="cursor-pointer"
              onClick={() =>
                setCreateSegmentSectionOpen &&
                (activityType === ActivityType.CLICK || ActivityType.OPEN) &&
                activityType &&
                setCreateSegmentSectionOpen(activityType)
              }
            >
              <SegmentAdd fill="#4CAF4F" />
            </div>
          ))}
      </div>
    </div>
  )
}

export default ReportCardItems
