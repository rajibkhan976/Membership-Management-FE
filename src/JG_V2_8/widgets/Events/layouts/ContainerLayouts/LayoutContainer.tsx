import { CompBaseProps } from '@comps/uiComps'
import classNames from 'classnames'

const ColumnLayoutColsClass = {
  '1': 'grid-cols-1',
  '2': 'grid-cols-2',
  '3': 'grid-cols-3',
  '4': 'grid-cols-4',
  '5': 'grid-cols-4',
  '6': 'grid-cols-5',
  '7': 'grid-cols-6',
  '8': 'grid-cols-7',
  '9': 'grid-cols-9',
  '10': 'grid-cols-10',
  '11': 'grid-cols-11',
  '12': 'grid-cols-12',
}
const ColumnLayoutGapClass = {
  '0': 'gap-0',
  '1': 'gap-1',
  '2': 'gap-2',
  '3': 'gap-3',
  '4': 'gap-4',
  '5': 'gap-5',
}

type RowLayoutProps = CompBaseProps & {
  cols?: '1' | '2' | '3' | '4' | '5' | '6'
  gap?: '0' | '1' | '2' | '3' | '4' | '5'
  breakAt?: 'md' | 'lg' | 'xl'
}
const ColumnLayout = ({ children, className, cols = '1', gap = '4', breakAt }: RowLayoutProps) => {
  const breakAtCls = breakAt
    ? `${ColumnLayoutColsClass[1]} ${breakAt}:${ColumnLayoutColsClass[cols]}`
    : `${ColumnLayoutColsClass[cols]}`
  return <div className={classNames('grid  ', ColumnLayoutGapClass[gap], breakAtCls, className)}>{children}</div>
}
export default ColumnLayout
