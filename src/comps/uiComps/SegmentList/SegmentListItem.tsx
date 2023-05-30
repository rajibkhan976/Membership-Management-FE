import { TrashCan } from '@comps/uiComps/Icons'
import type { ListItemProps } from '@comps/uiComps/SegmentList/types'
import call from '@jg/_core/services/data/LegacyDataService'
import { useWidgetContext } from 'jg-widget'
import { useCallback, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../Button/Button'
import JGDialog from '../Dialog/Dialog'
import JustGoSplitButton from '../Dropdown/JustGoSplitButton'
import ArchiveIcon from '../Icons/SVG/ArchiveIcon'
import CreateEmail from '../Icons/SVG/CreateEmail'
import EditIcon from '../Icons/SVG/EditIcon'
import PreviewIcon from '../Icons/SVG/PreviewIcon'
import { useSegmentDeleteStore, useSegmentsStore } from './store/segments'
import { useSegmentPaginationStore } from './store/segmentsPagination'

const ListItem = ({ item, classes }: ListItemProps) => {
  const { clubDocId } = useParams()
  const navigate = useNavigate()
  const { basePath } = useWidgetContext()
  const [deleteId, setDeleteId] = useState<number>()
  const [dialogOpen, setDialogOpen] = useState<boolean>()
  const { deleteSegment } = useSegmentDeleteStore((state: any) => state)
  const { getSegments, isArchive } = useSegmentsStore((state: any) => state)
  const { pageNumber, numberOfRows } = useSegmentPaginationStore((state: any) => state)

  const handleSegmentItemClick = (id: number, title: string, oei: number) => {
    navigate(`${basePath + clubDocId + '/segment/' + id + '/' + title}?oei=${oei}`)
  }

  const handleEditClick = () => {
    navigate(`${basePath}${clubDocId}/segment/edit/${item.SegmentId}`)
  }

  const handleNewMailWithSegment = () => {
    navigate(`${basePath}${clubDocId}/emails/compose?SegmentId=${item.SegmentId}&Title=${item.Title}`)
  }

  const handleDeleteClick = useCallback(
    (id: number) => {
      setDialogOpen(true)
      setDeleteId(id)
    },
    [deleteId]
  )

  const changeSegmentStatus = async (id: number, status: number) => {
    await call(
      ['GoMembership/ChangeSegmentStatus'],
      [
        {
          // provider: 'Email',
          Arguments: {
            SegmentId: id,
            SegmentStatus: status,
          },
        },
      ],
      async (response: any) => {
        if (clubDocId) {
          await getSegments(clubDocId, pageNumber, numberOfRows)
        }
      }
    )
  }

  const confirmClick = useCallback(async () => {
    await deleteSegment(deleteId)
    setDialogOpen(false)
    await getSegments(clubDocId, pageNumber, numberOfRows)
  }, [deleteId])

  return (
    <div className={`w-full p-4 grid md:grid-cols-2 grid-cols-1 justify-between ${classes}`}>
      <div className="md:flex gap-8 items-center md:mb-0 mb-2">
        <div className="md:w-96 w-full md:mb-0 mb-2">
          <div
            className="text-sm font-medium text-jg-metal-700 cursor-pointer truncate overflow-hidden w-full"
            onClick={() => handleSegmentItemClick(item.SegmentId, item.Title as string, item.OwningEntityId)}
            title={item.Title}
          >
            {item.Title ? item.Title : <>&nbsp;</>}
          </div>
          <div
            className="text-[13px] font-normal text-jg-metal-500 cursor-pointer truncate overflow-hidden w-full"
            onClick={() => handleSegmentItemClick(item.SegmentId, item.Title as string, item.OwningEntityId)}
            title={item.Description}
          >
            {item.Description ? item.Description : <>&nbsp;</>}
          </div>
        </div>
        <div className="inline-block">
          <div
            className={`text-[13px] leading-4 rounded-full py-1 px-2 border ${
              !item.SegmentStatus
                ? 'bg-jg-green-50 border-jg-green-500 text-jg-green-500'
                : isArchive === 1
                ? 'bg-jg-green-50 border-jg-green-500 text-jg-green-500'
                : 'bg-[#ECEFF1] border-[#CFD8DC]  text-[#CFD8DC]'
            }`}
          >
            {item.SegmentStatus ? 'Archive ' : 'Active'}
          </div>
        </div>
      </div>
      <div className="md:flex justify-end gap-8 items-center">
        <div className="md:flex gap-4">
          <div className="flex cursor-pointer md:mb-0 mb-2">
            <p className="text-[12px] font-semibold text-jg-metal-700">Created By :</p>
            <p className="text-[12px] text-jg-metal-500">{' ' + item.FirstName + ' ' + item.LastName}</p>
          </div>
          <div className="flex cursor-pointer md:mb-0 mb-2">
            <p className="text-[12px] font-semibold text-jg-metal-700">Last Modified :</p>
            <p className="text-[12px] text-jg-metal-500">{item.LastUpdated.toString()}</p>
          </div>
        </div>

        {item.IsUsed ? (
          item.SegmentStatus === 0 ? (
            item.IsEmailActivityBasedSegment === 1 ? (
              <JustGoSplitButton
                options={
                  item.OwningEntityId !== -1
                    ? [
                        {
                          icon: <CreateEmail className="mr-2" />,
                          title: 'Create Email',
                          action: handleNewMailWithSegment,
                        },
                        {
                          icon: <PreviewIcon className="mr-2" />,
                          title: 'Preview',
                          action: () => handleSegmentItemClick(item.SegmentId, item.Title, item.OwningEntityId),
                        },
                        {
                          icon: <ArchiveIcon className="mr-2" />,
                          title: 'Archive',
                          action: () => changeSegmentStatus(item.SegmentId, 1),
                        },
                      ]
                    : [
                        {
                          icon: <CreateEmail className="mr-2" />,
                          title: 'Create Email',
                          action: handleNewMailWithSegment,
                        },
                        {
                          icon: <PreviewIcon className="mr-2" />,
                          title: 'Preview',
                          action: () => handleSegmentItemClick(item.SegmentId, item.Title, item.OwningEntityId),
                        },
                      ]
                }
              />
            ) : (
              <JustGoSplitButton
                options={
                  item.OwningEntityId !== -1
                    ? [
                        {
                          icon: <CreateEmail className="mr-2" />,
                          title: 'Create Email',
                          action: handleNewMailWithSegment,
                        },
                        {
                          icon: <EditIcon className="mr-2" />,
                          title: 'Edit',
                          action: handleEditClick,
                        },
                        {
                          icon: <PreviewIcon className="mr-2" />,
                          title: 'Preview',
                          action: () => handleSegmentItemClick(item.SegmentId, item.Title, item.OwningEntityId),
                        },
                        {
                          icon: <ArchiveIcon className="mr-2" />,
                          title: 'Archive',
                          action: () => changeSegmentStatus(item.SegmentId, 1),
                        },
                      ]
                    : [
                        {
                          icon: <CreateEmail className="mr-2" />,
                          title: 'Create Email',
                          action: handleNewMailWithSegment,
                        },
                        {
                          icon: <PreviewIcon className="mr-2" />,
                          title: 'Preview',
                          action: () => handleSegmentItemClick(item.SegmentId, item.Title, item.OwningEntityId),
                        },
                      ]
                }
              />
            )
          ) : (
            <JustGoSplitButton
              options={
                item.OwningEntityId !== 1
                  ? [
                      {
                        icon: <CreateEmail className="mr-2" />,
                        title: 'Create Email',
                        action: handleNewMailWithSegment,
                      },
                      {
                        icon: <EditIcon className="mr-2" />,
                        title: 'Edit',
                        action: handleEditClick,
                      },
                      {
                        icon: <PreviewIcon className="mr-2" />,
                        title: 'Preview',
                        action: () => handleSegmentItemClick(item.SegmentId, item.Title, item.OwningEntityId),
                      },
                      {
                        icon: <ArchiveIcon className="mr-2" />,
                        title: 'Active',
                        action: () => changeSegmentStatus(item.SegmentId, 0),
                      },
                    ]
                  : [
                      {
                        icon: <CreateEmail className="mr-2" />,
                        title: 'Create Email',
                        action: handleNewMailWithSegment,
                      },
                      {
                        icon: <PreviewIcon className="mr-2" />,
                        title: 'Preview',
                        action: () => handleSegmentItemClick(item.SegmentId, item.Title, item.OwningEntityId),
                      },
                    ]
              }
            />
          )
        ) : item.SegmentStatus === 0 ? (
          item.IsEmailActivityBasedSegment === 1 ? (
            <JustGoSplitButton
              options={
                item.OwningEntityId !== -1
                  ? [
                      {
                        icon: <CreateEmail className="mr-2" />,
                        title: 'Create Email',
                        action: handleNewMailWithSegment,
                      },
                      {
                        icon: <PreviewIcon className="mr-2" />,
                        title: 'Preview',
                        action: () => handleSegmentItemClick(item.SegmentId, item.Title, item.OwningEntityId),
                      },
                      {
                        icon: <ArchiveIcon className="mr-2" />,
                        title: 'Archive',
                        action: () => changeSegmentStatus(item.SegmentId, 1),
                      },
                      {
                        icon: <TrashCan className="mr-2" />,
                        title: 'Delete',
                        action: () => handleDeleteClick(item.SegmentId),
                      },
                    ]
                  : [
                      {
                        icon: <CreateEmail className="mr-2" />,
                        title: 'Create Email',
                        action: handleNewMailWithSegment,
                      },
                      {
                        icon: <PreviewIcon className="mr-2" />,
                        title: 'Preview',
                        action: () => handleSegmentItemClick(item.SegmentId, item.Title, item.OwningEntityId),
                      },
                    ]
              }
            />
          ) : (
            <JustGoSplitButton
              options={
                item.OwningEntityId !== -1
                  ? [
                      {
                        icon: <CreateEmail className="mr-2" />,
                        title: 'Create Email',
                        action: handleNewMailWithSegment,
                      },
                      {
                        icon: <EditIcon className="mr-2" />,
                        title: 'Edit',
                        action: handleEditClick,
                      },
                      {
                        icon: <PreviewIcon className="mr-2" />,
                        title: 'Preview',
                        action: () => handleSegmentItemClick(item.SegmentId, item.Title, item.OwningEntityId),
                      },
                      {
                        icon: <ArchiveIcon className="mr-2" />,
                        title: 'Archive',
                        action: () => changeSegmentStatus(item.SegmentId, 1),
                      },
                      {
                        icon: <TrashCan className="mr-2" />,
                        title: 'Delete',
                        action: () => handleDeleteClick(item.SegmentId),
                      },
                    ]
                  : [
                      {
                        icon: <CreateEmail className="mr-2" />,
                        title: 'Create Email',
                        action: handleNewMailWithSegment,
                      },
                      {
                        icon: <PreviewIcon className="mr-2" />,
                        title: 'Preview',
                        action: () => handleSegmentItemClick(item.SegmentId, item.Title, item.OwningEntityId),
                      },
                    ]
              }
            />
          )
        ) : (
          <JustGoSplitButton
            options={
              item.OwningEntityId !== -1
                ? [
                    {
                      icon: <CreateEmail className="mr-2" />,
                      title: 'Create Email',
                      action: handleNewMailWithSegment,
                    },
                    {
                      icon: <EditIcon className="mr-2" />,
                      title: 'Edit',
                      action: handleEditClick,
                    },
                    {
                      icon: <PreviewIcon className="mr-2" />,
                      title: 'Preview',
                      action: () => handleSegmentItemClick(item.SegmentId, item.Title, item.OwningEntityId),
                    },
                    {
                      icon: <ArchiveIcon className="mr-2" />,
                      title: 'Active',
                      action: () => changeSegmentStatus(item.SegmentId, 0),
                    },
                    {
                      icon: <TrashCan className="mr-2" />,
                      title: 'Delete',
                      action: () => handleDeleteClick(item.SegmentId),
                    },
                  ]
                : [
                    {
                      icon: <CreateEmail className="mr-2" />,
                      title: 'Create Email',
                      action: handleNewMailWithSegment,
                    },
                    {
                      icon: <PreviewIcon className="mr-2" />,
                      title: 'Preview',
                      action: () => handleSegmentItemClick(item.SegmentId, item.Title, item.OwningEntityId),
                    },
                  ]
            }
          />
        )}

        {dialogOpen && (
          <JGDialog
            open={dialogOpen}
            setOpen={setDialogOpen}
            title="Delete Segment"
            // description={new Date().toString().split('(')[1].split(')')[0]}
            body={
              <div className="w-full flex-col align-middle justify-center pt-3">
                <p className="p-2">Are you sure you want to delete this segment?</p>
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
        )}
      </div>
    </div>
  )
}

export default ListItem
