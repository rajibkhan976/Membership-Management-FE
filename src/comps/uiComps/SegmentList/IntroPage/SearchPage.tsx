import EmailListPlaceholder from '@comps/uiComps/EmailList/EmailListPlaceholder'
import { useInfiniteScroll } from '@comps/uiComps/EmailList/hooks/useInfiniteScroll'
import { CheckAll } from '@comps/uiComps/Icons'
import DroppedIcon from '@comps/uiComps/Icons/SVG/Dropped'
import SentIcon from '@comps/uiComps/Icons/SVG/Sent'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useEmailHistory } from '../store/emailHistory'
import { EmailHistory } from '../types'
import IntroData from './IntroData'

const SearchPageComponent = ({ openSearch }: any) => {
  const isLoading = useEmailHistory(({ isLoading }) => isLoading)
  const history = useEmailHistory(({ history }) => history)
  const getHistory = useEmailHistory(({ getHistory }) => getHistory)
  const rows = useEmailHistory(({ rows }) => rows)
  const pageNumber = useEmailHistory(({ pageNumber }) => pageNumber)
  const advanceData = useEmailHistory(({ advanceData }) => advanceData)
  const setPageNumber = useEmailHistory(({ setPageNumber }) => setPageNumber)
  const isScrollLoader = useEmailHistory(({ isScrollLoader }) => isScrollLoader)

  const { onScroll } = useInfiniteScroll('emailHistoryList', pageNumber, setPageNumber)

  const { clubDocId } = useParams()
  useEffect(() => {
    document?.getElementById('emailHistoryList')?.addEventListener('scroll', onScroll)
    return () => document?.getElementById('emailHistoryList')?.removeEventListener('scroll', onScroll)
  }, [history])

  useEffect(() => {
    if (pageNumber > 1) {
      if (clubDocId && advanceData && rows > pageNumber * 20) {
        getHistory(advanceData, pageNumber, false)
      }
    }
  }, [pageNumber])

  return (
    <>
      {isLoading && !isScrollLoader ? (
        Array.from({ length: 10 }, (v, i) => <EmailListPlaceholder key={i} />)
      ) : (
        <>
          {history ? (
            history.length > 0 ? (
              <div className="">
                <div className="">
                  <div className="w-full text-[13px] text-[#607D8B] font-normal leading-4">
                    <div className="sticky top-0 hidden md:block visible ">
                      <div className="bg-[#FAFAFA] border-b flex items-center lg:pr-[17px]">
                        <div className="w-full text-[#263238] text-left text-sm font-semibold leading-4 py-[10px] px-4 min-w-[295px]">
                          Subject
                        </div>
                        <div className="w-full text-[#263238] text-left text-sm font-semibold leading-4 py-[10px] px-4 min-w-[232px]">
                          Sent Date
                        </div>
                        <div className="w-full text-[#263238] text-left text-sm font-semibold leading-4 py-[10px] px-4 min-w-[240px]">
                          Last Event Received
                        </div>
                        <div className="w-full text-[#263238] text-left text-sm font-semibold leading-4 py-[10px] px-4 max-w-[110px]">
                          opens
                        </div>
                        <div className="w-full text-[#263238] text-left text-sm font-semibold leading-4 py-[10px] px-4 max-w-[120px]">
                          clicks
                        </div>
                        <div className="w-full text-[#263238] text-left text-sm font-semibold leading-4 py-[10px] px-4 max-w-[172px]">
                          status
                        </div>
                      </div>
                    </div>
                    <div
                      id="emailHistoryList"
                      className={`border-jg-metal-100 overflow-y-scroll ${openSearch === true ? 'h-[calc(100vh-381px)]' : 'h-[calc(100vh-265px)]'
                        }`}
                    >
                      {history &&
                        history.length > 0 &&
                        history.map((item: EmailHistory, i: number) => (
                          <div
                            className=" even:bg-[#FAFAFA] hover:bg-[#eee] transition-all duration-300 border-b cursor-pointer md:flex grid grid-cols-1 items-center"
                            key={i}
                          // onClick={() => onEmailClick(item.Id)}
                          >
                            <div className="p-4 w-full  min-w-[295px]">
                              <Link
                                to={`?historyId=${item.Id}&subject=${item.Subject}&type=${item.Type === 'Operational' ? 0 : 1
                                  }`}
                              >
                                <div className="truncate text-sm font-medium text-[#455A64]">{item.Subject}</div>
                                <div className="">{item.RecieverEmailAddress}</div>
                              </Link>
                            </div>
                            <div className="md:hidden w-full text-[#263238] text-left text-sm font-semibold leading-4 md:py-[10px] px-4 min-w-[232px]">
                              Sent Date
                            </div>
                            <div className="md:p-4 px-4 pb-4 w-full min-w-[232px]">{item.SentTime}</div>
                            <div className="md:hidden w-full text-[#263238] text-left text-sm font-semibold leading-4 md:py-[10px] px-4 min-w-[240px]">
                              Last Event Received
                            </div>
                            <div className="md:p-4 px-4 pb-4 w-full min-w-[240px]">{item.LastEventTime}</div>

                            <div className="md:hidden w-full text-[#263238] text-left text-sm font-semibold leading-4 md:py-[10px] px-4 max-w-[110px]">
                              opens
                            </div>
                            <div className="text-[#455A64] md:p-4 px-4 pb-4 w-full text-base max-w-[110px]">
                              <b>{item.Opens}</b>
                            </div>
                            <div className="md:hidden w-full text-[#263238] text-left text-sm font-semibold leading-4 md:py-[10px] px-4 max-w-[120px]">
                              clicks
                            </div>
                            <div className="text-[#455A64] md:p-4 px-4 pb-4 w-full text-base max-w-[120px]">
                              <b>{item.Clicks}</b>
                            </div>
                            <div className="md:p-4 px-4 pb-4 w-full max-w-[172px]">
                              {item.RecipientStatus === 'sent' ? (
                                <div className="">
                                  <div className="flex items-center gap-2 text-[#4CAF4F] text-[12px]">
                                    <div className="flex">
                                      <SentIcon />
                                    </div>
                                    <div className="">Sent</div>
                                  </div>
                                </div>
                              ) : (
                                <div className="">
                                  <div
                                    className={`flex items-center gap-2 text-[${['Cancelled', 'Failed', 'Excluded'].includes(item.RecipientStatus)
                                        ? '#F44236'
                                        : '#4CAF4F'
                                      }] text-[12px]`}
                                  >
                                    <div className="flex">
                                      {['Cancelled', 'Failed', 'Excluded'].includes(item.RecipientStatus) ? (
                                        <DroppedIcon />
                                      ) : (
                                        <CheckAll width={15.5} height={8.95} fill="#4CAF4F" className="inline" />
                                      )}
                                    </div>
                                    <div className="">{item.RecipientStatus}</div>
                                  </div>
                                  <div className="flex items-center gap-2 text-[#607D8B] text-[12px] truncate">
                                    <div className="" title={item.StatusRemarks}>
                                      {item.StatusRemarks}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      {isScrollLoader && Array.from({ length: 4 }, (v, i) => <EmailListPlaceholder key={i} />)}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <IntroData title="No Email Found For This Search" />
            )
          ) : (
            <IntroData title="Let’s Find Email History" />
          )}
        </>
      )}
    </>
  )
}

export default SearchPageComponent
