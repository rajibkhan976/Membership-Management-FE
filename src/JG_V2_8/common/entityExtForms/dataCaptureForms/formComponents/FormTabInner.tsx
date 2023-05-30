import { UiComp } from '@jg/common/dataAPIs/entityExtensions/schemas/EntityExtSchema'
import { EntityExtFormAnswersCollectionBySchemaType, EntityExtFormDataType, MA_FieldProps } from '../../types'
import FormTabComponents from './FormTabComponents'
import EntityExtFormProvider, { createEntityExtFormStore } from '../../providers/EntityExtFormProvider'
import { useEntityExtGenericDataCaptureContext } from '../../providers/EntityExtGenericDataCaptureProvider'
import { useEffect } from 'react'
import _ from 'lodash'

const FormTabInner = ({
  entityId,
  index,
  items,
  tab,
  readOnly,
}: {
  tab: UiComp
  entityId: number
  index: number
  items: UiComp[]
  readOnly?: boolean
}) => {
  const defaultValBySchema = {} as EntityExtFormAnswersCollectionBySchemaType
  defaultValBySchema[tab.ExId] = {}
  const defaultVal = {} as EntityExtFormDataType
  items.forEach((e) => {
    if (e.FieldId > -1) {
      const config = JSON.parse(e.Config) as MA_FieldProps
      console.log(e.Config)
      defaultVal[e.FieldId] = config.defaultValue ? config.defaultValue : ''
    }
  })
  defaultValBySchema[tab.ExId] = defaultVal
  const { setValue, getValue, onClear, onCopy, onValidate, onRefresh } = useEntityExtGenericDataCaptureContext(
    (state) => ({
      setValue: state.setValue,
      getValue: state.getValue,
      onClear: state.onClear,
      onCopy: state.onCopy,
      onValidate: state.onValidate,
      onRefresh: state.onRefresh,
    })
  )
  //console.log('getValue()', getValue())
  const value = getValue()['form']
    ? getValue()['form']?.[entityId]?.[index] || defaultValBySchema[tab.ExId]
    : defaultValBySchema[tab.ExId]

  const store = createEntityExtFormStore(index, readOnly || false, (key, _value, data) => {
    // console.log('createEntityExtFormStore ', data)
    const res = {} as EntityExtFormAnswersCollectionBySchemaType
    res[tab.ExId] = data
    const exisitngValue = getValue()['form'] || {}
    if (exisitngValue[entityId]) {
      exisitngValue[entityId][index] = res
    } else {
      exisitngValue[entityId] = [res]
    }
    setValue('form', res, entityId, index)
  })

  //console.log('defaultValBySchema', defaultValBySchema, value)
  const formValue = _.merge(defaultValBySchema[tab.ExId], value[tab.ExId])
  useEffect(() => {
    onClear('form', entityId, index, () => {
      store.getState().clear()
    })
    onCopy('form', entityId, index, (coppiedValue) => {
      store.getState().populate(coppiedValue[tab.ExId])
    })
    onValidate('form', entityId, index, (val, noNotify) => {
      //store.getState().populate(coppiedValue[tab.ExId])
      const { isValid, message } = store.getState().validate(!!noNotify)
      return { isValid, message }
    })
    onRefresh('form', entityId, index, (coppiedValue) => {
      store.getState().populate(coppiedValue[tab.ExId])
    })
    // console.log('form index ', index)
  }, [])

  return (
    <EntityExtFormProvider store={store}>
      <FormTabComponents defalutValue={formValue} items={items} />
    </EntityExtFormProvider>
  )
}

export default FormTabInner
