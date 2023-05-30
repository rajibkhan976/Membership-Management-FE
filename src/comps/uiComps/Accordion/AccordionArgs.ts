import { FieldArgs } from '../_base/types/ArgsBase'
import { AccordionItem } from './AccordionItem'

export type AccordionArgs = FieldArgs & {
  item?: AccordionItem
  index?: number
  data?: Record<string, any>
}
