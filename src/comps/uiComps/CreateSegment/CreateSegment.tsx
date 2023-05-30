import type { AllowedValuesInterface } from '@comps/uiComps/CreateSegment/interfaces/allowedValues.interface'
import type { FieldData } from '@comps/uiComps/CreateSegment/interfaces/field.interface'
import type { AllowedValues, TypeOperators } from '@comps/uiComps/CreateSegment/interfaces/typeOperator.interface'
import type { CreateSegmentProps } from '@comps/uiComps/CreateSegment/types/SegmentExpressionSeparatorProps'
import { validationSchema } from '@comps/uiComps/CreateSegment/validation/validationSchema'
import type { ArgumentInterface } from '@comps/uiComps/EmailList/Interfaces'
import { SegmentsPreviewModal } from '@comps/uiComps/EmailList/components/report/SegmentsPreviewModal'
import { useGetSegmentByIdStore } from '@comps/uiComps/SegmentList/store/segments'
import { FormikControl } from '@comps/uiComps/formControls/FormikControl'
import { useWidgetContext } from '@jg/_core/classes/widget/WidgetContext'
import call from '@jg/_core/services/data/LegacyDataService'
import { FieldType } from '@jg/widgets/EmailAndCom/enum'
import { useSegmentMetaData } from '@jg/widgets/EmailAndCom/store/segmentMetaDataStore'
import { FieldArray, Form, Formik } from 'formik'
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { RuleTypeItem, segmentFourFieldsNotRequired } from '../../../constant'
import ArrowLeft from '../Icons/SVG/ArrowLeft'
import MinusCircle from '../Icons/SVG/MinusCircle'
import PlusCircle from '../Icons/SVG/PlusCircle'
import SegmentExpressionSeparator from './SegmentExpressionSeparator'
import type { SegmentExpressionType, SegmentInitialValue } from './interfaces/segmentInitialValue.interface'

