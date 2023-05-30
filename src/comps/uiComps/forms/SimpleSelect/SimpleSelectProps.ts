import { FieldBaseProps } from '../../_base/types/CompBaseProps'
import { SimpleSelectArgs } from './SimpleSelectArgs'
import { SimpleSelectItem } from './SimpleSelectItem'

export type SimpleSelectProps = FieldBaseProps & {
  onSelect?: (args: SimpleSelectArgs) => void
  items?: SimpleSelectItem[]
  hideBorder?: boolean
  asterisk?: boolean
  placeholder?: string
  defaultValue?: string | number
  hidePlaceholderOption?: boolean
  status?: 'normal' | 'success' | 'error'
  helpText?: React.ReactNode
}
