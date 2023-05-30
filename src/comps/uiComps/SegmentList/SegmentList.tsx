import PreviewBody from '@comps/uiComps/CreateSegment/PreviewBody'
import PreviewTitle from '@comps/uiComps/CreateSegment/PreviewTitle'
import HelpIntro from '@comps/uiComps/HelpIntro/HelpIntro'
import { Refresh } from '@comps/uiComps/Icons'
import useRecipientsStore from '@comps/uiComps/SegmentList/store/recipients'
import { useSegmentsStore } from '@comps/uiComps/SegmentList/store/segments'
import { useSegmentPaginationStore } from '@comps/uiComps/SegmentList/store/segmentsPagination'
import { ReactComponent as EmailVideoPlayerIcon } from '@jg/assets/images/EmailVideoPlayerIcon.svg'
import { ReactComponent as SegmentLogoIcon } from '@jg/assets/images/SegmentLogoIcon.svg'
import { SearchField } from '@jg/common/comps'
import Modal from '@jg/common/comps/Modal'
import { useWidgetContext } from 'jg-widget'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PaginationDesign, usePagination } from '../../../hooks/pagination'
import Button from '../Button/Button'
import EmailNotFound from '../EmailList/EmailNotFound'
import SegmentIcon from './SegmentIcon'
import { Search } from '@comps/uiComps/Icons/index'
import ListItem from './SegmentListItem'
import SegmentListPlaceholder from './SegmentListPlaceholder'
import { useInfiniteScroll } from '../EmailList/hooks/useInfiniteScroll'

const SegmentList = () => {
  const navigate = useNavigate()
  const { basePath } = useWidgetContext()
  const [open, setOpen] = useState<boolean>(false)
  const { clubDocId } = useParams()
  const { RecipientsBySegment, segmentTitle } = useRecipientsStore()
  const { segments, getSegments, Rows, isError, isLoading, setKey, Key, isArchive, setIsArchive, setValueNull } =
    useSegmentsStore()
  const { pageNumber, setPageNumber, numberOfRows } = useSegmentPaginationStore()
  const { onScroll } = useInfiniteScroll('segmentList', pageNumber, setPageNumber)
  // const { onLeftClick, onRightClick } = usePagination(setPageNumber, numberOfRows, Rows)

  useEffect(() => {
    setIsArchive(0)
  }, [])

  useEffect(() => {
    setPageNumber(1)
  }, [Key, isArchive, clubDocId])

  useEffect(() => {
    clubDocId && getSegments(clubDocId, pageNumber, numberOfRows)
  }, [clubDocId, pageNumber])

  useEffect(() => {
    setValueNull()
    clubDocId && getSegments(clubDocId, pageNumber, numberOfRows)
  }, [isArchive, Key])

  useEffect(() => {
    document?.getElementById('segmentList')?.addEventListener('scroll', onScroll)
    return () => document?.getElementById('segmentList')?.removeEventListener('scroll', onScroll)
  }, [segments])

  return (
    <>
      {isLoading && Array.from({ length: 10 }, (v, i) => <SegmentListPlaceholder key={i} />)}
      {segments && Key === '' && !isArchive && segments.length < 1 ? (
        <HelpIntro
          title={`You have no saved segments`}
          description={`Let's create segments to target subscribers by location, engagement, activity, and more through`}
          routeLink={`${basePath}${clubDocId}/create-segment`}
          iconSVG={<SegmentLogoIcon className="mt-4" />}
          videoPlayerIcon={<EmailVideoPlayerIcon />}
        />
      ) : (
        <div className="rounded-sm overflow-hidden border-jg-metal-100 divide-y-[1px] min-h-[calc(100vh-175px)] max-h-[calc(100vh-175px)]">
          <div className="md:flex p-[8px] justify-between items-center border-jg-metal-100">
            <div className="md:flex gap-x-4">
              <div className="border rounded-2 md:mb-0 mb-2">
                <SearchField
                  className="test"
                  onChange={(e: any) => {
                    setKey(e)
                  }}
                  onClear={function noRefCheck() { }}
                  onEnter={function noRefCheck() { }}
                  placeholder="Search Segment"
                />
              </div>
              <div className="flex items-center gap-x-4 md:mb-0 mb-2">
                <div className="text-[13px] text-[#607D8B] leading-4">Show only Archive</div>
                <div className="flex">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value=""
                      className="sr-only peer"
                      onChange={(e: any) => (e.target.checked ? setIsArchive(1) : setIsArchive(0))}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-jg-green-600"></div>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {segments?.length} of {Rows}
              <button
                onClick={() => {
                  setValueNull()
                  setPageNumber(1)
                  clubDocId && getSegments(clubDocId, 1, numberOfRows)
                }}
                className={`text-gray-600 hover:text-green-600 text-[16px]`}
              >
                <Refresh width={12} height={12} fill="#4CAF4F" />
              </button>
              <Button
                text="Create Segment"
                icon={<SegmentIcon />}
                className="visible hidden md:flex"
                onClick={() => navigate(`${basePath}${clubDocId}/create-segment`)}
              />
              <Button
                text="Create Segment"
                icon={<SegmentIcon />}
                className="visible block md:hidden fixed right-[24px] bottom-[24px]"
                onClick={() => navigate(`${basePath}${clubDocId}/create-segment`)}
              />
            </div>
          </div>

          {segments && segments.length > 0 ? (
            <div
              id="segmentList"
              className="border-jg-metal-100 overflow-y-scroll h-[calc(100vh-232px)] divide-y-[1px]"
            >
              {segments.map((segment, i) => (
                <ListItem key={i} setOpen={setOpen} item={segment} classes="even:bg-gray-100" />
              ))}
            </div>
          ) : (
            <EmailNotFound
              icon={<Search className="w-[70px] h-[50px] md:w-[100px] md:h-[70px]" fill="#9e9e9e" />}
              title={'No results found'}
              description={"Try adjusting your search or filter to find what you're looking for."}
            />
          )}

          {RecipientsBySegment && (
            <Modal
              open={open}
              setOpen={setOpen}
              titleSection={<PreviewTitle title={`${RecipientsBySegment?.length} contacts match your conditions`} />}
              bodySection={
                <PreviewBody
                  values={RecipientsBySegment}
                  title={segmentTitle}
                  numberOfRows={numberOfRows}
                  pageNumber={pageNumber}
                  setPageNumber={setPageNumber}
                />
              }
              showActionBtn={false}
            />
          )}
        </div>
      )}
    </>
  )
}

export default SegmentList
