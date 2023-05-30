import type { Segment } from '@comps/uiComps/SegmentList/types'

export type CreateSegmentProps = {
  segment?: Segment | null | undefined
}

export type SegmentExpressionSeparatorProps = {
  value: string
  setFieldValue?: any
  name?: string
}
