import { CompBaseProps } from '@comps/uiComps'
import classNames from 'classnames'

const FlexColumns = ({ children, className }: CompBaseProps) => {
  return <div className={classNames('flex flex-row', className)}>{children}</div>
}

const FlexColumn = ({ children, className }: CompBaseProps) => {
  return <div className="flex flex-col md:flex-row">{children}</div>
}
export default FlexColumns
