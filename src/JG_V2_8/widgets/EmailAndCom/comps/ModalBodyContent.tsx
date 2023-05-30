import moment from 'moment'
import { useEffect, useState } from 'react'
import Checkbox from '@comps/uiComps/forms/Checkbox/Checkbox'
import CheckboxGroup from '@comps/uiComps/forms/CheckboxGroup/CheckboxGroup'
import type { ModalBodyContentsProps } from '../interfaces/interfaces'

const ModalBodyContent = ({
  values,
  items,
  hasCheckBox,
  hasRadioBtn,
  radioItems,
  handleChangeAddRecepient,
  handleChangeAddOptins,
  handleCheckOptinIsIncluded,
  setOpenModal,
}: ModalBodyContentsProps) => {
  const [checkedOptins, setCheckedOptins] = useState<number[]>([])
  // console.log('🚀 ~ file: ModalBodyContent.tsx:19 ~ checkedOptins', checkedOptins)

  // useEffect(() => {
  //   setCheckedOptins(values ? values : [])
  // }, [values])

  const handleCheckOptin = (event: any, index: number, id: number) => {
    if (event && !checkedOptins.includes(index)) {
      setCheckedOptins([...checkedOptins, index])
      handleChangeAddOptins && handleChangeAddOptins(id)
    }
    if (!event && checkedOptins.includes(index)) {
      setCheckedOptins(checkedOptins.filter((element) => element !== index))
      handleChangeAddOptins && handleChangeAddOptins(id)
    }
  }
  console.log('🚀 ~ file: ModalBodyContent.tsx:38 ~ values', values)

  return (
    <>
      {items &&
        Array.isArray(items) &&
        items.map((item, index) => (
          <div
            className={`w-full flex flex-col md:flex-row text-sm pl-2 py-3 border-b ${
              hasCheckBox ? '' : 'cursor-pointer'
            }`}
            key={index}
            onClick={() => {
              !hasCheckBox && handleChangeAddRecepient && handleChangeAddRecepient(item)
              !hasCheckBox && setOpenModal && setOpenModal(false)
            }}
          >
            <div className="w-full md:w-8/12">
              {hasCheckBox ? (
                <Checkbox
                  id={item.id}
                  fieldsize="sm"
                  label={item.name}
                  value={values && values?.length > 0 && values[index]?.OptInId === item.id}
                  name={item.id}
                  onValueChange={(event) => handleCheckOptin(event, index, item.id)}
                />
              ) : (
                <span
                  className="w-11/12 inline-block align-top ml-2 mt-0.5"
                  onClick={() => setOpenModal && setOpenModal(false)}
                >
                  {item.title}
                </span>
              )}
            </div>
            {item.lastUpdated && (
              <div className="w-full md:w-4/12 text-jg-grey-500 font-semibold flex ml-2 md:justify-center">
                {moment(item.lastUpdated).format('DD MMM YYYY, h:mm a')}
              </div>
            )}
            {hasRadioBtn && Array.isArray(radioItems) && (
              <div className="w-full md:w-4/12">
                <CheckboxGroup
                  orientation="horizontal"
                  fieldsize="sm"
                  items={radioItems}
                  // isIncluded = {values?.IsIncluded}
                  // value={values}
                  type="radio"
                  onValueChange={(e) => handleCheckOptinIsIncluded && handleCheckOptinIsIncluded(e, item.id)}
                />
              </div>
            )}
          </div>
        ))}
    </>
  )
}

export default ModalBodyContent
