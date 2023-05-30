import EmailNotFound from '@comps/uiComps/EmailList/EmailNotFound'
import { CheckAll, CsvOutline, EmailCross, Refresh, Search, Segment } from '@comps/uiComps/Icons'
import useEmailRecipientByActivityType from '@comps/uiComps/SegmentList/store/emailRecipientByActivity'
import { useWidgetContext } from '@jg/_core/classes/widget/WidgetContext'
import call from '@jg/_core/services/data/LegacyDataService'
import { Modal } from '@jg/common/comps'
import { ClickItemReportProps } from '@jg/widgets/EmailAndCom/interfaces/interfaces'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import SegmentFilterByActivity from '../../../SegmentList/SegmentFilterByActivity'
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll'
import RecipientListPlaceholder from '../RecipientListPlaceholder'

export const ClickItemReport = ({ ModalTitle, segmentTitle, numberOfRows }: ClickItemReportProps) => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const activityType = searchParams.get('activityType')
  const segmentName = searchParams.get('segmentName')
  const emailId = searchParams.get('emailId')
  const segmentId = searchParams.get('segmentId')
  const deliveryCount = searchParams.get('deliveryCount')
  const title = searchParams.get('title')
  const { clubDocId } = useParams()
  const { basePath } = useWidgetContext()
  const [isRefreshed, setIsRefreshed] = useState<boolean>(false)
  const [scrollLoading, setScrollLoading] = useState<boolean>(false)
  const [currentRows, setCurrentRows] = useState<number>(0)
  const {
    getRecipientsByActivityType,
    GetEmailRecipientByActivityType,
    Rows,
    isLoading,
    setLoadingStatus,
    // setLoding,
    pageNumber,
    setPageNumber,
  } = useEmailRecipientByActivityType((state) => state)
  const { onScroll } = useInfiniteScroll('recipientsByActivity', pageNumber, setPageNumber)
  //fvgbdf

  // const { onLeftClick, onRightClick } = usePagination(setPageNumber, numberOfRows, Rows)
  useEffect(() => {
    setLoadingStatus(true)
  }, [setLoadingStatus])

  useEffect(() => {
    if (pageNumber > 1) {
      setScrollLoading(true)
    }
  }, [pageNumber])

  useEffect(() => {
    if (pageNumber * numberOfRows < Rows) {
      setCurrentRows(pageNumber * numberOfRows)
    } else {
      setCurrentRows(Rows)
    }
  }, [pageNumber, GetEmailRecipientByActivityType])

  useEffect(() => {
    setIsRefreshed(false)
    setScrollLoading(false)
  }, [GetEmailRecipientByActivityType])

  useEffect(() => {
    // setLoding(true)
    emailId && activityType && getRecipientsByActivityType(+emailId, +activityType, pageNumber, numberOfRows)
  }, [activityType, emailId, getRecipientsByActivityType, pageNumber, segmentId])

  const refresh = () => {
    setIsRefreshed(true)
  }

  const exportReport = async () => {
    const serverDomain = window.location.origin
    await call(
      ['GDE/ExportData'],
      [
        {
          provider: 'Email',
          args: {
            Method: 'ExportReport',
            EmailId: emailId,
            ActivityType: activityType,
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
    document?.getElementById('recipientsByActivity')?.addEventListener('scroll', onScroll)
    return () => document?.getElementById('recipientsByActivity')?.removeEventListener('scroll', onScroll)
  }, [GetEmailRecipientByActivityType])

  console.log('isLoading' + isLoading)

  return (
    <>
      <Modal
        open={true}
        setOpen={() => navigate(-1)}
        titleSection={ModalTitle}
        bodySection={
          // GetEmailRecipientByActivityType && GetEmailRecipientByActivityType?.length > 0 ? (
          <div className="w-full relative">
            <div className="px-4 py-2 md:p-4 lg:h-[48px] lg:flex items-center justify-between border-[1px] border-jg-metal-50">
              <div className="flex lg:w-2/4 w-full pr-0 md:pr-4">
                <div className="w-full">
                  <p className="text-[14px] font-semibold text-jg-metal-900 mt-2">
                    Segment name<span className="text-jg-red-500">*</span>
                  </p>
                  <p className="text-jg-grey-500 mb-2 text-[14px] font-semibold truncate" title={segmentTitle}>
                    {segmentTitle}
                  </p>
                </div>

                {activityType && segmentName && emailId && segmentId && deliveryCount && title ? (
                  <div className={`mx-3 my-auto`}>
                    <SegmentFilterByActivity
                      numberOfRows={numberOfRows}
                      pageNumber={pageNumber}
                      isRefreshed={isRefreshed}
                      setIsRefreshed={setIsRefreshed}
                    />
                  </div>
                ) : null}
              </div>

              <div className="flex items-center gap-6 cursor-pointer lg:w-2/4 w-full">
                <div className="flex items-center gap-2" onClick={refresh}>
                  <Refresh height={14} width={14} fill="#4CAF4F" />
                  <p className="text-[#4CAF4F] text-[13px]">Refresh</p>
                </div>
                <span className="text-jg-metal-700">
                  {currentRows} of {Rows}
                </span>
                {/* <div>
                  <PaginationDesign
                    count={Rows}
                    onLeftClick={onLeftClick}
                    onRightClick={onRightClick}
                    numberOfRows={numberOfRows}
                    pageNumber={pageNumber}
                    from={0}
                    to={0}
                  />
                </div> */}
                <div>
                  <Link
                    to={basePath + clubDocId + '/segment/edit/' + segmentId}
                    className="bg-jg-green-500 text-white pl-2 pr-2 pt-1 pb-1 text-[14px] w-[100%] rounded-[4px] md:rounded-[2px] flex items-center justify-center gap-3 absolute bottom-0 mx-auto md:relative"
                  >
                    <CsvOutline width={12} height={14} className="mr-1" />
                    Update Segment
                  </Link>
                </div>
                <div>
                  <button
                    onClick={exportReport}
                    className="bg-jg-green-500 text-white pl-2 pr-2 pt-1 pb-1 text-[14px] w-[100%] rounded-[4px] md:rounded-[2px] flex items-center justify-center gap-3 absolute bottom-0 mx-auto md:relative"
                  >
                    <Segment />
                    Export
                  </button>
                </div>
              </div>
            </div>
            <div id="recipientsByActivity" className="divide-y w-full overflow-y-scroll h-[calc(100vh-232px)]">
              {isLoading === true ? (
                <div className="w-full">
                  {Array.from({ length: 30 }, () => (
                    <RecipientListPlaceholder />
                  ))}
                </div>
              ) : (
                <>
                  {GetEmailRecipientByActivityType && GetEmailRecipientByActivityType.length < 1 ? (
                    <EmailNotFound
                      icon={<Search className="w-[70px] h-[50px] md:w-[100px] md:h-[70px]" fill="#9e9e9e" />}
                      title={'No results found'}
                      description={"Try adjusting your search or filter to find what you're looking for."}
                    />
                  ) : (
                    GetEmailRecipientByActivityType &&
                    GetEmailRecipientByActivityType.map((item, index: number) => (
                      <div
                        key={index}
                        className="odd:bg-jg-grey-50 md:bg-white md:flex items-center justify-start p-4 text-[13px] text-jg-metal-700 md:h-[48px]"
                      >
                        <p className="w-[30%]">{item.EmailAddress}</p>
                        <p className="w-[20%]">{item.MID}</p>
                        <p className="w-[20%]">{item.FirstName}</p>
                        <p className="w-[20%]">{item.LastName}</p>
                        <p className="w-[20%]">{item.Mobile}</p>
                        <p className="w-[20%]">{item.Address?.Town}</p>
                        <p
                          className={`w-[30%] text-center mt-4 mb-4 jg-hidden ${
                            activityType && segmentName && emailId && segmentId && deliveryCount && title
                              ? 'jg-hidden'
                              : ''
                          }`}
                        >
                          {item.Status === 'Success' ? (
                            <span className="text-xs text-jg-green-500 inline">
                              <CheckAll width={15.5} height={8.95} className="inline" /> Sent
                            </span>
                          ) : (
                            <>
                              <span className="text-xs text-jg-red-500 inline">
                                <EmailCross width={20} height={20} className="inline" /> Dropped
                              </span>
                              <br />
                              <span className="text-xs mb-1 text-jg-gray-500 inline"> {item.StatusRemarks}</span>
                            </>
                          )}
                        </p>
                      </div>
                    ))
                  )}
                  {scrollLoading && (
                    <div className=" w-full absolute bottom-0 flex justify-center text-[30px] text-jg-green-900">
                      <span>Loading...</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          // ) : (
          //   <EmailNotFound
          //     icon={<Search className="w-[70px] h-[50px] md:w-[100px] md:h-[70px]" fill="#9e9e9e" />}
          //     title={'No results found'}
          //     description={"Try adjusting your search or filter to find what you're looking for."}
          //   />
          // )
        }
        showActionBtn={false}
      />
    </>
  )
}
