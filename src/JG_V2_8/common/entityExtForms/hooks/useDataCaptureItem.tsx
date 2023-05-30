import { useCallback, useEffect, useState } from 'react'
import { useEntityExtGenericDataCaptureContext } from '../providers/EntityExtGenericDataCaptureProvider'
import _ from 'lodash'

const useDataCaptureItem = <P,>(type: string, entityId: number, index: number, defaultValue: P) => {
  const { setValue, getValue, onClear, onCopy, onValidate } = useEntityExtGenericDataCaptureContext((state) => ({
    setValue: state.setValue,
    getValue: state.getValue,
    onClear: state.onClear,
    onCopy: state.onCopy,
    onValidate: state.onValidate,
    //onRefresh: state.onRefresh,/
  }))

  const value = getValue()
  // console.log('useDataCaptureItem', value, entityId, index)
  const v = value ? value[type]?.[entityId]?.[index] || defaultValue : defaultValue
  const [dataCaptureValue, setDataCaptureValue] = useState<P>(v)
  // !_.isEmpty(value[type]) ? value[type][entityId][index] : false
  const setDataValue = useCallback(
    (currentValue: P) => {
      const exisitngValue = getValue()[type] || {}
      if (exisitngValue[entityId]) {
        exisitngValue[entityId][index] = currentValue
      } else {
        exisitngValue[entityId] = [currentValue]
      }
      setValue(type, currentValue, entityId, index)
      setDataCaptureValue(currentValue)
    },
    [index, entityId]
  )

  useEffect(() => {
    onClear(type, entityId, index, () => {
      setDataValue(defaultValue)
    })
    onCopy(type, entityId, index, (copiedValue) => {
      setDataValue(copiedValue)
    })
    /*onRefresh(type, entityId, index, (copiedValue) => {
      setDataValue(copiedValue)
    })*/

    //setValue(type, defaultValue, entityId, index)
    //  setDataCaptureValue(getValue() as P)
  }, [])

  return { setValue: setDataValue, getValue, value: dataCaptureValue, onValidate, entityId, index }
}
export default useDataCaptureItem
