import { CompBaseProps } from '@comps/uiComps'

export type ContentSectionProps = CompBaseProps & {
  heading?: string
  caption?: string
  bgColor?: 'grey' | 'white'
}