const CreateSegment = ({ segment }: CreateSegmentProps) => {
  const { clubDocId } = useParams()
  const { segmentId } = useParams()
  const { basePath } = useWidgetContext()
  const selectFieldRef = useRef<any>([])
  const selectOperatorRef = useRef<any>([])
  const navigate = useNavigate()
  const { getSegmentDetail } = useGetSegmentByIdStore()
  const { fetch } = useSegmentMetaData()
  const [fields, setFields] = useState<FieldData[] | []>([])
  const [previewResult, setPreviewResult] = useState<any[] | null>(null)
  const [previewRows, setPreviewRows] = useState<number>(0)
  const [typeOperators, setTypeOperators] = useState<TypeOperators[] | []>([])
  const [ruleTypes, setRuleTypes] = useState<any[] | []>([])
  const [ruleTypesObj, setRuleTypesObj] = useState<FieldData | null>(null)
  const [operators, setOperators] = useState<any[] | []>([])
  const [fieldControl, setFieldControl] = useState<string[]>([])
  const [fieldControlSelectValue, setFieldControlSelectValue] = useState<any[] | []>([])
  const [groupValue, setGroupValue] = useState<any[] | []>([])
  const [previewLoading, setPreviewLoading] = useState<boolean>(true)

  useEffect(() => {
    clubDocId &&
      getSegmentMetaData({
        Method: 'GetMetadataForSegment',
        OwningEntityId: clubDocId,
      })
  }, [clubDocId, fetch])

  const initialValues: SegmentInitialValue = {
    SegmentId: segment ? +segment.SegmentId : 0,
    Title: segment ? segment.Title : '',
    OwningEntityIdSyncGuid: clubDocId ? clubDocId : '',
    DeleteSegment: 0,
    SegmentStatus: 0,
    Description: segment ? segment.Description : '',
    Condition: segment ? segment.SegmentExpression[0].Condition || 'and' : 'and',
    SegmentExpression: segment
      ? segment.SegmentExpression
      : [
        {
          FieldId: 0,
          RuleType: '',
          Field: '',
          Value: '',
          Operator: '',
          Condition: '',
        },
      ],
  }

  const getSegmentMetaData = async (args: ArgumentInterface) => {
    const argByProvider = { provider: 'Email', args: args }
    await call(['GDE/FetchObjects'], [argByProvider], (res: any) => {
      if (res.StatusCode === 200) {
        setFields(res.Result.Fields)
        setTypeOperators(res.Result.TypeOperators)
        if (segment) {
          const ruleTypesTemp: any[] = []
          const operatorsTemp: any[] = []
          const fieldControlTemp: any[] = []
          const fieldControlSelectValueTemp: any[] = []
          const groupValueTemp: any[] = []

          segment.SegmentExpression.map((item, i) => {
            //############################## TODO: Start fields section ########################################
            //TODO: fields section
            const fieldFilterResult: FieldData[] = res.Result.Fields.filter(
              (fieldFilter: FieldData) => fieldFilter.RuleType === item.RuleType
            )
            //TODO: set field data by index
            ruleTypesTemp[i] = fieldFilterResult
            //############################### TODO: End fields section #######################################

            // START: When Edit Segment Set distinct Group name
            const distinct: string[] = fieldFilterResult
              .reduce((unique: any, item: any) => {
                return unique.some((obj: any) => obj.GroupName === item.GroupName) ? unique : [...unique, item]
              }, [])
              .map((item: any) => item.GroupName)
            groupValueTemp[i] = distinct
            setGroupValue(groupValueTemp)
            // END: When Edit Segment Set distinct Group name

            //############################## TODO: Start operators section ########################################

            const secondFieldsValueObj: FieldData | undefined = fieldFilterResult.find(
              (ik) => ik.TargetField === item.Field && ik.RuleType === item.RuleType
            )
            //TODO: operators section
            secondFieldsValueObj && setRuleTypesObj(secondFieldsValueObj)
            const TypeOperatorsFindResult: TypeOperators = res.Result.TypeOperators.find(
              (TypeOperator: TypeOperators) => TypeOperator.DataType === secondFieldsValueObj?.Types
            )
            //TODO: set operators data by index
            operatorsTemp[i] = TypeOperatorsFindResult
            //############################## TODO: End operators section ########################################

            const x: AllowedValues | undefined = TypeOperatorsFindResult.AllowedOperators.find(
              (ip) => ip.Value === item.Operator
            )

            if (
              secondFieldsValueObj &&
              (secondFieldsValueObj.Types === FieldType.AGG_MULTISELECT ||
                secondFieldsValueObj.Types === FieldType.SELECT_MULTIPLE ||
                secondFieldsValueObj.Types === FieldType.SELECT ||
                secondFieldsValueObj.Types === FieldType.SELECT_MULTIPLE_EVENT_CATEGORY)
            ) {
              fieldControlTemp[i] = FieldType.SELECT_MULTIPLE
              setFieldControl(fieldControlTemp)
              // TODO:  Need to work here again by mahadi
              fieldControlSelectValueTemp[i] = secondFieldsValueObj.AllowedValues
              setFieldControlSelectValue(fieldControlSelectValueTemp)
            } else if (
              secondFieldsValueObj &&
              secondFieldsValueObj.AllowedValues &&
              secondFieldsValueObj.AllowedValues.length > 0
            ) {
              fieldControlTemp[i] = FieldType.SELECT
              fieldControlSelectValueTemp[i] = secondFieldsValueObj.AllowedValues
            } else {
              fieldControlTemp[i] = FieldType.TEXT

              if (
                secondFieldsValueObj &&
                secondFieldsValueObj.Types === (FieldType.TEXT || FieldType.TEXT_LARGE || FieldType.TEXT_SMALL)
              ) {
                fieldControlTemp[i] = FieldType.TEXT
                setFieldControl(fieldControlTemp)
              } else if (
                secondFieldsValueObj &&
                x &&
                secondFieldsValueObj.Types === FieldType.DATE &&
                x.Value === FieldType.BETWEEN
              ) {
                fieldControlTemp[i] = FieldType.DATE_BETWEEN
                setFieldControl(fieldControlTemp)
              } else if (
                secondFieldsValueObj &&
                x &&
                secondFieldsValueObj.Types === FieldType.DATE &&
                x.Value === 'month and day is'
              ) {
                secondFieldsValueObj ? (fieldControlTemp[i] = x.Value) : ''
                secondFieldsValueObj && setFieldControl(fieldControlTemp)
                // TODO: Only for Date fields
              } else if (secondFieldsValueObj && secondFieldsValueObj.Types === FieldType.DATE) {
                secondFieldsValueObj ? (fieldControlTemp[i] = secondFieldsValueObj.Types) : ''
                secondFieldsValueObj && setFieldControl(fieldControlTemp)
              } else if (secondFieldsValueObj && secondFieldsValueObj.Types === FieldType.MEMBERSHIP_PAYMENT_SELECT) {
                fieldControlTemp[i] = FieldType.SELECT
                setFieldControl(fieldControlTemp)
                fieldControlSelectValueTemp[i] =
                  secondFieldsValueObj.AllowedValues.length > 0 ? secondFieldsValueObj.AllowedValues : x?.AllowedValues
                setFieldControlSelectValue(fieldControlSelectValueTemp)
              } else if (
                secondFieldsValueObj &&
                x &&
                secondFieldsValueObj.Types === FieldType.INT_FIELD &&
                x.Value === FieldType.BETWEEN
              ) {
                fieldControlTemp[i] = FieldType.INT_BETWEEN
                setFieldControl(fieldControlTemp)
                fieldControlSelectValueTemp[i] = secondFieldsValueObj.AllowedValues
                setFieldControlSelectValue(fieldControlSelectValueTemp)
              } else if (ruleTypesObj && ruleTypesObj.Types === FieldType.INT_FIELD) {
                fieldControlTemp[i] = FieldType.INT_FIELD
                setFieldControl(fieldControlTemp)
                fieldControlSelectValueTemp[i] = ruleTypesObj.AllowedValues
                setFieldControlSelectValue(fieldControlSelectValueTemp)
              } else if (
                secondFieldsValueObj &&
                x &&
                secondFieldsValueObj.Types === FieldType.DECIMAL &&
                x.Value === FieldType.BETWEEN
              ) {
                fieldControlTemp[i] = FieldType.DECIMAL_BETWEEN
                setFieldControl(fieldControlTemp)
                fieldControlSelectValueTemp[i] = secondFieldsValueObj.AllowedValues
                setFieldControlSelectValue(fieldControlSelectValueTemp)
              } else if (secondFieldsValueObj && secondFieldsValueObj.Types === FieldType.DECIMAL) {
                fieldControlTemp[i] = FieldType.INT_FIELD
                setFieldControl(fieldControlTemp)
                fieldControlSelectValueTemp[i] = secondFieldsValueObj.AllowedValues
                setFieldControlSelectValue(fieldControlSelectValueTemp)
              } else if (
                secondFieldsValueObj &&
                x &&
                secondFieldsValueObj.Types === FieldType.CURRENCY &&
                x.Value === FieldType.BETWEEN
              ) {
                fieldControlTemp[i] = FieldType.CURRENCY_BETWEEN
                setFieldControl(fieldControlTemp)
                fieldControlSelectValueTemp[i] = secondFieldsValueObj.AllowedValues
                setFieldControlSelectValue(fieldControlSelectValueTemp)
              } else if (secondFieldsValueObj && secondFieldsValueObj.Types === FieldType.CURRENCY) {
                fieldControlTemp[i] = FieldType.INT_FIELD
                setFieldControl(fieldControlTemp)
                fieldControlSelectValueTemp[i] = secondFieldsValueObj.AllowedValues
                setFieldControlSelectValue(fieldControlSelectValueTemp)
              }
            }
          })

          //TODO: set Rules Types data into useState
          ruleTypesTemp.length > 0 && setRuleTypes(ruleTypesTemp)
          //TODO: set Operators data into useState
          operatorsTemp.length > 0 && setOperators(operatorsTemp)
        }
      }
    })
  }

  const onSubmit = async (values: SegmentInitialValue) => {
    values.OwningEntityIdSyncGuid = clubDocId ? clubDocId : ''
    await call(['GoMembership/SaveSegment'], [{ segment: values }], (res: any) => {
      if (res.StatusCode === 200) {
        segmentId && getSegmentDetail(+segmentId)
        navigate(basePath + clubDocId + '/segments/')
      }
    })
  }

  const setARuleTypeData = useCallback(
    async (value: string, index: number) => {
      const groupValueTemp: any[] = groupValue

      const filterResult: FieldData[] = fields.filter((item: FieldData) => item.RuleType === value)

      const distinct: string[] = await filterResult
        .reduce((unique: any, item: any) => {
          return unique.some((obj: any) => obj.GroupName === item.GroupName) ? unique : [...unique, item]
        }, [])
        .map((item: any) => item.GroupName)

      groupValueTemp[index] = distinct
      setGroupValue(groupValueTemp)
      const ruleTypesTemp = ruleTypes
      filterResult.length > 0 ? (ruleTypesTemp[index] = filterResult) : ''
      filterResult.length > 0 && setRuleTypes(ruleTypesTemp)
      if (operators.length > 0) operators[index] = {}
      if (fieldControl.length > 0) fieldControl[index] = ''
    },
    [fieldControl, fields, operators, ruleTypes]
  )

  const setOperatorFiledData = useCallback(
    async (value: string, index: number) => {
      const SchemaItem: FieldData = JSON.parse(value.toString())
      const secondFieldsValueObj: FieldData | undefined = await ruleTypes[index].find(
        (item: FieldData) =>
          item.TargetField === SchemaItem.TargetField &&
          item.RuleType === SchemaItem.RuleType &&
          item.Id === SchemaItem.Id &&
          item.TargetField === SchemaItem.TargetField
      )
      secondFieldsValueObj && setRuleTypesObj(secondFieldsValueObj)
      const TypeOperatorsObj: TypeOperators | undefined =
        secondFieldsValueObj &&
        (await typeOperators.find((item: TypeOperators) => item.DataType === secondFieldsValueObj.Types))
      const operatorsTemp = operators
      TypeOperatorsObj ? (operatorsTemp[index] = TypeOperatorsObj) : ''
      TypeOperatorsObj && setOperators(operatorsTemp)
      fieldControl[index] = ''
    },
    [fieldControl, operators, ruleTypes, typeOperators]
  )
  const DataForFourField = useCallback(
    async (item: string, index: number) => {
      const fieldControlTemp = fieldControl
      const fieldControlSelectValueTemp = fieldControlSelectValue
      const allowedValues: { value: string; allowValue: AllowedValuesInterface[] } = item
        ? JSON.parse(item)
        : { value: '', allowValue: [] }
      if (
        ruleTypesObj &&
        (ruleTypesObj.Types === FieldType.AGG_MULTISELECT ||
          ruleTypesObj.Types === FieldType.SELECT_MULTIPLE ||
          ruleTypesObj.Types === FieldType.SELECT ||
          ruleTypesObj.Types === FieldType.SELECT_MULTIPLE_EVENT_CATEGORY)
      ) {
        fieldControlTemp[index] = FieldType.SELECT_MULTIPLE
        setFieldControl(fieldControlTemp)
        allowedValues.allowValue.length > 0
          ? (fieldControlSelectValueTemp[index] = allowedValues.allowValue)
          : ruleTypesObj
            ? (fieldControlSelectValueTemp[index] = ruleTypesObj.AllowedValues)
            : (fieldControlSelectValueTemp[index] = [])
        setFieldControlSelectValue(fieldControlSelectValueTemp)
        // TODO: if we get data into allowedValues array it's must render select field and also select filed options is allowedValues
      } else if (allowedValues.allowValue.length > 0 || (ruleTypesObj && ruleTypesObj.AllowedValues.length > 0)) {
        fieldControlTemp[index] = FieldType.SELECT
        setFieldControl(fieldControlTemp)
        allowedValues.allowValue.length > 0
          ? (fieldControlSelectValueTemp[index] = allowedValues.allowValue)
          : ruleTypesObj
            ? (fieldControlSelectValueTemp[index] = ruleTypesObj.AllowedValues)
            : (fieldControlSelectValueTemp[index] = [])
        setFieldControlSelectValue(fieldControlSelectValueTemp)
      } else {
        // TODO: this condition render text field
        if (ruleTypesObj && (ruleTypesObj.Types === FieldType.TEXT || ruleTypesObj.Types === FieldType.TEXT_LARGE || ruleTypesObj.Types === FieldType.TEXT_SMALL)) {
          fieldControlTemp[index] = FieldType.TEXT
          setFieldControl(fieldControlTemp)
        } else if (
          ruleTypesObj &&
          ruleTypesObj.Types === FieldType.DATE &&
          allowedValues.value === FieldType.DATE_BETWEEN
        ) {
          fieldControlTemp[index] = FieldType.DATE_BETWEEN
          setFieldControl(fieldControlTemp)
        } else if (
          ruleTypesObj &&
          ruleTypesObj.Types === FieldType.DATE &&
          allowedValues.value === 'month and day is'
        ) {
          ruleTypesObj ? (fieldControlTemp[index] = allowedValues.value) : ''
          ruleTypesObj && setFieldControl(fieldControlTemp)
          // TODO: Only for Date fields
        } else if (ruleTypesObj && ruleTypesObj.Types === FieldType.DATE) {
          ruleTypesObj ? (fieldControlTemp[index] = ruleTypesObj.Types) : ''
          ruleTypesObj && setFieldControl(fieldControlTemp)
        } else if (ruleTypesObj && ruleTypesObj.Types === FieldType.SELECT) {
          fieldControlTemp[index] = FieldType.SELECT
          setFieldControl(fieldControlTemp)
          fieldControlSelectValueTemp[index] = ruleTypesObj.AllowedValues
          setFieldControlSelectValue(fieldControlSelectValueTemp)
        } else if (
          ruleTypesObj &&
          ruleTypesObj.Types === FieldType.INT_FIELD &&
          allowedValues.value === FieldType.BETWEEN
        ) {
          fieldControlTemp[index] = FieldType.INT_BETWEEN
          setFieldControl(fieldControlTemp)
          fieldControlSelectValueTemp[index] = ruleTypesObj.AllowedValues
          setFieldControlSelectValue(fieldControlSelectValueTemp)
        } else if (ruleTypesObj && ruleTypesObj.Types === FieldType.INT_FIELD) {
          fieldControlTemp[index] = FieldType.INT_FIELD
          setFieldControl(fieldControlTemp)
          fieldControlSelectValueTemp[index] = ruleTypesObj.AllowedValues
          setFieldControlSelectValue(fieldControlSelectValueTemp)
        } else if (
          ruleTypesObj &&
          ruleTypesObj.Types === FieldType.DECIMAL &&
          allowedValues.value === FieldType.BETWEEN
        ) {
          fieldControlTemp[index] = FieldType.DECIMAL_BETWEEN
          setFieldControl(fieldControlTemp)
          fieldControlSelectValueTemp[index] = ruleTypesObj.AllowedValues
          setFieldControlSelectValue(fieldControlSelectValueTemp)
        } else if (ruleTypesObj && ruleTypesObj.Types === FieldType.DECIMAL) {
          fieldControlTemp[index] = FieldType.INT_FIELD
          setFieldControl(fieldControlTemp)
          fieldControlSelectValueTemp[index] = ruleTypesObj.AllowedValues
          setFieldControlSelectValue(fieldControlSelectValueTemp)
        } else if (
          ruleTypesObj &&
          ruleTypesObj.Types === FieldType.CURRENCY &&
          allowedValues.value === FieldType.BETWEEN
        ) {
          fieldControlTemp[index] = FieldType.CURRENCY_BETWEEN
          setFieldControl(fieldControlTemp)
          fieldControlSelectValueTemp[index] = ruleTypesObj.AllowedValues
          setFieldControlSelectValue(fieldControlSelectValueTemp)
        } else if (ruleTypesObj && ruleTypesObj.Types === FieldType.CURRENCY) {
          fieldControlTemp[index] = FieldType.INT_FIELD
          setFieldControl(fieldControlTemp)
          fieldControlSelectValueTemp[index] = ruleTypesObj.AllowedValues
          setFieldControlSelectValue(fieldControlSelectValueTemp)
        }
      }
    },
    [fieldControl, fieldControlSelectValue, ruleTypesObj]
  )

  const previewHandle = async (values: SegmentInitialValue) => {
    const argByProvider = {
      provider: 'Email',
      args: {
        Method: 'RecipientsBySegment',
        SegmentId: 0,
        IncludeOptins: [],
        ExcludeOptins: [],
        OwningEntityId: values.OwningEntityIdSyncGuid,
        SegmentExpression: values.SegmentExpression,
        PageNo: 1,
        Size: 30,
      },
    }

    await call(['GDE/FetchObjects'], [argByProvider], (res: any) => {
      if (res.StatusCode === 200) {
        setPreviewResult(res.Result.Recipients)
        setPreviewRows(res.Result.Rows)
        setPreviewLoading(false)
      } else {
        setPreviewLoading(false)
      }
    })
  }

  return (
    <div className="border mx-auto min-h-[calc(100vh-450px)]">
      <div className="h-[40px] w-full border-b flex items-center px-4">
        <button
          onClick={() => navigate(-1)}
          className="text-[14px] text-jg-metal-700 font-bold flex gap-2 items-center"
        >
          <ArrowLeft fill="#4CAF4F" height={15.5} width={15.5} />
          {segmentId ? 'Update Segment' : 'Create New Segment'}
        </button>
      </div>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => onSubmit(values)}>
        {({ values, handleChange, setFieldValue, isSubmitting, errors, isValid }) => (
          <>
            {previewResult && (
              <SegmentsPreviewModal
                segmentTitle={initialValues.Title}
                result={previewResult}
                rows={previewRows}
                setPreviewResult={setPreviewResult}
                loading={previewLoading}
                segmentExpression={values.SegmentExpression}
              />
            )}
            <Form>
              <FieldArray name="SegmentExpression">
                {({ push, remove, form }) => {
                  const { values } = form
                  const { SegmentExpression } = values
                  return (
                    <>
                      <div className="p-4 border-b bg-gray-50">
                        <div className="">
                          {/* {JSON.stringify(values.SegmentExpression)} */}
                          <div className="">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                              <div className="">
                                <div className="">
                                  <label
                                    htmlFor="segment_name"
                                    className="text-[14px] font-semibold text-jg-metal-900 pr-2"
                                  >
                                    Segment name<span className="text-jg-red-500">*</span>
                                  </label>
                                  <div className="flex gap-4 w-full items-center">
                                    <div className="relative w-full">
                                      <FormikControl
                                        control={'text'}
                                        id={'Title'}
                                        name={'Title'}
                                        handleChange={handleChange}
                                        label={'Write a segment name'}
                                        value={values.Title}
                                        placeholder={'Write a segment name'}
                                        className={errors.Title ? '!border-red-500' : 'border-[#CFD8DC]'}
                                      />
                                    </div>
                                    <div className="lg:hidden">
                                      <button
                                        className="flex"
                                        type="button"
                                        disabled={!!errors.Title}
                                        onClick={() =>
                                          isValid &&
                                          push({
                                            RuleType: '',
                                            Field: '',
                                            Condition: '',
                                            Value: '',
                                            Operator: '',
                                            FieldId: 0,
                                          })
                                        }
                                      >
                                        <PlusCircle height={20} width={20} fill="#4CAF4F" />
                                        <span className="text-[14px] font-bold text-jg-green-500 ml-2">ADD</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="">
                                <label
                                  htmlFor="segment_name"
                                  className="text-[14px] font-semibold text-jg-metal-900 pr-2 lg:block visible hidden"
                                >
                                  &nbsp;
                                </label>
                                <div className="flex items-center gap-2">
                                  <div className="lg:block visible hidden">
                                    <button
                                      className="flex"
                                      type="button"
                                      disabled={!!errors.Title}
                                      onClick={() =>
                                        isValid &&
                                        push({
                                          RuleType: '',
                                          Field: '',
                                          Condition: '',
                                          Value: '',
                                          Operator: '',
                                          FieldId: 0,
                                        })
                                      }
                                    >
                                      <PlusCircle height={20} width={20} fill="#4CAF4F" />
                                      <span className="text-[14px] font-bold text-jg-green-500 ml-2">ADD</span>
                                    </button>
                                  </div>
                                  <div className="lg:flex items-center w-full">
                                    <label className="block text-[14px] text-jg-metal-700" htmlFor="cars">
                                      the following conditions that contacts match of
                                    </label>
                                    <select
                                      defaultValue={values.Condition}
                                      name="Condition"
                                      id="Condition"
                                      onChange={handleChange}
                                      className="w-full lg:w-[80px] h-[32px] ml-0 lg:ml-2 p-1 border-[1px] border-jg-metal-100 rounded-[2px] text-[14px] text-jg-metal-700 mt-2 lg:mt-0"
                                    >
                                      <option value="and">
                                        All
                                      </option>
                                      <option value="or">
                                        Any
                                      </option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <div className="">
                                <label
                                  htmlFor="segment_name"
                                  className="text-[14px] font-semibold text-jg-metal-900 pr-2"
                                >
                                  Description
                                </label>
                                <div className="">
                                  <FormikControl
                                    className="border-[#CFD8DC]"
                                    control={'textarea'}
                                    id={'Description'}
                                    name={'Description'}
                                    handleChange={handleChange}
                                    label={'Write a segment Discription'}
                                    value={values.Description}
                                    placeholder={'Write a segment Discription'}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="min-h-[calc(100vh-400px)] flex flex-col items-start">
                        <div className="p-4 w-full md:h-full">
                          {SegmentExpression.map((item: SegmentExpressionType, i: number) => (
                            <div key={i} className="pb-1 gap-2 md:gap-6 flex">
                              <div className="mt-1 md:mt-0">
                                <button
                                  type="button"
                                  onClick={async () => {
                                    if (SegmentExpression.length > 1) {
                                      const ruleTypeTempRem = ruleTypes
                                      const groupValueTempRem = groupValue
                                      const operatorsTempRem = operators
                                      const fieldControlSelectValueTempRem = fieldControlSelectValue
                                      const fieldControlTempRem = fieldControl

                                      // Removed all seted data from state
                                      ruleTypeTempRem.splice(i, 1)
                                      groupValueTempRem.splice(i, 1)
                                      operatorsTempRem.splice(i, 1)
                                      fieldControlTempRem.splice(i, 1)
                                      fieldControlSelectValueTempRem.splice(i, 1)

                                      // Again Set data
                                      setRuleTypes(ruleTypeTempRem)
                                      setGroupValue(groupValueTempRem)
                                      setOperators(operatorsTempRem)
                                      setFieldControl(fieldControlTempRem)
                                      setFieldControlSelectValue(fieldControlSelectValueTempRem)

                                      // Remove Item For initial value also remove UI
                                      remove(i)
                                    }
                                  }}
                                >
                                  <MinusCircle
                                    height={14}
                                    width={14}
                                    fill={SegmentExpression.length < 2 ? `#CFD8DC` : '#E53835'}
                                  />
                                </button>
                              </div>
                              <div className="flex flex-wrap gap-3 lg:gap-4 flex-start w-full">
                                <select
                                  name={`SegmentExpression[${i}].RuleType`}
                                  id={`SegmentExpression[${i}].RuleType`}
                                  onChange={async (e: ChangeEvent<HTMLSelectElement>) => {
                                    selectFieldRef.current[i].value = '' // value clean
                                    selectOperatorRef.current[i].value = '' // value clean
                                    setFieldValue(`SegmentExpression[${i}].RuleType`, e.target.value)
                                    setFieldValue(`SegmentExpression[${i}].Field`, '') // Dynamic field Value Clean
                                    setFieldValue(`SegmentExpression[${i}].Value`, '') // Dynamic field Value Clean
                                    setFieldValue(`SegmentExpression[${i}].Operator`, '') // Dynamic field Value Clean


                                    await setARuleTypeData(e.target.value, i)
                                  }}
                                  className="h-[32px] w-[47%] md:w-[168px] p-1 border-[1px] border-jg-metal-100 rounded-[2px] text-[14px] text-jg-metal-700"
                                >
                                  <option value="">Select</option>
                                  {RuleTypeItem.map((r) => (
                                    <option
                                      value={r}
                                      key={r}
                                      selected={r === item.RuleType || r === SegmentExpression[i].RuleType}
                                    >
                                      {r}
                                    </option>
                                  ))}
                                </select>
                                {/* Second Select Field */}
                                <select
                                  ref={(el) => (selectFieldRef.current[i] = el)}
                                  name={`SegmentExpression[${i}].Field`}
                                  id={`SegmentExpression[${i}].Field`}
                                  disabled={SegmentExpression[i].RuleType <= 0}
                                  onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                                    selectOperatorRef.current[i].value = '' // value clean
                                    setFieldValue(`SegmentExpression[${i}].Value`, '') // Dynamic field Value Clean
                                    setFieldValue(`SegmentExpression[${i}].Operator`, '') // Dynamic field Value Clean
                                    setFieldValue(
                                      `SegmentExpression[${i}].Field`,
                                      e.target.value && JSON.parse(e.target.value).TargetField
                                    )

                                    //If field id exit then set otherwise 0
                                    setFieldValue(
                                      `SegmentExpression[${i}].FieldId`,
                                      e.target.value && JSON.parse(e.target.value).Id
                                        ? JSON.parse(e.target.value).Id
                                        : 0
                                    )
                                    setOperatorFiledData(e.target.value, i)
                                  }}
                                  className="h-[32px] w-[47%] md:w-[168px] p-1 border-[1px] border-jg-metal-100 rounded-[2px] text-[14px] text-jg-metal-700"
                                >
                                  <option value="">Select</option>
                                  {groupValue.length > 0 &&
                                    groupValue[i] &&
                                    groupValue[i].length > 0 &&
                                    groupValue[i].map((value: string, lt: number) => (
                                      <optgroup label={value} key={lt}>
                                        {ruleTypes.length > 0 &&
                                          ruleTypes[i] &&
                                          ruleTypes[i].length > 0 &&
                                          ruleTypes[i]
                                            .filter((item: any) => item.GroupName === value)
                                            .map((fieldDataItem: FieldData, ruleTypeIndex: number) => (
                                              <option
                                                key={ruleTypeIndex}
                                                value={JSON.stringify({
                                                  Id: fieldDataItem.Id,
                                                  RuleType: item.RuleType,
                                                  TargetField: fieldDataItem.TargetField,
                                                  Types: fieldDataItem.Types,
                                                })}
                                                selected={fieldDataItem.TargetField === item.Field}
                                              >
                                                {fieldDataItem.Caption}
                                              </option>
                                            ))}
                                      </optgroup>
                                    ))}
                                </select>

                                <select
                                  ref={(el) => (selectOperatorRef.current[i] = el)}
                                  name={`SegmentExpression[${i}].Operator`}
                                  id={`SegmentExpression[${i}].Operator`}
                                  disabled={SegmentExpression[i].Field <= 0}
                                  onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                                    setFieldValue(
                                      `SegmentExpression[${i}].Operator`,
                                      e.target.value && JSON.parse(e.target.value).value
                                    )
                                    setFieldValue(`SegmentExpression[${i}].Value`, '')
                                    DataForFourField(e.target.value, i)
                                  }}
                                  className="h-[32px] w-[47%] md:w-[168px] p-1 border-[1px] border-jg-metal-100 rounded-[2px] text-[14px] text-jg-metal-700"
                                >
                                  <option value="">Select</option>
                                  {operators.length > 0 &&
                                    operators[i] &&
                                    operators[i].AllowedOperators &&
                                    operators[i].AllowedOperators.map(
                                      (AllowedOperator: any, AllowedOperatorsIndex: number) => (
                                        <option
                                          key={AllowedOperatorsIndex}
                                          value={JSON.stringify({
                                            value: AllowedOperator.Value,
                                            allowValue: AllowedOperator.AllowedValues,
                                          })}
                                          selected={AllowedOperator.Value === item.Operator}
                                        >
                                          {AllowedOperator.Caption}
                                        </option>
                                      )
                                    )}
                                </select>
                                {segmentFourFieldsNotRequired.includes(item.Operator) ? (
                                  ''
                                ) : (
                                  <>
                                    {fieldControl.length > 0 && fieldControl[i] && SegmentExpression[i].Operator && (
                                      <div>
                                        <FormikControl
                                          control={fieldControl[i]}
                                          id={`SegmentExpression[${i}].Value`}
                                          name={`SegmentExpression[${i}].Value`}
                                          value={SegmentExpression[i].Value}
                                          placeholder={`SegmentExpression[${i}].Value`}
                                          handleChange={handleChange}
                                          setFieldValue={setFieldValue}
                                          options={
                                            fieldControlSelectValue.length > 0
                                              ? fieldControlSelectValue[i] && fieldControlSelectValue[i].length > 0
                                                ? fieldControlSelectValue[i]
                                                : []
                                              : []
                                          }
                                        />
                                      </div>
                                    )}
                                  </>
                                )}
                                {SegmentExpression.length > 1 && !(i + 1 === SegmentExpression.length) && (
                                  <SegmentExpressionSeparator
                                    value={values.Condition}
                                    setFieldValue={setFieldValue}
                                    name={`SegmentExpression[${i}].Condition`}
                                  />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-end mt-auto p-2 items-center border-t w-full h-[56px]">
                          <button
                            type="button"
                            onClick={() => isValid && previewHandle(values)}
                            disabled={!isValid && isSubmitting}
                            className={`w-1/2 lg:w-auto px-4 py-2 rounded mr-4 ${!isValid || isSubmitting
                              ? 'bg-jg-metal-50 text-jg-metal-200'
                              : 'bg-jg-green-500 text-white'
                              }  text-[14px]`}
                          >
                            {isSubmitting ? 'Loading...' : 'Preview'}
                          </button>

                          <button
                            disabled={!isValid && isSubmitting}
                            type="submit"
                            className={`w-1/2 lg:w-auto px-4 py-2 rounded ${!isValid || isSubmitting
                              ? 'bg-jg-metal-50 text-jg-metal-200'
                              : 'bg-jg-green-500 text-white'
                              }  text-[14px]`}
                          >
                            {isSubmitting ? 'Saving...' : 'Save'}
                          </button>
                        </div>
                      </div>
                    </>
                  )
                }}
              </FieldArray>
            </Form>
          </>
        )}
      </Formik>
    </div>
  )
}

export default CreateSegment
