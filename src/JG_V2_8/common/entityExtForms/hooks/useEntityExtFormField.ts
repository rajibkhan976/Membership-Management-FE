import { useCallback, useEffect, useState } from 'react'
import { useEntityExtFormStoreContext } from '../providers/EntityExtFormProvider'
import { EntityExtFormDataValueType, MA_FieldProps } from '../types'

const useEntityExtFormField = ({ field, defaultValue }: MA_FieldProps) => {
  const { readOnly, update, getValue, onChangeHandler, onValidate, validationSummaryCollection } =
    useEntityExtFormStoreContext((state) => ({
      readOnly: state.readOnly,
      update: state.update,
      getValue: state.getValue,
      onChangeHandler: state.onChangeHandler,
      onValidate: state.onValidate,
      ruledOutItems: state.ruledOutItems,
      validationSummaryCollection: state.validationSummaryCollection,
    }))

  const [value, setFieldValue] = useState<EntityExtFormDataValueType>(getValue(field?.Id || '-1') || defaultValue)
  const [isValid, setValid] = useState<boolean>(true)

  const setValue = useCallback((value: EntityExtFormDataValueType) => {
    setFieldValue(update(field?.Id, value))
  }, [])

  useEffect(() => {
    onChangeHandler(field?.Id || '-1', (value) => {
      setValue(value || defaultValue || '')
    })
  }, [])
  const getValidationStatus = () => {
    console.log(
      'validationSummaryCollection.find((e) => e.key === field?.Id)',
      validationSummaryCollection.find((e) => e.key === field?.Id)
    )
    return validationSummaryCollection.find((e) => e.key === field?.Id)
  }

  useEffect(() => {
    // console.log('validationSummaryCollection', validationSummaryCollection, field?.Id)
    const index = validationSummaryCollection.findIndex((e) => e.key === field?.Id)
    if (index > -1) {
      const summary = validationSummaryCollection[index]
      if (!summary.noNotify) setValid(validationSummaryCollection[index].isValid)
    }
  }, [validationSummaryCollection])

  return { setValue, value, getValue, onValidate, isValid, setValid, readOnly, getValidationStatus }
}
export default useEntityExtFormField
