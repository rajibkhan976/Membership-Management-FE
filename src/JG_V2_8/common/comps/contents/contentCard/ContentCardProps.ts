import { CompBaseProps } from '@comps/uiComps'

export type ContentCardProps = CompBaseProps & {
  heading?: string
  topRightElement?: import('react').ReactNode
  headingClass?: string
  headingContainerClass?: string
  underlineClass?: string
}
