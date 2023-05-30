import EmailNotFound from '@comps/uiComps/EmailList/EmailNotFound'
import type { ResultElement } from '@comps/uiComps/SegmentList/types'
import { ArrowLeftIcon } from '@heroicons/react/outline'
import { useWidgetContext } from '@jg/_core/classes/widget/WidgetContext'
import call from '@jg/_core/services/data/LegacyDataService'
import { LoaderOverlay } from '@jg/common/comps'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useInfiniteScroll } from '../EmailList/hooks/useInfiniteScroll'
import { CsvOutline, Refresh, Search, Segment } from '../Icons'
import useRecipientsStore from '../SegmentList/store/recipients'

type PreviewBodyProps = {
  values?: ResultElement[] | null
  title: string
  numberOfRows?: number
  setPageNumber?: (p: number) => void
  pageNumber?: number
  isRefresh?: boolean
  setIsRefresh?: (value: boolean) => void
}

const PreviewBody = ({ title }: PreviewBodyProps) => {
  const [scrollLoading, setScrollLoading] = useState<boolean>(false)
  const { getRecipientsBySegmentId, RecipientsBySegment, pageNumber, setPageNumber, Rows, numberOfRows, setValueNull } =
    useRecipientsStore()
  const isLoading = useRecipientsStore(({ isLoading }) => isLoading)
  const { onScroll } = useInfiniteScroll('recipientList', pageNumber, setPageNumber)
  const location = useLocation()
  const { clubDocId, segmentId } = useParams()
  const [searchParams] = useSearchParams()
  const oei = searchParams.get('oei')
  const { basePath } = useWidgetContext()
  const fromEmailPreview = location.state
  const navigate = useNavigate()
  const PageLimit = Math.ceil(Rows / numberOfRows)

  const handleSegmentUpdate = () => {
    oei != '-1' && navigate(basePath + clubDocId + '/segment/edit/' + segmentId)
  }

  const exportReport = async () => {
    const serverDomain = window.location.origin
    clubDocId &&
      segmentId &&
      (await call(
        ['GDE/ExportData'],
        [
          {
            provider: 'Email',
            args: {
              Method: 'ExportRecipientsBySegment',
              SegmentId: +segmentId,
              IncludeOptins: [],
              ExcludeOptins: [],
            },
          },
        ],
        (response: any) => {
          const token = response.Result
          window.location.href = serverDomain + '/ActionToken.mvc/invoke?token=' + token
        }
      ))
  }
  // useEffect(() => {
  //   setPageNumber(1)
  // }, [clubDocId, segmentId, fromEmailPreview])

  useEffect(() => {
    if (pageNumber > 1) {
      setScrollLoading(true)
    }
  }, [pageNumber])

  useEffect(() => {
    setScrollLoading(false)
  }, [RecipientsBySegment])

  useEffect(() => {
    if (segmentId && clubDocId) {
      getRecipientsBySegmentId(+segmentId, title, clubDocId, pageNumber, numberOfRows)
    }
  }, [pageNumber, segmentId])

  useEffect(() => {
    if (pageNumber < PageLimit) {
      document?.getElementById('recipientList')?.addEventListener('scroll', onScroll)
    }
    return () => document?.getElementById('recipientList')?.removeEventListener('scroll', onScroll)
  }, [RecipientsBySegment])

  return (
    <div className="w-full relative">
      <div className="px-4 py-2 md:p-4 lg:h-[48px] lg:flex items-center justify-between border-[1px] border-jg-metal-50">
        {!fromEmailPreview && (
          <div className="xl:w-3/5 lg:w-2/4 w-full pr-0 md:pr-4">
            <p className="text-[14px] font-semibold text-jg-metal-900 mt-2">
              Segment name<span className="text-jg-red-500">*</span>
            </p>
            <p className="text-jg-grey-500 mb-2 text-[14px] font-semibold truncate" title={title}>
              {title}
            </p>
          </div>
        )}
        {fromEmailPreview && (
          <div onClick={() => navigate(-1)} className="inline-block cursor-pointer">
            <ArrowLeftIcon className="w-6 h-6 inline-block text-jg-metal-700" />
            <span className="ml-2 align-middle text-jg-metal-700 text-[16px] font-semibold">Back</span>
          </div>
        )}
        <div className="flex items-center gap-6 lg:justify-end xl:w-2/5 lg:w-2/4 w-full">
          <div className="flex items-center gap-2 cursor-pointer">
            <div
              className="flex items-center gap-2"
              onClick={() => {
                setValueNull()
                setPageNumber(1)
                clubDocId && segmentId && getRecipientsBySegmentId(+segmentId, title, clubDocId, 1, numberOfRows)
              }}
            >
              <Refresh height={14} width={14} fill="#4CAF4F" />
              <p className="text-[#4CAF4F] text-[13px]">Refresh</p>
            </div>
            <span className="text-jg-metal-700">
              {/* {Rows - pageNumber * 30 < 30 ? Rows : pageNumber * 30} of {Rows} */}
              {RecipientsBySegment?.length} of {Rows}
            </span>
            <div>
              <button
                onClick={() => exportReport()}
                className="bg-jg-green-500 text-white pl-2 pr-2 pt-1 pb-1 text-[14px] w-[100%] rounded-[4px] md:rounded-[2px] flex items-center justify-center gap-3 absolute bottom-0 mx-auto md:relative"
              >
                <CsvOutline width={12} height={14} />
                Export
              </button>
            </div>
          </div>
          {!fromEmailPreview && (
            <div>
              {oei != '-1' &&  // this is reserved segment OnewingEntityId = oei
                <button
                  onClick={handleSegmentUpdate}
                  className="bg-jg-green-500 text-white pl-2 pr-2 pt-1 pb-1 text-[14px] w-[100%] rounded-[4px] md:rounded-[2px] flex items-center justify-center gap-3 absolute bottom-0 mx-auto md:relative"
                >
                  <Segment />
                  Update Segment
                </button>
              }
            </div>
          )}
        </div>
      </div>
      <div className="divide-y w-full">
        {isLoading ? (
          <LoaderOverlay />
        ) : (
          <>
            {RecipientsBySegment && RecipientsBySegment.length < 1 ? (
              <EmailNotFound
                icon={<Search className="w-[70px] h-[50px] md:w-[100px] md:h-[70px]" fill="#9e9e9e" />}
                title={'No results found'}
                description={"Try adjusting your search or filter to find what you're looking for."}
              />
            ) : (
              <div id="recipientList" className="divide-y w-full h-[calc(100vh-270px)] overflow-y-scroll ">
                {RecipientsBySegment &&
                  RecipientsBySegment.map((item, index: number) => (
                    <div
                      key={index}
                      className="odd:bg-jg-grey-50 md:bg-white md:flex items-center justify-start p-4 text-[13px] text-jg-metal-700 md:h-[48px]"
                    >
                      <p className="w-[30%]">{item.EmailAddress}</p>
                      <p className="w-[30%]">{item.MID}</p>
                      <p className="w-[20%]">{item.FirstName}</p>
                      <p className="w-[20%]">{item.LastName}</p>
                      <p className="w-[20%]">{item.Town}</p>
                      {/* <p className="w-[20%]">{item.Status}</p> */}
                      {/* <p className="w-[20%]">{item.StatusRemarks}</p> */}
                    </div>
                  ))}
                {scrollLoading && (
                  <div className=" w-full absolute bottom-0 flex justify-center text-[30px] text-jg-green-900">
                    <span>Loading...</span>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default PreviewBody
