import React, { useEffect, useRef, useState } from 'react'
import EmailEditor, { EditorRef } from 'react-email-editor'
type EmailTemplateEditorProps = {
  templateId: number | undefined
  jsonValue?: string
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
  setTemplateEdited?: (b: boolean) => void
  generateTemplateImageRef?: React.MutableRefObject<(() => Promise<string>) | undefined>
  isTemplate?: boolean
}
const EmailTemplateEditor = ({
  templateId,
  jsonValue,
  setFieldValue,
  setTemplateEdited,
  generateTemplateImageRef,
  isTemplate = false,
}: EmailTemplateEditorProps) => {
  const emailEditorRef = useRef<EditorRef | null>(null)
  const [isTemplateReady, setTemplateReady] = useState(false)

  useEffect(() => {
    if (generateTemplateImageRef && !generateTemplateImageRef.current) {
      generateTemplateImageRef.current = getImageUrl
    }
  }, [generateTemplateImageRef])

  useEffect(() => {
    emailEditorRef.current?.editor?.loadDesign(jsonValue ? JSON.parse(jsonValue) : undefined)
  }, [templateId, isTemplateReady])

  useEffect(() => {
    isTemplate && exportHtml()
  }, [isTemplate])

  const onReady = async () => {
    setTemplateReady(true)
    emailEditorRef.current?.editor?.addEventListener('design:updated', (_data) => {
      exportHtml()
    })
  }

  const toolsConfig = {
    social: {
      enabled: true,
    },
    video: {
      enabled: true,
    },
  }

  const exportHtml = () => {
    emailEditorRef.current?.editor?.exportHtml((data) => {
      const { design, html } = data
      setFieldValue('Body', html)
      setFieldValue('BodyInJson', JSON.stringify(design))
      Number.isInteger(templateId) && setTemplateEdited?.(true)
    })
  }

  const getImageUrl = () =>
    new Promise<string>((resolve) => {
      emailEditorRef.current?.editor?.exportImage(
        (data) => {
          const imageUrl = data.url
          resolve(imageUrl)
        },
        // @ts-ignore
        { fullPage: false }
      )
    })

  return (
    <div className="flex flex-col relative">
      <React.StrictMode>
        <div className="w-full border-t">
          <EmailEditor
            style={{
              minHeight: 'calc(100vh - 50vh)',
            }}
            ref={emailEditorRef}
            // onLoad={onLoad} // This is deprecated
            onReady={onReady}
            projectId={108688}
            options={{
              customJS: [],
              customCSS: [
                `.blockbuilder-preview.editor-desktop {
                    width:auto;}
                `,
              ],
              mergeTags: [
                {
                  name: 'LoginId',
                  value: '#LoginId',
                },
                {
                  name: 'FirstName',
                  value: '#FirstName',
                },
                {
                  name: 'LastName',
                  value: '#LastName',
                },
                {
                  name: 'Mobile',
                  value: '#Mobile',
                },
                {
                  name: 'LastPasswordUpdateDate',
                  value: '#LastPasswordUpdateDate',
                },
                {
                  name: 'EmailAddress',
                  value: '#EmailAddress',
                },
                {
                  name: 'DOB',
                  value: '#DOB',
                },
                {
                  name: 'Gender',
                  value: '#Gender',
                },
                {
                  name: 'Address1',
                  value: '#Address1',
                },
                {
                  name: 'Address2',
                  value: '#Address2',
                },
                {
                  name: 'Address3',
                  value: '#Address3',
                },
                {
                  name: 'Town',
                  value: '#Town',
                },
                {
                  name: 'County',
                  value: '#County',
                },
                {
                  name: 'Country',
                  value: '#Country',
                },
                {
                  name: 'PostCode',
                  value: '#PostCode',
                },
                {
                  name: 'JoiningDate',
                  value: '#JoiningDate',
                },
                {
                  name: 'MID',
                  value: '#MID',
                },
              ],
            }}
            tools={toolsConfig}
          />
        </div>
        <div className="flex aligns-center justify-end gap-[8px] py-[10px]"></div>
      </React.StrictMode>
    </div>
  )
}

export default React.memo(EmailTemplateEditor)
