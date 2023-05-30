import { FieldArgs } from '../../_base/types/ArgsBase'
import { SimpleSelectItem } from './SimpleSelectItem'

export type SimpleSelectArgs = FieldArgs & {
  item?: SimpleSelectItem
  index: number
  //data?: Record<string, string>
}
