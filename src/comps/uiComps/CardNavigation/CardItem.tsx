import { Tab } from '@headlessui/react'
import classNames from 'classnames'
import Button from '../Button/Button'
import { CompBaseProps } from '../_base/types/CompBaseProps'

export type CardItemProps = CompBaseProps & {
  cardName?: string | number
  title?: string
  icon?: React.ReactElement
  active?: boolean
  selected?: boolean
}
const CardItem = ({ title, icon, active, selected }: CardItemProps) => {
  return (
    <Button
      as="span"
      state={active ? 'active' : 'default'}
      btnSize="lg"
      btnColor={selected ? 'primary' : 'secondary'}
      block
      fillType="outline"
      icon={icon}
      text={title}
      className={classNames('ring-0 py-1.5 font-medium', selected ? '' : 'text-jg-metal-700')}
    />
  )
}
export default CardItem
