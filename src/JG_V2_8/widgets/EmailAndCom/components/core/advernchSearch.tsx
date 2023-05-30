import { AdvanchSearchvalidationSchema } from '@comps/uiComps/CreateSegment/validation/validationSchema'
import MinusIcon from '@comps/uiComps/Icons/SVG/MinusIcon'
import Plus from '@comps/uiComps/Icons/SVG/Plus'
import CloseIcon from '@comps/uiComps/Icons/SVG/closeIcon'
import { useEmailHistory } from '@comps/uiComps/SegmentList/store/emailHistory'
import { FormikControl } from '@comps/uiComps/formControls/FormikControl'
import { FieldArray, Form, Formik } from 'formik'
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { segmentFourFieldsNotRequired } from '../../../../../constant'
import { FieldType } from '../../enum'
import { useEmailHistoryMetaData } from '../../store/EmailHIstoryMetaData'

const AdvarchSearch = ({ setOpenSearch }: any) => {
  const { clubDocId } = useParams()
  const selectRefFirstField = useRef<any>([])
  const selectRefSecondField = useRef<any>([])
  const getHistory = useEmailHistory(({ getHistory }) => getHistory)
  const setPageNumber = useEmailHistory(({ setPageNumber }) => setPageNumber)
  const setAdvancedSearchData = useEmailHistory(({ setAdvancedSearchData }) => setAdvancedSearchData)
  const setEmailHistoryNull = useEmailHistory(({ setEmailHistoryNull }) => setEmailHistoryNull)
  const isLoading = useEmailHistory(({ isLoading }) => isLoading)
  const [secondFieldData, setSecondFieldData] = useState<any[] | []>([])
  const [fieldControl, setFieldControl] = useState<string[]>([])
  const [fieldControlx, setFieldControlx] = useState<string[]>([])
  const [fieldControlSelectValue, setFieldControlSelectValue] = useState<any[] | []>([])

  const fetch = useEmailHistoryMetaData(({ fetch }) => fetch)
  const items = useEmailHistoryMetaData(({ items }) => items)
  useEffect(() => {
    clubDocId && fetch(clubDocId)
  }, [clubDocId])

  const initialValues: any = {
    SegmentExpression: [
      {
        RuleType: 'Marketing,Operation',
        FieldId: 0,
        Field: '',
        Operator: '',
        Value: '',
        Condition: 'and',
      },
    ],
  }

  const onSubmit = useCallback(
    async (values: any) => {
      const fixedValue = [
        {
          RuleType: 'Marketing,Operation',
          FieldId: 0,
          Field: 'OwningEntityId,Ownerid',
          Operator: 'equal',
          Value: clubDocId,
          Condition: 'and',
        },
        {
          RuleType: 'Marketing,Operation',
          FieldId: 0,
          Field: 'EmailAddress,To',
          Operator: 'having',
          Value: '',
          Condition: 'and',
        },
      ]
      const concatItems = fixedValue.concat(values.SegmentExpression)
      const finalResult = concatItems.map((item, i) => {
        if (concatItems.length === i + 1) {
          item.Condition = ''
        } else {
          item.Condition = 'and'
        }
        return item
      })
      clubDocId && getHistory(finalResult, 1, true)
      setPageNumber(1)
      setAdvancedSearchData && setAdvancedSearchData(finalResult)
    },
    [clubDocId]
  )

  return (
    <Formik initialValues={initialValues} validationSchema={AdvanchSearchvalidationSchema} onSubmit={onSubmit}>
      {({ values, handleChange, setFieldValue, isSubmitting, errors, isValid, resetForm }) => (
        <>
          <Form>
            <FieldArray name="SegmentExpression">
              {({ push, remove, form }) => {
                return (
                  <div className="w-full shadow top-0 left-0 z-10 bg-white">
                    <div className="p-4 flex items-center justify-between text-sm leading-4 font-medium text-[#263238]">
                      <div className="">Advance Search</div>
                      <div className="flex gap-4 items-center">
                        <button
                          className="cursor-pointer text-[#4CAF4F]"
                          type="reset"
                          onClick={() => {
                            setFieldControl([])
                            selectRefSecondField.current[0].value = ''
                            selectRefFirstField.current[0].value = ''
                            setFieldControlSelectValue([])
                            resetForm()
                            setEmailHistoryNull && setEmailHistoryNull()
                          }}
                        >
                          Clear All
                        </button>
                        <div className="cursor-pointer" onClick={() => setOpenSearch(false)}>
                          <CloseIcon width={16} height={16} />
                        </div>
                        {/* {JSON.stringify(values)} */}
                      </div>
                    </div>
                    {values.SegmentExpression.map((item: any, i: number) => (
                      <div className="grid md:flex items-center gap-2 border-t border-b px-4 py-2" key={i}>
                        <div className="min-w-[350px]">
                          <select
                            ref={(el) => (selectRefFirstField.current[i] = el)}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                              selectRefSecondField.current[i].value = '' // value clean
                              fieldControl[i] = '' // value clean
                              fieldControlSelectValue[i] = [] // value clean
                              setFieldValue(`SegmentExpression[${i}].Value`, '')
                              const jsonValues = JSON.parse(e.target.value)
                              const tempSecondFiled = secondFieldData
                              const tempFieldControlx = fieldControlx
                              const tempFieldControlSelectValue = fieldControlSelectValue
                              setFieldValue(`SegmentExpression[${i}].Field`, jsonValues.TargetField)
                              const typeOperator = items?.TypeOperators.find(
                                (l: any) => l.DataType === jsonValues.Types
                              )
                              if (typeOperator) {
                                tempSecondFiled[i] = typeOperator.AllowedOperators
                                setSecondFieldData(tempSecondFiled)
                              }
                              tempFieldControlx[i] = jsonValues.Types
                              tempFieldControlSelectValue[i] = jsonValues.AllowedValues
                              setFieldControlx(tempFieldControlx)
                              setFieldControlSelectValue(tempFieldControlSelectValue)
                            }}
                            className="shadow-none outline-none w-full border rounded-sm border-[#ECEFF1] px-3 py-2 text-[13px] text-[#455A64] font-medium leading-4 disabled:bg-[#ECEFF1] disabled:text-[#B0BEC5]"
                          >
                            <option value="">Select any one</option>
                            {items &&
                              items.Fields &&
                              items.Fields.length > 0 &&
                              items.Fields.map((item, i) => (
                                <option value={JSON.stringify(item)} key={i}>
                                  {item.Caption}
                                </option>
                              ))}
                          </select>
                        </div>
                        <div className="min-w-[250px]">
                          <select
                            ref={(el) => (selectRefSecondField.current[i] = el)}
                            onChange={(e) => {
                              const tempFieldControl = fieldControl
                              const jsonItem = JSON.parse(e.target.value)
                              const tempFieldControlSelectValue = fieldControlSelectValue
                              // START: This Check For Between check

                              if (jsonItem.AllowedValues && jsonItem.AllowedValues.length > 0) {
                                tempFieldControl[i] = FieldType.SELECT
                                tempFieldControlSelectValue[i] = jsonItem.AllowedValues
                              } else {
                                if (jsonItem.Value === FieldType.DATE_BETWEEN) {
                                  tempFieldControl[i] = FieldType.DATE_BETWEEN
                                } else {
                                  if (jsonItem.Value === FieldType.BETWEEN && fieldControlx[i] === 'int') {
                                    tempFieldControl[i] = FieldType.INT_BETWEEN
                                  } else if (jsonItem.Value === FieldType.BETWEEN && fieldControlx[i] === 'currency') {
                                    tempFieldControl[i] = FieldType.CURRENCY_BETWEEN
                                  } else if (jsonItem.Value === FieldType.BETWEEN && fieldControlx[i] === 'decimal') {
                                    tempFieldControl[i] = FieldType.DECIMAL_BETWEEN
                                  } else {
                                    tempFieldControl[i] = fieldControlx[i]
                                  }
                                }
                              }
                              // END:
                              setFieldValue(`SegmentExpression[${i}].Operator`, jsonItem.Value)
                              tempFieldControlSelectValue[i] =
                                jsonItem.AllowedValues.length > 0 ? jsonItem.AllowedValues : fieldControlSelectValue[i]
                              setFieldControlSelectValue(tempFieldControlSelectValue)
                              setFieldControl(tempFieldControl)
                            }}
                            className="shadow-none outline-none w-full border rounded-sm border-[#ECEFF1] px-3 py-2 text-[13px] text-[#455A64] font-medium leading-4"
                            disabled={!secondFieldData || secondFieldData.length < 1}
                          >
                            <option value="">Select Any One</option>
                            {secondFieldData.length > 0 &&
                              secondFieldData[i] &&
                              secondFieldData[i].length > 0 &&
                              secondFieldData[i].map((sf: any, s: number) => (
                                <option value={JSON.stringify(sf)} key={s}>
                                  {sf.Caption}
                                </option>
                              ))}
                          </select>
                        </div>
                        <div className="w-2/6">
                          {segmentFourFieldsNotRequired.includes(item.Operator) ? (
                            ''
                          ) : (
                            <>
                              {fieldControl.length > 0 &&
                                fieldControl[i] &&
                                secondFieldData &&
                                secondFieldData.length > 0 &&
                                secondFieldData[i] && (
                                  <FormikControl
                                    control={fieldControl[i]}
                                    id={`d`}
                                    name={`SegmentExpression[${i}].Value`}
                                    value={values.SegmentExpression[i].Value}
                                    placeholder={`SegmentExpressionValue`}
                                    handleChange={handleChange}
                                    setFieldValue={setFieldValue}
                                    className="border"
                                    options={
                                      fieldControlSelectValue.length > 0
                                        ? fieldControlSelectValue[i] && fieldControlSelectValue[i].length > 0
                                          ? fieldControlSelectValue[i]
                                          : []
                                        : []
                                    }
                                  />
                                )}
                            </>
                          )}
                        </div>
                        <div
                          className={`flex ${values.SegmentExpression.length < 2
                            ? 'text-jg-metal-200 cursor-not-allowed'
                            : 'text-[#EF5350] cursor-pointer'
                            }`}
                          onClick={() => i > 0 && remove(i)}
                        >
                          <MinusIcon />
                        </div>
                      </div>
                    ))}

                    <div className="p-4 flex items-center justify-between text-sm leading-4 font-medium text-[#263238]">
                      {isValid ? (
                        <div className="flex items-center gap-2 cursor-pointer text-[#4CAF4F]">
                          <div className="flex">
                            <Plus width={10} height={10} />
                          </div>
                          <div
                            className=""
                            onClick={() =>
                              push({
                                RuleType: 'Marketing,Operation',
                                FieldId: 0,
                                Field: '',
                                Operator: '',
                                Value: '',
                                Condition: 'and',
                              })
                            }
                          >
                            Add filter
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 cursor-pointer text-jg-metal-200">
                          <div className="flex">
                            <Plus width={10} height={10} />
                          </div>
                          <div>Add filter</div>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <button
                          disabled={isSubmitting || !isValid || isLoading}
                          type="submit"
                          className={`text-white ${isSubmitting || !isValid || isLoading
                            ? 'bg-jg-metal-50 text-jg-metal-200'
                            : 'bg-jg-green-500 text-white'
                            }  py-2 px-4 text-sm font-medium rounded`}
                        >
                          {isSubmitting ? 'Searching...' : 'Search'}
                        </button>
                      </div>
                    </div>
                  </div>
                )
              }}
            </FieldArray>
          </Form>
        </>
      )}
    </Formik>
  )
}

export default AdvarchSearch
