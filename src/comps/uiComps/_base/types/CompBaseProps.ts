export type CompBaseProps = {
  name?: string
  className?: string
  id?: string
  children?: import('react').ReactNode
  as?: React.ElementType<any>
}

export type FieldBaseProps = CompBaseProps & {
  label?: string
  hideLabel?: boolean
  fieldsize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  value?: any
  children?: never
  labelPosition?: 'top' | 'left'
  labelWidth?: number | string
  disabled?: boolean
  helpText?: string | JSX.Element
  // hideBorder?: boolean;
  onValueChange?: (value: string | number | boolean | any[]) => void
  readOnly?: boolean
}
