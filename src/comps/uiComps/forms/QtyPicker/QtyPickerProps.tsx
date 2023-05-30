import { FieldBaseProps } from '../../_base/types/CompBaseProps'
// import { QtyPickerArgs } from "./QtyPickerArgs";
// import { QtyPickerItem } from "./QtyPickerItem";

export type QtyPickerProps = FieldBaseProps & {
  //max?: number
  //min?: number
  value: number
  disabledMin?: boolean
  disabledMax?: boolean
  onChange: (value: number) => void
}
