import './style.css'

export type TooltipProps = {
  className?: string
  children?: React.ReactNode
  title?: string
  position?: 'top' | 'bottom' | 'left' | 'right'
}

const Tooltip = (props: TooltipProps): React.ReactElement => {
  const { children, title, position } = props
  return (
    <div className="flex">
      <div className="tooltip" data-position={position} data-tool-tip={title}>
        {children}
      </div>
    </div>
  )
}

export default Tooltip
