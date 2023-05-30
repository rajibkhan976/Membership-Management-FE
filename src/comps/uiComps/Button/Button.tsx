import classNames from 'classnames'
import React from 'react'
import { CompBaseProps } from '../_base/types/CompBaseProps'

// import {color , buttonSize } from "../_base/types";

export type ButtonProps = CompBaseProps & {
  text?: string | import('react').ReactNode
  btnSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  fillType?: 'solid' | 'outline' | 'plain'
  btnColor?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'complementary'
  rounded?: boolean
  disabled?: boolean
  onClick?: (item: ButtonProps) => void
  children?: never
  icon?: import('react').ReactNode
  iconPosition?: 'left' | 'right'
  block?: boolean
  state?: 'default' | 'active'
  textAllign?: 'left' | 'center' | 'right'
}
const sizeCls = {
  xs: 'jg-btn-xs',
  sm: 'jg-btn-sm',
  md: 'jg-btn-md',
  lg: 'jg-btn-lg',
  xl: 'jg-btn-xl',
}
const baseCls = 'jg-btn cursor-pointer'
const solidCls = {
  primary: 'jg-btn-solid-primary',
  secondary: 'jg-btn-solid-secondary',
  success: 'jg-btn-solid-success',
  error: 'jg-btn-solid-error',
  warning: 'jg-btn-solid-warning',
  info: 'jg-btn-solid-info',
  complementary: 'jg-btn-solid-complementary',
}

const outlineCls = {
  primary: 'jg-btn-outline-primary',
  secondary: 'jg-btn-outline-secondary',
  success: 'jg-btn-outline-success',
  error: 'jg-btn-outline-error',
  warning: 'jg-btn-outline-warning',
  info: 'jg-btn-outline-info',
  complementary: 'jg-btn-outline-complementary',
}

const plainCls = {
  primary: 'jg-btn-plain-primary',
  secondary: 'jg-btn-plain-secondary',
  success: 'jg-btn-plain-success',
  error: 'jg-btn-plain-error',
  warning: 'jg-btn-plain-warning',
  info: 'jg-btn-plain-info',
  complementary: 'jg-btn-plain-complementary',
}

const Button = React.forwardRef((props: ButtonProps, ref) => {
  // debugger;
  const {
    as = 'button',
    text = 'Button',
    className = '',
    disabled = false,
    onClick = (item: ButtonProps) => {},
    rounded = false,
    btnColor = 'primary',
    btnSize = 'md',
    fillType = 'solid',
    iconPosition = 'left',
    block = false,
    state = 'default',
    icon,
    children,
    textAllign = 'left',
    ...rest
  } = props

  const iconsCls = 'inline-flex items-center '
  const fillCls = {
    solid: solidCls[btnColor],
    outline: outlineCls[btnColor],
    plain: plainCls[btnColor],
  }
  const btnCls = classNames(
    baseCls,
    { 'text-center': textAllign === 'center' },
    { 'text-left': textAllign === 'left' },
    { 'text-right': textAllign === 'right' },
    disabled ? 'jg-btn-disabled' : fillCls[fillType],
    sizeCls[btnSize],
    { 'rounded-full': rounded },
    { 'rounded-sm': !rounded },
    icon ? iconsCls : '',
    props.iconPosition === 'right' ? 'items-center' : '',
    className,
    block ? 'w-full' : '',
    state === 'active' ? 'bg-jg-grey-200' : ''
  )

  const WrappingEl = as

  const isIconOnly = !children && !text
  const textCls = isIconOnly ? 'hidden' : classNames(iconPosition === 'right' ? 'mr-1.5' : 'ml-1.5')

  return (
    <WrappingEl
      ref={ref}
      {...rest}
      className={btnCls}
      onClick={() => {
        onClick(props)
      }}
      disabled={disabled}
    >
      {icon ? (
        <>
          {iconPosition === 'right' ? (
            <>
              <span className={textCls}>{children || text}</span>
              <span className="jg-btn-icon">{props.icon}</span>
            </>
          ) : (
            <>
              <span className="jg-btn-icon">{props.icon}</span>
              <span className={textCls}>{children || text}</span>
            </>
          )}
        </>
      ) : (
        <> {children || text} </>
      )}
    </WrappingEl>
  )
})

export default Button
