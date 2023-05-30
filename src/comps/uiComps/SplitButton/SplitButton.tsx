import classNames from 'classnames'
import Button from '../Button/Button'
import Dropdown from '../Dropdown/Dropdown'
import DropdownItem from '../Dropdown/DropdownItem'
import { CompBaseProps } from '../_base/types/CompBaseProps'

export type SplitButtonItem = {
  text?: string
  name?: string
  icon?: import('react').ReactNode
  disabled?: boolean
}
export type SplitButtonProps = CompBaseProps & {
  text?: string
  btnSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  fillType?: 'solid' | 'outline'
  btnColor?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'complementary'
  // rounded?: boolean
  disabled?: boolean
  onClick?: (name?: string, index?: number) => void
  children?: never
  items?: SplitButtonItem[]
  // icon?: import('react').ReactNode,
  // iconPosition?:'left' | 'right',
}

function SplitButton(props: SplitButtonProps) {
  const {
    text,
    btnSize = 'md',
    fillType = 'solid',
    btnColor = 'primary',
    disabled,
    items = [],
    onClick = () => {},
  } = props

  const setColorCls = {}
  const sepBorderCls = {
    primary: 'bg-primary-t-0 border-primary-default',
    secondary: ' bg-primary-t-0 border-secondary-default',
    success: ' bg-primary-t-0 border-success-default',
    error: ' bg-primary-t-0 border-error-default',
    warning: ' bg-primary-t-0 border-warning-default',
    info: 'bg-primary-t-0 border-info-default',
    complementary: 'bg-primary-t-0 border-complementary-default',
  }
  const sepClass = classNames(
    'relative  z-10 w-[1px] border-t-[5px] border-b-[5px] -ml-[2px]',
    fillType == 'solid' ? sepBorderCls[btnColor] : `bg-${btnColor}-default border-white`
  )

  const primaryBtnItem = items[0]
  return (
    <div className="inline-flex relative">
      <Button
        disabled={disabled}
        className="relative z-0 rounded-tr-[0px] rounded-br-[0px]"
        btnSize={btnSize}
        btnColor={btnColor}
        fillType={fillType}
        text={primaryBtnItem.text}
        icon={primaryBtnItem.icon}
        onClick={(e) => {
          onClick(primaryBtnItem.name, 0)
        }}
      />
      <span className={sepClass} />
      <Dropdown
        disabled={disabled}
        btnSize={btnSize}
        btnColor={btnColor}
        fillType={fillType}
        text=""
        className="rounded-tl-[0px] rounded-bl-[0px] relative  z-0"
        onSelect={(value, index) => {
          onClick(value, index + 1)
        }}
      >
        {items.map((e, index) => {
          if (index > 0) return <DropdownItem icon={e.icon} name={e.text} value={e.name} />
        })}
      </Dropdown>
    </div>
  )
}
export default SplitButton
