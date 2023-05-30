import { CompBaseProps } from '@comps/uiComps'
import { memo } from 'react'

const WithChildren = ({ children }: CompBaseProps) => {
  return <>{children}</>
}
const FastChildren = memo(WithChildren)
export { WithChildren, FastChildren }
