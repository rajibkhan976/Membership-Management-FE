import { CompBaseProps } from '@comps/uiComps/_base/types/CompBaseProps'
import { addressInfo } from '@jg/common/types'

export type AddressInfoProps = CompBaseProps & {
  address?: addressInfo
  format?: (address?: addressInfo) => JSX.Element
}
