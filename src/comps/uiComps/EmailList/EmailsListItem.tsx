import JustGoDropdown from '@comps/uiComps/Dropdown/JustGoSplitButton'
import { ActivityClickItem } from '@comps/uiComps/EmailList/components/activityClickItem'
import { EmailStatus } from '@comps/uiComps/EmailList/status.enum'
import {
  CheckAll,
  ContentCopy,
  CursorDefaultClick,
  EmailCheck,
  EmailCross,
  EmailEditOutline,
  EmailEditSolid,
  EmailNewsletter,
  EmailOpen,
  EmailSending,
  FileEditOutline,
  SendLaterSolid,
  ShapeOutline,
  TextBoxOutline,
  TrashCan,
} from '@comps/uiComps/Icons/index'
import call from '@jg/_core/services/data/LegacyDataService'
import SideMenu from '@jg/widgets/EmailAndCom/components/sideMenu'
import { ActivityType } from '@jg/widgets/EmailAndCom/enum'
import { useEmailList } from '@jg/widgets/EmailAndCom/store/EmailStore'
import { useWidgetContext } from 'jg-widget'
import moment from 'moment'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Badge from '../Badges/Badge'
import Button from '../Button/Button'
import JGDialog from '../Dialog/Dialog'
import type { EmailItemProps } from './Interfaces'
import Modal from '@jg/common/comps/Modal'
import TitleSection from '@jg/widgets/EmailAndCom/components/UpgardeSection/TitleSection'
import ShoppingCartProvider from '@jg/providers/ShoppingCartProvider'
import BodySection from '@jg/widgets/EmailAndCom/components/UpgardeSection/BodySection'
import ButtonSection from '@jg/widgets/EmailAndCom/components/UpgardeSection/ButtonSection'
import useGetSelectedClub from '@jg/widgets/ClubSwitcher/store/selectedClube'
import { useJGPackageContext } from '@jg/providers/JGPackageProvider'

