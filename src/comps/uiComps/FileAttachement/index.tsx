import IconWithText from '@comps/uiComps/FileAttachement/IconWithText'
import { IsBlended } from '@jg/_core/Authorization'
import { getCookie } from '@jg/_core/services/cookies'
import { ReactComponent as CrossIcon } from '@jg/assets/images/CrossIcon.svg'
import AppStore from '@jg/store/store'
import axios from 'axios'
import classNames from 'classnames'
import { FieldArray } from 'formik'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Attachments from '../Icons/SVG/Attachments'
import CloseIcon from '../Icons/SVG/closeIcon'
import SideMenu from './sideMenu'
type fileType = {
  EmailAttachmentId: number
  EmailId: number
  FileName: string
  FileSize: number
}

type FileAttachmentProps = {
  files: fileType[]
  setFieldValue: any
  hideBorder?: boolean
}

const FileAttachment = ({ files, setFieldValue, hideBorder }: FileAttachmentProps) => {
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const BaseAppPath = AppStore.getState().BaseAppPath
  const onDrop = useCallback(
    async (acceptedFiles: any) => {
      // Do something with the files
      await setIsUploading(true)
      if (Array.isArray(acceptedFiles) && acceptedFiles.length > 0) {
        acceptedFiles.forEach((item, i) => {
          const formData = new FormData()
          formData.append('t', 'emailandcommunicationattachments')
          formData.append('p', 'dropzone')
          formData.append('p1', 'USE_TEMP')
          formData.append('p2', '')
          formData.append('p3', '')
          formData.append('file', item)

          axios({
            method: 'post',
            url: BaseAppPath + (IsBlended() ? 'store/Upload' : 'store/UploadR'),
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data', Cookie: getCookie('username') },
          })
            .then(function (response) {
              //handle success
              setFieldValue(`Attachments[${i + files.length}]`, {
                EmailAttachmentId: 0,
                EmailId: 0,
                FileName: response.data,
              })
              acceptedFiles.length === i + 1 && setIsUploading(false)
            })
            .catch(function (response) {
              //handle error
              console.log('error', response)
            })
        })
      }
    },
    [files && files.length]
  )

  const { getRootProps, getInputProps, acceptedFiles, fileRejections } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/gif': [],
      'video/mp4': [],
      'video/mp3': [],
      'audio/wave': [],
      'audio/wav': [],
      'audio/x-wav': [],
      'audio/x-pn-wav': [],
      'audio/webm': [],
      'video/webm': [],
      'application/pdf': [],
      'application/x-pdf': [],
      'application/rtf': ['.rtf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats': ['.docx'],
      'application/vnd.ms-excel': ['.xlsx', '.xls'],
      'application/vnd.ms-powerpoint': ['.pptx', '.ppt'],
      'application/zip': [],
      'text/plain': ['.txt'],
      'text/csv': ['.csv'],
    },
    onDrop,
  })

  return (
    <FieldArray
      name="Attachments"
      render={(arrayHelpers: any) => (
        <>
          <div className={classNames('w-full h-full', hideBorder ? '' : 'ring-1 ring-jg-metal-50')}>
            <div className="p-2 md:p-4 border-b border-Neutral-100 flex items-center w-full gap-x-2 md:gap-x-4">
              <div className="" {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="cursor-pointer">
                  <IconWithText
                    icon={<Attachments />}
                    text={isUploading ? 'Uploading...' : 'Attachment'}
                    flexDirection={'flex items-center gap-x-1'}
                    txtColor={''}
                  />
                </div>
              </div>
              {/* for large device */}
              <div className="hidden lg:flex visible gap-x-3">
                {files &&
                  files.length > 0 &&
                  files.slice(0, 5).map((item: fileType, index: number) => (
                    <div
                      className="border flex gap-3 border-jg-metal-100 rounded-full items-center px-2 md:mb-0 mb-2 md:mr-0 mr-2"
                      key={index}
                    >
                      <div>
                        {item && (
                          <>
                            <a
                              target="_blank"
                              rel="noreferrer"
                              title={item.FileName}
                              href={
                                item.EmailId === 0
                                  ? BaseAppPath + item.FileName
                                  : `${BaseAppPath}store/download?f=${item.FileName}&t=emailandcommunicationattachments&p=${item.EmailId}&p1=${item.EmailAttachmentId}&p2=null&p3=null`
                              }
                              download
                              className={`text-center font-inter text-[12px]  font-semibold text-jg-metal-500`}
                            >
                              {item.EmailId === 0 ? item.FileName && item.FileName.split('$_')[1] : item.FileName}
                            </a>
                          </>
                        )}
                      </div>

                      <div
                        className={`flex justify-end text-jg-metal-500 cursor-pointer`}
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        <CrossIcon />
                      </div>
                    </div>
                  ))}

                {files && files.length > 5 && (
                  <div className="border border-jg-metal-100 rounded-full inline-block">
                    <label htmlFor="FileAttachementList">
                      <span className="cursor-pointer font-medium flex items-center text-[13px] gap-1 justify-center text-jg-metal-500 px-2">
                        <span className="text-base">{`${files.length - 5} +`}</span>
                      </span>
                    </label>
                    <SideMenu id={'FileAttachementList'} title={'File Attachement List'}>
                      <>
                        <div className="p-4">
                          {files &&
                            files.length > 0 &&
                            files.map((item: fileType, index: number) => (
                              <div key={index} className="inline-block mr-2 mb-3">
                                <div className="flex gap-1 border border-jg-metal-500 peer-checked:text-[#4CAF4F]  peer-checked:bg-[#E8F5E9] peer-checked:border-[#A5D6A7] rounded-full items-center px-2 py-1 cursor-pointer text-[13px] text-jg-metal-500 capitalize">
                                  <div>
                                    {item && (
                                      <a
                                        target="_blank"
                                        rel="noreferrer"
                                        title={item.FileName}
                                        href={
                                          item.EmailId === 0
                                            ? BaseAppPath + item.FileName
                                            : `${BaseAppPath}store/download?f=${item.FileName}&t=emailandcommunicationattachments&p=${item.EmailId}&p1=${item.EmailAttachmentId}&p2=null&p3=null`
                                        }
                                        download
                                        className={`text-center font-inter text-[14px]  font-semibold text-jg-metal-500`}
                                      >
                                        {item.EmailId === 0
                                          ? item.FileName && item.FileName.split('$_')[1]
                                          : item.FileName}
                                      </a>
                                    )}
                                  </div>

                                  <div
                                    className={`flex justify-endcursor-pointer`}
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    <CloseIcon width={16} height={16} />
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </>
                    </SideMenu>
                  </div>
                )}
              </div>

              {/* for 768px device */}
              <div className="hidden lg:hidden sm:flex visible gap-x-3">
                {files &&
                  files.length > 0 &&
                  files.slice(0, 3).map((item: fileType, index: number) => (
                    <div
                      className="border flex gap-3 border-jg-metal-100 rounded-full items-center px-2 md:mb-0 mb-2 md:mr-0 mr-2"
                      key={index}
                    >
                      <div>
                        {item && (
                          <>
                            <a
                              target="_blank"
                              rel="noreferrer"
                              title={item.FileName}
                              href={
                                item.EmailId === 0
                                  ? BaseAppPath + item.FileName
                                  : `${BaseAppPath}store/download?f=${item.FileName}&t=emailandcommunicationattachments&p=${item.EmailId}&p1=${item.EmailAttachmentId}&p2=null&p3=null`
                              }
                              download
                              className={`text-center font-inter text-[14px]  font-semibold text-jg-metal-500`}
                            >
                              {item.EmailId === 0 ? item.FileName && item.FileName.split('$_')[1] : item.FileName}
                            </a>
                          </>
                        )}
                      </div>

                      <div
                        className={`flex justify-end text-jg-metal-500 cursor-pointer`}
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        <CrossIcon />
                      </div>
                    </div>
                  ))}

                {files && files.length > 3 && (
                  <div className="border border-jg-metal-100 rounded-full inline-block">
                    <label htmlFor="FileAttachementListIpad">
                      <span className="cursor-pointer font-medium flex items-center text-[13px] gap-1 justify-center text-jg-metal-500 px-2">
                        <span className="text-base">{`${files.length - 3} +`}</span>
                      </span>
                    </label>
                    <SideMenu id={'FileAttachementListIpad'} title={'File Attachement List'}>
                      <>
                        <div className="p-4">
                          {files &&
                            files.length > 0 &&
                            files.map((item: fileType, index: number) => (
                              <div key={index} className="inline-block mr-2 mb-3">
                                <div className="flex gap-1 border border-jg-metal-500 peer-checked:text-[#4CAF4F]  peer-checked:bg-[#E8F5E9] peer-checked:border-[#A5D6A7] rounded-full items-center px-2 py-1 cursor-pointer text-[13px] text-jg-metal-500 capitalize">
                                  <div>
                                    {item && (
                                      <a
                                        target="_blank"
                                        rel="noreferrer"
                                        title={item.FileName}
                                        href={
                                          item.EmailId === 0
                                            ? BaseAppPath + item.FileName
                                            : `${BaseAppPath}store/download?f=${item.FileName}&t=emailandcommunicationattachments&p=${item.EmailId}&p1=${item.EmailAttachmentId}&p2=null&p3=null`
                                        }
                                        download
                                        className={`text-center font-inter text-[14px]  font-semibold text-jg-metal-500`}
                                      >
                                        {item.EmailId === 0
                                          ? `${item.FileName && item.FileName.split('$_')[1]}`
                                          : item.FileName}
                                      </a>
                                    )}
                                  </div>

                                  <div
                                    className={`flex justify-endcursor-pointer`}
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    <CloseIcon width={16} height={16} />
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </>
                    </SideMenu>
                  </div>
                )}
              </div>

              {/* for mobile only */}
              <div className="sm:hidden flex">
                {files &&
                  files.length > 0 &&
                  files.slice(0, 1).map((item: fileType, index: number) => (
                    <div
                      className="border flex gap-3 border-jg-metal-100 rounded-full items-center px-2 mr-2"
                      key={index}
                    >
                      <div>
                        {item && (
                          <a
                            target="_blank"
                            rel="noreferrer"
                            title={item.FileName}
                            href={
                              item.EmailId === 0
                                ? BaseAppPath + item.FileName
                                : `${BaseAppPath}store/download?f=${item.FileName}&t=emailandcommunicationattachments&p=${item.EmailId}&p1=${item.EmailAttachmentId}&p2=null&p3=null`
                            }
                            download
                            className={`text-center font-inter text-[12px]  font-semibold text-jg-metal-500`}
                          >
                            {item.EmailId === 0 ? `${item.FileName && item.FileName.split('$_')[1]}` : item.FileName}
                          </a>
                        )}
                      </div>

                      <div
                        className={`flex justify-end text-jg-metal-500 cursor-pointer`}
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        <CrossIcon />
                      </div>
                    </div>
                  ))}

                {files && files.length > 1 && (
                  <div className="border flex gap-3 border-jg-metal-100 rounded-full items-center px-2 mr-2">
                    <label htmlFor="FileAttachementListMobile">
                      <span className="cursor-pointer font-medium flex items-center text-[13px] gap-1 justify-center text-jg-metal-500">
                        {`${files.length - 1} +`}
                      </span>
                    </label>
                    <SideMenu id={'FileAttachementListMobile'} title={'File Attachement List'}>
                      <>
                        <div className="p-4">
                          {files &&
                            files.length > 0 &&
                            files.map((item: fileType, index: number) => (
                              <div key={index} className="inline-block mr-2 mb-3">
                                <div className="flex gap-1 border border-jg-metal-500 peer-checked:text-[#4CAF4F]  peer-checked:bg-[#E8F5E9] peer-checked:border-[#A5D6A7] rounded-full items-center px-2 py-1 cursor-pointer text-[13px] text-jg-metal-500 capitalize">
                                  <div>
                                    {item && (
                                      <a
                                        target="_blank"
                                        rel="noreferrer"
                                        title={item.FileName}
                                        href={
                                          item.EmailId === 0
                                            ? BaseAppPath + item.FileName
                                            : `${BaseAppPath}store/download?f=${item.FileName}&t=emailandcommunicationattachments&p=${item.EmailId}&p1=${item.EmailAttachmentId}&p2=null&p3=null`
                                        }
                                        download
                                        className={`text-center font-inter text-[12px]  font-semibold text-jg-metal-500`}
                                      >
                                        {item.EmailId === 0
                                          ? `${item.FileName && item.FileName.split('$_')[1]}`
                                          : item.FileName}
                                      </a>
                                    )}
                                  </div>

                                  <div
                                    className={`flex justify-endcursor-pointer`}
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    <CloseIcon width={16} height={16} />
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </>
                    </SideMenu>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    />
  )
}

export default FileAttachment
