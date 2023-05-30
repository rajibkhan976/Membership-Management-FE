import EmailNotFound from '@comps/uiComps/EmailList/EmailNotFound'
import { Search } from '@comps/uiComps/Icons'
import call from '@jg/_core/services/data/LegacyDataService'
import { Modal } from '@jg/common/comps'
import type { SegmentsPreviewModalProps } from '@jg/widgets/EmailAndCom/interfaces/interfaces'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll'
import RecipientListPlaceholder from '../RecipientListPlaceholder'

export const SegmentsPreviewModal = ({
  segmentTitle,
  result,
  rows,
  setPreviewResult,
  loading,
  segmentExpression,
}: SegmentsPreviewModalProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const { onScroll } = useInfiniteScroll('previewList', pageNumber, setPageNumber)
  const { clubDocId } = useParams()

  useEffect(() => {
    if (pageNumber > 1) {
      call(
        ['GDE/FetchObjects'],
        [
          {
            provider: 'Email',
            args: {
              Method: 'RecipientsBySegment',
              SegmentId: 0,
              IncludeOptins: [],
              ExcludeOptins: [],
              OwningEntityId: clubDocId,
              SegmentExpression: segmentExpression,
              PageNo: pageNumber,
              Size: 30,
            },
          },
        ],
        (res: any) => {
          if (res.StatusCode === 200) {
            setPreviewResult(result.concat(res.Result.Recipients))
          }
        }
      )
    }
  }, [pageNumber])

  useEffect(() => {
    document?.getElementById('previewList')?.addEventListener('scroll', onScroll)
    return () => document?.getElementById('previewList')?.removeEventListener('scroll', onScroll)
  }, [result])

  return (
    <>
      <Modal
        titleSection={<p className="px-8 mt-3">Segment Preview</p>}
        open={isOpen}
        setOpen={() => {
          setPreviewResult(null)
          setIsOpen(false)
        }}
        bodySection={
          // <FancyScroll className="h-full overflow-y-scroll">
          <div className="w-full relative ">
            <div className="px-4 py-2 md:p-4 lg:h-[48px] md:flex items-center justify-between border-[1px] border-jg-metal-50">
              <div className="flex w-full pb-4 md:pb-0 justify-between">
                <div>
                  <p className="text-[14px] font-semibold text-jg-metal-900 mt-2">
                    Segment name<span className="text-jg-red-500">*</span>
                  </p>
                  <p className="text-jg-grey-500 mb-2 text-[14px] font-semibold truncate">{segmentTitle}</p>
                </div>
                <span className="text-jg-metal-700">
                  {result?.length} of {rows}
                </span>
              </div>
            </div>
            <div id="previewList" className="divide-y w-full h-[calc(100vh-232px)] overflow-y-scroll">
              {loading ? (
                Array.from({ length: 15 }, (v, i) => <RecipientListPlaceholder key={i} />)
              ) : (
                <>
                  {result && result.length < 1 ? (
                    <EmailNotFound
                      icon={<Search className="w-[70px] h-[50px] md:w-[100px] md:h-[70px]" fill="#9e9e9e" />}
                      title={'No results found'}
                      description={"Try adjusting your search or filter to find what you're looking for."}
                    />
                  ) : (
                    result &&
                    result.map((item: any, index: number) => (
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
                      </div>
                    ))
                  )}
                </>
              )}
            </div>
          </div>
          // </FancyScroll>
        }
        showActionBtn={false}
      />
    </>
  )
}
