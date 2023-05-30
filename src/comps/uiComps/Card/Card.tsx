import { CardProps } from './CardProps'

const Card = ({ className, children }: CardProps) => {
  return <div className={className}>{children}</div>
}
export default Card
