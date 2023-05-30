import classNames from 'classnames'
import { HeadingProps } from './HeadingProps'

function H1({ className, children, text }: HeadingProps) {
  return <h1 className={classNames('text-xl font-semibold not-italic text-zinc-800', className)}>{children || text}</h1>
}
export default H1
