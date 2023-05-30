import { MA_FieldProps } from '../../types'
import AttachmentPicker from '@jg/common/comps/attachment/AttachmentPicker'
import { memo, useCallback, useEffect, useState } from 'react'
import useEntityExtFormField from '../../hooks/useEntityExtFormField'
import AppStore from '@jg/store/store'
import classNames from 'classnames'
import { DownloadIcon, DocumentIcon, XIcon } from '@heroicons/react/solid'
import StatusDialog from '@jg/common/comps/statusdialog/StatusDialog'

type AtatchementListProps = {
  attachemtPath: string
  basePath: string
  onDelete: (index: number) => void
}

const AtatchementList = ({ attachemtPath = '', basePath, onDelete }: AtatchementListProps) => {
  const items = attachemtPath?.split('|')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  //console.log('AtatchementList', items)
  return (
    <>
      {items.map((item, i) => {
        if (item.indexOf('temp_') > -1) {
          const pathPart = `${basePath}store/downloadTemp?path=fieldmanagementattachment/attachments/`
          const filePart = item.split('temp_')[1]
          const namePart = filePart.split('_$_')[1]
          return (
            <div
              key={i}
              className="flex justify-between items-center rounded-sm px-1 py-2 mb-2 bg-jg-metal-50 bg-opacity-50 hover:bg-opacity-100"
            >
              <a className="flex w-10/12 items-center" href={`${pathPart}${filePart}`}>
                <DocumentIcon className="w-5 h-5 mr-1 text-jg-green-500" />
                <span className="block w-96 truncate text-sm">{namePart}</span>
              </a>
              <XIcon
                className="h-5 w-5 cursor-pointer border-2 border-jg-grey-600 text-jg-grey-600 rounded-full"
                onClick={() => {
                  setIsOpen(true)
                }}
              />
              <StatusDialog
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                titleText={'Confirmation'}
                descriptionText={'Are you sure you wish to delete this attachment?'}
                closeBtnText="No"
                showDefaultActionBtn
                dialogStatus={'success'}
                actionBtnText="Yes"
                handleAction={() => {
                  onDelete(i)
                  setIsOpen(false)
                }}
                showCrossBtn={false}
              />
            </div>
          )
        } else {
          //"/store/download?f=Prefix_9d729920-f5ac-4aa6-ad9b-d83cb27e944c_$_amirabackgroundthemeconcept.jpg&t=fieldmanagementattach&p=-1&p1=3786&p2=-1
          const pathPart = `${basePath}store/download?f=${item}&t=fieldmanagementattach&p=-1&p1=2758&p2=-1`
          const namePart = item?.split('_$_')[1]
          return (
            <a
              key={i}
              className="flex w-full justify-between items-center rounded-sm px-1 py-2 mb-2 bg-jg-metal-50 bg-opacity-50 hover:bg-opacity-100"
              href={`${pathPart}`}
            >
              <span className="flex">
                <DocumentIcon className="w-5 h-5 mr-1 text-jg-green-500" />
                <span className="block w-96 truncate text-sm">{namePart}</span>
              </span>
              <DownloadIcon className="w-5 h-5 text-jg-green-500" />
            </a>
          )
        }
      })}
    </>
  )
}

type MA_AttachmentProps = MA_FieldProps & {
  numberOfAttachment: string
  attachmentType: string
}

const FastAttachmentPicker = memo(AttachmentPicker)

export default (config: MA_AttachmentProps) => {
  const BaseAppPath = AppStore((state) => {
    return state.BaseAppPath
  })
  const { isRequired, tooltip, label, numberOfAttachment, attachmentType } = config
  const { setValue, value, getValue, onValidate, isValid, readOnly, setValid, getValidationStatus } =
    useEntityExtFormField(config)

  useEffect(() => {
    onValidate(config.field?.Id || '-1', (valOnValidate, noNotify) => {
      //if (!noNotify && isRequired) setValid(!!valOnValidate)

      return {
        key: config.field?.Id || '-1',
        isValid: isRequired ? !!valOnValidate : true,
        message: 'FIELD_REQUIRED',
        noNotify,
      }
    })
  }, [])

  const onCompleted = useCallback((arg: { path: string; name: string }) => {
    // console.log('arg', arg, 'value', value)
    // console.log('arg', arg, 'value', value)
    const extingValue = (getValue(config.field?.Id || '-1') || '') as string
    const extingItems =
      extingValue.length > 0 ? (extingValue?.indexOf('|') > -1 ? extingValue?.split('|') : [extingValue]) : []

    const fileName = arg?.path?.split('downloadTemp?path=')[1]?.split('/')[2]
    extingItems.push('temp_' + fileName)

    setValue(extingItems?.join('|'))
  }, [])

  return (
    <>
      <h1 className="font-bold text-2xl py-2">
        {label}
        {isRequired && <span className="text-jg-red-700 text-lg">&nbsp;*</span>}
      </h1>
      <div className="font-thin text-sm mb-2">{tooltip}</div>
      <div className="w-full">
        {value && (
          <AtatchementList
            basePath={BaseAppPath}
            attachemtPath={value as string}
            onDelete={(index) => {
              const items = (value as string).split('|')
              items.splice(index, 1)
              setValue(items.join('|'))
            }}
          />
        )}
        {!readOnly && (
          <div
            className={classNames(
              'p-2 border',
              !getValidationStatus()?.noNotify && !getValidationStatus()?.isValid
                ? 'border-jg-red-500'
                : 'border-jg-grey-500'
            )}
          >
            <FastAttachmentPicker
              numberOfAttachment={numberOfAttachment}
              attachmentType={attachmentType}
              basePath={BaseAppPath}
              onCompleted={onCompleted}
            />
          </div>
        )}
      </div>
    </>
  )
}
