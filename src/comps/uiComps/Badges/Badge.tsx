import classNames from 'classnames'
const solidCls = {
  primary: 'bg-primary-default text-white',
  secondary: 'bg-secondary-default text-white',
  success: 'bg-success-default text-white',
  error: 'bg-error-default text-white',
  warning: 'bg-warning-default text-white',
  info: 'bg-info-default text-white',
  complementary: 'bg-complementary-default text-white',
  grey: 'bg-jg-grey-900 text-white',
}

const fadedCls = {
  primary: 'bg-jg-green-50 text-primary-default',
  secondary: 'bg-jg-metal-50 text-secondary-default',
  success: 'bg-jg-green-50 text-success-default',
  error: 'bg-jg-red-50 text-error-default',
  warning: 'bg-jg-yellow-50 text-warning-default',
  info: 'bg-jg-blue-50 text-info-default',
  complementary: 'bg-jg-violet-50 text-complementary-default',
  grey: 'bg-jg-grey-300 text-bg-jg-grey-900',
}

const plainCls = {
  primary: 'text-primary-default',
  secondary: 'text-secondary-default',
  success: 'text-success-default',
  error: 'text-error-default',
  warning: 'text-warning-default',
  info: 'text-info-default',
  complementary: 'text-complementary-default',
  grey: 'text-bg-jg-grey-900',
}

const SIZE = {
  xs: 'py-0.5 px-1 !text-[11px]',
  sm: 'py-1 px-1.5 font-medium',
  md: 'py-1.5 px-2.5',
  lg: 'py-2 px-3',
  xl: 'py-2.5 px-3.5',
}

export type BadgeProps = {
  label?: string
  className?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  fillType?: 'solid' | 'faded' | 'plain'
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'complementary' | 'grey'
  rounded?: boolean
}
const Badge: React.FC<BadgeProps> = ({
  label = 'Free',
  className = '',
  size = 'sm',
  variant = 'primary',
  fillType = 'solid',
  rounded = false,
}) => {
  const fillCls = {
    solid: solidCls[variant],
    faded: fadedCls[variant],
    plain: plainCls[variant],
  }
  const btnCls = classNames(
    fillCls[fillType],
    SIZE[size],
    { 'rounded-full': rounded },
    { 'rounded-sm': !rounded },
    className
  )
  return <span className={'inline-flex items-center text-xs font-light leading-4 ' + btnCls}>{label}</span>
}

export default Badge
