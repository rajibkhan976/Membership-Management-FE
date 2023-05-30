export interface SegmentInitialValue {
  SegmentId: number
  OwningEntityIdSyncGuid: string
  Title: string
  SegmentExpression: SegmentExpressionType[]
  DeleteSegment: number
  Condition: string | 'and' | 'or' | ''
  Description: string | null
  SegmentStatus: number
}

export interface SegmentExpressionType {
  FieldId: number
  RuleType: string
  Field: string
  Value: string
  Operator: string
  Condition?: string | 'and' | 'or' | ''
}