const EmailsListItem = ({ mailList, month, sideFilterStatus }: EmailItemProps) => {
  const navigate = useNavigate()
  const { basePath } = useWidgetContext()
  const { clubDocId } = useParams()
  const { fetch: getEmailList, pageNumber, numberOfRows } = useEmailList((state: any) => state)
  const [deleteId, setDeleteId] = useState<number>(0)
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  const [open, setOpen] = useState(false)
  const club = useGetSelectedClub(({ club }) => club)
  const { jgPackage } = useJGPackageContext()
  const handleEditClick = async (id: number) => {
    navigate(`${basePath + clubDocId + '/emails/compose/' + id + '?status=' + sideFilterStatus}`)
  }

  const onEmailClick = async (id: number) => {
    navigate(`${basePath + clubDocId + '/emails/preview/' + id}`)
  }

  const onDuplicateClick = async (id: number) => {
    navigate(`${basePath + clubDocId + '/emails/compose/duplicate/' + id + '?status=' + sideFilterStatus}`, {
      state: 'duplicate',
    })
  }

  const onDeleteClick = (id: number) => {
    setDialogOpen(true)
    setDeleteId(id)
  }

  const confirmClick = async () => {
    const args = { EmailId: +deleteId }
    await call(['GoMembership/DeleteEmail'], [{ args }], (response: any) => {
      if (response.StatusCode === 200) {
        getEmailList({
          Method: 'GetEmailList',
          OwningEntityId: clubDocId,
          PageNumber: pageNumber,
          NumberOfRows: numberOfRows,
        })
      }
    })
    setDialogOpen(false)
  }

  const onEmailReportClick = async (id: number) => {
    navigate(`${basePath + clubDocId + '/emails/report/' + id}`)
  }
  const onRecipientClick = (id: number, segmentTitle: string) => {
    navigate(`${basePath + clubDocId + '/emails/recipients/' + id + '/' + segmentTitle}`, {
      state: { fromEmailPreview: true },
    })
  }

  return (
    <>
      {mailList.length > 0 && (
        <>
          <div className="px-2 py-1.5 border-b bg-white md:bg-jg-grey-50">
            <h5 className="text-[13px] text-jg-grey-900">
              {month} ({mailList.length})
            </h5>
          </div>
          {/* {date title end} */}

          {mailList.map((item, index) => (
            <div className="px-2 py-3.5 border-b cursor-pointer odd:bg-[#FAFAFA]" key={index}>
              <div className="flex gap-x-4 flex-col lg:items-center items-start lg:flex-row justify-between sm:pr-1 sm:py-0 p-2">
                {/* {first part start} */}
                <div className="flex items-center w-full lg:max-w-lg">
                  {/* {icon start} */}
                  <div className="visible hidden lg:block pr-0 md:pr-2 lg:pr-2 xl:pr-4">
                    <div className="w-8 h-8 rounded-full border flex items-center justify-center bg-jg-grey-50 ">
                      {!item.IsTemplate ? (
                        <FileEditOutline width={12.3} height={14} fill="#B0BEC5" />
                      ) : (
                        <ShapeOutline width={12.67} height={13.33} fill="#B0BEC5" />
                      )}
                    </div>
                  </div>
                  {/* {icon end} */}

                  {/* {text part start} */}
                  <div className="inline-block px-0 lg:px-1 truncate">
                    <h5
                      title={`${item.Subject}`}
                      className="text-sm text-ellipsis overflow-hidden text-jg-metal-700 sm:mb-0 mb-2 truncate"
                    >
                      {item.Subject || 'Subject Not Found!'}
                    </h5>
                    <div className="inline-block lg:mb-0 mb-1">
                      <span className="text-jg-green-500 inline">
                        {item.Status === EmailStatus.SENT ? (
                          <CheckAll width={15.5} height={8.95} fill="#4CAF4F" className="inline" />
                        ) : item.Status === EmailStatus.DRAFTS ? (
                          <EmailEditSolid width={10.67} height={13.33} fill="#D32E2F" className="inline" />
                        ) : item.Status === EmailStatus.SCHEDULE ? (
                          <SendLaterSolid width={14} height={13.33} fill="#F57F17" className="inline" />
                        ) : (
                          <EmailSending fill="#2194F3" className="inline" />
                        )}
                      </span>
                      <span
                        className={
                          item.Status === EmailStatus.SENT
                            ? `ml-1 text-xs text-jg-green-500 inline`
                            : item.Status === EmailStatus.DRAFTS
                              ? 'ml-1 text-xs text-jg-red-700 inline'
                              : item.Status === EmailStatus.SCHEDULE
                                ? 'ml-1 text-xs text-jg-yellow-900 inline'
                                : 'text-jg-blue-500'
                        }
                      >
                        {item.Status === EmailStatus.SENT
                          ? `Sent`
                          : item.Status === EmailStatus.DRAFTS
                            ? 'Last Edited'
                            : item.Status === EmailStatus.SCHEDULE
                              ? 'Schedule'
                              : 'Sending...'}
                      </span>
                      <span className="ml-1 text-xs text-jg-metal-500 inline">
                        at{' '}
                        {item.Status === EmailStatus.SCHEDULE
                          ? moment(item.ScheduledTime).format('llll') + ' ' + item.ScheduleTimeZone
                          : item.Status === EmailStatus.SENT
                            ? moment(item.SentTime).format('llll') + ' ' + item.CreationTimeZone
                            : moment(item.LastUpdatedTime).format('llll') + ' ' + item.CreationTimeZone}
                      </span>
                    </div>
                    <div className="flex">
                      {item.Tags &&
                        item.Tags.length > 0 &&
                        item.Tags.slice(0, 3).map((tag, index) => (
                          <Badge
                            className="bg-[#FAFAFA] border-[1px] border-jg-metal-100 text-jg-metal-500 font-bold mx-1 lg:text-[10px] px-[6px] py-[3px] leading-[14px] my-2"
                            fillType="plain"
                            label={tag.length > 7 ? tag.slice(0, 7) + '...' : tag}
                            size="md"
                            variant="grey"
                            rounded={true}
                            key={index}
                          />
                        ))}
                      {item.Tags && item.Tags.length > 3 && (
                        <label htmlFor={`${item.Subject}+${index}`}>
                          <Badge
                            className="bg-[#FAFAFA] border-[1px] border-jg-metal-100 text-jg-metal-500 font-bold mx-1 lg:text-[10px] px-[6px] py-[3px] leading-[14px] my-2 hover:cursor-pointer"
                            fillType="plain"
                            label={`${item.Tags.length - 3}+`}
                            size="md"
                            variant="grey"
                            rounded={true}
                          />
                        </label>
                      )}
                      {/* <SideMenu
                        id={`${item.Subject}+${index}`}
                        title="Tags"
                        body={<SideMenuBodyForTags tags={item.Tags} />}
                      /> */}
                    </div >
                  </div >
                  <SideMenu id={`${item.Subject}+${index}`} title="Tags">
                    <div className="p-4">
                      <div className="py-4">
                        {item.Tags &&
                          item.Tags.map((item, r) => (
                            <div key={r} className="inline-block mr-2 mb-3">
                              <div className="flex gap-1 border border-jg-metal-500 rounded-full items-center px-2 py-1 cursor-pointer text-[13px] text-jg-metal-500 capitalize">
                                {item}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </SideMenu>
                  {/* {text part end} */}
                </div >
                {/* {first part end} */}

                {/* {middle part start} */}
                {
                  item.Status === EmailStatus.SENT ? (
                    <div className="w-full max-w-sm truncate">
                      <h5 className="text-[13px] text-jg-green-500">
                        <Link
                          to={`?activityType=0&segmentTitle=${item.SegmentName}&segmentId=${item.SegmentId}&emailId=${item.EmailId}&title=${item.RecipientCount} Contacts, ${item.DroppedCount} Dropped`}
                        >
                          {`${item.RecipientCount} Contacts, ${item.DroppedCount} Dropped`}
                        </Link>
                      </h5>
                      <div className="truncate text-xs text-jg-metal-500" title={item.SegmentName}>
                        {item.SegmentName}
                      </div>
                    </div>
                  ) : item.Status === EmailStatus.SENDING ? (
                    <div className="w-full max-w-sm truncate">
                      <h5 className="text-[13px] text-jg-green-500">{item.QueuedCount} Queued</h5>
                      <div className="truncate text-xs text-jg-metal-500" title={item.SegmentName}>
                        {item.SegmentName}
                      </div>
                    </div>
                  ) : (
                    <div
                      className="w-full max-w-sm truncate"
                      onClick={() => onRecipientClick(item.SegmentId, item.SegmentName)}
                    >
                      <h5 className="text-[13px] text-jg-green-500">View Segment</h5>
                      <div className="truncate text-xs text-jg-metal-500" title={item.SegmentName}>
                        {item.SegmentName}
                      </div>
                    </div>
                  )
                }
                {/* {middle part end} */}

                {/* {last part start} */}
                <div className="lg:flex gap-x-4 sm:gap-y-0 gap-y-2 justify-end w-full lg:pt-0 pt-3">
                  <div className="flex lg:justify-end sm:gap-x-5 gap-x-10 w-full mr-2 mb-2 lg:mb-0">
                    {(item.Status === EmailStatus.SENT || item.Status === EmailStatus.SENDING) && (
                      <>
                        <ActivityClickItem
                          activityType={ActivityType.DELIVERY}
                          deliveryCount={item.DeliveryCount}
                          title={'Delivered'}
                          emailId={item.EmailId}
                          icon={<EmailCheck fill="#455A64" height={16} width={16} />}
                          segmentName={item.SegmentName}
                          segmentId={item.SegmentId}
                        />
                        {
                          (jgPackage === 'pro' || club?.entityType === null) &&
                          <ActivityClickItem
                            activityType={ActivityType.OPEN}
                            deliveryCount={item.OpenCount}
                            title={'Opens'}
                            emailId={item.EmailId}
                            icon={<EmailOpen fill="#455A64" height={16} width={16} />}
                            segmentName={item.SegmentName}
                            segmentId={item.SegmentId}
                          />
                        }

                        {
                          (jgPackage === 'pro' || club?.entityType === null) &&
                          <ActivityClickItem
                            activityType={ActivityType.CLICK}
                            deliveryCount={item.ClickCount}
                            title={'Clicks'}
                            emailId={item.EmailId}
                            icon={<CursorDefaultClick fill="#455A64" height={16} width={16} />}
                            segmentName={item.SegmentName}
                            segmentId={item.SegmentId}
                          />
                        }
                      </>
                    )}
                  </div>
                  <div className="flex items-center justify-start lg:justify-end lg:pr-5 pr-2 lg:pt-0 pt-2">
                    <JustGoDropdown
                      options={
                        item.Status === EmailStatus.SENT || item.Status === EmailStatus.SENDING
                          ? (jgPackage === 'pro' || club?.entityType === null) ? [
                            {
                              icon: <TextBoxOutline width={12} height={12} className="mr-2" />,
                              title: 'Report',
                              action: () => onEmailReportClick(item.EmailId),
                            },
                            {
                              icon: <EmailNewsletter width={12} height={12} className="mr-2" />,
                              title: 'View Email',
                              action: () => onEmailClick(item.EmailId),
                            },
                            {
                              icon: <ContentCopy width={12} height={12} className="mr-2" />,
                              title: 'Copy',
                              action: async () => {
                                await onDuplicateClick(item.EmailId)
                              },
                            },
                          ] : [
                            {
                              icon: <EmailNewsletter width={12} height={12} className="mr-2" />,
                              title: 'View Email',
                              action: () => onEmailClick(item.EmailId),
                            },
                            {
                              icon: <ContentCopy width={12} height={12} className="mr-2" />,
                              title: 'Copy',
                              action: async () => {
                                await onDuplicateClick(item.EmailId)
                              },
                            },
                          ]
                          : [
                            {
                              icon: <EmailEditOutline width={12} height={12} className="mr-2" />,
                              title: 'Edit',
                              action: () => handleEditClick(item.EmailId),
                            },
                            {
                              icon: <EmailNewsletter width={12} height={12} className="mr-2" />,
                              title: 'View Email',
                              action: () => onEmailClick(item.EmailId),
                            },
                            {
                              icon: <ContentCopy width={12} height={12} className="mr-2" />,
                              title: 'Copy',
                              action: async () => {
                                await onDuplicateClick(item.EmailId)
                              },
                            },
                            {
                              icon: <TrashCan width={12} height={12} className="mr-2" />,
                              title: 'Delete',
                              action: () => {
                                onDeleteClick(item.EmailId)
                              },
                            },
                          ]
                      }
                    />
                    <JGDialog
                      open={dialogOpen}
                      setOpen={setDialogOpen}
                      title="Delete Email"
                      body={
                        <div className="w-full flex-col align-middle justify-center pt-3">
                          <p className="p-2">Are you sure you want to delete this email?</p>
                          <div className="pt-3 flex justify-center gap-[20px]">
                            <Button
                              btnColor="primary"
                              btnSize="md"
                              fillType="solid"
                              iconPosition="left"
                              text="Delete"
                              onClick={confirmClick}
                            />
                            <Button
                              btnColor="primary"
                              btnSize="md"
                              fillType="outline"
                              iconPosition="left"
                              text="Cancel"
                              onClick={() => setDialogOpen(false)}
                            />
                          </div>
                        </div>
                      }
                    />
                  </div>
                </div>
                {/* {last part end} */}
              </div >
              {
                item.SendStatus === 5 &&
                <>
                  <div className='flex ml-4 mt-2'><EmailCross className='text-jg-red-500 mt-1' /> <p className='text-[13px] text-jg-metal-400 underline-offset-8'>Sending failed due to insufficient email credits, please</p> <p className='ml-1 mr-1 text-jg-green-500' onClick={() => setOpen(true)}>Click Here</p> <p className='text-1 text-jg-metal-400'> to purchase an email bundle.</p></div>

                  <Modal
                    open={open}
                    setOpen={setOpen}
                    titleSection={<TitleSection />}
                    bodySection={<ShoppingCartProvider>
                      <BodySection />
                    </ShoppingCartProvider>}
                    actionButtons={<ButtonSection />}
                    showActionBtn={true}
                  />
                </>
              }
            </div >
          ))}
        </>
      )
      }
    </>
  )
}

export default EmailsListItem
