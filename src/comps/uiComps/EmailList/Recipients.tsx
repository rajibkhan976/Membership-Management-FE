import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useRecipientsStore from '@comps/uiComps/SegmentList/store/recipients'
import { Modal } from '@jg/common/comps'
import PreviewBody from '../CreateSegment/PreviewBody'
import RecipientListPlaceholder from './components/RecipientListPlaceholder'

const Recipients = () => {
  const { segmentId, clubDocId, title }: any = useParams()
  const navigate = useNavigate()
  const [open] = useState<boolean>(true)
  const getRecipientsBySegmentId = useRecipientsStore(({ getRecipientsBySegmentId }) => getRecipientsBySegmentId)
  const { setIsLoading, segmentTitle, isLoading, setValueNull } = useRecipientsStore((state) => state)
  console.log(getRecipientsBySegmentId, title)
  useEffect(() => {
    setValueNull()
    segmentId && setIsLoading(true)
    segmentId && clubDocId && getRecipientsBySegmentId(segmentId, title, clubDocId, 1, 30)
  }, [])

  return (
    <>
      <Modal
        open={open}
        setOpen={(isOpen) => {
          if (!isOpen) navigate(-1)
        }}
        titleSection={<ModalTitle />}
        bodySection={
          isLoading ? (
            <div className="w-full">
              {Array.from({ length: 30 }, (v, i) => (
                <div key={i}>
                  <RecipientListPlaceholder />
                </div>
              ))}
            </div>
          ) : (
            <PreviewBody title={title} />
          )
        }
        showActionBtn={false}
      />
    </>
  )
}

const ModalTitle = () => {
  return (
    <div className="flex justify-between items-center p-4">
      <p className="text-[14px] text-jg-metal-700 font-bold">Segment Preview</p>
    </div>
  )
}

export default Recipients
