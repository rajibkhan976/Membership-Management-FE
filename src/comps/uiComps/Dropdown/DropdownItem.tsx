import Button from '../Button/Button'
import { CompBaseProps } from '../_base/types/CompBaseProps'

export type DropdownItemProps = CompBaseProps & {
  name?: string
  value?: any
  icon?: import('react').ReactNode
  groupName?: string
  active?: boolean
}
export function DropdownItem(props: DropdownItemProps) {
  const { name, icon, children, active } = props
  if (children) return <>{children}</>
  return (
    <Button state={active ? 'active' : 'default'} icon={icon} fillType="plain" block btnColor="secondary" text={name} />
  )
}
export default DropdownItem
