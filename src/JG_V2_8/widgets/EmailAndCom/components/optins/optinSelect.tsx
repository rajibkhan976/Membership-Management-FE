import { TrashCan } from '@comps/uiComps/Icons'
import { FieldArray } from 'formik'
import { useState } from 'react'
import type { SendEmailInitialValue } from '../../types'

type OptinsComponentsProps = {
  setFieldValue: any
  values: SendEmailInitialValue
  optins: any
  isInclude: boolean
}

const OptinsSelect = ({ setFieldValue, values, optins, isInclude }: OptinsComponentsProps) => {
  const [include, setInclude] = useState<string>('')
  const [isUsed, setIsUsed] = useState<boolean>(false)

  return (
    <>
      <div className="text-[13px] text-[#455A64] font-medium leading-4 mb-2">
        {isInclude ? 'Include' : 'Exclude'} people with the following opt-ins ticked
        <br />
        {isUsed && <span className='text-[#ff0000]'>Optin already used .</span>}
      </div>
      <div className="">
        <div className="flex gap-x-4 items-center mb-4">
          <select
            value={include}
            onChange={(e) => setInclude(e.target.value)}
            className="border px-3 p-2 placeholder-jg-metal-300 text-jg-metal-700 shadow-none focus:outline-none w-full text-[13px] h-8 py-0"
          >
            <option value={''}>Select from the list</option>
            {optins.map((item: any, i: number) => (
              <option
                key={i}
                disabled={values.OptIns.some((el) => el.OptInId === item.Id)}
                value={JSON.stringify({
                  EmailOptInId: 0,
                  EmailId: 0,
                  OptInId: item.Id,
                  IsIncluded: isInclude,
                  Caption: item.Caption,
                })}
                className={'transition-opacity duration-2000 ease-in-out opacity-100 '}
              >
                {item.Caption}
              </option>
            ))}
          </select>
          <button
            onClick={async () => {
              const includeJson = JSON.parse(include)
              if (values.OptIns.length > 0) {
                const x = values.OptIns.find(optin => optin.OptInId === includeJson.OptInId)
                if (x) {
                  setIsUsed(true)
                } else {
                  setIsUsed(false)
                  await setFieldValue(`OptIns[${values.OptIns.length}]`, includeJson)
                }
              } else {
                setIsUsed(false)
                await setFieldValue(`OptIns[${values.OptIns.length}]`, includeJson)
              }
              setInclude('')
            }}
            type="button"
            disabled={!include}
            className="jg-btn disabled:bg-jg-metal-50 disabled:cursor-not-allowed disabled:text-jg-metal-200 cursor-pointer h-8 py-0 text-center jg-btn-solid-primary jg-btn-lg rounded-sm items-center text-[#4CAF4F] bg-[#E8F5E9] border border-[#4CAF4F] hover:text-white hover:bg-[#4CAF4F]"
          >
            Add
          </button>
        </div>

        <FieldArray
          name="OptIns"
          render={(arrayHelpers: any) => (
            <>
              <div className="">
                {values.OptIns &&
                  values.OptIns.length > 0 &&
                  values.OptIns.map((optin: any, index: number) => (
                    <div key={index}>
                      {optin.IsIncluded === isInclude && (
                        <div className="flex items-baseline mb-2 justify-between">
                          <p className="text-[#607D8B] text-[13px] animate-fade-in">{optin.Caption}</p>
                          <div
                            className="flex text-[#E53835] cursor-pointer"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            <TrashCan />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </>
          )}
        />
      </div>
    </>
  )
}

export default OptinsSelect
