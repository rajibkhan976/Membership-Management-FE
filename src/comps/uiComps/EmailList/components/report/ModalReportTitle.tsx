import { useEmailReport } from '@jg/widgets/EmailAndCom/store/EmailReportStore'

const ModalReportTitle = () => {
  const { isLoading } = useEmailReport((state: any) => state)
  return (
    <>
      {!isLoading && (
        <div className="flex justify-between items-center p-4">
          <p className="text-[14px] text-jg-metal-700 font-bold">View Reports</p>
        </div>
      )}
    </>
  )
}

export default ModalReportTitle
