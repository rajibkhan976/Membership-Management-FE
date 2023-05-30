import { useDropzone } from 'react-dropzone'
import axios from 'axios'
import { memo, useCallback, useState } from 'react'
import { IsBlended } from '@jg/_core/Authorization'
import { DocumentIcon, XIcon } from '@heroicons/react/solid'
import ProgressBar from './ProgressBar'

type AttachemtItem = {
  id: number
  status: 'pending' | 'completed' | 'error'
  name: string
  src: string
}

type DropzoneProps = {
  basePath: string
  attachmentType?: string
  numberOfAttachment?: string
  onAdd: (item: any) => void
  onComplete: (item: any) => void
}

function DZFilePicker(props: DropzoneProps) {
  const { onAdd, onComplete, basePath, attachmentType, numberOfAttachment } = props
  const [errorMsg, setErrorMsg] = useState<string>('')

  const onDropRejected = useCallback((fileRejections: any) => {
    if (fileRejections) {
      setErrorMsg('Maximum number of file limit exceeded')
    }
  }, [])

  const onDrop = useCallback(async (acceptedFiles: any) => {
    if (Array.isArray(acceptedFiles) && acceptedFiles.length > 0) {
      setErrorMsg('')
      acceptedFiles.forEach((item, i) => {
        const formData = new FormData()
        formData.append('t', 'fieldmanagementattach')
        formData.append('p', 'dropzone')
        formData.append('p1', 'USE_TEMP')
        formData.append('file', item)

        const id = new Date().getTime()

        onAdd({ id, item })

        axios({
          method: 'post',
          url: basePath + (IsBlended() ? 'store/Upload' : 'store/UploadR'),
          data: formData,
        })
          .then(function (response) {
            //   console.log('response', response.data)
            onComplete({ id, response })
          })
          .catch(function (response) {
            //handle error
            //  console.log('error', response)
          })
      })
    }
  }, [])

  const dropZonePropsObj = (() => {
    const dropZoneProps = { onDrop, onDropRejected }
    if (attachmentType) {
      Object.assign(dropZoneProps, { accept: { [`${attachmentType}/*`]: [] } })
    }
    if (numberOfAttachment) {
      console.log(Number(numberOfAttachment?.split('-')[numberOfAttachment?.split('-')?.length - 1]))
      Object.assign(dropZoneProps, {
        maxFiles: Number(numberOfAttachment?.split('-')[numberOfAttachment?.split('-')?.length - 1]),
      })
    }
    return dropZoneProps
  })()

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone(dropZonePropsObj)
  const attachmentFieldPlaceHolder = 'Drag file(s) here or click to upload'

  return (
    <section className="container">
      {errorMsg && (
        <div className="flex justify-between items-center p-2 mb-2 rounded-sm hover:bg-jg-red-50">
          <div className="text-jg-red-500">{errorMsg}</div>
          <XIcon
            className="h-5 w-5 cursor-pointer border-2 border-jg-red-300 text-jg-red-300 rounded-full"
            onClick={() => setErrorMsg('')}
          />
        </div>
      )}
      <div
        {...getRootProps({
          className: 'dropzone border border-dotted p-2 bg-jg-grey-100 font-sm text-center',
        })}
      >
        <input {...getInputProps()} />
        <p>{attachmentFieldPlaceHolder}</p>
      </div>
    </section>
  )
}

type AttachmentPickerProps = {
  basePath: string
  attachmentType?: string
  numberOfAttachment?: string
  onCompleted: (arg: { path: string; name: string }) => void
}

const FastDZFilePicker = memo(DZFilePicker)

const AttachmentPicker = (props: AttachmentPickerProps) => {
  const { onCompleted, basePath, attachmentType, numberOfAttachment } = props
  const [list, setList] = useState<AttachemtItem[]>([])

  return (
    <>
      {list.map((e) => {
        return (
          <>
            {e.status === 'pending' && (
              <div className="flex items-center px-1 py-2 mb-2 rounded-sm hover:bg-jg-metal-50">
                <DocumentIcon className="w-5 h-5 mr-1 text-jg-green-500" />
                <a className="w-7/12 items-center truncate pr-1.5 text-sm" href={e.src}>
                  {e.name}
                </a>
                <ProgressBar baseClass="w-4/12" />
              </div>
            )}
          </>
        )
      })}
      <FastDZFilePicker
        basePath={basePath}
        attachmentType={attachmentType}
        numberOfAttachment={numberOfAttachment}
        onAdd={(item) => {
          // console.log('onadd', item)
          setList((arr) => [...arr, { id: item.id, status: 'pending', name: item.item.name, src: '' }])
        }}
        onComplete={(item) => {
          console.log('onComplete 0', item)

          setList((arr) => {
            for (let i = 0; i < arr.length; i++) {
              if (arr[i].id === item.id) {
                if (item.response.status === 200 && arr[i].status !== 'completed') {
                  arr[i].src = item.response.data
                  arr[i].status = 'completed'
                  console.log('onCompleted')
                  onCompleted({ path: item.response.data, name: arr[i].name })
                } else arr[i].status = 'error'

                break
              }
            }
            return [...arr]
          })
        }}
      />
    </>
  )
}

export default AttachmentPicker
