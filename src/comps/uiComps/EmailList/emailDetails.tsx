import Modal from '@jg/common/comps/Modal'
import FancyScroll from '@jg/common/comps/Scrollbar/FancyScroll'
import AppStore from '@jg/store/store'
import { useEmailDetails } from '@jg/widgets/EmailAndCom/store/EmailStore'
import { useWidgetContext } from 'jg-widget'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import IconWithText from '../FileAttachement/IconWithText'
import Attachments from '../Icons/SVG/Attachments'
import EmailBody from './EmailBody'
import EmailDetailPlaceholder from './EmailDetailPlaceholder'

const EmailDetails = () => {
  const [open] = useState<boolean>(true)
  const { id } = useParams()
  const navigate = useNavigate()
  const { emailDetails, fetch: fetchDetails, setLoadingStatus } = useEmailDetails((state: any) => state)

  useEffect(() => {
    setLoadingStatus(true)
    fetchDetails(id)
  }, [fetchDetails, id, setLoadingStatus])
  return (
    <Modal
      open={open}
      setOpen={(isOpen) => {
        if (!isOpen) navigate(-1)
      }}
      titleSection={<ModalTitle />}
      bodySection={<BodySection emailDetails={emailDetails} />}
      showActionBtn={false}
    />
  )
}

const ModalTitle = () => {
  const { isLoading } = useEmailDetails((state: any) => state)
  return (
    <>
      {!isLoading && (
        <div className="flex justify-between items-center w-full p-4">
          <p className="text-[14px] text-jg-metal-700 font-bold">View Email</p>
          {/* <div className="flex gap-5 text-[#455A64]">
            <div className="flex cursor-pointer">
              <Download fill="#455A64" />
            </div>
            <div className="flex cursor-pointer">
              <CopyIcon fill="#455A64" />
            </div>
          </div> */}
        </div>
      )}
    </>
  )
}

const BodySection = ({ emailDetails }: any) => {
  const { clubDocId } = useParams()
  const navigate = useNavigate()
  const { basePath } = useWidgetContext()
  const { isLoading } = useEmailDetails((state: any) => state)
  const onRecipientClick = async (id: number, segmentTItle: string) => {
    navigate(`${basePath + clubDocId + '/emails/recipients/' + id + '/' + segmentTItle}`, {
      state: { fromEmailPreview: true },
    })
  }
  const BaseAppPath = AppStore.getState().BaseAppPath

  return (
    <div>
      {isLoading ? (
        <EmailDetailPlaceholder />
      ) : (
        emailDetails && (
          <div className="w-full flex flex-col ">
            <div className="w-full flex p-3">
              <div className="flex items-center">
                <p className="text-left text-[14px] text-[#455A64] font-medium leading-4">{emailDetails.Subject}</p>
              </div>
            </div>

            <div className="py-2 w-full">
              <div className="flex flex-col lg:flex-row justify-start lg:items-center border-t-[1px] border-b-[1px] border-jg-metal-50">
                <p className="text-[13px] text-[#607D8B] font-normal pt-3 px-4 cursor-pointer lg:max-w-[260px] pb-0 lg:pb-3">
                  Sent at {moment(emailDetails.LastUpdatedTime).format('LLL')}
                </p>
                <p className="text-[13px] text-jg-green-500 font-medium lg:pt-4 lg:pb-4 pb-3 pt-1 px-4 border-l-[0px] border-r-[0px] lg:border-l-[1px] lg:border-r-[1px] cursor-pointer lg:max-w-[220px]">
                  <Link
                    to={`?activityType=0&segmentTitle=${emailDetails.SegmentName}&emailId=${emailDetails.EmailId}&title=${emailDetails.RecipientCount} Contacts ${emailDetails.DroppedCount} Dropped`}
                  >
                    {emailDetails.RecipientCount} Contacts, {emailDetails.DroppedCount} Dropped
                  </Link>
                </p>
                <div className="border-t-[1px] lg:border-t-[0px] p-4 lg:px-4 lg:py-4 lg:w-[calc(100%-480px-16px)]">
                  <p className="text-[13px] text-black font-normal cursor-pointer truncate">
                    Segment:{' '}
                    <span className="text-jg-metal-500" title={emailDetails.SegmentName}>
                      {emailDetails.SegmentName}
                    </span>
                  </p>
                </div>
              </div>

              <FancyScroll className="h-[80vh] overflow-y-scroll">
                <div className="grid lg:grid-cols-4 grid-cols-1">
                  <div className="p-4 col-span-3 border-r h-52 lg:h-[calc(100vh-332px)] relative break-all overflow-y-scroll">
                    <EmailBody emailBody={emailDetails.Body} />
                  </div>
                  <div className="lg:h-[calc(100vh-295px)] min-h-[320px]">
                    <div className="border-b lg:border-t-0 border-t p-2 lg:p-4 flex justify-center">
                      <IconWithText
                        icon={<Attachments />}
                        text={'Attachment'}
                        flexDirection={'flex items-center gap-x-1'}
                        txtColor={'text-[#455A64]'}
                      />
                    </div>
                    {emailDetails.Attachments && emailDetails.Attachments.length > 0 ? (
                      <div className="p-2 lg:p-4 break-all lg:h-auto h-40 overflow-y-scroll">
                        {emailDetails.Attachments.map((item: any, i: number) => (
                          <div className="inline-block mr-2 mb-3" key={i}>
                            <a
                              target="_blank"
                              rel="noreferrer"
                              download
                              href={`${BaseAppPath}store/download?f=${item.FileName}&t=emailandcommunicationattachments&p=${item.EmailId}&p1=${item.EmailAttachmentId}&p2=null&p3=null`}
                              className="flex gap-1 border border-jg-metal-500 peer-checked:text-[#4CAF4F]  peer-checked:bg-[#E8F5E9] peer-checked:border-[#A5D6A7] rounded-full items-center px-2 py-1 cursor-pointer text-[13px] text-jg-metal-500 capitalize"
                            >
                              {item.FileName}
                            </a>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center h-auto lg:py-0 py-4 lg:h-full justify-center">
                        <div className="text-[#607D8B] text-sm">No attachment found</div>
                      </div>
                    )}
                  </div>
                </div>
              </FancyScroll>
            </div>
          </div>
        )
      )}
    </div>
  )
}

export default EmailDetails
