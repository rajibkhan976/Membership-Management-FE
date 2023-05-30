import classNames from 'classnames'
import { HeadingProps } from './HeadingProps'

function H3({ className, children, text }: HeadingProps) {
  return <h3 className={classNames('text-xl font-semibold not-italic text-zinc-800', className)}>{children || text}</h3>
}

export default H3
