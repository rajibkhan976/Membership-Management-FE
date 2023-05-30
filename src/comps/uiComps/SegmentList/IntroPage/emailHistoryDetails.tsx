import EmailBody from '@comps/uiComps/EmailList/EmailBody'
import EmailDetailPlaceholder from '@comps/uiComps/EmailList/EmailDetailPlaceholder'
import IconWithText from '@comps/uiComps/FileAttachement/IconWithText'
import ActivityLog from '@comps/uiComps/Icons/SVG/ActivityLog'
import Attachments from '@comps/uiComps/Icons/SVG/Attachments'
import CheckedRoundIcon from '@comps/uiComps/Icons/SVG/CheckedRoundIcon'
import DetailsIcon1 from '@comps/uiComps/Icons/SVG/DetailsIcon1'
import Modal from '@jg/common/comps/Modal'
import FancyScroll from '@jg/common/comps/Scrollbar/FancyScroll'
import AppStore from '@jg/store/store'
import { useWidgetContext } from 'jg-widget'
import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useActivityLog } from '../store/activityLog'
import { useEmailDetailsByHistoryId } from '../store/emailHistory'
import { activity } from '../types'
import ActivityLogPlaceholder from './activityLogPlaceholder'
import JLogo from './jLogo'

const EmailHistoryDetails = () => {
  const [open] = useState<boolean>(true)
  const [searchParams] = useSearchParams()
  const historyId = searchParams.get('historyId')
  const typeId = searchParams.get('type')

  const navigate = useNavigate()
  const { getDetailsByHistoryId, setLoadingStatus: setDetailsLoading } = useEmailDetailsByHistoryId(
    (state: any) => state
  )
  const { getActivityLog, setLoadingStatus: setActivityLoading } = useActivityLog((state: any) => state)

  useEffect(() => {
    setDetailsLoading(true)
    setActivityLoading(true)
    if (historyId && typeId) {
      getActivityLog(+historyId, +typeId, 1, 10)
      getDetailsByHistoryId(+historyId, +typeId === 0)
    }
  }, [historyId, typeId])
  return (
    <Modal
      open={open}
      setOpen={(isOpen) => {
        if (!isOpen) navigate(-1)
      }}
      titleSection={<ModalTitle />}
      bodySection={<BodySection />}
      showActionBtn={false}
    />
  )
}

const ModalTitle = () => {
  const { isLoading } = useEmailDetailsByHistoryId((state: any) => state)
  return (
    <>
      {!isLoading && (
        <div className="flex justify-between items-center w-full p-4">
          <p className="text-[14px] text-jg-metal-700 font-bold">Email Information</p>
        </div>
      )}
    </>
  )
}

