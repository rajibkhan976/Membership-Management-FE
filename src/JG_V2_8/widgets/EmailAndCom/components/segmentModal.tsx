import Button from '@comps/uiComps/Button/Button'
import { useInfiniteScroll } from '@comps/uiComps/EmailList/hooks/useInfiniteScroll'
import { Refresh } from '@comps/uiComps/Icons'
import SegmentIcon from '@comps/uiComps/SegmentList/SegmentIcon'
import { useSegmentsStore } from '@comps/uiComps/SegmentList/store/segments'
import { useSegmentPaginationStore } from '@comps/uiComps/SegmentList/store/segmentsPagination'
import { Segment } from '@comps/uiComps/SegmentList/types'
import { Dialog, Transition } from '@headlessui/react'
import { XCircleIcon } from '@heroicons/react/outline'
import { useWidgetContext } from 'jg-widget'
import moment from 'moment'
import { Fragment, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const SegmentModal = ({ isOpen, setIsOpen, setFieldValue, setSegmentTitle }: any) => {
  const { segments, getSegments, Rows, isError, isLoading, Key, setKey, setIsArchive, setValueNull } =
    useSegmentsStore()
  const { clubDocId } = useParams()
  const { basePath } = useWidgetContext()
  const navigate = useNavigate()
  const { pageNumber, setPageNumber } = useSegmentPaginationStore()
  const { onScroll } = useInfiniteScroll('recipientsScroll', pageNumber, setPageNumber)

  function closeModal() {
    setIsOpen(false)
  }

  useEffect(() => {
    setValueNull()
    setPageNumber(1)
  }, [clubDocId, Key])

  useEffect(() => {
    setIsArchive(0)
    clubDocId && getSegments(clubDocId, pageNumber, 15)
  }, [clubDocId, getSegments, pageNumber, Key])

  useEffect(() => {
    document?.getElementById('recipientsScroll')?.addEventListener('scroll', onScroll)
    return () => document?.getElementById('recipientsScroll')?.removeEventListener('scroll', onScroll)
  }, [segments])

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <div id="justgo-app" className="relative z-[9999]">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed z-10 inset-0 overflow-y-visible">
              <div className="flex items-end justify-center min-h-full p-0 pt-8 sm:px-8 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="relative h-[80vh] w-full max-w-[1150px] bg-white rounded-t-3xl sm:rounded-t-xl text-left overflow-hidden shadow-xl transform transition-all sm:max-w-[1150px] divide-y divide-gray-100">
                    <div className="w-full flex bg-jg-grey-100" style={{ minHeight: '3rem' }}>
                      <Dialog.Title as="div" className="px-2">
                        <div className="flex flex-col items-start p-2 text-md">
                          <div className="text-[14px] text-jg-metal-900 font-semibold">Recipients</div>
                          <div className="text-[13px] text-jg-metal-500">Who are you sending this email to?</div>
                        </div>
                      </Dialog.Title>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-3 right-3 w-6 h-6 text-jg-grey-600"
                      >
                        <XCircleIcon />
                      </button>
                    </div>

                    <div className="w-full flex flex-col h-full">
                      <div className="p-4 w-full flex flex-col md:flex-row border-b">
                        <div className="w-full md:w-6/12 flex items-center text-jg-grey-700 font-semibold">
                          <input
                            type="text"
                            placeholder="Search Segment"
                            onChange={(e) => setKey(e.target.value)}
                            className="border w-full border-jg-grey-200 h-8 px-3 text-[13px] mb-2"
                          />
                        </div>
                        <div className="w-full md:w-6/12 flex md:justify-end mt-2 md:mt-0 mr-4">
                          <div
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => {
                              setValueNull()
                              setPageNumber(1)
                              clubDocId && getSegments(clubDocId, 1, 15)
                            }}
                          >
                            <Refresh height={14} width={14} fill="#4CAF4F" />
                            <p className="text-[#4CAF4F] text-[13px]">Refresh</p>
                          </div>
                          <div className="flex items-center justify-center text-jg-grey-500 text-sm ml-4">
                            {segments?.length} of <span className="text-jg-grey-700 ml-1">{Rows}</span>
                          </div>
                          <div className="ml-4 my-auto">
                            <Button
                              text="New Segment"
                              icon={<SegmentIcon />}
                              className="visible hidden md:flex"
                              onClick={() => navigate(`${basePath}${clubDocId}/create-segment`)}
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        id="recipientsScroll"
                        className="w-full flex flex-col overflow-y-scroll h-[calc(100%-158px)] md:h-[calc(100%-130px)]"
                      >
                        {segments &&
                          segments.length > 0 &&
                          segments.map((item: Segment, i: number) => (
                            <div className="w-full odd:bg-jg-grey-50 pl-2" key={i}>
                              <div
                                className={`w-full flex flex-col md:flex-row text-sm pl-2 py-3 border-b cursor-pointer md:items-center`}
                              >
                                <div
                                  className="w-full md:w-8/12 overflow-hidden"
                                  onClick={async () => {
                                    closeModal()
                                    await setFieldValue('SegmentId', item.SegmentId)
                                    setSegmentTitle(item.Title)
                                  }}
                                >
                                  <span
                                    className="w-11/12 inline-block align-top text-[14px] text-jg-metal-700 font-medium truncate"
                                    title={item.Title}
                                  >
                                    {item.Title ? item.Title : <>&nbsp;</>}
                                  </span>

                                  <span
                                    className="w-11/12 mb-2 inline-block align-top text-[14px] text-jg-metal-500 font-normal truncate"
                                    title={item.Description}
                                  >
                                    {item.Description ? item.Description : <>&nbsp;</>}
                                  </span>
                                </div>
                                <div className="flex md:inline-block mb-2 md:mb-auto my-auto">
                                  <div
                                    className={`text-[13px] leading-4 rounded-full py-1 px-2 border ${
                                      !item.SegmentStatus
                                        ? 'bg-jg-green-50 border-jg-green-500  text-jg-green-500'
                                        : 'bg-[#ECEFF1] border-[#CFD8DC]  text-[#CFD8DC]'
                                    }`}
                                  >
                                    {item.SegmentStatus ? 'Archive' : 'Active'}
                                  </div>
                                </div>
                                <div className="w-full md:w-4/12 text-[13px] font-normal text-jg-metal-500 flex md:justify-center">
                                  {moment(item.LastUpdated).format('DD MMM YYYY, h:mm a')}
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
export default SegmentModal
