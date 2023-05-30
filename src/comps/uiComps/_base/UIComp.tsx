interface IComp {
  name: string
  className: string
}

export interface IField extends IComp {
  label?: string
  value?: any
  placeHolder: string
  bind: object
  onChange: () => void
}

export interface IButton extends IComp {
  size: 'normal'
  icon?: string
  text?: string
  rounded?: boolean
  type: string
  onClick: () => void
}

export interface Props {
  forceOpen?: boolean
  hideImage?: boolean
}

export default IComp
