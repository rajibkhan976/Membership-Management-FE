import { AllowedValuesInterface } from '@comps/uiComps/CreateSegment/interfaces/allowedValues.interface'

export interface FieldData {
  Id: number
  RuleType: string
  Caption: string
  TargetField: string
  Types: string
  AllowedValues: AllowedValuesInterface[]
}
