import { useRef, useEffect } from 'react'
import { IsBlended } from '@jg/_core/Authorization'
import 'froala-editor/js/plugins.pkgd.min.js'
import 'froala-editor/css/froala_style.min.css'
import 'froala-editor/css/froala_editor.pkgd.min.css'
import 'font-awesome/css/font-awesome.css'
import './CustomizedFroala.css'
import FroalaEditorComponent from 'react-froala-wysiwyg'
import FroalaEditor from 'froala-editor'
import classNames from 'classnames'
import AppStore from '@jg/store/store'
import Tribute from 'tributejs'
import 'tributejs/tribute.css'
import { useEmailBody } from '@jg/widgets/EmailAndCom/store/useEmailBodyStore'

const RichTextEditor = ({ onChange, value, name, hideBorder = false, isTemplate }) => {
  const setBody = useEmailBody(({ setBody }) => setBody)
  const riceTextBody = useEmailBody(({ riceTextBody }) => riceTextBody)
  const ref = useRef(null)
  const BaseAppPath = AppStore(({ BaseAppPath }) => BaseAppPath)

  useEffect(() => {
    !isTemplate && onChange(name, ref.current.oldModel)

    return () => setBody('')
  }, [isTemplate])

  FroalaEditor.DefineIcon('hashTag', { NAME: '#', template: 'text' })
  FroalaEditor.RegisterCommand('hashTag', {
    title: 'Insert HTML',
    type: 'dropdown',
    options: {
      LoginId: 'LoginId',
      FirstName: 'FirstName',
      LastName: 'LastName',
      Mobile: 'Mobile',
      LastPasswordUpdateDate: 'LastPasswordUpdateDate',
      EmailAddress: 'EmailAddress',
      DOB: 'DOB',
      Gender: 'Gender',
      Address1: 'Address1',
      Address2: 'Address2',
      Address3: 'Address3',
      Town: 'Town',
      County: 'County',
      Country: 'Country',
      PostCode: 'PostCode',
      JoiningDate: 'JoiningDate',
      MID: 'MID',
    },
    focus: true,
    undo: true,
    refreshAfterCallback: true,
    callback: function (cmd, val, params) {
      this.html.insert('#' + val)
    },
  })

  const _editorConfig = {
    editorClass: 'jg-froala',
    toolbarButtons: [
      'undo',
      'redo',
      'fontFamily',
      'fontSize',
      'bold',
      'italic',
      'underline',
      'strikeThrough',
      'subscript',
      'superscript',
      '|',
      'textColor',
      'backgroundColor',
      'inlineStyle',
      'paragraphStyle',
      '|',
      'paragraphFormat',
      'align',
      'formatOL',
      'formatUL',
      'outdent',
      'indent',
      'quote',
      '-',
      'insertLink',
      'insertImage',
      'insertFile',
      'insertTable',
      '|',
      'specialCharacters',
      'insertHR',
      'selectAll',
      'clearFormatting',
      '|',
      'print',
      'help',
      'html',
      '|',
      'hashtag',
      '|',
      'insertKey',
      '|',
      'hashTag',
    ],
    //ToolbarButtonsConfig,
    // embedlyKey: 'yDC5hH3E3A6A5B4F6gKTRe1CD1PGb1DESAb1Kd1EBH1Pd1TKoD6C5G5F4G2D3A3B4A5B4==',
    iframeStyle:
      'body table.fr-dashed-borders td, body table.fr-dashed-borders th { border-style: dashed !important; }',
    language: 'en_gb',
    theme: 'gray',
    fontSize: ['8', '9', '10', '11', '12', '14', '16', '18', '24', '30', '36', '48', '60', '72', '96'],
    fullPage: false,
    quickInsertButtons: ['image', 'embedly', 'table', 'ul', 'ol', 'hr'],
    useClasses: true,
    toolbarSticky: false,
    toolbarVisibleWithoutSelection: true,
    key: 'BWC6D-16D3C3E3E2A1A7A1wc2DBKSPJ1WKTUCQOd1OURPE1KDc1C-7J2A4D4C4C6E2E1F4E1C1==',
    heightMin: 190,
    zIndex: 0,
    attribution: false,
    charCounterCount: false,
    pluginsEnabled: [
      'align',
      'charCounter',
      'codeBeautifier',
      'codeView',
      'colors',
      'draggable',
      'embedly',
      'emoticons',
      'entities',
      'file',
      'fontAwesome',
      'fontFamily',
      'fontSize',
      'fullscreen',
      'image',
      'imageTUI',
      'imageManager',
      'inlineStyle',
      'inlineClass',
      'lineBreaker',
      'lineHeight',
      'link',
      'lists',
      'paragraphFormat',
      'paragraphStyle',
      'quickInsert',
      'quote',
      'save',
      'table',
      'url',
      'wordPaste',
      'tributejs',
    ],

    imageUploadURL: BaseAppPath + (IsBlended() ? 'store/Upload' : 'store/UploadR'),
    imageUploadParams: { t: 'email', p: 'froala', p2: BaseAppPath },
    videoUploadURL: BaseAppPath + (IsBlended() ? 'store/Upload' : 'store/UploadR'),
    videoUploadParams: { t: 'email', p: 'froala', p2: BaseAppPath },
    fileUploadURL: BaseAppPath + (IsBlended() ? 'store/Upload' : 'store/UploadR'),
    fileUploadParams: { t: 'email', p: 'froala', p2: BaseAppPath },
    videoUpload: true,
    fileAllowedTypes: [
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/excel',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/plain',
      'application/pdf',
      'application/x-compressed',
      'application/x-zip-compressed',
      'application/zip',
      'application/x-rar-compressed',
      'application/x-7z-compressed',
    ],
    events: {
      initialized: function () {
        if (ref.current !== null) {
          const editor = ref.current.editor
          const tribute = new Tribute({
            values: [
              { key: 'LoginId', value: 'LoginId' },
              { key: 'FirstName', value: 'FirstName' },
              { key: 'LastName', value: 'LastName' },
              { key: 'Mobile', value: 'Mobile' },
              { key: 'LastPasswordUpdateDate', value: 'LastPasswordUpdateDate' },
              { key: 'EmailAddress', value: 'EmailAddress' },
              { key: 'DOB', value: 'DOB' },
              { key: 'Gender', value: 'Gender' },
              { key: 'Address1', value: 'Address1' },
              { key: 'Address2', value: 'Address2' },
              { key: 'Address3', value: 'Address3' },
              { key: 'Town', value: 'Town' },
              { key: 'County', value: 'County' },
              { key: 'Country', value: 'Country' },
              { key: 'PostCode', value: 'PostCode' },
              { key: 'JoiningDate', value: 'JoiningDate' },
              { key: 'MID', value: 'MID' },
            ],
            trigger: '#',
            requireLeadingSpace: false,
          })
          tribute.attach(editor.el)
          editor.events.on(
            'keydown',
            (e) => {
              tribute.isActive
            },
            true
          )
          editor.events.on('image.inserted', function (e, editor, $img, response) {
            let froalaStoreLocation = BaseAppPath + 'store/download'

            editor.setBody(editor.el.replace(
              new RegExp('"' + froalaStoreLocation, 'g'),
              '"' + location.protocol + '//' + location.host + froalaStoreLocation
            ))
          })
          editor.events.on('image.error', function (e, response) {
            console.log('error', response)
          })
        }
      },
    },
  }

  return (
    <div className={classNames('h-full', hideBorder ? '' : 'ring-1 ring-jg-metal-50')}>
      <FroalaEditorComponent
        ref={ref}
        model={riceTextBody || value}
        onModelChange={(modelValue) => {
          modelValue = modelValue.replace(
            new RegExp(/"\/store\/download\?f=/g),
            '"' + location.protocol + '//' + location.host + BaseAppPath + 'store/downloadPublic?f='
          )
          setBody(modelValue)
          onChange(name, modelValue)
        }}
        config={_editorConfig}
        tag="textarea"
      />
    </div>
  )
}

export default RichTextEditor
