import classNames from 'classnames'
import Button from '../Button/Button'
import { CompBaseProps } from '../_base/types/CompBaseProps'

export type JGListboxItemProps = CompBaseProps & {
  value?: string | number
  name?: string
  icon?: import('react').ReactNode
  active?: boolean
  selected?: boolean
}
const JGListboxItem = ({ name, icon, active, selected }: JGListboxItemProps) => {
  return (
    <Button
      state={active ? 'active' : 'default'}
      btnSize="lg"
      btnColor={selected ? 'primary' : 'secondary'}
      block
      fillType="plain"
      icon={icon}
      text={name}
      className={classNames('font-medium', selected ? '' : 'text-jg-metal-700')}
    />
  )
}
export default JGListboxItem
