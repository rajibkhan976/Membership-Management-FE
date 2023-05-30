import { CompBaseProps } from '@comps/uiComps/_base/types/CompBaseProps'
import { entityInfo } from '@jg/common/types'

export type EntityInfoProps = CompBaseProps & {
  entityInfo?: entityInfo
  subTitle?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  nameClass?: string
  subTitleClass?: string
}
