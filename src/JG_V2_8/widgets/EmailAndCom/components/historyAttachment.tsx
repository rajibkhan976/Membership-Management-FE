import AppStore from "@jg/store/store"
import { report } from "@jg/utils/ParentalServices"
import { useWidgetContext } from "jg-widget"
import { useEffect, useState } from "react"
type HistoryAttachemntProp = {
    path: string
}

const HistoryAttachemnt = ({ path }: HistoryAttachemntProp) => {
    const BaseAppPath = AppStore.getState().BaseAppPath
    const [fileName, setFileName] = useState<string>('')
    const [reportPath, setReportPath] = useState<string>('')
    useEffect(() => {
        if (path.includes('t=repoattach')) {
            setFileName(path.split('__')[1])
        } else if (path.includes('t=correspondentattachments')) {
            setFileName(path.split('_$_')[1])
        } else if (path.startsWith('$/')) {
            if (path.toLocaleLowerCase().startsWith('$/core reports/')) {
                const reportNameArry = path.split('/')
                const reportModule = reportNameArry[3]
                const reportType = reportNameArry[4]
                const perameter = reportNameArry[5].split('?')[1].split(';')[0].replaceAll('=', '|').replaceAll('&', ';')
                const downloadUrl = BaseAppPath + 'Report.mvc/GetStandardOutputReport?reportModule=' + reportModule + '&format=PDF&reportType=' + reportType + '&reportParameters=' + perameter + ';'
                setReportPath(downloadUrl)
            } else {
                const fullPath = path.split('$')
                const fullPathWithParameter = fullPath[1].split('?')
                const reportPath = fullPathWithParameter[0]
                const reportName = reportPath.split('/')[reportPath.split('/').length - 1]
                const parameterWithType = fullPathWithParameter[1].split(';')
                const perameter = parameterWithType[0].replaceAll('=', '|').replaceAll('&', ';')
                const type = parameterWithType[1]
                const token = ''

                const downloadUrl1 = BaseAppPath + 'Report.mvc/PrintReport?tokenValue=' + token + '&path=' + reportPath + '&format=' + type + '&reportParameters=' + perameter + ';&reportName=' + reportName
                setReportPath(downloadUrl1)
            }
            const splitValue = path.split('?')[0].split('/')
            const splitExtention = path.split(';')
            setFileName(splitValue[splitValue.length - 1] + "." + splitExtention[1])
        } else {
            setFileName(path.split('f=')[1].split('&t=')[0])
        }
    }, [path])

    return (
        <>
            {
                reportPath === '' ?
                    <a
                        download
                        href={path}
                        className="flex gap-1 border border-jg-metal-500 peer-checked:text-[#4CAF4F]  peer-checked:bg-[#E8F5E9] peer-checked:border-[#A5D6A7] rounded-full items-center px-2 py-1 cursor-pointer text-[13px] text-jg-metal-500 capitalize"
                    >
                        {fileName}
                    </a>
                    :
                    <button
                        type="button"
                        onClick={() => report.download(reportPath)}

                        className="flex gap-1 border border-jg-metal-500 peer-checked:text-[#4CAF4F]  peer-checked:bg-[#E8F5E9] peer-checked:border-[#A5D6A7] rounded-full items-center px-2 py-1 cursor-pointer text-[13px] text-jg-metal-500 capitalize"
                    >
                        {fileName}
                    </button>
            }
        </>

    )
}

export default HistoryAttachemnt
