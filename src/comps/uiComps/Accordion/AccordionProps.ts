import { FieldBaseProps } from '../_base/types/CompBaseProps'
import { AccordionItem } from './AccordionItem'

export type AccordionProps = FieldBaseProps & {
  items: AccordionItem[]
  children?: never
}
