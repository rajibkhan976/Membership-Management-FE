import { Checkbox } from '@comps/uiComps/forms'
import { DataCaptureComponentBase } from './MA_Heading'
import { useComp } from '@comps/uiComps/_base/hooks'
import useDataCaptureItem from '../../hooks/useDataCaptureItem'
import { useCallback, useEffect, useState } from 'react'
import { useEntityExtGenericDataCaptureContext } from '../../providers/EntityExtGenericDataCaptureProvider'
import _ from 'lodash'
import classNames from 'classnames'

type DeclarationProps = DataCaptureComponentBase & {
  content?: string
}
export default ({ content, $entityId, $index }: DeclarationProps) => {
  const { cid } = useComp()
  const { value, setValue, onValidate, entityId, index } = useDataCaptureItem<boolean>(
    'declaration',
    $entityId,
    $index,
    false
  )
  const [isValid, setValid] = useState<boolean>(true)
  useEffect(() => {
    onValidate('declaration', entityId, index, (valueOnValidate, noNotify) => {
      const v = valueOnValidate as boolean
      if (!noNotify) setValid(!!v)
      return { isValid: v, message: 'DECLARAION_REQUIRED', noNotify }
    })
  }, [])

  return (
    <div className={classNames('flex gap-2')}>
      <Checkbox
        // status={!isValid ? 'error' : 'normal'}
        value={value}
        onValueChange={(checkValue) => {
          setValue(checkValue as boolean)
        }}
        fieldsize="sm"
        hideLabel={true}
        id={cid}
      />
      <div className="relative ">
        {<span className="text-jg-red-700 text-lg absolute right-0 top-0">&nbsp;*</span>}
        <div className="pr-3  hover:bg-jg-grey-50 mx-1">
          <label
            className={classNames(!isValid ? 'text-jg-red-800' : '')}
            htmlFor={cid}
            dangerouslySetInnerHTML={{ __html: content || '' }}
          />
        </div>
      </div>
    </div>
  )
}
