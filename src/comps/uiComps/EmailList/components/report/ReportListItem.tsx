import type { ReportItemType } from '../../Interfaces'
const ReportListItems = ({ title, reportItem, percentage }: ReportItemType) => {
  return (
    <div className="flex w-full items-center py-[8px] gap-x-3">
      <p className="text-sm text-[#455A64] font-normal not-italic break-all">{title}</p>
      <p className="ml-auto border-t-[1px] border-dashed flex-1 h-[1px] text-jg-metal-700"></p>

      <p className="text-[14px] font-normal font-Inter not-italic text-[#263238]">
        {reportItem}
        <b
          className={`pl-[2px] text-sm font-normal font-Inter not-italic ${
            percentage ? 'text-[#607D8B]' : 'text-[#263238]'
          }`}
        >{`${percentage ? '(' + percentage + '%' + ')' : ''}`}</b>
      </p>
    </div>
  )
}

export default ReportListItems