const BodySection = () => {
  const { clubDocId } = useParams()
  const navigate = useNavigate()
  const { basePath } = useWidgetContext()
  const [tabText, setTabText] = useState('details')
  const { emailDetails, isLoading: emailDetailsLoading } = useEmailDetailsByHistoryId((state: any) => state)
  const { activities, user, isLoading: activityLoading } = useActivityLog((state) => state)
  const onRecipientClick = async (id: number, segmentTItle: string) => {
    navigate(`${basePath + clubDocId + '/emails/recipients/' + id + '/' + segmentTItle}`, {
      state: { fromEmailPreview: true },
    })
  }

  console.log('activities: ', activities)
  console.log('user: ', user)

  const BaseAppPath = AppStore.getState().BaseAppPath
  const backgroundURL = `${BaseAppPath}Store/Download?f=${user?.ProfilePicURL}&t=user&p=${user?.UserId}`

  return (
    <div>
      <div className="w-full flex flex-col">
        <div className="w-full flex border-b-[1px]">
          <div
            className={`flex items-center gap-2 px-4 border-b py-2 ${
              tabText === 'details'
                ? 'border-[#4CAF4F] pointer-events-none text-[#4CAF4F]'
                : 'text-[#455A64] cursor-pointer border-transparent'
            } text-base leading-4 font-medium`}
            onClick={() => setTabText('details')}
          >
            <div className="flex">
              <DetailsIcon1 />
            </div>
            <div className="">Details</div>
          </div>
          <div
            className={`flex items-center gap-2 px-4 border-b py-2 ${
              tabText === 'activityLog'
                ? 'border-[#4CAF4F] pointer-events-none text-[#4CAF4F]'
                : 'text-[#455A64] cursor-pointer border-transparent'
            } text-base leading-4 font-medium`}
            onClick={() => setTabText('activityLog')}
          >
            <div className="flex">
              <ActivityLog />
            </div>
            <div className="">Activity Log</div>
          </div>
        </div>

        {tabText === 'details' ? (
          emailDetailsLoading ? (
            <EmailDetailPlaceholder />
          ) : (
            emailDetails && (
              <div className="w-full">
                <div className="flex flex-col lg:flex-row justify-start lg:items-center border-b-[1px] border-jg-metal-50">
                  <p className="text-[13px] text-[#212121] font-normal py-3 px-4 cursor-pointer border-r w-full lg:w-[300px] truncate">
                    To:{' '}
                    <span className="text-[#607D8B]" title={emailDetails.To}>
                      {emailDetails.To}
                    </span>
                  </p>
                  <p className="text-[13px] text-[#212121] font-normal py-3 px-4 cursor-pointer border-r w-full lg:w-[300px] truncate">
                    From:{' '}
                    <span className="text-[#607D8B]" title={emailDetails.From}>
                      {emailDetails.From}
                    </span>
                  </p>
                  <p className="text-[13px] text-[#212121] font-normal py-3 px-4 cursor-pointer border-r w-full lg:w-[calc(100%-600px)] truncate">
                    Subject:{' '}
                    <span className="text-[#607D8B]" title={emailDetails.Subject}>
                      {emailDetails.Subject}
                    </span>
                  </p>
                </div>

                <FancyScroll className="h-[80vh] overflow-y-scroll">
                  <div className="grid lg:grid-cols-4 grid-cols-1">
                    <div className="p-4 col-span-3 border-r h-[calc(100vh-332px)] relative break-all overflow-y-scroll">
                      <EmailBody emailBody={emailDetails.BodyInHtml} />
                    </div>
                    <div className="lg:h-[calc(100vh-295px)] min-h-[320px]">
                      <div className="border-b p-4 flex justify-center">
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
                                download
                                href={item}
                                className="flex gap-1 border border-jg-metal-500 peer-checked:text-[#4CAF4F]  peer-checked:bg-[#E8F5E9] peer-checked:border-[#A5D6A7] rounded-full items-center px-2 py-1 cursor-pointer text-[13px] text-jg-metal-500 capitalize"
                              >
                                {item.split('f=')[1]}
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
            )
          )
        ) : activityLoading ? (
          <ActivityLogPlaceholder />
        ) : (
          <div className="p-4">
            <div className="border px-4 rounded-2xl mb-4 relative bg-white before:absolute before:content-[''] before:left-6 before:-bottom-6 before:w-[1px] before:h-6 before:bg-[#4CAF4F] last:before:hidden">
              <div className="border-b">
                <div className="flex gap-3 items-center py-4 text-base leading-4 font-semibold text-[#455A64]">
                  <div className="">
                    {user?.ProfilePicURL ? (
                      <div
                        className={`h-6 w-6 bg-cover bg-center rounded-full`}
                        style={{
                          backgroundImage: `url('${BaseAppPath}Store/Download?f=${user?.ProfilePicURL}&t=user&p=${user?.UserId}')`,
                        }}
                      ></div>
                    ) : (
                      <JLogo />
                    )}
                  </div>
                  <div className="">Received by {user?.EmailAddress}</div>
                </div>
              </div>
              {activities &&
                activities.map((item: activity, i) => (
                  <div className="py-4">
                    <div className="flex justify-between items-baseline">
                      <div className="flex gap-3 items-center text-base text-[#607D8B] leading-4 font-medium">
                        <div className="flex text-[#4CAF4F]">
                          <CheckedRoundIcon width={16} height={16} />
                        </div>
                        <div className="">{item.ActivityType}</div>
                      </div>
                      <div className="text-[#90A4AE] text-[13px] leading-4 font-normal">
                        {item.ActivityTime} {item.TimeZone}
                      </div>
                    </div>
                    <div className="text-[#607D8B] text-[13px] leading-4 font-normal mt-2">
                      {item.StatusRemarks}
                      {/* <Link className="text-[#4CAF4F]" to={'/'}>
                          Learn More
                        </Link> */}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default EmailHistoryDetails
