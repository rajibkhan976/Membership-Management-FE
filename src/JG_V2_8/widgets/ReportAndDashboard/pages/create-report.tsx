import CreateReport from '@jg/widgets/ReportAndDashboard/CreateReport/CreateReport'
import { Link } from 'react-router-dom'
import { ArrowLeftIcon } from '@heroicons/react/solid'
import { useWidgetContext } from 'jg-widget'

const CreateReportMain = () => {
  const { basePath } = useWidgetContext()

  return (
    <div className="w-full">
      <div className="w-4/5 mx-auto min-h-[calc(100vh-175px)] border">
        <div className="px-2 flex justify-between items-center space-x-4 p-3 border-b">
          <Link to={basePath} className="inline-block cursor-pointer">
            <ArrowLeftIcon className="w-6 h-6 inline-block text-jg-green-700" />
            <span className="ml-2 align-middle text-jg-metal-700 text-[14px] font-semibold">{'Create a Report'}</span>
          </Link>
        </div>
        <CreateReport />
      </div>
    </div>
  )
}

export default CreateReportMain
