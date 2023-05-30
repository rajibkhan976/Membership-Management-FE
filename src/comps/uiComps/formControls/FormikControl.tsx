/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldType } from '@jg/widgets/EmailAndCom/enum'
import Input from './input'
import MultiSelect from './multiSelect'
import Radio from './radio'
import Select from './select'
import type { controlProps } from './types'
import Textarea from '@comps/uiComps/formControls/textarea'
import InputDatePickerRange from '@comps/uiComps/formControls/inputDatePickerRange'
import CurrencyRange from '@comps/uiComps/formControls/CurrencyRange'

export function FormikControl({ control, ...rest }: controlProps) {
  switch (control) {
    case 'number':
      return (
        <Input
          name={rest.name}
          value={rest.value || ''}
          label={rest.label || 'new'}
          id={rest.name}
          type="number"
          handleChange={rest.handleChange}
        />
      )
    case FieldType.INT_FIELD:
      return (
        <Input
          name={rest.name}
          value={rest.value || ''}
          label={rest.label || 'new'}
          id={rest.name}
          type="number"
          handleChange={rest.handleChange}
        />
      )
    case FieldType.INT_BETWEEN:
      return (
        <CurrencyRange
          name={rest.name}
          value={rest.value || ''}
          label={rest.label || 'new'}
          id={rest.name}
          setFieldValue={rest.setFieldValue}
        />
      )
    case FieldType.DECIMAL_BETWEEN:
      return (
        <CurrencyRange
          name={rest.name}
          value={rest.value || ''}
          label={rest.label || 'new'}
          id={rest.name}
          setFieldValue={rest.setFieldValue}
        />
      )
    case FieldType.CURRENCY_BETWEEN:
      return (
        <CurrencyRange
          name={rest.name}
          value={rest.value || ''}
          label={rest.label || 'new'}
          id={rest.name}
          setFieldValue={rest.setFieldValue}
        />
      )
    case 'text':
      return (
        <Input
          name={rest.name}
          value={rest.value || ''}
          label={rest.label || 'new'}
          id={rest.name}
          handleChange={rest.handleChange}
          type="text"
          className={rest.className}
        />
      )
    case FieldType.TEXTAREA:
      return (
        <Textarea
          name={rest.name}
          value={rest.value || ''}
          label={`${rest.placeholder}`}
          id={'id'}
          handleChange={rest.handleChange}
          className={rest.className}
        />
      )
    case 'select':
      return (
        <Select
          disabled={false}
          id={rest.id}
          name={rest.name}
          value={rest.value || ''}
          onChange={rest.handleChange}
          setFieldValue={rest.setFieldValue}
          options={rest.options || []}
        />
      )
    case FieldType.SELECT_MULTIPLE:
      return (
        <MultiSelect
          id={rest.id}
          name={rest.name}
          onChange={rest.handleChange}
          setFieldValue={rest.setFieldValue}
          options={rest.options || []}
          disabled={false}
          value={rest.value}
        />
      )
    case FieldType.JSON_MULTISELECT:
      return (
        <MultiSelect
          id={rest.id}
          name={rest.name}
          onChange={rest.handleChange}
          setFieldValue={rest.setFieldValue}
          options={rest.options || []}
          disabled={false}
          value={rest.value}
        />
      )
    case FieldType.AGG_MULTISELECT:
      return (
        <MultiSelect
          id={rest.id}
          name={rest.name}
          onChange={rest.handleChange}
          setFieldValue={rest.setFieldValue}
          options={rest.options || []}
          disabled={false}
          value={rest.value}
        />
      )
    case 'radio':
      return <Radio label={'label'} id={'id'} />
    case 'checkbox':
      return (
        <Input
          name={rest.name}
          value={rest.value || ''}
          label={'label'}
          id={'id'}
          handleChange={rest.handleChange}
          type="text"
          className={rest.className}
        />
      )
    case FieldType.DATE:
      return (
        <Input
          name={rest.name}
          value={rest.value || ''}
          label={'label'}
          id={'id'}
          handleChange={rest.handleChange}
          type="date"
          className={rest.className}
        />
      )
    case FieldType.DATE_BETWEEN:
      return (
        <InputDatePickerRange
          name={rest.name}
          value={rest.value || ''}
          label={'label'}
          id={'id'}
          setFieldValue={rest.setFieldValue}
        />
      )
    case FieldType.MONTH_AND_DAY_IS:
      return (
        <Input
          name={rest.name}
          value={rest.value || ''}
          label={'label'}
          id={'id'}
          handleChange={rest.handleChange}
          type="date"
          className={rest.className}
        />
      )
    case 'datetime':
      return (
        <Input
          name={rest.name}
          value={rest.value || ''}
          label={'label'}
          id={'id'}
          handleChange={rest.handleChange}
          type="datetime-local"
          className={rest.className}
        />
      )
    default:
      return null
  }
}
