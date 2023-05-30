import { useFormContext, Validate, Controller } from 'react-hook-form'
import { CheckBoxGroup, TextAreaInput, TextInput } from '..'
import Checkbox from '../Checkbox/Checkbox'
import ListBox from '../ListBox/ListBox'
import { CheckboxGroupProps, GenericFieldType, TextFieldProps } from '../types'

const GenericField = ({
  type,
  props,
  validation,
}: GenericFieldType & { validation?: Record<string, Validate<unknown>> }) => {
  const methods = useFormContext() || { register: () => ({}) } // Why??? ans: So that our component works without react-hook-form
  const {
    register,
    formState: { errors },
    control,
  } = methods

  let Input: JSX.Element

  const fieldName = props.name || props.label || type
  const registerObj = {
    ...register(fieldName, { validate: validation }),
  }
  const statusFromHere = errors[props.name || ''] ? 'error' : 'normal'
  const statusFromProps = (props as TextFieldProps).status
  const status = statusFromProps || statusFromHere

  const isHelpTextDisable = Object.keys(props).includes('helpText') && !props['helpText'] && ' '
  const helpTextFromProps = (props as TextFieldProps).helpText
  const helpTextFromHere = errors[props.name || '']?.message as string
  const helpText = isHelpTextDisable || helpTextFromProps || helpTextFromHere

  switch (type) {
    case 'TextField':
      Input = <TextInput {...{ ...(props as TextFieldProps), ...registerObj, status, helpText }} />
      break
    case 'TextArea':
      Input = <TextAreaInput {...{ ...props, ...registerObj, status, helpText }} />
      break
    case 'Checkbox':
      Input = <Checkbox {...{ ...props, ...registerObj }} />
      break
    case 'CheckboxGroup':
      Input = <CheckBoxGroup {...{ ...(props as CheckboxGroupProps), ...registerObj }} />
      break
    case 'DateField':
      Input = <TextInput {...{ ...props, type: 'date', ...registerObj }} />
      break
    case 'ListBox':
      Input = (
        <Controller
          name={fieldName}
          control={control}
          defaultValue={props.selected.name}
          render={({ field }) => {
            return (
              <ListBox
                {...{
                  ...props,
                  handleChange: (el) => field.onChange(el.name),
                  selected: props.items?.filter((i) => i.name === field.value)[0] || props.selected,
                }}
              />
            )
          }}
        />
      )
      break
    default:
      Input = <TextInput {...{ ...(props as TextFieldProps), ...registerObj }} />
  }
  return Input
}

export default GenericField
