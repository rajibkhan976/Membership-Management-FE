import { CompBaseProps } from '../_base/types/CompBaseProps'

function DropdownItemGroup({ children }: CompBaseProps) {
  return (
    <div className="space-y-1" role="none">
      {children}
    </div>
  )
}
export default DropdownItemGroup
