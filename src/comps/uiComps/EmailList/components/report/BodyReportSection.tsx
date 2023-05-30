import { EmailReportItemProps } from '@comps/uiComps/EmailList/Interfaces'
import Report from '@comps/uiComps/EmailList/components/report/ReportBigCard'
import { CsvOutline } from '@comps/uiComps/Icons'
import call from '@jg/_core/services/data/LegacyDataService'
import FancyScroll from '@jg/common/comps/Scrollbar/FancyScroll'
import { useEmailReport } from '@jg/widgets/EmailAndCom/store/EmailReportStore'
import ReportItemsPlaceholder from './ReportItemsPlaceholder'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { useEffect, useState } from 'react'

const BodyReportSection = () => {
  const { emailReport, isLoading } = useEmailReport((state: any) => state)
  const reportItems: EmailReportItemProps = {
    EmailId: emailReport?.EmailId,
    Delivered: emailReport?.Delivered,
    DeliveredPercent: emailReport?.DeliveredPercent,
    Opened: emailReport?.Opened,
    UniqueOpened: emailReport?.UniqueOpened,
    LastOpened: emailReport?.LastOpened,
    Clicked: emailReport?.Clicked,
    LastClicked: emailReport?.LastClicked,
    Bounced: emailReport?.Bounced,
    segmentTitle: emailReport?.Segment,
    UniqueClicked: emailReport?.UniqueClicked,
  }

  const [chartvalue, setChartvalue] = useState([])

  const { id } = useParams()
  const onExportClick = async () => {
    const serverDomain = window.location.origin
    await call(
      ['GDE/ExportData'],
      [
        {
          provider: 'Email',
          args: {
            Method: 'ExportReport',
            EmailId: emailReport.EmailId,
            ActivityType: 0,
          },
        },
      ],
      (response: any) => {
        const token = response.Result
        window.location.href = serverDomain + '/ActionToken.mvc/invoke?token=' + token
      }
    )
  }

  useEffect(() => {
    call(
      ['GDE/FetchObjects'],
      [
        {
          provider: 'Email',
          args: {
            Method: 'RecipientActivityCounts',
            EmailId: id,
            ResultType: 2, //0 for Day Based, 1 for Month Based, 2 for Hour Based
            From: moment().subtract(1, 'd').format('D-MM-YYYY'),
            To: moment().format('D-MM-YYYY'),
          },
        },
      ],
      (response: any) => {
        if (response.StatusCode === 200) {
          setChartvalue(response.Result)
        }
      }
    )
  }, [])

  return (
    <>
      <div className="w-full flex flex-col">
        {isLoading && <ReportItemsPlaceholder />}
        {emailReport && (
          <div className="w-full flex flex-col h-auto">
            <div className="absolute w-full z-10">
              <div className="flex justify-between items-center h-[64px] w-full left-0 top-12 bg-[#FFFFFF] border-l-0 border-r-0 border-t-[1px] border-b-[1px] border-solid p-4">
                <div className="flex items-center">
                  <h1 className="text-left font-Inter font-medium not-italic text-sm text-[#455A64]">
                    {emailReport.Subject}
                  </h1>
                </div>

                <button
                  onClick={onExportClick}
                  className={`h-[32px] w-[131px] bg-jg-green-500 text-white text-[14px] flex items-center justify-center`}
                >
                  <CsvOutline width={12} height={14} className="mr-1" />
                  Export
                </button>
              </div>

              <div className="box-border md:py-0 py-3 md:flex flex-start p-0 w-full md:h-[40px] h-auto left-0 top-28 bg-[#FFFFFF] border-b-[1px] border-solid border-[#ECEFF1]">
                <div className="flex items-center flex-row gap-x-2 cursor-pointer pl-4 pr-4 md:w-[21%]">
                  <p className="not-italic font-inter font-normal text-sm text-[#607D8B]">Sent at</p>
                  <p className="not-italic font-inter font-normal text-sm text-[#607D8B]">{emailReport.SentTime}</p>
                </div>
                <div className="flex items-center flex-row gap-x-2 cursor-pointer  border-l-[1px] border-solid border-[#ECEFF1] pl-4 md:w-[calc(100%-21%-16px)]">
                  <p className="truncate not-italic font-inter font-medium text-sm text-[#263238]">
                    <span>Segment:</span>
                    <span className="text-[#607D8B] ml-1 font-normal">{emailReport.Segment}</span>
                  </p>
                </div>
              </div>
            </div>
            <FancyScroll className="h-[80vh] overflow-y-scroll">
              {/* <div className="pt-[120px] h-[90vh]"> */}
              <div className="pt-[145px] md:pt-[120px] h-[0vh]">
                <Report items={reportItems} ChartData={chartvalue} />
              </div>
            </FancyScroll>
          </div>
        )}
      </div>
    </>
  )
}

export default BodyReportSection
