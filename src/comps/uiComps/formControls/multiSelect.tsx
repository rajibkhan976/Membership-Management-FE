import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { selectProps } from '@comps/uiComps/formControls/types'
import isJson from '@jg/utils/JsonValidator'
const animatedComponents = makeAnimated()

const MultiSelect = ({ options, name, setFieldValue, value }: selectProps) => {
  const items: { label: string; value: any }[] = options.map((item) => {
    return {
      label: item.Caption,
      value: item.Value,
    }
  })

  const defaultValues: { label: string; value: string }[] = value && isJson(value)
    ? JSON.parse(value).map((v: any) => items.find((item) => item.value == v)) : []


  return (
    <Select
      unstyled
      value={defaultValues}
      components={animatedComponents}
      classNames={{
        control: () => 'w-[200px] md:w-[300px] border text-jg-grey-700 px-2 text-[14px] font-normal bg-white',
        option: () => ' text-jg-grey-700 px-2 py-1 text-[14px] font-normal bg-white',
        multiValue: () => 'mx-1 px-1 bg-jg-grey-100',
      }}
      options={items}
      closeMenuOnSelect={false}
      isMulti
      onChange={(option) => {
        const value = option.length > 0 ? option.map((i) => i.value) : undefined
        if (setFieldValue) {
          setFieldValue(name, JSON.stringify(value))
        }
      }}
      className="basic-multi-select"
      classNamePrefix="select"
    // styles={colourStyles}
    />
  )
}

export default MultiSelect
