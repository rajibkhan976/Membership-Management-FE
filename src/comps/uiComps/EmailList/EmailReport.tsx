import { Modal } from '@jg/common/comps'
import { useEffect, useState } from 'react'
import { useEmailReport } from '@jg/widgets/EmailAndCom/store/EmailReportStore'
import { useNavigate, useParams } from 'react-router-dom'
import ModalReportTitle from '@comps/uiComps/EmailList/components/report/ModalReportTitle'
import BodyReportSection from '@comps/uiComps/EmailList/components/report/BodyReportSection'

const EmailReport = () => {
  const [openReport] = useState<boolean>(true)
  const { setLoadingStatus, fetch: fetchReport } = useEmailReport((state) => state)
  const navigate = useNavigate()
  const { id } = useParams()
  useEffect(() => {
    setLoadingStatus(true)
    fetchReport(id)
  }, [fetchReport, id, setLoadingStatus])
  return (
    <div>
      <Modal
        open={openReport}
        setOpen={(isOpen) => {
          if (!isOpen) navigate(-1)
        }}
        titleSection={<ModalReportTitle />}
        bodySection={<BodyReportSection />}
        showActionBtn={false}
      />
    </div>
  )
}

export default EmailReport
