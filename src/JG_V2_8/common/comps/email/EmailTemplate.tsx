import React, { useRef, useEffect } from 'react'
import EmailEditor from 'react-email-editor'
import { template, template2 } from './template'
import thumbnail from './images/compliance.png'
import temp2 from './images/newsletter.png'
import type { EmailTemplatePropTypes } from '@jg/widgets/EmailAndCom/interfaces/interfaces'
import { ResolveClientURL } from '@jg/_core/utils/URL'

const EmailTemplate = ({ onChangeFunction, value, onJsonChangeFunction, jsonValue }: EmailTemplatePropTypes) => {
  const emailEditorRef = useRef<any>(null)

  useEffect(() => {
    jsonValue && onLoad()
  }, [jsonValue])

  const onLoad = () => {
    emailEditorRef.current &&
      emailEditorRef.current.editor &&
      emailEditorRef.current.editor.addEventListener('design:updated', async (optinalData: any) => {
        await emailEditorRef.current.editor.exportHtml(async (data: any) => {
          emailEditorRef.current.editor.loadDesign(jsonValue ? JSON.parse(jsonValue.toString()) : template)
        })
      })
  }

  const loadTemplate = async (id: number) => {
    emailEditorRef.current && emailEditorRef.current.editor && emailEditorRef.current.editor.loadDesign(id == 1 ? template : template2)
  }

  const onReady = async () => {
    emailEditorRef.current &&
      emailEditorRef.current.editor &&
      await emailEditorRef.current.editor.addEventListener('design:updated', (dataOptional: any) => {
        emailEditorRef.current.editor.exportHtml(async (data: any) => {
          const { design, html } = data
          await onChangeFunction(html)
          await onJsonChangeFunction(JSON.stringify(design))
        })
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

  return (
    <div className="flex flex-col relative">
      <React.StrictMode>
        <div id="templates" className="flex gap-[5px] my-1.5 w-full overflow-x-auto">
          <button className="border ml-2 p-2 cursor-pointer" onClick={() => loadTemplate(1)}>
            <img src={ResolveClientURL(temp2)} className="w-[80px] min-w-[80px] max-h-[80px]" />
          </button>
          <button className="border p-2 cursor-pointer" onClick={() => loadTemplate(2)}>
            <img src={ResolveClientURL(thumbnail)} className="w-[80px] min-w-[80px] max-h-[80px]" />
          </button>
        </div>
        <div className="w-full border-t" id="customEditor">
          <EmailEditor
            ref={emailEditorRef}
            onLoad={onLoad}
            onReady={onReady}
            projectId={108688}
            options={{
              customJS: [],
              customCSS: [
                `.blockbuilder-preview.editor-desktop {
                    width:auto;}
                `,
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

export default EmailTemplate
